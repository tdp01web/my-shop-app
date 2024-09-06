import { Button, Radio } from "antd";
import React, { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";

const Pay = ({ handleNext }) => {
  const [gender, setGender] = useState(1);
  const orderInfo = {
    customerName: "Ph Y",
    phoneNumber: "0778528845",
    deliveryAddress:
      "Tòa hha chung cư tân tây do, Xã Tân Lập, Huyện Đan Phượng, Hà Nội",
    subtotal: 100000,
    shippingFee: 25000,
    total: 125000,
  };
  return (
    <div className="  rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className=" text-xl md:text-2xl font-semibold">
          Thông tin đặt hàng
        </h2>

        <div className="">
          <span className="font-bold">Khách hàng: </span>
          <span>{orderInfo.customerName}</span>
        </div>

        <div className="">
          <span className="font-bold">Số điện thoại: </span>
          <span>{orderInfo.phoneNumber}</span>
        </div>

        <div className="">
          <span className="font-bold">Địa chỉ nhận hàng: </span>
          <span>{orderInfo.deliveryAddress}</span>
        </div>

        <div className="">
          <span className="font-bold">Tạm tính: </span>
          <span className="text-red-600">
            {orderInfo.subtotal.toLocaleString()}đ
          </span>
        </div>

        <div className="">
          <span className="font-bold">Phí vận chuyển: </span>
          <span className="text-red-600">
            {orderInfo.shippingFee.toLocaleString()}đ
          </span>
        </div>

        <div className="">
          <span className="font-bold">Tổng tiền: </span>
          <span className="text-red-600">
            {orderInfo.total.toLocaleString()}đ
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
          className=" bg-red-600"
          onClick={handleNext}
        >
          ĐẶT HÀNG NGAY
        </Button>
      </div>
    </div>
  );
};

export default Pay;
