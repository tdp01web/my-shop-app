import { Button, Radio } from "antd";
import React, { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";

const Pay = ({ addressData, handleNext, cartTotal }) => {
  const [gender, setGender] = useState(1);

  return (
    <div className="  rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className=" text-xl md:text-2xl font-semibold">
          Thông tin đặt hàng
        </h2>

        <div className="">
          <span className="font-bold">Khách hàng: </span>
          <span>{addressData.fullName}</span>
        </div>

        <div className="">
          <span className="font-bold">Số điện thoại: </span>
          <span>{addressData.phoneNumber}</span>
        </div>

        <div className="">
          <span className="font-bold">Địa chỉ nhận hàng: </span>
          <span>
            {addressData.addressDetail}, {addressData.phuong} ,
            {addressData.quan} , {addressData.tinh}
          </span>
        </div>

        <div className="">
          <span className="font-bold">Tạm tính: </span>
          <span className="text-red-600">
            {" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(cartTotal)}
          </span>
        </div>

        <div className="">
          <span className="font-bold">Phí vận chuyển: </span>
          <span className="text-red-600">
            {" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(addressData.deliveryFee)}{" "}
          </span>
        </div>

        <div className="">
          <span className="font-bold">Tổng tiền: </span>
          <span className="text-red-600">
            {" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(addressData.totalPrice)}{" "}
          </span>
        </div>
        <hr className="border-3 border-solid border-gray-500" />
        <Radio.Group
          className="flex flex-col gap-2"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <Radio value={1} className="flex items-center gap-1">
            <p className="flex items-center gap-1">
              <GiReceiveMoney /> Thanh toán khi nhận hàng
            </p>
          </Radio>
          <Radio value={2} className="flex items-center gap-1">
            <p className="flex items-center gap-1 front-bold">
              <FcMoneyTransfer />
              Thanh toán chuyển khoản
            </p>
          </Radio>
        </Radio.Group>
        <hr className="border-3 border-solid border-gray-500" />
        <Button
          type="primary"
          size="large"
          className="bg-red-600"
          onClick={() =>
            handleNext({
              paymentMethod: gender === 1 ? "Thanh Toán Khi Nhận Hàng" : "MOMO",
              shippingAddress: {
                name: addressData.fullName,
                phone: addressData.phoneNumber,
                addressLine1: addressData.addressDetail,
                city: addressData.tinh,
                district: addressData.quan,
                ward: addressData.phuong,
                postalCode: addressData.postalCode || "",
              },
              couponApplied: false,
              cartTotal: cartTotal,
              deliveryFee: addressData.deliveryFee,
              totalPrice: cartTotal + addressData.deliveryFee,
            })
          }
        >
          ĐẶT HÀNG NGAY
        </Button>
      </div>
    </div>
  );
};

export default Pay;
