import Contact from "../models/contact.js";
import contactSchema from "../validates/contact.js";
export const getAllContact = async (req, res) => {
    try {
        const contact = await Contact.find()
        if (contact.length === 0) {
            return res.status(404).json({
                message: "Không có liên hệ nào",
            });
        }
        return res.status(200).json({
            message: "thành công", 
            data: contact
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getOneContact = async function (req, res) {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({
                message: "Không tìm thấy liên hệ",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: contact
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const createContact = async function (req, res) {
    try {
        const { error } = contactSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const contact = await Contact.create(req.body);
        if (!contact) {
            return res.status(404).json({
                message: "Không thể gửi liên hệ",
            });
        }
        return res.status(200).json({
            message: "gửi liên hệ thành công",
            data: contact,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updateContact = async function (req, res) {
    try {
        const { error } = contactSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(404).json({
                message: "Cập nhật liên hệ không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật liên hệ thành công",
            data: contact,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const removeContact = async function (req, res) {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa liên hệ thành công",
            contact,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};