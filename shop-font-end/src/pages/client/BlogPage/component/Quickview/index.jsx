import React from 'react'



const Quickview = () => {
  return (
    <>
      <div className=" mb-[60px]">
        <div className="flex relative ">
          <div className="relative">
            <button className="bg-[#03304b] w-[180px] h-[50px] rounded-t-lg relative ">
              <h3 className="text-left text-white font-semibold pl-[15px]">
                Xem nhanh
              </h3>
            </button>
          </div>
          <div className="absolute top-[-5px] right-[175px] z-10 ">
            <img
              src="/images/Blog/blog14.webp"
              alt=""
              className="w-[40px] h-[55px] "
            />
          </div>
        </div>
        <div className="  bg-white rounded row">
          <div className="flex pt-[16px]">
            <div className="w-1/3 sm:w-[20%] mr-[15px]">
              <img
                src="/images/Blog/blog15.webp"
                alt=""
                className="mb-[10px] rounded"
              />
            </div>
            <div className="w-2/3 sm:w-9/12 ">
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 "
              >
                Janitor AI là gì? Những tính năng nổi bật và cách dùng Janitor
                AI Chat
              </a>
              <p className="pt-[10px]"></p>
            </div>
          </div>
          <div className="flex pt-[16px]">
            <div className="w-1/3 sm:w-[20%] mr-[15px]">
              <img
                src="/images/Blog/blog16.webp"
                alt=""
                className="mb-[10px] rounded"
              />
            </div>
            <div className="w-2/3 sm:w-9/12 ">
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 "
              >
                iPhone 16 có gì mới: Giá bán, thời gian ra mắt, màu sắc và cấu
                hình
              </a>
            </div>
          </div>
          <div className="flex pt-[16px]">
            <div className="w-1/3 sm:w-[20%] mr-[15px]">
              <img
                src="/images/Blog/blog17.webp"
                alt=""
                className="mb-[10px] rounded"
              />
            </div>
            <div className="w-2/3 sm:w-9/12 ">
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 "
              >
                Hướng dẫn chọn PC cho học sinh, sinh viên để sẵn sàng cho mùa
                Back to School
              </a>
            </div>
          </div>
          <div className="flex pt-[16px]">
            <div className="w-1/3 sm:w-[20%] mr-[15px]">
              <img
                src="/images/Blog/blog18.webp"
                alt=""
                className="mb-[10px] rounded"
              />
            </div>
            <div className="w-2/3 sm:w-9/12 ">
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 "
              >
                Gợi ý 5 cách chọn bàn phím cơ cho học sinh, sinh viên mới nhất
                2024
              </a>
            </div>
          </div>
          <div className="flex pt-[16px]">
            <div className="w-1/3 sm:w-[20%] mr-[15px]">
              <img
                src="/images/Blog/blog19px.webp"
                alt=""
                className="mb-[10px] rounded"
              />
            </div>
            <div className="w-2/3 sm:w-9/12 ">
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 "
              >
                Top 5 màn hình gaming 24-inch giá tốt cho học sinh, sinh viên
                dịp Back to School 2024
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quickview;