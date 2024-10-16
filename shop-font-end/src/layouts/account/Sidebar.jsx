import { FaUser, FaSignOutAlt, FaEye } from "react-icons/fa";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { getFullName } from "../../pages/client/Account/AccountInformation";
import useGetProfile from "../../hooks/queries/useGetProfile";

const Sidebar = () => {
  const { data } = useGetProfile();

  if (!data) {
    return <></>;
  }

  return (
    <aside className="bg-white rounded h-full">
      <header className="p-4 flex items-center gap-x-6 border-b border-b-[#CFCFCF] mb-1.5">
        <img
          src="https://picsum.photos/200/200"
          alt="Avatar"
          className="w-[48px] h-[48px] rounded-full object-cover"
        />

        <p className="text-[18px] font-semibold text-[#111]">
          {getFullName(data)}
        </p>
      </header>

      <div className="pb-6">
        <NavLink
          to="/account"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#e30019] transition-all [&.active]:text-[#e30019]"
          end
        >
          <FaUser />

          <p>Thông tin tài khoản</p>
        </NavLink>

        <NavLink
          to="/account/address"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#e30019] transition-all [&.active]:text-[#e30019]"
          end
        >
          <FaLocationDot />

          <p>Sổ địa chỉ</p>
        </NavLink>

        <NavLink
          to="/account/orders-history"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#e30019] transition-all [&.active]:text-[#e30019]"
        >
          <FaCartShopping />

          <p>Quản lý đơn hàng</p>
        </NavLink>

        <NavLink
          to="/account/viewed"
          className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#e30019] transition-all [&.active]:text-[#e30019]"
        >
          <FaEye />

          <p>Sản phẩm đã xem</p>
        </NavLink>

        <div className="flex items-center py-3 px-5 gap-x-3 text-[#111] hover:text-[#e30019] transition-all cursor-pointer">
          <FaSignOutAlt />

          <p>Đăng xuất</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
