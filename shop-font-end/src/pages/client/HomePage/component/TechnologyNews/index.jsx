import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../../configs/instance";
import BlogSkeleton from "../../../../../components/BlogSkeleton";

const TechnologyNews = ({ ListData, isLoadingBlog }) => {
  // if (isLoadingBlog) {
  //   return (
  //     <div>
  //       <BlogSkeleton />
  //     </div>
  //   );
  // }
  // console.log("ListData", ListData)
  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-sm">
      <div className="flex justify-between">
        <h2 className="font-600 text-[24px]">Tin tức công nghệ</h2>
        <Link to={"/blog"} className="text-[#1982F9]">
          Xem tất cả
        </Link>
      </div>

      <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
        {ListData.slice(0, 4).map((item, index) =>
          isLoadingBlog ? (
            <BlogSkeleton key={index} />
          ) : (
            <Link
              to={`/blog/${item._id}`}
              key={index}
              className="flex flex-col gap-2"
            >
              <div className="relative pb-[56.25%] rounded-sm">
                <img
                  src={item?.images[0]?.url}
                  alt={item.title}
                  className="top-0 left-0 absolute rounded-[4px] w-full h-full object-cover"
                />
              </div>
              <p className="line-clamp-2 font-[500] text-[16px]">
                {item.title}
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default TechnologyNews;
