import React from "react";
import Slider from "react-slick";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../../../../../../components/CarouselSlider";

const SlideBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const images = [
    "/images/homepage/gear_thumb_web_5ab605acf5ac4a3ea7a7adc276bf063b.webp",
    "/images/homepage/gearvn-laptop-slider.webp",
    "/images/homepage/gearvn-pc-gvn-slider.webp",
    "/images/homepage/gearvn-sam-laptop-msi-nhan-mo-hinh-katana-cuc-ngau-banner_5127b896ec22483e9a3fd020925b6021.webp",
    "/images/homepage/gearvn-xa-kho-slider.webp",
    "/images/homepage/loa_xin_slider_55571db8742146cd85eef265cf950b35.webp",
    "/images/homepage/web_slider_800x400_b2s.webp",
    "/images/homepage/web_slider_800x400_laptop_gaming.webp",
    "/images/homepage/web_slider_800x400_man_hinh.webp",
  ];

  return (
    <div className="w-full  md:w-4/5">
      <div className="w-full flex gap-2 p-2">
        <div className="slider-container w-full md:w-2/3  rounded-lg ">
          <Slider {...settings}>
            {images.map((src, index) => (
              <img
                key={index}
                className=" object-fill h-full rounded-lg"
                src={src}
                alt={`slide-${index}`}
              />
            ))}
          </Slider>
        </div>
        <div className="md:flex w-1/3 flex-col gap-2 hidden ">
          <img
            src="/images/homepage/thang_10_layout_web_-04.webp"
            className="w-full object-cover"
            alt=""
          />
          <img
            src="/images/homepage/artboard_2.webp"
            alt=""
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="md:grid grid-cols-3 gap-2 hidden">
        <img
          src="/images/homepage/artboard_3.webp"
          alt=""
          className="w-full object-cover"
        />
        <img
          src="/images/homepage/artboard_4.webp"
          alt=""
          className="w-full object-cover"
        />
        <img
          src="/images/homepage/thang_10_layout_web_-05.webp"
          alt=""
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SlideBanner;
