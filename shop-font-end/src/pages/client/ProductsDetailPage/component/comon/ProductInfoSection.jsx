import ProductConfiguration from "../Configuration";
import ProductInformation from "../Productinformation";
import SimilarProducts from "../SimilarProducts";
import TechNews from "../TechNews";

const ProductInfoSection = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-4 gap-4 lg:w-[80%] mx-auto">
      <ProductInformation />
      <div className="space-y-4 w-full lg:w-5/12">
        <ProductConfiguration />
        <SimilarProducts />
        <TechNews />
      </div>
    </div>
  );
};

export default ProductInfoSection;
