import React, { useRef, useState } from "react";
import { BsPrinter } from "react-icons/bs";
import { CiDesktopMouse2, CiSpeaker } from "react-icons/ci";
import { FaRegKeyboard } from "react-icons/fa6";
import { GiPc } from "react-icons/gi";
import { GoGift } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { PiLaptopLight, PiOfficeChairLight } from "react-icons/pi";
import { RiComputerLine, RiRamLine } from "react-icons/ri";
import { SlEarphones } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useBreakpoints } from "../../../../../../hooks/useBreakpoints";
import useProductFilters from "../../../../../../hooks/useFilter/useProductFilters";

/* eslint-disable react/prop-types */
const Menu = ({ products }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { mobile, tablet, laptop, desktop } = useBreakpoints();
  const hoverTimeout = useRef(null); // Ref to hold timeout ID

  const [selectedBrand, setSelectedBrand] = useState([]);

  const { Brand, filteredProducts } = useProductFilters(
    products,
    [0, 10000000000],
    [],
    [],
    [],
    selectedBrand,
    [],
    []
  );

  const menuItems = [
    {
      title: "Laptop",
      link: "/laptop",
      icon: <PiLaptopLight />,
      subItems: [
        {
          title: "Thương hiệu",
          link: "/laptop/brand",
          subItems: [Brand],
        },
      ],
    },
    {
      title: "Laptop Gaming",
      link: "/laptop-gaming",
      icon: <LiaLaptopCodeSolid />,
    },
    { title: "PC GVN", link: "/pc-gvn", icon: <GiPc /> },
    { title: "Main, CPU, VGA", link: "/main-cpu-vga", icon: <GiPc /> },
    { title: "Case, Nguồn, Tản", link: "/case-nguon-tan", icon: <GiPc /> },
    {
      title: "Ổ cứng, RAM, Thẻ nhớ",
      link: "/o-cung-ram-the-nho",
      icon: <RiRamLine />,
    },
    {
      title: "Loa, Micro, Webcam",
      link: "/loa-micro-webcam",
      icon: <CiSpeaker />,
    },
    { title: "Màn hình", link: "/man-hinh", icon: <RiComputerLine /> },
    { title: "Bàn phím", link: "/ban-phim", icon: <FaRegKeyboard /> },
    {
      title: "Chuột + Lót chuột",
      link: "/chuot-lot-chuot",
      icon: <CiDesktopMouse2 />,
    },
    { title: "Tai Nghe", link: "/tai-nghe", icon: <SlEarphones /> },
    { title: "Ghế - Bàn", link: "/ghe-ban", icon: <PiOfficeChairLight /> },
    { title: "Phần mềm, mạng", link: "/phan-mem-mang", icon: <BsPrinter /> },
    {
      title: "Handheld, Console",
      link: "/handheld-console",
      icon: <IoGameControllerOutline />,
    },
    {
      title: "Phụ kiện (Hub, sạc, cáp...)",
      link: "/phu-kien",
      icon: <IoGameControllerOutline />,
    },
    {
      title: "Thủ thuật - Giải đáp",
      link: "/thu-thuat-giai-dap",
      icon: <GoGift />,
    },
  ];

  const handleMouseEnter = (index) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // Nếu có timeout, xóa nó
    }
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200); // Thêm độ trễ 200ms trước khi ẩn menu
  };
  // console.log("Menu.jsx", products);
  return (
    <div className="flex md:w-full relative gap-4">
      <ul className="flex bg-[#E30019] hide-scrollbar w-full overflow-x-auto md:flex-col md:gap-[10px] md:bg-white md:rounded-lg p-2 md:px-5 py-3 md:py-2 md:w-full text-[14px] 2xl:text-[13px] font-500">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="relative px-3 md:px-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={item.link}
              className="flex items-center md:hover:text-[#E30019] justify-between gap-2"
            >
              <div className="flex md:hover:text-[#E30019] items-center text-white md:text-black gap-2 whitespace-nowrap">
                {(laptop || desktop) && (
                  <p className="text-[20px]">{item.icon}</p>
                )}
                <p className="">{item.title}</p>
              </div>
              {(laptop || desktop) && <IoIosArrowForward />}
            </Link>
          </li>
        ))}
      </ul>
      {hoveredItem !== null && menuItems[hoveredItem].subItems && (
        <div
          className="absolute top-0 left-[104%] bg-white p-4 flex h-full w-[370%] justify-between rounded-lg shadow-lg z-50"
          onMouseEnter={() => handleMouseEnter(hoveredItem)} // Khi hover vào submenu, giữ lại
          onMouseLeave={handleMouseLeave} // Thêm hành động rời chuột
        >
          {menuItems[hoveredItem].subItems.map((subItem, subIndex) => (
            <div key={subIndex} className="flex flex-row space-x-4">
              {Brand.filter((brand) =>
                filteredProducts.some(
                  (product) =>
                    product.brand &&
                    product.brand.title === brand &&
                    product.views > 5 
                )
              ).map((brand, index) => (
                <div key={index} className="brand-section">
                  <h2 className="font-bold text-[#E30019]">{brand}</h2>
                  <ul>
                    {filteredProducts
                      .filter(
                        (product) =>
                          product.brand &&
                          product.brand.title === brand &&
                          product.views > 5 
                      )
                      .map((product, productIndex) => (
                        <li
                          key={product._id}
                          className={`flex items-center ${
                            productIndex !== filteredProducts.length - 1
                              ? "border-b-2 border-gray-300"
                              : ""
                          }`}
                        >
                          <Link to={`/products/${product._id}`}>
                            <p className="py-1">{product.title}</p>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
