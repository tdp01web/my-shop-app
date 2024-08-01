import PropTypes from "prop-types";
import ProductDetailsPrice from "../ProductsPrice";
import ColorSelector from "../ColorSelector";
import ButtonBuy from "../button";
import ProductFeatures from "../ProductFeatures";
import Promotions from "../Promotions";

const ProductInfo = ({ product, selectedColor, handleColorClick }) => {
  return (
    <div className="col-span-2 md:flex md:space-x-6">
      <div className="hidden md:block border-l border-gray-300"></div>
      <div className="col-span-2 md:col-span-1 space-y-4">
        <ProductDetailsPrice product={product} />
        <ColorSelector
          product={product}
          selectedColor={selectedColor}
          handleColorClick={handleColorClick}
        />
        <ButtonBuy />
        <ProductFeatures />
        <Promotions />
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  selectedColor: PropTypes.string.isRequired,
  handleColorClick: PropTypes.func.isRequired,
};

export default ProductInfo;
