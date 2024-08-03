import Slider from "react-slick";
/* eslint-disable react/prop-types */
const ImageSlideshow = ({ images, setCurrentImageIndex }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
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

export default ImageSlideshow;
