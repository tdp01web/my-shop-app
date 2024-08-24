/* eslint-disable react/prop-types */
const ImageSale = ({ product }) => {
  const { imagesale } = product;
  return (
    <div>
      {imagesale?.map((item, index) => (
        <span key={index}>
          <img src={item.images} alt="" className="w-full" />
        </span>
      ))}
    </div>
  );
};

export default ImageSale;
