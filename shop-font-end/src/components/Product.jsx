import React from "react";
import { BsDeviceSsd } from "react-icons/bs";
import { FaHdd, FaMemory } from "react-icons/fa";
import { PiCircuitryLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaMicrochip } from "react-icons/fa6";
const Product = ({ name, price, priceOld, image, sold, rating, reviews }) => {
  const specs = [
    { icon: <FaMicrochip />, text: "i5 12400F" },
    { icon: <BsDeviceSsd />, text: "RX 6600" },
    { icon: <PiCircuitryLight />, text: "B760" },
    { icon: <FaMemory />, text: "8GB" },
    { icon: <FaHdd />, text: "500GB" },
  ];
  return (
    <div className="bg-white border border-solid border-[#CFCFCF] flex gap-3 px-2 py-2 flex-col mx-[3px] rounded-sm ">
      <div>
        <img src={image} alt={name} className="w-full h-auto" />
      </div>
      <p className="line-clamp-2 font-600 text-[14px]">{name}</p>
      <del className=" text-[12px] text-[#6D6E72] md:text-[14px] font-600 leading-none">
        ${priceOld.toLocaleString()}
      </del>
      <div className="leading-none text-gray-500 flex items-center gap-2">
        <p className="text-red-500 font-600 text-[14px] md:text-[18px]">
          {price.toLocaleString()}đ
        </p>
        <div className="border border-solid border-red-500 rounded-sm px-2">
          <p className="text-red-500  text-[14px] md:text-[18px]">
            {Math.round(((priceOld - price) / priceOld) * 100)}%
          </p>
        </div>
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
          {rating} <FaStar />
        </span>
        <span className=" text-[14px] text-[#6D6E72]">
          ({reviews} đánh giá)
        </span>
      </div>
    </div>
  );
};

export default Product;
