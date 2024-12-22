const Enquiry = require("../models/enqModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const nodemailer = require("nodemailer");
const createEnquiry = asyncHandle(async (req, res) => {
  try {
    const { name, email, mobile, comment } = req.body;

    // Tạo mới enquiry trong database
    const newEnquiry = await Enquiry.create(req.body);

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Sử dụng Gmail
      auth: {
        user: process.env.EMAIL_ID, // Email của bạn
        pass: process.env.MP, // Mật khẩu ứng dụng email
      },
    });

    // Nội dung email
    const mailOptions = {
      from: `"Shop Support" <${process.env.EMAIL_ID}>`, // Người gửi
      to: "thaidoanphong01122004@gmail.com", // Email admin
      subject: "New Customer Enquiry", // Tiêu đề
      html: `
        <h3>New Enquiry Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Comment:</strong> ${comment}</p>
      `, // Nội dung email dưới dạng HTML
    };

    // Gửi email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    res.json(newEnquiry); // Trả về kết quả cho client
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnquiry = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEnquiry = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deleteEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getEnquiry = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getEnquiry = await Enquiry.findById(id);
    res.json(getEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllEnquiry = asyncHandle(async (req, res) => {
  try {
    const getAllEnquiry = await Enquiry.find();
    res.json(getAllEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiry,
};
