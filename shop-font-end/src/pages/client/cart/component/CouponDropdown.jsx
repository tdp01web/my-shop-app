import React, { useState } from "react";
import {
  ExpandMore as ExpandMoreIcon,
  LocalOffer as LocalOfferIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { CiDiscount1 } from "react-icons/ci";
import { instance } from "../../../../configs/instance";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function CouponDropdown({ data }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Thay đổi sang null
  const [manualCode, setManualCode] = useState("");

  const handleCouponApply = (coupon) => {
    setSelectedCoupon(coupon);
    alert(`Đã áp dụng mã giảm giá "${coupon.name}"`);
  };

  const handleCouponCancel = () => {
    setSelectedCoupon(null);
    alert(`Mã giảm giá đã được hủy bỏ!`);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("vi-VN", options);
  };

  const mutation = useMutation({
    mutationFn: async (couponId) => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await instance.put(
          "/cart/applyCoupon",
          {
            couponId: couponId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return data;
      } catch (error) {
        console.log("🚀 ~ mutationFn: ~ error:", error);
      }
    },
  });

  const handleApplyCoupon = (couponId) => {
    mutation.mutate(couponId);
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
                  <div className=" text-white w-[15%]">
                    <img
                      src="/images/danhmucsp/ma-giam-gia.webp"
                      alt=""
                      className=" object-cover"
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
                  className="bg-blue-500 w-[20%] md:w-[15%] text-white px-4 py-1 rounded-md"
                  onClick={() => handleApplyCoupon(coupon._id)}
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
            Mã giảm giá đã áp dụng: <strong>{selectedCoupon.code}</strong>{" "}
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
