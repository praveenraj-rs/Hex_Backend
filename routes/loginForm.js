const express = require("express");
const router = express.Router();

const handleLoginForm = require("../controllers/handleLoginForm");

router.post("/", handleLoginForm.handleLogin);

module.exports = router;
