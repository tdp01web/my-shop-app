const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const {
  createBlog,
  UpdateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
} = require("../controller/blogCtl");

router.post("/createBlog", authMiddleware, isAdmin, createBlog);
router.put("/updateBlog/:id", authMiddleware, isAdmin, UpdateBlog);
router.get("/getBlog/:id", getBlog);
router.get("/getallBlog", getAllBlog);
router.post("/deleteBlog/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
