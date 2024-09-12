import React from "react";
import { MdOutlineDiscount } from "react-icons/md";
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
    { icon: <MdOutlineDiscount />, title: "Săn Voucher GEARVN" },
    { icon: <HiOutlineNewspaper />, title: "Tin công nghệ" },
    { icon: <SlSocialYoutube />, title: "Video" },
    {
      icon: <FaRegCreditCard />,
      title: "Hướng dẫn thanh toán",
      path: "payment-manual",
    },
    { icon: <LiaCoinsSolid />, title: "Hướng dẫn trả góp" },
    { icon: <GoShieldCheck />, title: "Tra cứu bảo hành" },
  ];

  const onMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={clsx("w-full border-b bg-white", {
        "md:block border-gray-200": !vertical,
      })}
    >
      <div
        className={clsx("mx-auto md:w-[80%] md:p-3  hide-scrollbar", {
          "flex overflow-x-auto": !vertical,
          "flex flex-col": vertical,
        })}
      >
        {listMenu.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "flex items-center  gap-2 text-[14px] font-500 hover:text-[#E30019] cursor-pointer",
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
