import React from "react";
import { BsDeviceSsd } from "react-icons/bs";
import { FaHdd, FaMemory } from "react-icons/fa";
import { PiCircuitryLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaMicrochip } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Product = ({
  title, // Tên sản phẩm
  price,
  priceOld,
  images,
  variants,
  totalrating = 0, // Giá trị mặc định là 0 nếu không có rating
  ratings,
  description,
}) => {
  // Lấy ảnh đầu tiên của sản phẩm
  const productImage = images[0]?.url || "NaN";

  // Lấy biến thể đầu tiên
  const firstVariant = variants[0];
  const variantImage = firstVariant?.images[0]?.url || "NaN";

  const specs = [
    { icon: <FaMicrochip />, text: firstVariant?.processor?.name || "NaN" },
    { icon: <BsDeviceSsd />, text: firstVariant?.gpu?.name || "NaN" },
    { icon: <PiCircuitryLight />, text: firstVariant?.ram?.size || "NaN" },
    { icon: <FaMemory />, text: firstVariant?.storage?.capacity || "NaN" },
  ];

  return (
    <Link
      to={`/products/${title.toLowerCase().replace(/ /g, "-")}`}
      className="bg-white border border-solid border-[#CFCFCF] flex gap-3 px-2 py-2 flex-col mx-[3px] rounded-sm"
    >
      <div>
        <img src={productImage} alt={title} className="w-full h-auto" />
      </div>
      <p className="line-clamp-2 font-600 text-[14px]">{title}</p>
      <del className=" text-[12px] text-[#6D6E72] md:text-[14px] font-600 leading-none">
        {/* {priceOld ? `$${priceOld.toLocaleString()}` : "NaN"} */}
      </del>
      <div className="leading-none text-gray-500 flex items-center gap-2">
        <p className="text-red-500 font-600 text-[14px] md:text-[18px]">
          {firstVariant?.price.toLocaleString()}đ
        </p>
        {/* <div className="border border-solid border-red-500 rounded-sm px-2">
          <p className="text-red-500  text-[14px] md:text-[18px]">
            {priceOld
              ? Math.round(((priceOld - price) / priceOld) * 100) + "%"
              : "NaN"}
          </p>
        </div> */}
      </div>
      <div className="flex flex-wrap gap-3 bg-[#ECECEC] p-2 rounded-md">
        {specs.map((spec, index) => (
          <p
            key={index}
            className="flex items-center text-[13px] gap-1 text-[#6D6E72]"
          >
            {spec.icon} {spec.text}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#FF8A00] flex items-center gap-1 text-[14px]">
          {totalrating} <FaStar />
        </span>
        <span className=" text-[14px] text-[#6D6E72]">
          ({ratings.length} đánh giá)
        </span>
      </div>
    </Link>
  );
};

export default Product;
