import { FaGift } from "react-icons/fa6"; /* eslint-disable react/prop-types */
const Sale = () => {
  return (
    <div className="space-y-2 border rounded-lg">
      <div className="">
        <h1 className="text-xs font-semibold bg-[#FFD9D9] p-3 rounded-t-lg flex items-center">
          <FaGift className="size-[20px] text-red-700 fill-red-700 ml-4" />
          <span className="ml-2 font-semibold text-[18px] text-[#E30019]">
            Quà tặng khuyến mãi
          </span>
        </h1>
        <div className="flex items-center gap-2 mt-4 text-red text-[18px] font-400 ml-7 pb-3">
          <span className="bg-red-600 rounded-full text-[12px] w-[20px] h-[20px] flex justify-center text-white font-semibold">
            1
          </span>
          <p className="text-[14px] w-[95%]">
            Tặng ngay 1 x Màn hình MSI MAG 271QPX QD-OLED E2 27 QD-OLED 2K 240Hz
            chuyên game trị giá 19.990.000₫
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sale;
