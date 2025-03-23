const User = require("../model/user");

// SetSensorValues
const SetSensorValues = async (req, res) => {
  const { username, ph, ec, tds, wtemp, atmtemp, humidity } = req.body;

  try {
    let foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    foundUser.sensorData.push({ ph, ec, tds, wtemp, atmtemp, humidity });
    await foundUser.save();

    var latestSensorData = { ph, ec, tds, wtemp, atmtemp, humidity };
    const room = `user_${username}`;
    req.io.to(room).emit("sensorData", latestSensorData);

    // LatestSensorValues
    var latestSensorValues = await LatestSensorValues(username);
    req.io.to(room).emit("sensorValues", latestSensorValues);
    console.log(latestSensorValues);

    res.status(200).json({ message: "Sensor data stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GetSensorData
const GetSensorData = async (req, res) => {
  const username = req.body.username;
  // const username = req.username;
  const latestSensorData = await LatestSensorData(username);
  res.json(latestSensorData);
};

// GetSensorValues
const GetSensorValues = async (req, res) => {
  const username = req.body.username;
  // const username = req.username;
  const latestSensorValues = await LatestSensorValues(username);
  res.json(latestSensorValues);
};

// LatestSensorData
const LatestSensorData = async (username) => {
  let foundUser = await User.findOne({ username: username });

  if (!foundUser) {
    res.error(401).json({ message: "Invalid credentials." });
  }
  const latestSensorData =
    foundUser.sensorData[foundUser.sensorData.length - 1];

  return latestSensorData;
};

// LatestSensorValues
const LatestSensorValues = async (username) => {
  let foundUser = await User.findOne({ username: username });

  if (!foundUser) {
    res.error(401).json({ message: "Invalid credentials." });
  }
  const LatestSensorValues = foundUser.sensorData;

  return LatestSensorValues;
};

module.exports = {
  SetSensorValues,
  GetSensorData,
  GetSensorValues,
  LatestSensorData,
  LatestSensorValues,
};
