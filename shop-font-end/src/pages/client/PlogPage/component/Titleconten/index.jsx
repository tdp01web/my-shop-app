import React from "react";

import Blogpost from "../Blogpost";
import Blogpostitem from "../Blogpostitem";
import Gametopic from "../Gametopic";
import Hottopic from "../Hottopic";
import Quickview from "../Quickview";

const blogItems = [
  {
    id: 1,
    image: "/images/Blog/blog15.webp",
    title:
      "Janitor AI là gì? Những tính năng nổi bật và cách dùng Janitor AI Chat",
  },
  {
    id: 2,
    image: "/images/Blog/blog16.webp",
    title:
      "iPhone 16 có gì mới: Giá bán, thời gian ra mắt, màu sắc và cấu hình",
  },
  {
    id: 3,
    image: "/images/Blog/blog17.webp",
    title:
      "Hướng dẫn chọn PC cho học sinh, sinh viên để sẵn sàng cho mùa Back to School",
  },
  {
    id: 4,
    image: "/images/Blog/blog18.webp",
    title:
      "Gợi ý 5 cách chọn bàn phím cơ cho học sinh, sinh viên mới nhất 2024",
  },
];

const Titlecontent = () => {
  return (
    <>
      <div className="bg-white w-full mx-auto lg:p-4 mt-5 rounded-md relative mb-8 pt-12">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9">
            <Blogpost />
            <hr className="my-3" />
            <Blogpostitem />
          </div>
          <div className="lg:col-span-3">
            <div className="col-span-2">
              <div className="flex justify-around bg-red-600 h-50 rounded-t-lg w-[60%] ">
                <h3 className="text-white font-semibold pt-3.5">CHỦ ĐỀ HOT</h3>
                <img
                  src="/images/Blog/blog7.webp"
                  alt=""
                  className="w-11 h-50"
                />
              </div>
            </div>

            <Hottopic />
            <div className="col-span-2">
              <div className="flex justify-around bg-red-600 h-50 rounded-t-lg w-[60%] ">
                <h3 className="text-white font-semibold pt-3.5">CHỦ ĐỀ GAME</h3>
                <img
                  src="/images/Blog/blog7.webp"
                  alt=""
                  className="w-11 h-50"
                />
              </div>
            </div>

            <Gametopic />
            <div className="col-span-2">
              <div className="flex justify-around bg-blue-900 h-[3rem] rounded-t-lg w-[60%]">
                <h3 className="text-white font-semibold pt-3.5">XEM NHANH</h3>
                <img
                  src="/images/Blog/blog14.webp"
                  alt=""
                  className="w-11 h-50"
                />
              </div>
            </div>

            <Quickview />
            <div className="col-span-2">
              <div className="flex justify-around bg-blue-900 h-[3rem] rounded-t-lg w-[60%]">
                <h3 className="text-white font-semibold pt-3.5">THỦ THUẬT</h3>
                <img src="/images/Blog/blog20.webp" alt="" className="h-55" />
              </div>
            </div>

            <div className="bg-white rounded">
              {blogItems.map((item) => (
                <div className="flex pt-16" key={item.id}>
                  <div className="w-1/3 sm:w-20 mr-15">
                    <img src={item.image} alt="" className="mb-10 rounded" />
                  </div>
                  <div className="w-2/3 sm:w-9/12">
                    <a
                      href="#"
                      className="font-semibold text-[16px] pl-3 hover:text-red-500"
                    >
                      {item.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Titlecontent;
