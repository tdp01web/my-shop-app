import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

/* eslint-disable react/prop-types */
const ProductImage = ({ product, currentImageIndex, setCurrentImageIndex }) => {
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  if (!product || !product.images || product.images.length === 0) {
    return <div>Loading...</div>;
  }

  const safeIndex = Math.max(
    0,
    Math.min(currentImageIndex, product.images.length - 1)
  );
  const currentImage = product.images[safeIndex];

  return (
    <div className="col-span-1">
      <img
        className="w-full md:h-[40%] object-cover object-center rounded-lg"
        src={currentImage.url}
        alt={product.name}
      />
      <div className="relative mt-10">
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index} className="p-1">
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="w-[100%] h-[100%] md:h-[60px] object-cover cursor-pointer"
                onClick={() => setCurrentImageIndex(index)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImage;
