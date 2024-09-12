import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const FooterTop = () => {
  const sections = [
    {
      title: "VỀ GEARVN",
      items: [
        { text: "Giới thiệu", link: "/" },
        { text: "Tuyển dụng", link: "/" },
      ],
    },
    {
      title: "CHÍNH SÁCH",
      items: [
        { text: "Chính sách bảo hành", link: "/" },
        { text: "Chính sách thanh toán", link: "/" },
        { text: "Chính sách giao hàng", link: "/" },
        { text: "Chính sách bảo mật", link: "/" },
      ],
    },
    {
      title: "THÔNG TIN",
      items: [
        { text: "Hệ thống cửa hàng", link: "/" },
        { text: "Hướng dẫn mua hàng", link: "/" },
        { text: "Tra cứu địa chỉ bảo hành", link: "/" },
      ],
    },
    {
      title: "TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)",
      items: [
        { text: "Mua hàng: 1900.5301", link: "/" },
        { text: "Bảo hành: 1900.5325", link: "/" },
        { text: "Khiếu nại: 1800.6173", link: "/" },
        { text: "Email: cskh@gearvn.com", link: "/" },
      ],
    },
  ];

  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (index) => {
    if (openSections.includes(index)) {
      setOpenSections(openSections.filter((i) => i !== index));
    } else {
      setOpenSections([...openSections, index]);
    }
  };

  const ShipImage = [
    "/images/ship_1.webp",
    "/images/ship_2.webp",
    "/images/ship_3.webp",
    "/images/ship_4.webp",
  ].map((image) => ({ image }));

  const PaymentImage = [
    "/images/pay_1.webp",
    "/images/pay_2.webp",
    "/images/pay_3.webp",
    "/images/pay_4.webp",
    "/images/pay_5.webp",
    "/images/pay_6.webp",
    "/images/pay_7.webp",
    "/images/pay_8.webp",
  ].map((image) => ({ image }));

  return (
    <div className="px-4 2xl:px-0 2xl:w-[80%] mx-auto">
      <div className="2xl:flex 2xl:justify-between py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-3 z-20">
            <div
              className="flex justify-between items-center cursor-pointer md:cursor-auto"
              onClick={() => toggleSection(index)}
            >
              <h4 className="font-600 text-[14px] md:text-[16px]  leading-[22px] uppercase">
                {section.title}
              </h4>
              <div className="md:hidden">
                {openSections.includes(index) ? (
                  <AiOutlineMinus />
                ) : (
                  <AiOutlinePlus />
                )}
              </div>
            </div>
            <ul
              className={`flex flex-col gap-2   text-[14px] 2xl:text-[16px] font-500 ${
                openSections.includes(index) ? "block" : "hidden"
              } md:block`}
            >
              {section.items.map((item, idx) => (
                <li key={idx} className="hover:text-[#E30019]">
                  <Link to={item.link}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-10 md:col-span-2 2xl:col-span-1">
          <div className="flex flex-col gap-3">
            <h4 className="font-600 text-[16px] leading-[22px] uppercase">
              ĐƠN VỊ VẬN CHUYỂN
            </h4>
            <ul className="flex gap-2 text-[14px] font-400">
              {ShipImage.map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt="" className="2xl:w-[69px]" />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-600 text-[16px]  uppercase">
              CÁCH THỨC THANH TOÁN
            </h4>
            <ul className="grid grid-cols-4 2xl:gap-2 gap-1">
              {PaymentImage.map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt="" className="2xl:w-[69px]" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
