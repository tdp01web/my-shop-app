const mongoose = require("mongoose");
//LCD MÀN HÌNH
var lcdSchema = new mongoose.Schema(
  {
    size: {
      type: String, // Kích thước màn hình (VD: 15.6 inch)
      required: true,
    },
    resolution: {
      type: String, // Độ phân giải (VD: 1920x1080)
      required: true,
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

module.exports = mongoose.model("LCD", lcdSchema);
