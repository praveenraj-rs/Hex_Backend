const express = require("express");
const router = express.Router();
const handleLogout = require("../controllers/handleLogout");

router.get("/", handleLogout.handleLogout);

module.exports = router;
