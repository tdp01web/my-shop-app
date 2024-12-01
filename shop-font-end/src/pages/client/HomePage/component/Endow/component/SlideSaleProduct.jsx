import React from "react";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../../../../../../components/CarouselSlider";
import Slider from "react-slick";
import { LinearProgress, Box, Typography } from "@mui/material";
import SoldProgressBar from "../../../../../../components/SoldProgressBar";
import { Link } from "react-router-dom";
const SlideSaleProduct = ({ productList }) => {
  console.log("🚀 ~ SlideSaleProduct ~ productList:", productList);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
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
          slidesToShow: 3,
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
    <div
      className="flex gap-3 bg-cover bg-center p-4 w-full h-auto"
      style={{
        backgroundImage: "url('/images/homepage/banner/banner-big.webp')",
      }}
    >
      <div className="md:block hidden w-1/3">
        <img src="/images/homepage/banner/flash_sale_banner.webp" alt="" />
      </div>
      <div className="w-full md:w-2/3 h-full">
        <Slider {...settings}>
          {productList.map((item) => (
            <Link to={`/products/${item._id}`} key={item.id}>
              <div className="flex flex-col gap-3 bg-white shadow-lg mx-[2px] px-2 py-2 rounded-sm">
                <div className="relative w-full">
                  <img
                    src={item?.images[0]?.url}
                    className="w-full h-auto aspect-square"
                  />
                </div>
                <p className="line-clamp-2 h-[40px] font-600 text-[14px]">
                  {item.title}
                </p>
                {/* <del className="font-600 text-[14px] leading-none">
                  {item.priceOld.toLocaleString()}đ
                </del> */}
                <div className="flex items-center gap-2 text-gray-500 leading-none">
                  <p className="font-600 text-[17px] text-red-500">
                    {item.variants[0].price.toLocaleString()}đ
                  </p>
                  {/* <div className="px-2 border border-red-500 border-solid rounded-sm">
                    <p className="text-red-500">
                      {Math.round(
                        ((item.priceOld - item.price) / item.priceOld) * 100
                      )}
                      %
                    </p>
                  </div> */}
                </div>
                <SoldProgressBar sold={item.sold} />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlideSaleProduct;
