//vi xử lý HZ CPU
const mongoose = require("mongoose");

var processorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Processor", processorSchema);
