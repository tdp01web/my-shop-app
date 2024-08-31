import { Link } from "react-router-dom";

const ButtonBuy = () => {
  return (
    <div className="mt-6 md:flex gap-3">
      <button className="w-full h-auto bg-[#E30019] text-white px-4 rounded-lg">
        <Link to={"/cart"}>
          <p className="text-sm leading-none mt-3">Thêm vào giỏ hàng</p>
          <p className="mb-3 mt-1">Giao tận nơi hoặc nhận tại cửa hàng</p>
        </Link>
      </button>
    </div>
  );
};

export default ButtonBuy;
