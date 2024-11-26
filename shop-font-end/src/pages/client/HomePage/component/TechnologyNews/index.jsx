import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../../configs/instance";

const TechnologyNews = ({ ListData }) => {
  return (
    <div className="bg-white p-4 flex flex-col gap-2 rounded-sm">
      <div className="flex justify-between">
        <h2 className="text-[24px] font-600 ">Tin tức công nghệ</h2>
        <Link to={"/blog"} className="text-[#1982F9]">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ListData.slice(0, 4).map((item, index) => (
          <Link
            to={`/blog/${item._id}`}
            key={index}
            className="flex flex-col gap-2"
          >
            <div className="relative pb-[56.25%] rounded-sm">
              <img
                src={item.images[0].url}
                alt={item.title}
                className="absolute top-0 left-0 w-full rounded-[4px] h-full object-cover"
              />
            </div>
            <p className="text-[16px] font-[500] line-clamp-2 ">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TechnologyNews;
