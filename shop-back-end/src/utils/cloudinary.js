const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      fileToUpload,
      (result) => {
        resolve(
          {
            url: result.url,
            // public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      }
      //   {
      //     resource_type: "auto",
      //   }
    );
  });
};
module.exports = { cloudinaryUploadImg };
