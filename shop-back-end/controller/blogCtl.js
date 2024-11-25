const Blog = require("../models/blogsModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

//! Create blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    // Lấy ID của người dùng đang đăng nhập từ req.user
    const author = req.user._id; // Giả sử bạn đã xác thực người dùng và lưu thông tin vào req.user
    const newBlog = await Blog.create({ ...req.body, author });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Update blog
const UpdateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog không tồn tại' });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Get blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findById(id).populate('author');
    if (!blog) {
      return res.status(404).json({ message: 'Blog không tồn tại' });
    }
    await Blog.findByIdAndUpdate(id, { $inc: { numView: 1 } }, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Get all blogs
const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Delete blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBlog = await Blog.findById(id);
    if (!deleteBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    deleteBlog.status = deleteBlog.status === 1 ? 0 : 1;
    const updateBlog = await deleteBlog.save();
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  UpdateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
};