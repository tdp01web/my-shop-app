const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require("../controller/couponCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createCoupon", authMiddleware, isAdmin, createCoupon);
router.get("/getaCoupons/:id",authMiddleware, getCoupon);
router.get("/getallCoupons", authMiddleware, getAllCoupons);
router.put("/updateCoupon/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/deleteCoupon/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
