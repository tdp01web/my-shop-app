import React, { forwardRef } from "react";

const PaymentList = (
  {
    onScrollToTransferMethod,
    onScrollToDirectMethod,
    onScrollToPaymentOnDelivery,
  },
  ref
) => {
  return (
    <div className="bg-white pb-[64px] pt-7 px-3" ref={ref}>
      <div className="2xl:w-4/5 2xl:mx-auto md:px-10 my-4 md:my-0 px-9 bg-[#edf6ff] rounded-2xl grid grid-cols-12 gap-3 py-6">
        <div className="cursor-pointer col-span-12 md:col-span-4">
          <img
            src="/images/payment-method-1.png"
            alt="Payment method 1"
            className="hover:scale-105 transition-all w-full"
            onClick={onScrollToTransferMethod}
          />
        </div>

        <div className="cursor-pointer col-span-12 md:col-span-4">
          <img
            src="/images/payment-method-2.png"
            alt="Payment method 1"
            className="hover:scale-105 transition-all w-full"
            onClick={onScrollToDirectMethod}
          />
        </div>

        <div className="cursor-pointer col-span-12 md:col-span-4">
          <img
            src="/images/payment-method-3.png"
            alt="Payment method 1"
            className="hover:scale-105 transition-all w-full"
            onClick={onScrollToPaymentOnDelivery}
          />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(PaymentList);
