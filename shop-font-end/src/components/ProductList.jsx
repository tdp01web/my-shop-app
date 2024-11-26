import React from "react";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "./CarouselSlider";
import Product from "./Product";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import LottieAnimationTruck from "./LottieAnimation";
const ProductList = ({
  title,
  promotions,
  categories,
  products,
  seeAllLink,
  titleSale,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-cover flex bg-white rounded-sm flex-col bg-center gap-3 h-auto p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <h2 className="text-[24px] font-600">{title}</h2>
          <Divider />
          <div className="md:flex items-center hidden">
            <LottieAnimationTruck />
            <h3 className=" sm:text-[18px] lg:text-[24px] font-500">
              {titleSale}
            </h3>
          </div>
        </div>
        <div className="md:flex gap-7 hidden ">
          {categories.map((category, index) => (
            <div
              key={index}
              className="cursor-pointer md:text-[15px] lg:text-[18px] hover:text-red-500 text-black"
            >
              {category}
            </div>
          ))}
        </div>
        <Link to={seeAllLink} className="text-blue-500 text-[18px]">
          Xem tất cả
        </Link>
      </div>
      <div className="md:hidden whitespace-nowrap flex gap-3 overflow-x-auto hide-scrollbar">
        {categories.map((category, index) => (
          <div
            key={index}
            className="cursor-pointer bg-[#ECECEC] px-3 py-2 rounded-[4px] md:text-[15px] lg:text-[18px] hover:text-red-500 text-black"
          >
            {category}
          </div>
        ))}
      </div>

      <div className="w-full h-full">
        <Slider {...settings}>
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;
