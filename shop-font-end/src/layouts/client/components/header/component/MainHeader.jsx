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
import { useState } from "react";
import Menu from "../../../../../pages/client/HomePage/component/HomePageTop/component/Menu";
function MainHeader() {
  const { mobile, tablet, laptop, desktop } = useBreakpoints();
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
      to: "",
    },
    {
      icon: <LuClipboardList style={{ width: "25px", height: "25px" }} />,
      label: "Tra cứu",
      sublabel: "Đơn hàng",
      to: "",
    },
    {
      icon: <MdOutlineShoppingCart style={{ width: "25px", height: "25px" }} />,
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
    <Box className="w-full bg-[#E30019]">
      <div className="flex items-center text-white py-3 md:py-5 2xl:w-[80%] mx-auto justify-between px-4 xl:px-0">
        <div className="md:hidden text-[25px]">
          <AiOutlineMenu onClick={handleDrawerOpen} />
        </div>
        <Link to="/">
          <img
            fit="contain"
            className="md:w-[140px] w-[40px]"
            src={laptop ? "/images/logo.svg" : "/images/logo-mobile.svg"}
            alt="Logo"
          />
        </Link>
        <button className="md:flex hidden  gap-2 px-2 py-2 rounded-sm font-500 text-white items-center bg-[#BE1529]">
          <span className="text-[25px]">
            <AiOutlineMenu />
          </span>
          <span className="text-[13px]">Danh mục</span>
        </button>
        <SearchProduct />
        {links.map((link, index) => (
          <div className="md:flex gap-2  items-center hidden " key={index}>
            <span className="text-[20px]">{link.icon}</span>
            <span className="2xl:flex hidden flex-col font-500 text-[13px] leading-4">
              <span>{link.label}</span>
              <Link to={link.to}>
                <span>{link.sublabel}</span>
              </Link>
            </span>
          </div>
        ))}
        <Link to={"/login"}>
          <button className="md:flex hidden items-center gap-2 bg-[#BE1529] px-2 py-1 rounded-lg font-500 text-[13px] leading-4">
            <FiUser style={{ width: "25px", height: "25px" }} />
            <p className="2xl:block hidden">
              Đăng <br /> nhập
            </p>
          </button>
        </Link>

        <div className="flex bg-[#BE1529] p-2 rounded-lg items-center md:hidden">
          <MdOutlineShoppingCart style={{ width: "25px", height: "25px" }} />
        </div>
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
