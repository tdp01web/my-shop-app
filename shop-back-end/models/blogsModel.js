const mongoose = require("mongoose"); // Erase if already required
// !mdbgum
// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numView: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: "Admin",
    },
    images: [],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
