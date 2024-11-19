const mongoose = require("mongoose");

var ramSchema = new mongoose.Schema(
  {
    size: {
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

module.exports = mongoose.model("RAM", ramSchema);
