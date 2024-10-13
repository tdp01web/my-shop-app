import ProductConfiguration from "../Configuration";
import ProductInformation from "../Productinformation";
import SimilarProducts from "../SimilarProducts";
import TechNews from "../TechNews";

/* eslint-disable react/prop-types */
const ProductInfoSection = ({ product, similarProducts }) => {
  return (
    <div className="flex flex-col lg:flex-row mt-4 gap-4 lg:w-[80%] mx-auto">
      <ProductInformation product={product} />
      <div className="space-y-4 w-full lg:w-5/12">
        <ProductConfiguration product={product} />
        <SimilarProducts products={similarProducts} />
        <TechNews product={product} />
      </div>
    </div>
  );
};

export default ProductInfoSection;
