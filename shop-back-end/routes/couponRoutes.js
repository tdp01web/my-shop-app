const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createCoupon", authMiddleware, isAdmin, createCoupon);
router.get("/getallCoupons", authMiddleware, getAllCoupons);
router.put("/updateCoupon/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/deleteCoupon/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
