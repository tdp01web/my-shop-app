// CartItems.js
import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import ItemProductCard from "../../../../components/ItemProductCard";
import CouponDropdown from "./CouponDropdown";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../configs/instance";
import Loader from "../../../../components/Loading";

const CartItems = ({
  cartItems,
  handleNext,
  totalAfterDiscount,
  onApplyCouponSuccess,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Mã Giảm Giá"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await instance.get("/coupon/getallCoupons", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data;
      } catch (error) {
        // console.log("🚀 ~ queryFn: ~ error:", error);
      }
    },
  });
  console.log(cartItems.products.some((item) => item.unavailable));

  return cartItems ? (
    cartItems.products.length === 0 ? (
      <div className="text-center flex flex-col gap-5">
        <Typography variant="h6">Giỏ hàng của bạn đang trống</Typography>
        <Link to={"/"}>
          <Button
            variant="outlined"
            className="w-[50%] mx-auto"
            color="primary"
          >
            Tiếp tục mua hàng
          </Button>
        </Link>
      </div>
    ) : (
      <React.Fragment>
        <div className="flex flex-col gap-3">
          {cartItems.products.map((item) => (
            <ItemProductCard key={item._id} item={item} />
          ))}
          <hr className="border border-gray-300" />
          <CouponDropdown
            data={data}
            onApplyCouponSuccess={onApplyCouponSuccess}
          />
          <hr className="border border-gray-300" />
          <div className="flex justify-between items-center">
            <p className="text-[#535353] text-[20px] font-medium">
              Tổng thanh toán
            </p>
            <p className="text-[#E30019] font-bold text-[25px] ">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalAfterDiscount)}
            </p>
          </div>
          {cartItems.products.some((item) => item.unavailable) ? (
            <Button
              type="primary"
              size="large"
              className="mt-4 bg-red-600"
              onClick={handleNext}
            >
              Vui lòng xóa những sản phẩm không khả dụng để đặt hàng
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              className="mt-4 bg-red-600"
              onClick={handleNext}
              disabled={cartItems.products.some((item) => item.unavailable)}
            >
              ĐẶT HÀNG NGAY
            </Button>
          )}
        </div>
      </React.Fragment>
    )
  ) : (
    <Loader />
  );
};

export default CartItems;
