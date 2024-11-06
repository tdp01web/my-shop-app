import React, { useState } from "react";
import { BsDeviceSsd } from "react-icons/bs";
import { FaMemory, FaStar, FaMicrochip } from "react-icons/fa6";
import { PiCircuitryLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AiFillHeart } from "react-icons/ai";
import { message } from "antd";
import { instance } from "../configs/instance";
const Product = ({
  _id,
  title,
  price,
  images,
  variants,
  totalrating = 0,
  ratings,
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false); // Trạng thái để xác định màu sắc trái tim
  const productImage = images[0]?.url || "NaN";
  const firstVariant = variants[0];

  const specs = [
    { icon: <FaMicrochip />, text: firstVariant?.processor?.name || "NaN" },
    { icon: <BsDeviceSsd />, text: firstVariant?.gpu?.name || "NaN" },
    { icon: <PiCircuitryLight />, text: firstVariant?.ram?.size || "NaN" },
    { icon: <FaMemory />, text: firstVariant?.storage?.capacity || "NaN" },
  ];

  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const { data } = await instance.put(
        "/product/wishlist",
        { prodId: _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
    onSuccess: (response) => {
      setIsInWishlist(
        response.message === "Thêm vào danh  sách yêu thích thành công"
      );
      message.success(response.message);
    },
    onError: (error) => {
      console.log("🚀 ~ error:", error);
      message.error("Đã có lỗi xảy ra");
    },
  });

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Link
      to={`/products/${_id}`}
      className="relative bg-white border border-solid border-[#CFCFCF] flex gap-3 px-2 py-2 flex-col mx-[3px] rounded-sm group"
    >
      {/* Biểu tượng trái tim cho wishlist */}
      <div
        className={`absolute top-2 left-2 ${
          isInWishlist ? "text-red-500" : "text-gray-400"
        } opacity-0 group-hover:opacity-100 cursor-pointer`}
        onClick={handleAddToWishlist}
      >
        <AiFillHeart size={24} />
      </div>

      <div>
        <img src={productImage} alt={title} className="w-full h-auto" />
      </div>
      <p className="line-clamp-2 font-600 text-[14px]">{title}</p>
      <div className="leading-none text-gray-500 flex items-center gap-2">
        <p className="text-red-500 font-600 text-[14px] md:text-[18px]">
          {firstVariant?.price.toLocaleString()}đ
        </p>
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
