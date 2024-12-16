import React, { useEffect, useState } from "react";
import {
  ExpandMore as ExpandMoreIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { CiDiscount1 } from "react-icons/ci";
import { instance } from "../../../../configs/instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

export default function CouponDropdown({
  data,
  onApplyCouponSuccess,
  couponData,
  selectedCoupon,
  setSelectedCoupon
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  //Mutation để hủy mã giảm giá
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

  const handleCouponApply = (appliedCoupon, couponData) => {
    setSelectedCoupon(appliedCoupon);
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
      // message.success("Áp dụng mã giảm giá thành công.");
      onApplyCouponSuccess(data.totalAfterDiscount, data.appliedCoupon);
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
          className="flex items-center border-gray-300 px-4 py-2 border rounded-md text-[#E30019]"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <CiDiscount1 className="mr-2 text-[25px]" />
          Sử dụng mã giảm giá
          <ExpandMoreIcon className="ml-2" />
        </button>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${isDropdownOpen ? "max-h-full" : "max-h-0"
            }`}
        >
          {data?.length === 0 ? (
            <p className="mt-4 text-red-600">Không có voucher nào khả dụng</p>
          ) : (
            <div className="space-y-2 mt-2 h-full">
              {data?.map((coupon) => (
                <div
                  key={coupon._id}
                  className="flex justify-between items-center border-gray-500 p-2 border rounded-md"
                >
                  <div className="flex items-center">
                    <div className="w-[15%] text-white">
                      <img
                        src="/images/danhmucsp/ma-giam-gia.webp"
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-[15px]">
                        Tên mã {coupon.name}
                      </p>
                      <p className="font-semibold text-[14px]">
                        Giảm {coupon.maxDiscountAmount}
                      </p>
                      <p className="text-[13px]">
                        HSD: {formatDate(coupon.expiry)}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`bg-blue-500 w-[20%] md:w-[15%] text-white px-4 py-1 rounded-md ${selectedCoupon ? "hidden" : ""
                      }`}
                    onClick={() => handleApplyCoupon(coupon._id)}
                    disabled={selectedCoupon} // Disable nút áp dụng khi đã có mã giảm giá
                  >
                    Áp dụng
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {couponData && (
        <div className="flex justify-between items-center border-green-400 bg-green-100 mt-4 p-4 border rounded-md">
          <p>
            Mã giảm giá đã áp dụng: <strong>{couponData.name}</strong>
          </p>
          <button
            className="flex items-center bg-red-500 px-4 py-1 rounded-md text-white"
            onClick={handleCouponCancel}
          >
            <CancelIcon className="mr-1" /> Hủy
          </button>
        </div>
      )}
    </div>
  );
}
