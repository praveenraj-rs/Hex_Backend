const express = require("express");
const { GetSwitch1, SetSwitch1 } = require("../controllers/handleSwitch");
const router = express.Router();

router.get("/", GetSwitch1);
router.post("/", SetSwitch1);

module.exports = router;
