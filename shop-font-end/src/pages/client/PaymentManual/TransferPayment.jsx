import React, { forwardRef } from "react";

const TransferPayment = (_, ref) => {
  return (
    <div className="bg-white pb-[64px] grid grid-cols-12 gap-8 px-4" ref={ref}>
      <div className="hidden md:flex items-center justify-end pr-6 col-span-4 bg-[#1895ff] -ml-4 rounded-r-3xl">
        <img src="/images/payment-success.png" alt="Payment success" />
      </div>

      <div className="col-span-12 md:col-span-6">
        <img
          src="/images/transfer-payment.png"
          alt="Image"
          className="h-48 object-contain"
        />

        <a
          href="tel:19005301"
          className="mt-6 ml-2 block text-[#6d8199] leading-8"
        >
          <span>
            Quý khách hàng có thể thanh toán đơn hàng bằng cách chuyển khoản qua
            tài khoản của GEARVN tại ngân hàng dưới đây và liên hệ{" "}
          </span>
          <span className="font-bold underline">Hotline 1900 5301</span>
          <span> để xác nhận thông tin</span>
        </a>

        <div className="mt-8 mb-3 bg-[#edf6ff] p-8 flex items-center gap-x-3 rounded-2xl">
          <img src="/images/mbbank.png" alt="Bank" className="h-56" />

          <div>
            <p className="text-[#2d4379] text-[18px] mb-3 font-bold">
              Ngân hàng Thương mại Cổ phần Quân đội
            </p>
            <p className="text-[#3d4e5e] text-[18px] leading-8">
              Chủ tài khoản: Công ty TNHH Thương mại GEARVN
            </p>
            <p className="text-[#3d4e5e] text-[18px] leading-8">
              Chi nhánh: Đông Sài Gòn - PGD: Quận 10
            </p>
            <p className="text-[#3d4e5e] text-[18px] leading-8">
              <span>Số tài khoản: </span>
              <span className="font-bold">1111126868888</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-x-3">
          <button className="rounded-xl bg-[#0183ff] px-3 py-3 text-white font-bold text-[20px]">
            Quét mã QR để thanh toán
          </button>

          <img src="/images/payment-qr.png" alt="QR" className="h-[220px]" />
        </div>
      </div>

      <div className="hidden md:block col-span-2 bg-[#1895ff] rounded-l-3xl -mr-4"></div>
    </div>
  );
};

export default forwardRef(TransferPayment);
