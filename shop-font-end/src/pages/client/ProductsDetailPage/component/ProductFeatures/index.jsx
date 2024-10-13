/* eslint-disable react/prop-types */
const ProductFeatures = ({ product }) => {
  return (
    <div className="space-y-2">
      {product.features && product.features.length > 0 ? (
        product.features.map((feature, index) => (
          <p
            key={index}
            className="flex items-center gap-1 mt-4 text-black text-[18px] font-400"
          >
            <span>✓ {feature}</span>
          </p>
        ))
      ) : (
        <p className="text-gray-500"></p>
      )}
    </div>
  );
};

export default ProductFeatures;
