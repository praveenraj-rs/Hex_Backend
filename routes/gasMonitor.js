const express = require("express");
const router = express.Router();
const {
  SetGasData,
  GetGasData,
} = require("../controllers/gasMonitor/handleGasMonitor");

router.post("/", SetGasData);
router.get("/", GetGasData);
module.exports = router;
