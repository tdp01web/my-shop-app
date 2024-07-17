import User from "../models/user.js";
import { signinSchema, signupSchema } from "../validates/auth.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()
const { MAIL_USERNAME } = process.env
const { MAIL_PASSWORD } = process.env
const { MAIL_FROM_ADDRESS } = process.env
const { SECRET_CODE } = process.env;
const { REFRESH_SECRET } = process.env;
export const Signup = async (req, res) => {
    try {
        // Tạo liên kết xác thực
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const link = `http://localhost:3000/signin?token=${token}`;
        const { name, email, password } = req.body;

        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "Tài khoản đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        user.password = undefined;

        // Gửi email khi đăng ký thành công
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${MAIL_USERNAME}`,
                pass: `${MAIL_PASSWORD}`,
            },
        });
        const mailOptions = {
            from: `${MAIL_FROM_ADDRESS}`,
            to: email,
            subject: 'Xác thực tài khoản',
            text: `Chào mừng ${name} đến với trang web của chúng tôi. Vui lòng nhấp vào liên kết sau để xác thực tài khoản của bạn: ${link}`,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    message: error
                })
            } else {
                return res.status(200).json({
                    message: info.response
                })
            }
        });

        return res.status(201).json({
            message: "Đăng ký thành công. Vui lòng kiểm tra email của bạn để xác thực tài khoản và đăng nhập",
            user,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
};

export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = signinSchema.validate({ email, password }, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Không đúng mật khẩu",
            });
        }
        // Gửi email cảnh báo khi đăng nhập thành công
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${MAIL_USERNAME}`,
                pass: `${MAIL_PASSWORD}`,
            },
        });
        const mailOptions = {
            from: `${MAIL_FROM_ADDRESS}`,
            to: email,
            subject: 'cảnh báo bảo mật',
            html: `<p>Chúng tôi phát hiện thấy có một yêu cầu đăng nhập mới vào Tài khoản Google của bạn trên một thiết bị lạ. Nếu đây là yêu cầu của bạn, thì bạn không phải làm gì thêm. Nếu đây không phải là yêu cầu của bạn, thì chúng tôi sẽ giúp bạn bảo mật tài khoản.</p>`,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    message: error
                })
            } else {
                return res.status(200).json({
                    message: info.response
                })
            }
        });
        // Tạo access token
        const token = jwt.sign(
            { _id: user._id },
            SECRET_CODE,
            { expiresIn: "7d" });
        // Tạo refreshToken
        const refreshToken = jwt.sign(
            { _id: user._id },
            REFRESH_SECRET,
            { expiresIn: "14d" }
        );
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            refreshToken: refreshToken,
            user,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: "Missing refresh token" });
        }
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(401).json({ message: "Token làm mới không hợp lệ" });
        }
        const newAccessToken = jwt.sign({ _id: user._id }, SECRET_CODE, { expiresIn: "7d" });
        const newRefreshToken = jwt.sign({ _id: user._id }, REFRESH_SECRET, { expiresIn: "14d" });
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        if (error.name === "Token hết hạn") {
            return res.status(401).json({ message: "Mã Token làm mới đã hết hạn, vui lòng đăng nhập lại" });
        }
        return res.status(401).json({ message: "token mới không hợp lệ" });
    }
};

// export const verifyToken = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({ message: 'Không tìm thấy mã thông báo truy cập' });
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//         // Xác thực accessToken
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decodedToken.userId;
//         next();
//     } catch (err) {
//         if (err instanceof jwt.TokenExpiredError) {
//             // Nếu accessToken hết hạn, tạo lại accessToken mới từ refreshToken
//             const refreshToken = req.cookies.refreshToken;
//             if (!refreshToken) {
//                 return res.status(401).json({ message: 'Không tìm thấy mã thông báo truy cập' });
//             }

//             try {
//                 const decodedRefreshToken = jwt.verify(refreshToken, 'your_refresh_secret_key_here');
//                 const user: any = await User.findById(decodedRefreshToken.userId);
//                 if (!user || user.refreshToken !== refreshToken) {
//                     return res.status(401).json({ message: 'Không tìm thấy mã thông báo truy cập' });
//                 }

//                 const newAccessToken = jwt.sign(
//                     { userId: user.id },
//                     process.env.JWT_SECRET,
//                     { expiresIn: '7d' }
//                 );

//                 req.userId = user.id;
//                 res.cookie('accessToken', newAccessToken, { httpOnly: true });
//                 next();
//             } catch (err) {
//                 console.error(err);
//                 return res.status(401).json({ message: 'Không tìm thấy mã thông báo truy cập' });
//             }
//         } else {
//             console.error(err);
//             return res.status(401).json({ message: 'Không tìm thấy mã thông báo truy cập' });
//         }
//     }
// };

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Tạo liên kết xác thực
        // Tạo một password ngẫu nhiên có độ dài là 8 ký tự
        const passwordNew = crypto.randomBytes(4).toString('hex')
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản của bạn không tồn tại",
            });
        }
        // Cập nhật mật khẩu mới và mã hõa của người dùng trong cơ sở dữ liệu
        user.password = await bcrypt.hash(passwordNew, 10);
        await user.save();
        // Gửi email mật khẩu mới
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${MAIL_USERNAME}`,
                pass: `${MAIL_PASSWORD}`,
            },
        });
        const mailOptions = {
            from: `${MAIL_FROM_ADDRESS}`,
            to: email,
            subject: 'Quên mật khẩu',
            text: `Bạn vừa quên mật phải không ?. Mật khẩu mới của bạn là: ${passwordNew}`,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    message: error
                })
            } else {
                return res.status(200).json({
                    message: info.response
                })
            }
        });
        return res.status(200).json({
            message: "Chúng tôi đã gửi cho bạn mật khẩu mới",
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
};