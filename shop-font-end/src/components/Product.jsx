import React from "react";
import { BsDeviceSsd } from "react-icons/bs";
import { FaMemory, FaStar, FaMicrochip } from "react-icons/fa6";
import { PiCircuitryLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AiFillHeart } from "react-icons/ai";
import { message } from "antd";
import { instance } from "../configs/instance";
import ProductSkeleton from "./ProductSkeleton";

const Product = ({
  _id,
  title,
  price,
  images,
  variants,
  totalrating = 0,
  ratings,
}) => {
  const user = localStorage.getItem("user");
  const productImage = images[0]?.url || "NaN";
  const firstVariant = variants[0];
  const queryClient = useQueryClient();

  const specs = [
    { icon: <FaMicrochip />, text: firstVariant?.processor?.name || "NaN" },
    { icon: <BsDeviceSsd />, text: firstVariant?.gpu?.name || "NaN" },
    { icon: <PiCircuitryLight />, text: firstVariant?.ram?.size || "NaN" },
    { icon: <FaMemory />, text: firstVariant?.storage?.capacity || "NaN" },
  ];

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const { data } = await instance.get("user/getWishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data?.wishlist || [];
    },
    enabled: !!user
  });

  const isInWishlist = wishlist?.some((product) => product._id === _id);

  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token");
      }
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
      message.success(response.message);
      queryClient.invalidateQueries(["wishlist"]);
    },
    onError: (error) => {
      if (error.message == "No token") {
        message.error("Vui lòng đăng nhập để thêm sản phẩm vào yêu thích");
      } else {
        message.error("Đã có lỗi xảy ra");
      }
    },
  });

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) {
    return (
      <div>
        <ProductSkeleton />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-3 border-[#CFCFCF] bg-white mx-[3px] px-2 py-2 border border-solid rounded-sm h-[100%] group">
      {/* Biểu tượng yêu thích */}
      <div
        className={`absolute z-10 top-2 left-2 ${
          isInWishlist ? "text-red-500" : "text-gray-400"
        } cursor-pointer`}
        onClick={handleAddToWishlist}
      >
        <AiFillHeart size={24} />
      </div>

      {/* Nội dung sản phẩm - dùng Link để điều hướng */}
      <Link to={`/products/${_id}`} className="flex flex-col gap-3 h-full">
        <div className="relative w-full">
          <img
            src={productImage}
            alt={title}
            className="w-full h-auto aspect-square"
          />
        </div>
        <p className="line-clamp-2 h-[40px] font-600 text-[14px] text-ellipsis overflow-hidden">
          {title}
        </p>
        <div className="flex items-center gap-2 text-gray-500 leading-none">
          <p className="font-600 text-[14px] text-red-500 md:text-[18px]">
            {firstVariant?.price.toLocaleString()}đ
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-[#ECECEC] p-2 rounded-md">
          {specs.map((spec, index) => (
            <p
              key={index}
              className="flex items-center gap-1 h-[25px] text-[#6D6E72] text-[13px]"
            >
              {spec.icon} {spec.text}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[#FF8A00] text-[14px]">
            {totalrating} <FaStar />
          </span>
          <span className="text-[#6D6E72] text-[14px]">
            ({ratings.length} đánh giá)
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
