import React from "react";

const AboutsPage = () => {
  return (
    <>
      <div className="md:mx-auto px-4 md:px-6 lg:px-20 py-9 md:py-12 lg:py-16 md:w-[80%]">
        <div className="w-full">
          <h1 className="mt-2 w-full font-bold text-2xl text-center text-red-600 lg:text-4xl leading-9 lg:leading-10">
            Giới thiệu Gearvn
          </h1>
          <p className="mt-6 font-semibold text-[16px] text-gray-800 lg:text-12 italic">
            "Khách hàng hôm nay là đồng đội tương lai! Chúng ta cùng nhau lan
            toả giá trị tích cực đến cộng đồng game thủ và tất cả những người
            yêu công nghệ tại Việt Nam"
          </p>
        </div>

        <div className="mt-12 sm:mt-10 lg:mt-14">
          <img
            className="rounded-md w-full h-[300px] md:h-[500px] object-cover"
            src="./images/abouts/logo.jpg"
          />
        </div>

        <div className="flex lg:flex-row flex-col justify-between gap-12 lg:gap-8 mt-16 sm:mt-12 lg:mt-16">
          <div className="w-full lg:w-6/12 xl:w-5/12">
            <h2 className="my-2 font-bold text-2xl text-red-600 lg:text-4xl leading-7 lg:leading-9">
              Về chúng tôi
            </h2>
            <p className="mt-6 font-normal text-[16px] text-black lg:text-12 leading-8">
              GearVN là thương hiệu được sinh ra từ giấc mơ của một game thủ,
              phát triển bởi tập thể các game thủ để phục vụ cho cộng đồng game
              thủ Việt.
            </p>
            <p className="mt-6 font-normal text-[16px] text-black lg:text-12 leading-8">
              Đội ngũ tư vấn của GearVN không đơn thuần là nhân viên kinh doanh,
              chúng tôi còn là những người yêu game với mong muốn giúp bạn cùng
              sở thích có được dàn máy và gear phù hợp.
            </p>
            <p className="mt-6 font-normal text-[16px] text-black lg:text-12 leading-8">
              Sự hài lòng của khách hàng chính là động lực giúp GearVN không
              ngừng hoàn thiện, mang lại ngày càng nhiều giá trị tích cực cho
              cộng đồng.
            </p>
          </div>
          <div className="lg:flex items-center w-full lg:w-1/2">
            <img
              className="lg:block rounded-md w-full object-cover"
              src="./images/abouts/images.jpg"
              alt="people discussing on board"
            />
          </div>
        </div>
        <div className="gap-4 grid grid-cols-2 my-5">
          <div className="w-full">
            <img
              src="./images/abouts/abouts1.jpg"
              alt="Large Image"
              className="rounded-md w-full h-full object-cover"
            />
          </div>
          <div className="gap-4 grid grid-cols-2 grid-rows-2 w-full">
            <div className="col-span-1">
              <img
                src="./images/abouts/abouts2.jpg"
                alt="Image 1"
                className="rounded-md w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img
                src="./images/abouts/abouts3.jpg"
                alt="Image 2"
                className="rounded-md w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img src="./images/abouts/abouts4.jpg" />
            </div>
            <div className="col-span-1">
              <img
                src="./images/abouts/abouts5.jpg"
                alt="Image 4"
                className="rounded-md w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="mt-2 w-full font-bold text-2xl text-center text-red-600 lg:text-4xl lg:leading-10">
            Trải nghiệm mua sắm toàn diện
          </h2>
          <div className="flex lg:flex-row flex-col justify-between gap-12 lg:gap-8 mt-16 sm:mt-12 lg:mt-16">
            <div className="w-full lg:w-6/12 xl:w-5/12">
              <h2 className="font-bold text-black text-center text-xl leading-7 lg:leading-9">
                Hệ thống Showroom
              </h2>
              <img src="./images/abouts/download.png" alt="" />
              <h3 className="my-2 font-bold text-gray-700 text-lg leading-7 lg:leading-9">
                Miền Bắc
              </h3>
              <ul className="mx-7 my-3 font-light text-12 text-red-500 leading-7 lg:leading-9 list-disc">
                <li>Showroom GearVn Thái Hà</li>
              </ul>
              <h3 className="font-bold text-gray-700 text-lg leading-7 lg:leading-9">
                Miền Nam
              </h3>
              <ul className="mx-7 my-3 font-light text-12 text-red-500 leading-7 lg:leading-9 list-disc">
                <li>Showroom GearVn Hoàng Hoa Thám</li>
                <li>Showroom GearVn Kha Vạn Cân</li>
              </ul>
            </div>
            <div className="w-full lg:w-6/12 xl:w-5/12">
              <h2 className="font-bold text-black text-center text-xl leading-7 lg:leading-9">
                Mua sắm trực tiếp
              </h2>
              <img src="./images/abouts/download2.png" alt="" />
              <h3 className="font-bold text-gray-700 text-lg leading-7 lg:leading-9">
                Website GearVn
              </h3>
              <ul className="mx-7 my-3 font-light text-12 text-red-500 leading-7 lg:leading-9 list-disc">
                <li>www.gearvn.com</li>
                <li>Miễn phí giao hàng toàn quốc</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutsPage;
