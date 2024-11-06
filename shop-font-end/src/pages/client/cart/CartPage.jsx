import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../../configs/instance";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import CartItems from "./component/CartItems";
import AddressStep from "./component/AddressStep";
import Pay from "./component/Pay";
import OrderConfirmation from "./component/OrderConfirmation";

const steps = ["Giỏ hàng", "Thông tin đặt hàng", "Thanh toán", "Hoàn tất"];

const CartPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderInfo, setOrderInfo] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
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

  const handleApplyCouponSuccess = (discountedTotal) => {
    setTotalAfterDiscount(discountedTotal);
    refetch(); // Refetch lại dữ liệu giỏ hàng để đảm bảo tất cả cập nhật
  };

  const createOrderMutation = useMutation({
    mutationFn: async (orderDetails) => {
      const { data } = await instance.post("/order", orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: (data) => {
      message.success("Đặt hàng thành công");
      queryClient.invalidateQueries(["CartPage"]);
      setActiveStep(3);
      setOrderInfo(data.order);
    },
    onError: (error) => {
      message.error("Yêu cầu thất bại, vui lòng thử lại.");
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
        <CartItems
          cartItems={cartData}
          totalAfterDiscount={totalAfterDiscount ?? cartData.totalAfterDiscount}
          handleNext={handleNext}
          onApplyCouponSuccess={handleApplyCouponSuccess}
        />
      )}
      {activeStep === 1 && (
        <AddressStep
          cartTotal={totalAfterDiscount ?? cartData.totalAfterDiscount}
          handleNext={handleNext}
        />
      )}
      {activeStep === 2 && (
        <Pay
          addressData={addressData}
          handleNext={handleNext}
          cartTotal={totalAfterDiscount ?? cartData.totalAfterDiscount}
        />
      )}
      {activeStep === 3 && <OrderConfirmation order={orderInfo} />}
    </div>
  );
};

export default CartPage;
