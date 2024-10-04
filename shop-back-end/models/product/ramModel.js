const mongoose = require("mongoose");

var ramSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RAM", ramSchema);
