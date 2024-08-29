const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

//! upload ảnh

const uploadImage = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    // console.log(req.files);
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      try {
        await fs.unlinkSync(path);
      } catch (error) {
        console.error(`Failed to delete file ${file.path}:`, error);
      }
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

//! xóa ảnh
const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "deleted image" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { uploadImage, deleteImage };
