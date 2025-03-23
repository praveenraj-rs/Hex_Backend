const User = require("../../model/user");

// SetSensorValues
const SetBinData = async (req, res) => {
  const { username, location, organic, inorganic } = req.body;

  try {
    let foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    foundUser.smartBin.push({ location, organic, inorganic });
    await foundUser.save();

    var latestBinData = { location, organic, inorganic };
    const room = `user_${username}`;
    // req.io.to(room).emit("sensorData", latestBinData);
    req.io.to(room).emit("smartBin", latestBinData);
    res.status(200).json({ message: "Sensor data stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GetSensorData
const GetBinData = async (req, res) => {
  const username = req.body.username;
  // const username = req.username;
  const latestBinData = await LatestBinData(username);
  res.json(latestBinData);
};

// LatestBinData
const LatestBinData = async (username) => {
  let foundUser = await User.findOne({ username: username });

  if (!foundUser) {
    res.error(401).json({ message: "Invalid credentials." });
  }
  const latestBinData = foundUser.smartBin[foundUser.smartBin.length - 1];

  return latestBinData;
};

module.exports = {
  SetBinData,
  GetBinData,
  LatestBinData,
};
