import ProductImage from "../Productmage/index";
import ProductInfo from "../../component/comon/ProductInfo";
import PropTypes from "prop-types";

const ProductMainSection = ({
  product,
  currentImageIndex,
  setCurrentImageIndex,
  selectedColor,
  handleColorClick,
}) => {
  return (
    <div className="bg-white w-full lg:w-[80%] mx-auto p-4 mt-20 rounded-md">
      <main className="p-4">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
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
ProductMainSection.propTypes = {
  product: PropTypes.object.isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  setCurrentImageIndex: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired,
  handleColorClick: PropTypes.func.isRequired,
};
export default ProductMainSection;
