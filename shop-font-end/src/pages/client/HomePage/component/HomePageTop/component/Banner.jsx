import React from "react";

const ImageBanner = () => {
  return (
    <div className="w-full  ">
      <div className="md:grid grid-cols-4 md:gap-2 flex overflow-x-auto hide-scrollbar ">
        <img
          src="/images/homepage/artboard_6.webp"
          alt=""
          className="w-full object-cover"
        />
        <img
          src="/images/homepage/artboard_7.webp"
          alt=""
          className="w-full object-cover"
        />
        <img
          src="/images/homepage/artboard_8.webp"
          alt=""
          className="w-full object-cover"
        />
        <img
          src="/images/homepage/artboard_9.webp"
          alt=""
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default ImageBanner;
