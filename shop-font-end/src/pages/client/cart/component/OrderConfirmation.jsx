import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loading";

const OrderConfirmation = ({ order }) => {
  const { shippingAddress, totalPrice, paymentMethod, _id } = order || {};
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return order ? (
    <div className="flex flex-col gap-4">
      <div className="bg-green-100 text-green-700 font-semibold py-2 px-5 rounded-md text-center">
        <span role="img" aria-label="success">
          🎁
        </span>{" "}
        Đặt hàng thành công
      </div>

      <p className="text-black">
        Cảm ơn quý khách đã cho GEARVN có cơ hội được phục vụ. <br />
        Nhân viên GEARVN sẽ liên hệ với quý khách trong thời gian sớm nhất.
      </p>

      <div className="border border-gray-300 flex flex-col gap-4 bg-gray-200 rounded-md p-4">
        <div className="md:text-xs text-black flex justify-between">
          <span>ĐƠN HÀNG #{_id}</span>
          <Link
            to="/account/orders-history"
            className="text-blue-500 hover:text-red-700"
          >
            Quản lý đơn hàng
          </Link>
        </div>
        <hr className="border border-black" />
        <ul className="text-black space-y-1">
          <li className="flex gap-2 md:gap-5">
            <strong>Khách hàng:</strong> {shippingAddress.name}
          </li>
          <li className="flex gap-2 md:gap-5">
            <strong>Số điện thoại:</strong> {shippingAddress.phone}
          </li>
          <li className="flex gap-2 md:gap-5">
            <strong>Giao đến:</strong> {shippingAddress.addressLine1},{" "}
            {shippingAddress.ward}, {shippingAddress.district},{" "}
            {shippingAddress.city}
          </li>
          <li className="flex gap-2 md:gap-5">
            <strong>Tổng tiền:</strong>{" "}
            <span className="text-red-500">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </span>
          </li>
          <li className="flex gap-2 md:gap-5">
            <strong>Hình thức thanh toán:</strong> {paymentMethod}
          </li>
        </ul>
      </div>

      <div className="space-y-2 flex flex-col gap-2">
        <Link to={"/contacts"}>
          <Button type="primary" block>
            Chat với GEARVN
          </Button>
        </Link>

        <Button block onClick={handleClick}>
          Tiếp tục mua hàng
        </Button>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default OrderConfirmation;
