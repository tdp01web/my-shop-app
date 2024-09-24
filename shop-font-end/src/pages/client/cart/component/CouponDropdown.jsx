import React, { useState } from "react";
import {
  ExpandMore as ExpandMoreIcon,
  LocalOffer as LocalOfferIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { CiDiscount1 } from "react-icons/ci";

const couponData = [
  {
    id: 1,
    code: "DAILY100",
    discount: 100000,
    minOrder: 300000,
    expiry: "Thứ 2, 23:59 30 Thg 09, 2024",
  },
  {
    id: 2,
    code: "DAILY50",
    discount: 50000,
    minOrder: 100000,
    expiry: "Thứ 2, 23:59 30 Thg 09, 2024",
  },
];

export default function CouponDropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [manualCode, setManualCode] = useState("");

  const handleCouponApply = (code) => {
    setSelectedCoupon(code);
    alert(`Bán đặt mã giảm giá "${code}" `);
  };

  // Clear the applied coupon
  const handleCouponCancel = () => {
    setSelectedCoupon("");
    alert(`Mã giảm giá đã được hủy bỏ!`);
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
          <div className="mt-2 flex bg-[#ECECEC] rounded-md p-2">
            <input
              className="border border-gray-400 p-2 rounded-md flex-grow"
              type="text"
              placeholder="Nhập mã giảm giá/Phiếu mua hàng"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
            <button
              className="bg-[#1982F9] text-white font-500 px-4 ml-2 rounded-md"
              onClick={() => handleCouponApply(manualCode)}
            >
              Áp dụng
            </button>
          </div>

          <div className="h-full mt-2 space-y-2">
            {couponData.map((coupon) => (
              <div
                key={coupon.id}
                className="flex items-center justify-between border border-gray-500 p-2 rounded-md"
              >
                <div className="flex items-center">
                  <div className=" text-white w-[15%]">
                    <img
                      src="/images/danhmucsp/ma-giam-gia.webp"
                      alt=""
                      srcset=""
                      className=" object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-[15px] font-semibold">
                      Giảm {coupon.discount.toLocaleString()}đ
                    </p>
                    <p className="text-[13px] ">
                      Đơn hàng từ {coupon.minOrder.toLocaleString()}K
                    </p>
                    <p className="text-[14px] font-semibold">
                      Mã {coupon.code}
                    </p>
                    <p className="text-[13px] ">HSD: {coupon.expiry}</p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 w-[20%] md:w-[15%] text-white px-4 py-1 rounded-md"
                  onClick={() => handleCouponApply(coupon.code)}
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
            Mã giảm giá đã áp dụng: <strong>{selectedCoupon}</strong>
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
