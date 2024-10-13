import { AiFillStar } from "react-icons/ai";
/* eslint-disable react/prop-types */
const ProductDetailsPrice = ({ product }) => {
  const variant = product?.variants?.[0];

  return (
    <div>
      <h2 className="md:text-xl text-[20px] font-semibold text-gray-800">
        {product.title}
      </h2>
      {/* Đánh giá */}
      <div className="flex items-center space-x-1">
        <p>{product.ratings}</p>
        <AiFillStar className="text-yellow-600 md:text-sm" />
        <div className="ml-6">
          <a href="#" className="ml-4 text-blue-700">
            Xem đánh giá
          </a>
        </div>
      </div>
      {/* End Đánh giá */}

      <div className="flex items-center space-x-4 mt-2 flex-wrap">
        {variant && variant.price !== undefined ? (
          <div className="md:text-xl text-[20px] font-bold text-red-600">
            {variant.price.toLocaleString("vi-VN")}₫
          </div>
        ) : (
          <div className="md:text-xl text-[20px] font-bold text-red-600">
            Giá sản phẩm không có sẵn
          </div>
        )}

        {product && product.oldPrice !== undefined ? (
          <p className="line-through text-gray-500 md:text-sm text-[20px]">
            {product.oldPrice.toLocaleString("vi-VN")}₫
          </p>
        ) : null}

        {product && product.discount !== undefined ? (
          <span className="border-red-800 md:text-3xs text-[20px] text-red rounded-md hidden md:block border pl-2 pr-2 top-1.5">
            -{product.discount}%
          </span>
        ) : null}
      </div>
      {/* End Giá */}
    </div>
  );
};

export default ProductDetailsPrice;
