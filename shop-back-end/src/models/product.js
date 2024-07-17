import mongoose from "mongoose";
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    salePrice: {
        type: Number,
    },
    images: [
        {
            type: String,
            require: true
        },
    ],
    description: {
        type: String,
        require: true
    },
    sizes: [{
        size: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    views: {
        type: Number,
        default: 0
    },
    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Hashtag",
            require: true
        }
    ],
    CategoryId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            require: true
        }
    ]
}, {
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
})

export default mongoose.model("Product", ProductModel)