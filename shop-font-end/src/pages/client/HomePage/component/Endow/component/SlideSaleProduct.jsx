import React from "react";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../../../../../../components/CarouselSlider";
import Slider from "react-slick";
import { LinearProgress, Box, Typography } from "@mui/material";
import SoldProgressBar from "../../../../../../components/SoldProgressBar";
import { Link } from "react-router-dom";
const SlideSaleProduct = () => {
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

  const productList = [
    {
      id: 1,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/product1.webp",
      sold: 10,
    },
    {
      id: 2,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/product2.webp",
      sold: 10,
    },
    {
      id: 3,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/product3.webp",
      sold: 10,
    },
    {
      id: 4,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/product1.webp",
      sold: 10,
    },
    {
      id: 5,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/product5.webp",
      sold: 10,
    },
    {
      id: 6,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/product6.webp",
      sold: 10,
    },
    {
      id: 7,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/product8.webp",
      sold: 10,
    },
  ];

  return (
    <div
      className="w-full bg-cover flex bg-center gap-3 h-auto p-4"
      style={{
        backgroundImage: "url('/images/homepage/banner/banner-big.webp')",
      }}
    >
      <div className="w-1/3 hidden md:block">
        <img src="/images/homepage/banner/flash_sale_banner.webp" alt="" />
      </div>
      <div className="w-full md:w-2/3  h-full">
        <Slider {...settings}>
          {productList.map((item) => (
            <Link to={"/products/2"} key={item.id}>
              <div className="bg-white flex gap-3  px-2 py-2 flex-col mx-[2px]  rounded-sm shadow-lg">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto"
                  />
                </div>
                <p className="line-clamp-2 font-600 text-[14px]">{item.name}</p>
                <del className="text-[14px] font-600 leading-none">
                  {item.priceOld.toLocaleString()}đ
                </del>
                <div className="leading-none text-gray-500 flex items-center gap-2">
                  <p className="text-red-500  font-600  text-[17px]">
                    {item.price.toLocaleString()}đ
                  </p>
                  <div className="border border-solid border-red-500 rounded-sm  px-2">
                    <p className="text-red-500 ">
                      {Math.round(
                        ((item.priceOld - item.price) / item.priceOld) * 100
                      )}
                      %
                    </p>
                  </div>
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
