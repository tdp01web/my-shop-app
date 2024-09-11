import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";

const SlideImages = () => {
  const { mobile, desktop } = useBreakpoints();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false,
  };

  const slides = [
    { src: "/images/header1.webp", alt: "Header 1" },
    { src: "/images/header2.webp", alt: "Header 2" },
    { src: "/images/header3.webp", alt: "Header 3" },
  ];

  return (
    <div className="slider-container  hidden md:block  w-full ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            className="w-full  sm:h-full object-cover"
            alt={slide.alt}
          />
        ))}
      </Slider>
    </div>
  );
};

export default SlideImages;
