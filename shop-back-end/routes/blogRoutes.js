const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const {
  createBlog,
  UpdateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = require("../controller/blogCtl");
const router = express.Router();

router.post("/createBlog", authMiddleware, isAdmin, createBlog);
router.put("/likeBlog", authMiddleware, likeBlog);
router.put("/disLikeBlog", authMiddleware, dislikeBlog);

router.put("/updateBlog/:id", authMiddleware, isAdmin, UpdateBlog);
router.get("/getBlog/:id", getBlog);
router.get("/getallBlog", getAllBlog);
router.delete("/deleteBlog/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
