const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const {
  createBlog,
  UpdateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  uploadImages,
} = require("../controller/blogCtl");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/createBlog", authMiddleware, isAdmin, createBlog);
router.put("/updateBlog/:id", authMiddleware, isAdmin, UpdateBlog);
router.get("/getBlog/:id", getBlog);
router.get("/getallBlog", getAllBlog);
router.delete("/deleteBlog/:id", authMiddleware, isAdmin, deleteBlog);

//!
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  blogImgResize,
  uploadPhoto.array("images", 2),
  uploadImages
);

module.exports = router;
