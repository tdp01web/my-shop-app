import React from "react";
import { Link } from "react-router-dom";

const ImageBanner = () => {
  return (
    <div className="w-full  ">
      <div className="md:grid grid-cols-4 md:gap-2 flex overflow-x-auto hide-scrollbar ">
        <Link to={"/collection"}>
          <img
            src="/images/homepage/artboard_6.webp"
            alt=""
            className="w-full object-cover"
          />
        </Link>
        <Link to={"/collection"}>
          <img
            src="/images/homepage/artboard_7.webp"
            alt=""
            className="w-full h-[130px] mt-2 object-cover"
          />
        </Link>
        <Link to={"/collection"}>
          <img
            src="/images/homepage/artboard_8.webp"
            alt=""
            className="w-full h-[130px] mt-2 object-cover"
          />
        </Link>
        <Link to={"/collection"}>
          <img
            src="/images/homepage/artboard_9.webp"
            alt=""
            className="w-full h-[130px] mt-2 object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default ImageBanner;
