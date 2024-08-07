import { FaCartPlus } from "react-icons/fa";

const ButtonBuy = () => {
  return (
    <div className="mt-6 md:flex gap-3">
      <button className="w-full h-auto bg-[#E30019] text-white px-4 rounded-lg">
        <p className="text-sm leading-none mt-3">Mua Ngay</p>
        <p className="mb-3 mt-1">Giao tận nơi hoặc nhận tại cửa hàng</p>
      </button>
      <button className="w-full md:mt-0 mt-3 md:max-w-96 h-48 md:h-auto bg-gray-400 text-white px-4 rounded-lg flex justify-center items-center gap-2">
        <FaCartPlus className="w-9" />
        <p className="md:text-xs text-sm leading-none">Thêm Vào giỏ hàng</p>
      </button>
    </div>
  );
};

export default ButtonBuy;
