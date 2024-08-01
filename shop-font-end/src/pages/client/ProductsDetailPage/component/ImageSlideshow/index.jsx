// components/ImageSlideshow.js
import Slider from "react-slick";
import PropTypes from "prop-types";

const ImageSlideshow = ({ images, setCurrentImageIndex }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true, // Bật chế độ tự động
    autoplaySpeed: 1000, // Thay đổi thời gian chuyển ảnh (3 giây)
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentImageIndex(next),
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative mt-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-1">
            <img
              src={image.url}
              alt={`Slide ${index + 1}`}
              className="w-[100%] h-[100%] md:h-[60px] object-cover cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

ImageSlideshow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  setCurrentImageIndex: PropTypes.func.isRequired,
};

export default ImageSlideshow;
