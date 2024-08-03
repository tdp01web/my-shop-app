import { AiFillStar } from "react-icons/ai";
/* eslint-disable react/prop-types */
const ProductDetailsPrice = ({ product }) => {
  return (
    <div>
      <h2 className="md:text-xl font-semibold text-gray-800">{product.name}</h2>
      {/* Đánh giá */}
      <div className="flex items-center space-x-1">
        <p>{product.rating}</p>
        <AiFillStar className="text-yellow-600 md:text-sm" />
        <div className="ml-6">
          <a href="#" className="ml-4 text-blue-700">
            Xem đánh giá
          </a>
        </div>
      </div>
      {/* End Đánh giá */}
      {/* Giá */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-red-600">
          {product.price.toLocaleString("vi-VN")}₫
        </div>
        <p className="line-through text-gray-500 text-sm">
          {product.oldPrice.toLocaleString("vi-VN")}₫
        </p>
        <span className="border-red-800 text-3xs text-red rounded-md hidden md:block border pl-2 pr-2 top-1.5 ">
          -{product.discount}%
        </span>
      </div>
      {/* End Giá */}
    </div>
  );
};

export default ProductDetailsPrice;
