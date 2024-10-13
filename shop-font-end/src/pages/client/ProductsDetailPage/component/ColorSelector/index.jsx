/* eslint-disable react/prop-types */
const ColorSelector = ({ product, selectedColor, handleColorClick }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold">Select Color:</h3>
      <div className="flex space-x-2 ml-4">
        {product.variants.map((variant) => (
          <div
            key={variant._id}
            className={`cursor-pointer flex items-center justify-center ${
              selectedColor === variant.color.url
                ? "border-black"
                : "border-gray-300"
            }`}
            onClick={() => handleColorClick(variant.color.url)}
          >
            <img
              src={variant.color.url}
              alt={variant.color.title}
              className="w-[50px] h-[50px] object-cover rounded-lg border-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
