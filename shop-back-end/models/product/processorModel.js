//vi xử lý HZ CPU
const mongoose = require("mongoose");

var processorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    speed: {
      type: String, // Tốc độ của CPU (VD: 3.6GHz)
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Processor", processorSchema);
