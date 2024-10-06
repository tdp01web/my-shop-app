import React from "react";

const Blogpost = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        {/* Main Blog Post */}
        <div className="col-span-2 md:col-span-2">
          <img
            src="/images/Blog/blog1.webp"
            alt="Blog Post Image"
            className="w-full mb-2"
          />
          <a
            href="#"
            className="font-semibold text-lg md:text-2xl hover:text-red-500"
          >
            Cách chèn video vào PowerPoint 2010 trên máy tính, điện thoại
          </a>
        </div>

        {/* Sidebar Blog Posts */}
        <div className="md:col-span-1">
          <img
            src="/images/Blog/blog3.webp"
            alt="Blog Post Image"
            className="w-full mb-2"
          />
          <a href="#" className="font-semibold text-[26px]  hover:text-red-500">
            Cách lấy lại nick Free Fire bằng ID miễn phí hiệu quả
          </a>
          <p className="font-normal mt-1 text-[20px] ">
            Bạn mất nick Free Fire và bạn không biết cách lấy lại nick? Bạn đang
            tìm kiếm một phương pháp lấy lại nick miễn phí? Bài viết này, GEARVN
            sẽ hướng dẫn bạn cách lấy lại nick Free Fire bằng ID miễn phí giúp
            bạn khôi phục tài khoản và có thể tiếp tục hành trình chiến đấu
            trong trò chơi Free Fire. Cùng tìm hiểu cách thức thực hiện thông
            qua bài viết dưới đây nhé!
          </p>
        </div>
      </div>
      {/* Other Blog Posts */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-[35px]">
        <div className="md:col-span-1">
          <img
            src="/images/Blog/blog2.webp"
            alt="Blog Post Image"
            className="w-full h-auto rounded mb-2"
          />
          <a href="#" className="font-semibold text-sm hover:text-red-500">
            99+ kí tự đặc biệt Play Together đẹp, lạ mắt
          </a>
        </div>

        <div className="md:col-span-1">
          <img
            src="/images/Blog/blog6.webp"
            alt="Blog Post Image"
            className="w-full h-auto rounded mb-2"
          />
          <a href="#" className="font-semibold text-sm hover:text-red-500">
            Cách đặt tên game hay, nổi bật và gây ấn tượng trong game
          </a>
        </div>

        <div className="md:col-span-1">
          <img
            src="/images/Blog/blog5.webp"
            alt="Blog Post Image"
            className="w-full h-auto rounded mb-2"
          />
          <a href="#" className="font-semibold text-sm hover:text-red-500">
            Nhận ngay acc Liên Quân miễn phí 2024 Full tướng, Full trang phục
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blogpost;
