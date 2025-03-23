const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/handleRefreshToken");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
