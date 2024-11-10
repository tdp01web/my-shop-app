import React, { useState } from "react";
import {
  ExpandMore as ExpandMoreIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { CiDiscount1 } from "react-icons/ci";
import { instance } from "../../../../configs/instance";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export default function CouponDropdown({ data, onApplyCouponSuccess }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Mutation để hủy mã giảm giá
  const cancelMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const { data } = await instance.put(
        "/cart/cancelCoupon",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      setSelectedCoupon(null);
      onApplyCouponSuccess(data.totalAfterDiscount);
      message.success("Mã giảm giá đã được hủy.");
    },
    onError: (error) => {
      message.error("Hủy mã giảm giá thất bại.");
      console.log("🚀 ~ cancelMutation error:", error);
    },
  });

  const handleCouponApply = (coupon) => {
    setSelectedCoupon(coupon);
    message.success(`Đã áp dụng mã giảm giá "${coupon.name}"`);
  };

  const handleCouponCancel = () => {
    cancelMutation.mutate();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleString("vi-VN", options);
  };

  const applyMutation = useMutation({
    mutationFn: async (couponId) => {
      const token = localStorage.getItem("token");
      const { data } = await instance.put(
        "/cart/applyCoupon",
        { couponId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: (data) => {
      onApplyCouponSuccess(data.totalAfterDiscount);
    },
    onError: (error) => {
      message.error("Áp dụng mã giảm giá thất bại.");
      console.log("🚀 ~ applyMutation error:", error);
    },
  });

  const handleApplyCoupon = (couponId) => {
    applyMutation.mutate(couponId);
    handleCouponApply(data.find((coupon) => coupon._id === couponId));
  };

  return (
    <div className="md:p-4 w-full">
      <div className="relative">
        <button
          className="flex items-center border border-gray-300 text-[#E30019] px-4 py-2 rounded-md"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <CiDiscount1 className="mr-2 text-[25px]" />
          Sử dụng mã giảm giá
          <ExpandMoreIcon className="ml-2" />
        </button>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isDropdownOpen ? "max-h-full" : "max-h-0"
          }`}
        >
          <div className="h-full mt-2 space-y-2">
            {data?.map((coupon) => (
              <div
                key={coupon._id}
                className="flex items-center justify-between border border-gray-500 p-2 rounded-md"
              >
                <div className="flex items-center">
                  <div className="text-white w-[15%]">
                    <img
                      src="/images/danhmucsp/ma-giam-gia.webp"
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-[15px] font-semibold">
                      Giảm {coupon.discount}%
                    </p>
                    <p className="text-[14px] font-semibold">
                      Mã {coupon.name}
                    </p>
                    <p className="text-[13px]">
                      HSD: {formatDate(coupon.expiry)}
                    </p>
                  </div>
                </div>
                <button
                  className={`bg-blue-500 w-[20%] md:w-[15%] text-white px-4 py-1 rounded-md ${
                    selectedCoupon ? "hidden" : ""
                  }`}
                  onClick={() => handleApplyCoupon(coupon._id)}
                  disabled={selectedCoupon} // Disable nút áp dụng khi đã có mã giảm giá
                >
                  Áp dụng
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCoupon && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md flex justify-between items-center">
          <p>
            Mã giảm giá đã áp dụng: <strong>{selectedCoupon.name}</strong>
          </p>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-md flex items-center"
            onClick={handleCouponCancel}
          >
            <CancelIcon className="mr-1" /> Hủy
          </button>
        </div>
      )}
    </div>
  );
}
