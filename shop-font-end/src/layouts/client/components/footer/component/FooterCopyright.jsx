import React from "react";

const FooterCopyright = () => {
  const listImage = [
    { image: "/public/images/facebook_1.webp", link: "/" },
    { image: "/public/images/tiktok.webp", link: "/" },
    { image: "/public/images/icon_zalo__1.webp", link: "/" },
    { image: "/public/images/youtube_1.webp", link: "/" },
  ];
  return (
    <div className="2xl:w-[80%] px-4 2xl:px-0 mx-auto flex gap-3 md:items-center 2xl:justify-between py-10">
      <div className="flex flex-col 2xl:flex-row gap-3">
        <h4 className="font-600">KẾT NỐI VỚI CHÚNG TÔI</h4>
        <ul className="flex gap-2 ">
          {listImage.map((item, index) => (
            <li key={index}>
              <a href={item.link}>
                <img
                  className="w-[30px] h-[30px] object-cover"
                  src={item.image}
                  alt=""
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className=" ">
        <img src="/public/images/logo-bct.webp" alt="" className="w-[120px]" />
      </div>
    </div>
  );
};

export default FooterCopyright;
