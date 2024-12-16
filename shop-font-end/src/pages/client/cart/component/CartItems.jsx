// CartItems.js
import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import ItemProductCard from "../../../../components/ItemProductCard";
import CouponDropdown from "./CouponDropdown";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../configs/instance";
import Loader from "../../../../components/Loading";
import CartSkeleton from "../../../../components/CartSkeleton";

const CartItems = ({
  cartItems,
  handleNext,
  totalAfterDiscount,
  onApplyCouponSuccess,
  appliedCoupon,
  couponData,
  setActiveStep,
  selectedCoupon,
  setSelectedCoupon,
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

  return cartItems ? (
    cartItems.products.length === 0 ? (
      <div className="flex flex-col gap-5 text-center">
        <Typography variant="h6">Giỏ hàng của bạn đang trống</Typography>
        <Link to={"/"}>
          <Button
            variant="outlined"
            className="mx-auto w-[50%]"
            color="primary"
          >
            Tiếp tục mua hàng
          </Button>
        </Link>
      </div>
    ) : (
      <React.Fragment>
        <div className="flex flex-col gap-3">
          {cartItems ? (
            cartItems?.products.map((item) => (
              <ItemProductCard key={item._id} item={item} />
            ))
          ) : (
            <div>
              <CartSkeleton />
            </div>
          )}
          <hr className="border-gray-300 border" />
          <CouponDropdown
            data={data}
            onApplyCouponSuccess={onApplyCouponSuccess}
            appliedCoupon={appliedCoupon}
            couponData={couponData}
            setActiveStep={setActiveStep}
            selectedCoupon={selectedCoupon}
            setSelectedCoupon={setSelectedCoupon}
          />
          <hr className="border-gray-300 border" />
          <div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-[#535353] text-[15px]">
                Giá tạm tính
              </p>
              <p className="font-bold text-[#E30019] text-[20px]">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(cartItems.cartTotal)}
              </p>
            </div>
            {totalAfterDiscount && totalAfterDiscount < cartItems.cartTotal && (
              <>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-[#535353] text-[15px]">
                    Giảm giá
                  </p>
                  <p className="font-bold text-[#E30019] text-[20px]">
                    -{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(cartItems.cartTotal - totalAfterDiscount)}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="font-medium text-[#535353] text-[15px]">Tổng</p>
                  <p className="font-bold text-[#E30019] text-[20px]">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalAfterDiscount)}
                  </p>
                </div>
              </>
            )}
          </div>

          {cartItems.products.some((item) => item.unavailable) ? (
            <Button
              type="primary"
              size="large"
              className="bg-red-600 mt-4"
              onClick={handleNext}
            >
              Vui lòng xóa những sản phẩm không khả dụng để đặt hàng
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              className="bg-red-600 mt-4"
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
