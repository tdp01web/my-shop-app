import joi from "joi";
const AboutSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": 'Trường tên không được để trống',
        "any.required": 'Trường tên là bắt buộc',
    }),
    email: joi.string().email().required().messages({
        "string.empty": 'Trường email không được để trống',
        "string.email": 'Trường email không đúng định dạng',
        "any.required": 'Trường email là bắt buộc',
    }),
    phone: joi.number().required().messages({
        "string.empty": 'Trường phone không được để trống', 
        "any.required": 'Trường phone là bắt buộc',
    }),
    address: joi.string().required().messages({
        "string.empty": 'Trường address không được để trống',
        "any.required": 'Trường address là bắt buộc',
    }),
    image: joi.string().required().messages({
        "string.empty": 'Trường image không được để trống',
        "any.required": 'Trường image là bắt buộc',
    }),
    description: joi.string().required().messages({
        "string.empty": 'Trường description không được để trống',
        "any.required": 'Trường description là bắt buộc',
    }),
});

export default AboutSchema