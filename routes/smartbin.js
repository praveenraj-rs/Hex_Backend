const express = require("express");
const router = express.Router();
const {
  SetBinData,
  GetBinData,
} = require("../controllers/smartBin/handleSmartbin");

router.post("/", SetBinData);
router.get("/", GetBinData);
module.exports = router;
