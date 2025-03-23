const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  foundUser.refreshToken = refreshToken;
  foundUser.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  }); // secure: true,
  res.json({
    accessToken,
  });
  console.log(`${user} is connected`);
};

module.exports = { handleLogin };
