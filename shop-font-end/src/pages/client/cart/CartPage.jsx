import React, { useEffect, useState } from "react";
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
  const user = localStorage.getItem("user");
  const [activeStep, setActiveStep] = useState(0);
  const [orderInfo, setOrderInfo] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const firstName = JSON.parse(user)?.firstName;
  const lastName = JSON.parse(user)?.lastName;
  const fullName = firstName + " " + lastName;
  const mobile = JSON.parse(user)?.mobile;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const {
    data: cartData,
    refetch,
    isLoading: isLoadingCart,
  } = useQuery({
    queryKey: ["CartPage"],
    queryFn: async () => {
      const { data } = await instance.get("/cart/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (
      cartData &&
      cartData.products.some((product) => product.unavailable === true)
    ) {
      setActiveStep(0);
    } else {
      refetch();
    }
  }, [cartData]);

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
      if (data.paymentIntent?.partnerCode === "MOMO") {
        try {
          window.location.href = data.paymentIntent.payUrl;
        } catch (error) {
          console.log("🚀 ~ CartPage ~ error:", error);
        }
      } else {
        console.log(data.order);
        message.success("Đặt hàng thành công");
        queryClient.invalidateQueries(["CartPage"]);
        // 1. Làm mới dữ liệu sản phẩm
        const productIds = data.order.products.map((product) => product.prodId);
        productIds.forEach((id) => {
          queryClient.invalidateQueries(["PRODUCTS", id]); // Thêm dòng này
        });
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
    <div className="flex flex-col gap-5 bg-white mx-auto p-5 rounded-lg w-full md:w-[50%]">
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
          isLoadingCart={isLoadingCart}
        />
      )}
      {activeStep === 1 && (
        <AddressStep
          cartTotal={totalAfterDiscount ?? cartData.totalAfterDiscount}
          handleNext={handleNext}
          mobile={mobile}
          fullName={fullName}
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
