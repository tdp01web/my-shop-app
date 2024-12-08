import { useQuery } from "@tanstack/react-query";
import React from "react";
import { instance } from "../../../configs/instance";
import { message } from "antd";
import Product from "../../../components/Product";
import Loader from "../../../components/Loading";
import Notification from "../../../components/Notification";
import { Link } from "react-router-dom";

const FavoritesList = () => {
  const user = localStorage.getItem("user");
  const { data, isLoading } = useQuery({
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
    enabled: !!user
  });

  const wishlist = data?.wishlist || [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto w-[80%]">
      {wishlist.length === 0 ? (
        <div className="text-center">
          <Link to={"/"}>
            <Notification
              text1={"Bạn chưa thêm sản phẩm nào vào yêu thích"}
              text2={"Quay trở về trang chủ"}
            />
          </Link>
        </div>
      ) : (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
