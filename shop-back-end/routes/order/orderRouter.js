const express = require("express");
const { createOrder } = require("../../controller/order/order");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, createOrder); // Order sản phẩm

module.exports = router;
