import joi from "joi";
const sizesSchema = joi.object({
    size: joi.number().required(),
    quantity: joi.number().required(),
});
const ProductSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": 'Trường tên không được để trống',
        "any.required": 'Trường tên là bắt buộc',
    }),
    price: joi.number().required().messages({
        "string.empty": 'Trường price không được để trống',
        "any.required": 'Trường price là bắt buộc',
    }),
    images: joi.array().items(joi.string().uri()).required().messages({
        "string.empty": 'Trường images không được để trống',
        "any.required": 'Trường images là bắt buộc',
    }),
    sizes: joi.array().items(sizesSchema).required(),
    description: joi.string().required().messages({ 
        "string.empty": 'Trường description không được để trống',
        "any.required": 'Trường description là bắt buộc',
    }),
    tags: joi.string().required().messages({
        "string.empty": 'Trường tags không được để trống',
        "any.required": 'Trường tags là bắt buộc',
    }),
    CategoryId: joi.string().required().messages({
        "string.empty": 'Trường CategoryId không được để trống',
        "any.required": 'Trường CategoryId là bắt buộc',
    })
});

export default ProductSchema