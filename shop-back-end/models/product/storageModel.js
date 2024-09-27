//bộ nhớ SSD
const mongoose = require("mongoose");

var storageSchema = new mongoose.Schema(
  {
    capacity: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String, // SSD hoặc HDD
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Storage", storageSchema);
