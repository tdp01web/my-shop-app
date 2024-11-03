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
import Pay from "./component/Pay";
import OrderConfirmation from "./component/OrderConfirmation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../../configs/instance";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const steps = ["Giỏ hàng", "Thông tin đặt hàng", "Thanh toán", "Hoàn tất"];

const CartPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderInfo, setOrderInfo] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { data: cartData, refetch } = useQuery({
    queryKey: ["CartPage"],
    queryFn: async () => {
      const { data } = await instance.get("/cart/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });

  const handleNext = (data) => {
    if (activeStep === 1) {
      setAddressData(data);
    }
    if (activeStep === 2) {
      createOrderMutation.mutate(data);
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prevStep) => prevStep - 1);
  };

  const createOrderMutation = useMutation({
    mutationFn: async (orderDetails) => {
      const { data } = await instance.post("/order", orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: (data) => {
      if (data.paymentIntent?.partnerCode === "MOMO") {
        try {
          window.location.href = data.paymentIntent.payUrl;
        } catch (error) {
          console.log("🚀 ~ CartPage ~ error:", error);
        }
      } else {
        console.log(data);
        message.success("Đặt hàng thành công");
        queryClient.invalidateQueries(["cart"]);
        setActiveStep(3);
        setOrderInfo(data.order);
      }
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        message.error("Phiên làm việc hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        message.error("Yêu cầu thất bại, vui lòng thử lại.");
      }
      console.error(error);
    },
  });

  return (
    <div className="flex flex-col gap-5 w-full md:w-[50%] mx-auto bg-white p-5 rounded-lg">
      {activeStep > 0 && activeStep < 3 ? (
        <div onClick={handleBack} className="text-[#E30019] cursor-pointer">
          <p>{`< Trở về`}</p>
        </div>
      ) : (
        <Link to="/" className="text-[#E30019]">
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
            <StepLabel>
              <p
                className={`${
                  activeStep >= index ? "text-[#E30019]" : "text-gray-400"
                } text-[18px]`}
              >
                {label}
              </p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && cartData && (
        <CartItems cartItems={cartData} handleNext={handleNext} />
      )}
      {activeStep === 1 && (
        <AddressStep cartTotal={cartData.cartTotal} handleNext={handleNext} />
      )}
      {activeStep === 2 && (
        <Pay
          addressData={addressData}
          handleNext={handleNext}
          cartTotal={cartData.cartTotal}
        />
      )}
      {activeStep === 3 && <OrderConfirmation order={orderInfo} />}
    </div>
  );
};

export default CartPage;
