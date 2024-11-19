//bộ nhớ SSD
const mongoose = require("mongoose");

var storageSchema = new mongoose.Schema(
  {
    capacity: {
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

module.exports = mongoose.model("Storage", storageSchema);
