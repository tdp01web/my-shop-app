const express = require("express");
const {
  getTodaySales,
  getMonthlySales,
  getTotalProductSalesThisMonth,
  getSalesStatistics,
  getLowStockProducts,
  getTopSellingProducts,
  getLoyalCustomers,
  getSalesByTime,
  getProductSalesByTime,
  getOrderStatusStats,
  getOrderAndProductStats,
  getSalesTypeStats,
} = require("../controller/statsCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.get("/getMonthlySales", getMonthlySales);
router.get("/getTodaySales", getTodaySales);
router.get("/getTotalProductSalesThisMonth", getTotalProductSalesThisMonth);
router.get("/sales-stats", getSalesStatistics);
router.get("/low-stock", getLowStockProducts);
router.get("/getTopSellingProducts", getTopSellingProducts);
router.get("/getLoyalCustomers", getLoyalCustomers);
router.get("/getSalesByTime", getSalesByTime);
router.get("/getProductSalesByTime", getProductSalesByTime);
router.get("/getOrderStatusStats", getOrderStatusStats);
router.get("/getOrderAndProductStats", getOrderAndProductStats);
router.get("/getSalesTypeStats", getSalesTypeStats);

module.exports = router;
