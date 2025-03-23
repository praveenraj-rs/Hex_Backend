const User = require("../../model/user");

// SetSensorValues
const SetBMSData = async (req, res) => {
  const { username, voltage, current, temp } = req.body;

  try {
    let foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    foundUser.bms.push({ voltage, current, temp });
    await foundUser.save();

    var latestBMSData = { voltage, current, temp };
    const room = `user_${username}`;
    // req.io.to(room).emit("sensorData", latestBMSData);
    req.io.to(room).emit("bms", latestBMSData);
    res.status(200).json({ message: "Sensor data stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GetSensorData
const GetBMSData = async (req, res) => {
  const username = req.body.username;
  // const username = req.username;
  const latestBMSData = await LatestBMSData(username);
  res.json(latestBMSData);
};

// LatestBMSData
const LatestBMSData = async (username) => {
  let foundUser = await User.findOne({ username: username });

  if (!foundUser) {
    res.error(401).json({ message: "Invalid credentials." });
  }
  const latestBMSData = foundUser.bms[foundUser.bms.length - 1];

  return latestBMSData;
};

module.exports = {
  SetBMSData,
  GetBMSData,
  LatestBMSData,
};
