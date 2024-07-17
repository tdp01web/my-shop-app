import mongoose from "mongoose";
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const UserModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }, 
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "member",
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.createdAt = moment(ret.createdAt).format('DD/MM/YYYY HH:mm:ss');
                ret.updatedAt = moment(ret.updatedAt).format('DD/MM/YYYY HH:mm:ss');
                delete ret.id;
            },
        },
    }
);

export default mongoose.model("User", UserModel);