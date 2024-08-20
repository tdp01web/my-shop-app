import ProductDetailsPrice from "../ProductsPrice";
import ColorSelector from "../ColorSelector";
import ButtonBuy from "../button";
import ProductFeatures from "../ProductFeatures";
import Promotions from "../Promotions";
import Sale from "../sale";
import GiftList from "../sale/giftList";
/* eslint-disable react/prop-types */
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
        <Sale />
        <ButtonBuy />
        <ProductFeatures product={product} />
        <GiftList product={product} />
        <Promotions product={product} />
      </div>
    </div>
  );
};

export default ProductInfo;
