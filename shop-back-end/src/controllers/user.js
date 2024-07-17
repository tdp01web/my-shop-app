import User from "../models/user.js"
export const getAllUser = async (req, res) => {
    try {
        const user = await User.find()
        if (user.length === 0) {
            return res.status(404).json({
                message: "Không có người dùng nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: user
        }); 
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getOneUser = async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy người dùng",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateUser = async function (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({
                message: "Cập nhật người dùng không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật người dùng thành công",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const removeUser = async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa người dùng thành công",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};