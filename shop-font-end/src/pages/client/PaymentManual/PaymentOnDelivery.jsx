import React, { forwardRef } from "react";

const PaymentOnDelivery = (_, ref) => {
  return (
    <div className="py-[60px] bg-white" ref={ref}>
      <div className="2xl:w-4/5 2xl:mx-auto md:px-10 my-4 md:my-0 px-9">
        <img
          src="/images/payment-delivery.png"
          alt="Title image"
          className="h-[80px] object-contain"
        />

        <div className="bg-[#edf6ff] rounded-2xl p-9 relative mt-2">
          <div className="md:mr-[50%] text-[#3d4e5e] text-[18px]">
            <p>
              Khi quý khách hàng nhận hàng sẽ thanh toán tổng giá trị đơn hàng
              hoặc phần còn lại (sau khi khách hàng đã đặt cọc trước) bằng tiền
              mặt hoặc quẹt thẻ (chỉ áp dụng đơn hàng ở nội thành Tp. Hồ Chí
              Minh và Hà Nội).
            </p>

            <p className="mt-4">
              Quý khách sẽ thanh toán tại địa điểm nhận hàng cho nhân viên giao
              nhận của GearVN hoặc đơn vị vận chuyển mà GearVN sử dụng.
            </p>
          </div>

          <img
            src="/images/payment-manual-delivery-bg.png"
            alt="Image"
            className="absolute bottom-5 right-6 w-1/3 hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(PaymentOnDelivery);
