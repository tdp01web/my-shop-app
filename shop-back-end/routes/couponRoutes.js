const express = require("express");
const {
  createCoupon,
  getAllCouponsForUser,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  getAllCouponsForAdmin,
} = require("../controller/couponCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createCoupon", authMiddleware, isAdmin, createCoupon);
router.get("/getaCoupons/:id", authMiddleware, getCoupon);
router.get("/getallCoupons", authMiddleware, getAllCouponsForUser);
router.get("/getallCouponsAdmin", authMiddleware, getAllCouponsForAdmin);
router.put("/updateCoupon/:id", authMiddleware, isAdmin, updateCoupon);
router.post("/deleteCoupon/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
