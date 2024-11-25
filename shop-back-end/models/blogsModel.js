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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
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

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
