const mongoose = require("mongoose");

const historyOrderSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  name:{
    type: String
  },
  status:{
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HistoryOrder", historyOrderSchema);