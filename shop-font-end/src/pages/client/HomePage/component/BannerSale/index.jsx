import React from "react";
import { Link } from "react-router-dom";

const BannerSale = () => {
  return (
    <div className="grid grid-cols-1 p-2 sm:p-0 sm:grid-cols-2 gap-2 sm:gap-4 ">
      <Link to={""}>
        <img
          src="public/images/homepage/banner/banner-hhh1.webp"
          alt=""
          className="w-full object-cover"
        />
      </Link>
      <Link to={""}>
        <img
          src="public/images/homepage/banner/banner-hhh2.webp"
          alt=""
          className="w-full object-cover"
        />
      </Link>
    </div>
  );
};

export default BannerSale;
