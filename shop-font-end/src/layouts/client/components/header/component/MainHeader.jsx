import { Box, Drawer } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiMapPin, FiUser } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { LuClipboardList } from "react-icons/lu";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineShoppingCart,
  MdWavingHand,
} from "react-icons/md";
import { PiNotepadBold } from "react-icons/pi";
import { RiCustomerServiceLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../../../configs/instance";
import useGetProfile from "../../../../../hooks/queries/useGetProfile";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";
import useProductFilters from "../../../../../hooks/useFilter/useProductFilters";
import Menu from "../../../../../pages/client/HomePage/component/HomePageTop/component/Menu";
import SearchProduct from "./Search";
import SubHeader from "./SubHeader";

function MainHeader() {
  const { mobile, tablet, laptop, desktop } = useBreakpoints();
  const { data } = useGetProfile();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const priceRange = useMemo(() => [0, 10000000000], []);
  const emptyArray = useMemo(() => [], []);
  const navigate = useNavigate();
  const hoverTimeout = useRef(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (data && data.status !== 1) {
      handleLogout();
    }
  }, [data]);

  const { data: products } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const { data } = await instance.get("/product/getAllProduct");
      return data;
    },
  });

  const {
    Brand,
    Cpunames,
    ramSizes,
    SSDnames,
    Category,
    Vganames,
    filteredProducts,
  } = useProductFilters(
    products,
    priceRange,
    emptyArray,
    emptyArray,
    emptyArray,
    emptyArray,
    selectedBrand,
    emptyArray,
    emptyArray
  );

  const normanData = (value) => {
    if (typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "");
    }
    return value;
  };

  const GBSize = (size) =>
    parseInt(size.toLowerCase().replace("gb", "").trim(), 10);

  const menuItems = [
    {
      title: "Danh mục",
      link: "/collection",
      subItems: [
        {
          title: "Thương hiệu",
          subItems: Brand.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((brand) => ({
            title: brand,
            action: () => navigate(`/collection?brand=${brand}`),
          })),
        },
        {
          title: "CPU",
          subItems: Cpunames.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((cpu) => ({
            title: cpu,
            action: () => navigate(`/collection?cpu=${cpu}`),
          })),
        },
        {
          title: "RAM",
          subItems: ramSizes
            .sort((a, b) => GBSize(a) - GBSize(b))
            .map((ram) => ({
              title: ram,
              action: () => navigate(`/collection?ram=${ram}`),
            })),
        },
        {
          title: "SSD",
          subItems: SSDnames.sort((a, b) => GBSize(a) - GBSize(b)).map(
            (ssd) => ({
              title: ssd,
              action: () => navigate(`/collection?ssd=${ssd}`),
            })
          ),
        },
        {
          title: "VGA",
          subItems: Vganames.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((vga) => ({
            title: vga,
            action: () => navigate(`/collection?vga=${vga}`),
          })),
        },
        {
          title: "Danh mục",
          subItems: Category.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((ctg) => ({
            title: ctg,
            action: () => navigate(`/collection?category=${ctg}`),
          })),
        },
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  };

  const {
    data: cartData,
    refetch,
    isLoading: isLoadingCart,
  } = useQuery({
    queryKey: ["CartPage"],
    queryFn: async () => {
      const { data } = await instance.get("/cart/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!user
  });

  useEffect(() => {
    const totalCount = cartData?.products.reduce(
      (total, product) => total + product.count,
      0
    ) || 0;
    setCartItemCount(totalCount);
  }, [cartData]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
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
      <div className="flex justify-between items-center mx-auto px-4 xl:px-0 py-3 md:py-5 2xl:w-[80%] text-white">
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
          />
        </Link>
        <button className="md:flex items-center gap-2 hidden bg-[#BE1529] px-2 py-2 rounded-sm font-500">
          <span className="text-[25px]">
            <AiOutlineMenu />
          </span>
          <ul className="flex md:flex-col md:gap-[10px] md:rounded-lg w-full md:w-full font-500 text-[14px] 2xl:text-[13px] overflow-x-auto hide-scrollbar">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative px-3 md:px-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={item.link}>
                  <div className="flex whitespace-nowrap">
                    {(laptop || desktop) && (
                      <p className="text-[13px]">{item.icon}</p>
                    )}
                    <p>{item.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {hoveredItem !== null && menuItems[hoveredItem].subItems && (
            <div
              className="top-16 md:top-76 z-9999 absolute flex flex-wrap md:flex-nowrap justify-between gap-8 bg-white shadow-lg p-4 rounded-lg text-black text-start"
              onMouseEnter={() => handleMouseEnter(hoveredItem)}
              onMouseLeave={handleMouseLeave}
            >
              {menuItems[hoveredItem].subItems.map((subItem, subIndex) => (
                <div key={subIndex} className="w-full md:w-auto">
                  <h3 className="font-bold text-[#E30019]">{subItem.title}</h3>
                  {Array.isArray(subItem.subItems) ? (
                    <div className="flex flex-col gap-2">
                      {subItem.subItems.map((item, index) => (
                        <div key={index}>
                          <Link
                            to={item.link || "#"}
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.action) {
                                item.action();
                              }
                            }}
                          >
                            <div className="pt-1">{item.title}</div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={subItem.link || "#"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (subItem.action) {
                          subItem.action();
                        }
                      }}
                    >
                      {subItem.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
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