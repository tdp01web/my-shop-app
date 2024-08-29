const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiry,
} = require("../controller/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createEnquiry", createEnquiry);
router.put("/updateEnquiry/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/deleteEnquiry/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/getEnquiry/:id", getEnquiry);
router.get("/getAllEnquiry", getAllEnquiry);

module.exports = router;
