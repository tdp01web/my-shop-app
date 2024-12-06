import React, { useMemo, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useBreakpoints } from "../../../../../../hooks/useBreakpoints";
import useProductFilters from "../../../../../../hooks/useFilter/useProductFilters";

/* eslint-disable react/prop-types */
const Menu = ({ products }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { mobile, tablet, laptop, desktop } = useBreakpoints();
  const hoverTimeout = useRef(null); // Ref to hold timeout ID

  const [selectedBrand, setSelectedBrand] = useState([]);
  const navigate = useNavigate();

  // Memoize các giá trị để đảm bảo chúng không thay đổi qua mỗi render
  const priceRange = useMemo(() => [0, 10000000000], []);
  const emptyArray = useMemo(() => [], []);

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
      return value.trim().toLowerCase().replace(/\s+/g, ""); // Xóa khoảng trắng dư thừa và chuẩn hóa chữ thường
    }
    return value;
  };

  const GBSize = (size) =>
    parseInt(size.toLowerCase().replace("gb", "").trim(), 10);

  const menuItems = [
    {
      title: "Laptop",
      link: "/laptop",
      icon: <PiLaptopLight />,
      subItems: [
        {
          title: "Thương hiệu",
          link: "/laptop/brand",
          subItems: Brand.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((brand) => ({
            title: brand,
            action: () => navigate(`/collection?brand=${brand}`),
          })),
        },
        {
          title: "CPU",
          link: "/laptop/brand",
          subItems: Cpunames.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((cpu) => ({
            title: cpu,
            action: () => navigate(`/collection?cpu=${cpu}`),
          })),
        },
        {
          title: "RAM",
          link: "/laptop/brand",
          subItems: ramSizes
            .sort((a, b) => GBSize(a) - GBSize(b))
            .map((ram) => ({
              title: ram,
              action: () => navigate(`/collection?ram=${ram}`),
            })),
        },
        {
          title: "SSD",
          link: "/laptop/brand",
          subItems: SSDnames.sort((a, b) => GBSize(a) - GBSize(b)).map(
            (ssd) => ({
              title: ssd,
              action: () => navigate(`/collection?ssd=${ssd}`),
            })
          ),
        },
        {
          title: "VGA",
          link: "/laptop/brand",
          subItems: Vganames.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((vga) => ({
            title: vga,
            action: () => navigate(`/collection?vga=${vga}`),
          })),
        },
        {
          title: "Danh mục",
          link: "/laptop/brand",
          subItems: Category.sort((a, b) =>
            normanData(a).localeCompare(normanData(b))
          ).map((ctg) => ({
            title: ctg,
            action: () => navigate(`/collection?category=${ctg}`),
          })),
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
                <p>{item.title}</p>
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
            <div key={subIndex}>
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
    </div>
  );
};

export default Menu;
