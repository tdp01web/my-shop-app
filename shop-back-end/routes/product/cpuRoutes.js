const express = require("express");
const {
  createCPU,
  updateCPU,
  deleteCPU,
  getCPU,
  getAllCPU,
} = require("../../controller/product/cpuCtrl");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createCPU", authMiddleware, isAdmin, createCPU);
router.put("/updateCPU/:id", authMiddleware, isAdmin, updateCPU);
router.post("/deleteCPU/:id", authMiddleware, isAdmin, deleteCPU);
router.get("/getCPU/:id", getCPU);
router.get("/getAllCPU", getAllCPU);

module.exports = router;
