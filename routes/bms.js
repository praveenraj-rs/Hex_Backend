const express = require("express");
const router = express.Router();
const { SetBMSData, GetBMSData } = require("../controllers/bms/handleBMS");

router.post("/", SetBMSData);
router.get("/", GetBMSData);
module.exports = router;
