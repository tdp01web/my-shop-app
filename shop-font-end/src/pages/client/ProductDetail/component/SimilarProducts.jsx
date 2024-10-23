import React from "react";
import Slider from "react-slick";
import { Divider } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../../../../components/CarouselSlider";
import Product from "../../../../components/Product";

const SimilarProducts = ({ dataProductCategory }) => {
  console.log(
    "🚀 ~ SimilarProducts ~ dataProductCategory:",
    dataProductCategory
  );
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
  console.log(dataProductCategory);
  return (
    <div className="w-[40%] bg-cover rounded-md flex bg-white  flex-col bg-center gap-3 h-auto p-4">
      <h2 className="text-[24px] font-600">Các sản phẩm tương tự </h2>
      <div className="w-full h-full flex flex-col gap-2 ">
        {dataProductCategory.map((product) => (
          <Link
            to={`/products/${product._id}`}
            className="bg-white border border-solid flex p-4 border-[#CFCFCF] gap-8 rounded-sm"
          >
            <div className="w-1/4">
              <img
                src={product.images[0].url}
                alt={product.title}
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="line-clamp-2 font-600 text-[14px]">
                {product?.title}
              </p>
              <div className="leading-none text-gray-500 flex items-center gap-2">
                <p className="text-red-500 font-600 text-[14px] md:text-[18px]">
                  {product?.variants[0].price.toLocaleString()}đ
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF8A00] flex items-center gap-1 text-[14px]">
                  {product.totalrating} <FaStar />
                </span>
                <span className=" text-[14px] text-[#6D6E72]">
                  ({product.ratings.length} đánh giá)
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
