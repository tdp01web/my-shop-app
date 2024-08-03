import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
/* eslint-disable react/prop-types */
const ProductImage = ({ product, currentImageIndex, setCurrentImageIndex }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
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
        className="w-full md:h-[50%] object-cover object-center rounded-lg"
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
