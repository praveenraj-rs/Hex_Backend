const User = require("../../model/user");

// SetSensorValues
const SetGasData = async (req, res) => {
  const { username, temp, mq4, mq6, mq7 } = req.body;

  try {
    let foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    foundUser.gasMonitor.push({ temp, mq4, mq6, mq7 });
    await foundUser.save();

    var latestGasData = { temp, mq4, mq6, mq7 };
    const room = `user_${username}`;
    // req.io.to(room).emit("sensorData", latestGasData);
    req.io.to(room).emit("gasMonitor", latestGasData);
    res.status(200).json({ message: "Sensor data stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GetSensorData
const GetGasData = async (req, res) => {
  const username = req.body.username;
  // const username = req.username;
  const latestGasData = await LatestGasData(username);
  res.json(latestGasData);
};

// LatestGasData
const LatestGasData = async (username) => {
  let foundUser = await User.findOne({ username: username });

  if (!foundUser) {
    res.error(401).json({ message: "Invalid credentials." });
  }
  const latestGasData = foundUser.gasMonitor[foundUser.gasMonitor.length - 1];

  return latestGasData;
};

module.exports = {
  SetGasData,
  GetGasData,
  LatestGasData,
};
