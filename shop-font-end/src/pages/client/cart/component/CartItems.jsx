// CartItems.js
import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import ItemProductCard from "../../../../components/ItemProductCard";
import CouponDropdown from "./CouponDropdown";

const CartItems = ({ cartItems, handleNext }) => {
  return cartItems.length === 0 ? (
    <div className="text-center flex flex-col gap-5">
      <Typography variant="h6">Giỏ hàng của bạn đang trống</Typography>
      <Button
        variant="outlined"
        className="w-[50%] mx-auto"
        color="primary"
        component={Link}
        to="/"
      >
        Tiếp tục mua hàng
      </Button>
    </div>
  ) : (
    <React.Fragment>
      <div className="flex flex-col gap-3">
        {cartItems.map((item) => (
          <ItemProductCard key={item.id} item={item} />
        ))}
        <hr className="border border-gray-300" />
        <CouponDropdown />
        <hr className="border border-gray-300" />
        <div className="flex justify-between items-center">
          <p className="text-[#535353] text-[20px] font-medium">
            Tổng thanh toán
          </p>
          <p className="text-[#E30019] font-bold text-[25px] ">500.000đ</p>
        </div>

        <Button
          type="primary"
          size="large"
          className="mt-4 bg-red-600"
          onClick={handleNext}
        >
          ĐẶT HÀNG NGAY
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CartItems;
