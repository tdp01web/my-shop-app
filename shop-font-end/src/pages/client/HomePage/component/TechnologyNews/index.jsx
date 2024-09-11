import React from "react";
import { Link } from "react-router-dom";

const TechnologyNews = () => {
  const ListData = [
    {
      title: "Solidworks là gì? tính năng vượt trội Solidworks mang lại",
      image: "/images/danhmucsp/tintuc1.webp",
    },
    {
      title: "Cách lấy lại file Excel chưa lưu đảm bảo thành công",
      image: "/images/danhmucsp/tintuc2.webp",
    },
    {
      title: "Máy in không in được: Nguyên nhân và cách khắc phục",
      image: "/images/danhmucsp/tintuc3.webp",
    },
    {
      title: "Lắp đặt camera an ninh cho gia đình cần lưu ý điều gì",
      image: "/images/danhmucsp/tintuc4.webp",
    },
  ];
  return (
    <div className="bg-white p-4 flex flex-col gap-2 rounded-sm">
      <h2 className="text-[24px] font-600 ">Tin tức công nghệ</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ListData.map((item, index) => (
          <Link to={"/"} key={index} className="flex flex-col gap-2">
            <div className="relative pb-[56.25%] rounded-sm">
              <img
                src={item.image}
                alt={item.title}
                className="absolute top-0 left-0 w-full rounded-[4px] h-full object-cover"
              />
            </div>
            <p className="text-[16px] font-[500]">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TechnologyNews;
