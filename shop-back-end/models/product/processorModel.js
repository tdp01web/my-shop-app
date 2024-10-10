//vi xử lý HZ CPU
const mongoose = require("mongoose");

var processorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Processor", processorSchema);
