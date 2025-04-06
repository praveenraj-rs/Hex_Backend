const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvent");
const verifyJWT = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const wsJWT = require("./middleware/wsJWT");
const { SetSensorValues } = require("./controllers/handleSensor");
const { SetBinData } = require("./controllers/smartBin/handleSmartbin");
const { SetGasData } = require("./controllers/gasMonitor/handleGasMonitor");
const { SetBMSData } = require("./controllers/bms/handleBMS");
const allowedOrigins = require("./config/allowedOrigins");
const { SocketConnect } = require("./controllers/handleSocketIo");
const {
  GetSwitchStates,
  SetSwitchState,
} = require("./controllers/handleSwitch");

const app = express();
const PORT = process.env.PORT;
connectDB();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(wsJWT);
io.on("connection", async (socket) => {
  SocketConnect(socket, io);
});

// Built-in middleware
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(200);
});
app.get("/getswitchstates", GetSwitchStates);

app.post(
  "/sensor",
  (req, res, next) => {
    req.io = io;
    next();
  },
  SetSensorValues
);

app.post(
  "/smartbin",
  (req, res, next) => {
    req.io = io;
    next();
  },
  SetBinData
);

app.post(
  "/gasmonitor",
  (req, res, next) => {
    req.io = io;
    next();
  },
  SetGasData
);
app.post(
  "/bms",
  (req, res, next) => {
    req.io = io;
    next();
  },
  SetBMSData
);

app.use(cors(corsOptions));
app.use("/signup", require("./routes/signupForm"));
app.use("/login", require("./routes/loginForm"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/sensor", require("./routes/sensor"));
app.use("/smartbin", require("./routes/smartbin"));
app.use("/gasmonitor", require("./routes/gasMonitor"));
app.use("/bms", require("./routes/bms"));

app.post("/setswitchstate", SetSwitchState);
app.use(verifyJWT);
// app.use("/switch", require("./routes/switch"));

mongoose.connection.once("open", () => {
  console.log("Successfully connected to mongodb");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
