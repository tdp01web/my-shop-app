import React from "react";
import { MdGamepad, MdOutlineDiscount } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { SlSocialYoutube } from "react-icons/sl";
import { FaRegCreditCard } from "react-icons/fa6";
import { LiaCoinsSolid } from "react-icons/lia";
import { GoShieldCheck } from "react-icons/go";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const SubHeader = ({ vertical }) => {
  const navigate = useNavigate();

  const listMenu = [
    { icon: <MdGamepad />, title: "Giới thiệu về Gaming Gear", path: "/abouts" },

    { icon: <HiOutlineNewspaper />, title: "Tin công nghệ", path: "blog" },
    {
      icon: <SlSocialYoutube />,
      title: "Video",
      link: "https://www.youtube.com/@smartcomputer-hn",
    },
    {
      icon: <FaRegCreditCard />,
      title: "Hướng dẫn thanh toán",
      path: "payment-manual",
    },
    {
      icon: <LiaCoinsSolid />,
      title: "Hướng dẫn trả góp",
      path: "installment",
    },
    { icon: <GoShieldCheck />,
      path: "contacts",
      title: "Liên hệ" },
  ];

  const onMenuClick = (item) => {
    if (item.link) {
      window.open(item.link, "_blank"); // Mở liên kết trong tab mới
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={clsx("bg-white border-b w-full", {
        "md:block border-gray-200": !vertical,
      })}
    >
      <div
        className={clsx("mx-auto md:p-3 md:w-[80%] hide-scrollbar", {
          "flex overflow-x-auto": !vertical,
          "flex flex-col": vertical,
        })}
      >
        {listMenu.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "flex items-center gap-2 font-500 text-[14px] hover:text-[#E30019] cursor-pointer",
                {
                  "px-[32px]": !vertical,
                  "border-r border-gray-700":
                    !vertical && index !== listMenu.length - 1,
                  "py-2 pl-10": vertical,
                  "border-b border-gray-200":
                    vertical && index !== listMenu.length - 1,
                }
              )}
              onClick={() => onMenuClick(item)}
            >
              <span className="text-[20px]">{item.icon}</span>
              <span className="whitespace-nowrap">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubHeader;
