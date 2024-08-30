import ProductInfo from "../../component/comon/ProductInfo";
import ProductImage from "../Productmage/index";
/* eslint-disable react/prop-types */
const ProductMainSection = ({
  product,
  currentImageIndex,
  setCurrentImageIndex,
  selectedColor,
  handleColorClick,
}) => {
  return (
    <div className="bg-white w-full lg:w-[80%] mx-auto lg:p-4 mt-10 rounded-md">
      <main className="p-4">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 md:gap-6">
          <ProductImage
            product={product}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            handleColorClick={handleColorClick}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductMainSection;
