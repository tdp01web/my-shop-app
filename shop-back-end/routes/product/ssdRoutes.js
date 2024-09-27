const express = require("express");
const {
  createSSD,
  updateSSD,
  deleteSSD,
  getSSD,
  getAllSSD,
} = require("../../controller/product/ssdCtrl");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createSSD", authMiddleware, isAdmin, createSSD);
router.put("/updateSSD/:id", authMiddleware, isAdmin, updateSSD);
router.delete("/deleteSSD/:id", authMiddleware, isAdmin, deleteSSD);
router.get("/getSSD/:id", getSSD);
router.get("/getAllSSD", getAllSSD);

module.exports = router;
