import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ImageSale from "../sale/iamgeSale";

/* eslint-disable react/prop-types */
const ProductImage = ({
  product,
  selectedImage,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          right: "0px",
          top: "30px",
          zIndex: "99",
        }}
        onClick={onClick}
      ></div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          left: "0px",
          top: "30px",
          zIndex: "99",
        }}
        onClick={onClick}
      ></div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplaySpeed: 1500,
  };

  const imagesToShow = selectedImage
    ? [{ url: selectedImage }, ...product.images]
    : product.images;

  return (
    <div className="col-span-1 w-full">
      <div className="relative w-full h-0 pb-[100%]">
        <img
          className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
          src={imagesToShow[currentImageIndex]?.url}
          alt={product.title}
        />
      </div>

      <div className="relative mt-10">
        <Slider {...settings}>
          {imagesToShow.map((image, index) => (
            <div key={index} className="w-full h-[0] pb-[100%] relative">
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full p-1 object-cover cursor-pointer"
                onClick={() => setCurrentImageIndex(index)}
              />
            </div>
          ))}
        </Slider>
      </div>
      <ImageSale product={product} />
    </div>
  );
};

export default ProductImage;
