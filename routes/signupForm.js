const express = require("express");
const router = express.Router();

const handleSignupForm = require("../controllers/handleSignupForm");

router.post("/", handleSignupForm.handleSignup);

module.exports = router;
