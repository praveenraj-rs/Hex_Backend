const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
    switchData: {
      switch1: { type: Boolean, default: false },
      switch2: { type: Boolean, default: false },
      switch3: { type: Boolean, default: false },
    },
    sensorData: [
      {
        ph: { type: Number }, // PH
        ec: { type: Number }, // Electron Conductivity
        tds: { type: Number }, // Total Dissolved Solid
        wtemp: { type: Number }, // Water Temperature
        atmtemp: { type: Number }, // Atmospheric Temperature
        humidity: { type: Number }, // Humidity
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    smartBin: [
      {
        location: { type: String }, // location of smartbin
        organic: { type: Number }, // organic fill level
        inorganic: { type: Number }, // inorganic fill level
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    gasMonitor: [
      {
        temp: { type: Number },
        mq4: { type: Number },
        mq6: { type: Number },
        mq7: { type: Number },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    bms: [
      {
        voltage: { type: Number },
        current: { type: Number },
        temp: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
