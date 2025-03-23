const { LatestSensorData } = require("./handleSensor");
const { GetSwitchStatesValues } = require("./handleSwitch");
const { LatestBinData } = require("./smartBin/handleSmartbin");
const { LatestGasData } = require("./gasMonitor/handleGasMonitor");
const { LatestBMSData } = require("./bms/handleBMS");

const SocketConnect = async (socket, io) => {
  const username = socket.username;
  console.log(`WS: user ${username} connected`);

  const room = `user_${username}`;
  socket.join(room);

  const sendSensorData = async (username) => {
    const latestSensorData = await LatestSensorData(username);
    io.to(room).emit("sensorData", latestSensorData);
  };
  const switchState = async (username) => {
    const switchState = await GetSwitchStatesValues(username);
    io.to(room).emit("switch", switchState);
  };

  const smartBin = async (username) => {
    const latestBinData = await LatestBinData(username);
    io.to(room).emit("smartBin", latestBinData);
  };
  const gasMonitor = async (username) => {
    const latestGasData = await LatestGasData(username);
    io.to(room).emit("gasMonitor", latestGasData);
  };
  const bms = async (username) => {
    const latestBMSData = await LatestBMSData(username);
    io.to(room).emit("bms", latestBMSData);
  };

  sendSensorData(username);
  smartBin(username);
  gasMonitor(username);
  bms(username);
  switchState(username);

  socket.on("disconnect", () => {
    console.log(`WS: user ${username} disconnected`);
  });
};

module.exports = { SocketConnect };
