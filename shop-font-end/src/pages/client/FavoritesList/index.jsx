import { useQuery } from "@tanstack/react-query";
import React from "react";
import { instance } from "../../../configs/instance";
import { message } from "antd";
import Product from "../../../components/Product";
import Loader from "../../../components/Loading";

const FavoritesList = () => {
  const { data } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data } = await instance.get("user/getWishlist");
      console.log("🚀 ~ queryFn: ~ data:", data);
      return data;
    },
    onSuccess: () => {
      message.success("Lấy danh sách yêu thích thành công");
    },
    onError: () => {
      message.error("Đã có lỗi xảy ra");
    },
  });

  const wishlist = data?.wishlist || [];

  return (
    <div className="w-[80%] mx-auto ">
      {wishlist.length === 0 ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <Product
              key={product._id}
              _id={product._id}
              title={product.title}
              price={product.variants?.[0]?.price || "N/A"}
              images={product.images}
              variants={product.variants}
              totalrating={product.totalrating}
              ratings={product.ratings}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
