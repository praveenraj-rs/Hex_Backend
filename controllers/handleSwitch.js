const User = require("../model/user");

// GetSwitchStates
const GetSwitchStates = async (req, res) => {
  const username = req.query.username; // without JWT verification
  // const username = req.username; // with JWT verification
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  // res.send(foundUser.switchData.switch1 ? "on" : "off");
  res.status(200).send(foundUser.switchData);
};

const GetSwitchStatesValues = async (username) => {
  // const username = req.query.username; // without JWT verification
  // const username = req.username; // with JWT verification
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  // res.send(foundUser.switchData.switch1 ? "on" : "off");
  return foundUser.switchData;
};

// SetSwitchState
const SetSwitchState = async (req, res) => {
  // const username = req.query.username; // without JWT verification
  const username = req.username; // with JWT verification
  const switchID = req.body.switchID;

  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  console.log(switchID);

  foundUser.switchData[switchID] = !foundUser.switchData[switchID];
  foundUser.save();
  res.status(200).send(foundUser.switchData);
};

module.exports = {
  GetSwitchStates,
  SetSwitchState,
  GetSwitchStatesValues,
};
