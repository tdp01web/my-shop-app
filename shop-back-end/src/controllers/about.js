import About from "../models/about.js";
import AboutSchema from "../validates/about.js";
export const getAllAbout = async (req, res) => {
    try {
        const about = await About.find()
        if (about.length === 0) {
            return res.status(404).json({
                message: "Không có thông tin nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: about
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const getOneAbout = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) {
            return res.status(404).json({
                message: "không tìm thấy thông tin",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: about,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const createAbout = async function (req, res) {
    try {
        const { error } = AboutSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const about = await About.create(req.body);
        if (!about) {
            return res.status(404).json({
                message: "thêm thông tin không thành công",
            });
        }
        return res.status(200).json({
            message: "thêm thông tin thành công",
            data: about,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateAbout = async function (req, res) {
    try {
        const { error } = AboutSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const about = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!about) {
            return res.status(404).json({
                message: "Cập nhật thông tin không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật thông tin thành công",
            data: about,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const removeAbout = async function (req, res) {
    try {
        const about = await About.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa thông tin thành công",
            about,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};