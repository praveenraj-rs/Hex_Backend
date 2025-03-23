const express = require("express");
const router = express.Router();
const {
  SetSensorValues,
  GetSensorData,
  GetSensorValues,
} = require("../controllers/handleSensor");

router.post("/", SetSensorValues);
router.get("/", GetSensorData);
router.get("/values", GetSensorValues);
module.exports = router;
