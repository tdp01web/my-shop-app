import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import {
  FaShoppingCart,
  FaClipboardList,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";
import CartItems from "./component/CartItems";
import AddressStep from "./component/AddressStep";
import { Link } from "react-router-dom";
import Pay from "./component/Pay";
import OrderConfirmation from "./component/OrderConfirmation";

const steps = ["Giỏ hàng", "Thông tin đặt hàng", "Thanh toán", "Hoàn tất"];

const CartPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cartItems = [
    // {
    //   id: 1,
    //   name: "PC GVN x AORUS MASTER (Intel i9-14900K/ VGA RTX 4090)",
    //   price: 25000000,
    //   priceOld: 30000000,
    //   image: "/images/product/product1.webp",
    //   sold: 10,
    //   rating: 5.0,
    //   reviews: 1,
    // },
    // {
    //   id: 2,
    //   name: "PC GVN x AORUS MASTER (Intel i9-14900K/ VGA RTX 4090)",
    //   price: 25000000,
    //   priceOld: 30000000,
    //   image: "/images/product/product1.webp",
    //   sold: 10,
    //   rating: 5.0,
    //   reviews: 1,
    // },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const stepIcons = [
    <FaShoppingCart />,
    <FaClipboardList />,
    <FaCreditCard />,
    <FaCheckCircle />,
  ];

  return (
    <div className="flex gap-5   flex-col w-full md:w-[50%] mx-auto h-auto rounded-lg bg-white p-5">
      {/* Dynamic Link to Navigate Back */}
      {activeStep > 0 && activeStep < 3 ? (
        <div onClick={handleBack} className="text-[#E30019] cursor-pointer">
          <p>{`< Trở về`}</p>
        </div>
      ) : (
        <Link to={"/"} className="text-[#E30019]">
          <p>{"< Mua thêm sản phẩm khác"}</p>
        </Link>
      )}

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="bg-[#FFEDED] p-4 rounded-md"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={() => (
                <div
                  className={`${
                    activeStep >= index ? "text-[#E30019]" : "text-gray-400"
                  } `}
                >
                  {stepIcons[index]}
                </div>
              )}
            >
              <p
                className={`${
                  activeStep >= index ? "text-[#E30019]" : "text-gray-400"
                } text-[18px] `}
              >
                {label}
              </p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      {activeStep === 0 && (
        <CartItems cartItems={cartItems} handleNext={handleNext} />
      )}
      {activeStep === 1 && <AddressStep handleNext={handleNext} />}
      {activeStep === 2 && <Pay handleNext={handleNext} />}
      {activeStep === 3 && <OrderConfirmation />}
    </div>
  );
};

export default CartPage;
