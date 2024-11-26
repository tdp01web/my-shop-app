import { Box, Button, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import SearchProduct from "./Search";
import { IoIosMenu } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FiMapPin, FiUser } from "react-icons/fi";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";
import SubHeader from "./SubHeader";
import { useEffect, useState } from "react";
import Menu from "../../../../../pages/client/HomePage/component/HomePageTop/component/Menu";
import { AiOutlineUser } from "react-icons/ai";
import { MdWavingHand } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { PiNotepadBold } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import useGetProfile from "../../../../../hooks/queries/useGetProfile";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { instance } from "../../../../../configs/instance";
function MainHeader() {
  const { mobile, tablet, laptop, desktop } = useBreakpoints();
  const { data } = useGetProfile();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await instance.get("/cart/getCart");
        const products = response.data.products || [];

        const totalCount = products.reduce(
          (total, product) => total + product.count,
          0
        );
        setCartItemCount(totalCount);
        setCartUpdated(products);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
      }
    };

    fetchCartData();
  }, [cartItemCount]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const links = [
    {
      icon: <RiCustomerServiceLine style={{ width: "25px", height: "25px" }} />,
      label: "Hotline",
      sublabel: "19001234",
      to: "tel:19001234",
    },
    {
      icon: <FiMapPin style={{ width: "25px", height: "25px" }} />,
      label: "Hệ thống",
      sublabel: "Showroom",
      to: "/abouts",
    },
    {
      icon: <LuClipboardList style={{ width: "25px", height: "25px" }} />,
      label: "Tra cứu",
      sublabel: "Đơn hàng",
      to: "/account",
    },
    {
      icon: (
        <div className="relative">
          <MdOutlineShoppingCart style={{ width: "25px", height: "25px" }} />
          {cartItemCount > 0 && (
            <span className="-top-2 -right-2 absolute flex justify-center items-center bg-[#ebff50] rounded-full w-5 h-5 text-[10px] text-black">
              {cartItemCount}
            </span>
          )}
        </div>
      ),
      label: "Giỏ",
      sublabel: "hàng",
      to: "/cart",
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box className="bg-[#E30019] w-full">
      <div className="flex justify-between   items-center mx-auto px-4 xl:px-0 py-3 md:py-5 2xl:w-[80%] text-white">
        <div className="md:hidden text-[25px]">
          <AiOutlineMenu onClick={handleDrawerOpen} />
        </div>
        <Link to="/">
          <img
            fit="contain"
            className="w-[40px] md:w-[160px]"
            src={
              laptop
                ? "/images/logo/logoDesktop.png"
                : "/images/logo/logoMobile.png"
            }
            alt="Logo"
            // onClick={() => window.location.reload()}
          />
        </Link>
        <button className="md:flex items-center gap-2 hidden bg-[#BE1529] px-2 py-2 rounded-sm font-500 text-white">
          <span className="text-[25px]">
            <AiOutlineMenu />
          </span>
          <span className="text-[13px]">Danh mục</span>
        </button>
        <SearchProduct />
        {links.map((link, index) => (
          <Link
            to={link.to}
            className="md:flex items-center gap-2 hidden"
            key={index}
          >
            <span className="text-[20px]">{link.icon}</span>
            <span className="2xl:flex flex-col hidden font-500 text-[13px] leading-4">
              <span>{link.label}</span>

              <span>{link.sublabel}</span>
            </span>
          </Link>
        ))}
        {data ? (
          <div className="user-container">
            <div className="user-info">
              <div className="icon">
                <AiOutlineUser />
              </div>
              <div className="md:block hidden">
                Xin chào <br /> {data.email.split("@")[0]}
              </div>
            </div>

            <div className="user-menu">
              <Link to={"/account"} className="flex items-center gap-2">
                <MdWavingHand /> {data.email.split("@")[0]}
              </Link>
              {data.role === "Admin" || data.role === "Owner" ? (
                <Link to={"/admin"} className="flex items-center gap-2">
                  <MdOutlineAdminPanelSettings /> Vào trang quản lý
                </Link>
              ) : data.role === "Shipper" ? (
                <Link to={"/shipper"} className="flex items-center gap-2">
                  <MdOutlineAdminPanelSettings /> Vào trang giao hàng
                </Link>
              ) : data.role === "Staff" ? (
                <Link to={"/staff"} className="flex items-center gap-2">
                  <MdOutlineAdminPanelSettings /> Vào trang nhân viên
                </Link>
              ) : null}
              <hr />
              <Link to={"/favorites-list"} className="flex items-center gap-2">
                <CiHeart /> Sản phẩm yêu thích
              </Link>
              <Link
                to={"account/orders-history"}
                className="flex items-center gap-2"
              >
                <PiNotepadBold /> Đơn hàng của tôi
              </Link>
              <hr />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <HiOutlineLogout /> Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="md:flex items-center gap-2 hidden bg-[#BE1529] px-2 py-1 rounded-lg font-500 text-[13px] leading-4">
              <FiUser style={{ width: "25px", height: "25px" }} />
              <p className="2xl:block hidden">
                Đăng <br /> nhập
              </p>
            </button>
          </Link>
        )}

        <Link
          to="/cart"
          className="flex items-center md:hidden bg-[#BE1529] p-2 rounded-lg"
        >
          <MdOutlineShoppingCart style={{ width: "25px", height: "25px" }} />
        </Link>
      </div>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <SubHeader vertical />
          <Menu />
        </Box>
      </Drawer>
    </Box>
  );
}

export default MainHeader;
