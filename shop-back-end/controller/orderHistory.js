const HistoryOrder = require("../models/orderHistory");
const asyncHandler = require("express-async-handler");

const getHistoryOrderById = asyncHandler(async (req, res) => {
  const {id} = req.params
  try {
    const historyOrderList = await HistoryOrder.find({orderId: id})
    res.json(historyOrderList);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

module.exports = {
  getHistoryOrderById,
};