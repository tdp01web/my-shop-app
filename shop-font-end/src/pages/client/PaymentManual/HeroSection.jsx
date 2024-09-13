import React from "react";

import styles from "./index.module.css";

const HeroSection = ({ onScrollToPaymentList }) => {
  return (
    <div className={styles.heroWrap}>
      <img
        src="/images/payment-manual-bg-2.png"
        alt="Image"
        className="h-[90%] absolute bottom-0 right-[10%]"
      />

      <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 flex justify-center flex-col">
        <div className="2xl:w-4/5 2xl:mx-auto md:px-10 my-4 md:my-0 px-4 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 text-white">
            <img
              src="/images/payment-manual-txt.png"
              alt="Text"
              className="h-40 md:h-[120px] block mb-6"
            />

            <p className="ml-2 mb-4">
              Trang nội dung mang đến cho quý khách hàng thông tin hướng dẫn
              thanh toán khi mua hàng tại GEARVN
            </p>

            <img
              src="/images/payment-manual-btn.png"
              alt="Button"
              className="h-11 md:h-[70px] cursor-pointer"
              onClick={onScrollToPaymentList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
