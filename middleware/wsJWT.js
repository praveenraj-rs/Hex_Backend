const jwt = require("jsonwebtoken");

const wsJWT = async (socket, next) => {
  const token = socket.handshake.auth.accessToken;

  if (!token) {
    return next(new Error("Authentication error"));
  }
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    socket.username = payload.username;
    next();
  } catch (err) {
    return next(new Error("Authentication error"));
  }
};

module.exports = wsJWT;
