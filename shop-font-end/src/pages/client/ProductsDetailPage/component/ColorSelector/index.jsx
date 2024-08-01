import PropTypes from "prop-types";
import { useEffect } from "react";

const ColorSelector = ({ product, selectedColor, handleColorClick }) => {
  useEffect(() => {
    if (product && product.colors.length > 0) {
      // Khi sản phẩm hoặc màu sắc được thay đổi
      const defaultColor = product.colors[0].hex;
      if (!selectedColor) {
        handleColorClick(defaultColor);
      }
    }
  }, [product, selectedColor, handleColorClick]);

  return (
    <div className="mt-6 flex">
      <h3 className="text-lg font-semibold text-gray-700">Chọn màu</h3>
      <div className="flex items-center ml-3 gap-3">
        {product.colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color.hex)}
            aria-label={color.name}
          >
            <img
              src={color.image}
              alt={color.name}
              className={`w-[50px] h-[50px] object-cover rounded-lg border-2 ${
                selectedColor === color.hex ? "border-black" : "border-gray-300"
              }`}
            />
            <p className="">{color.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

ColorSelector.propTypes = {
  product: PropTypes.shape({
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        hex: PropTypes.string.isRequired,
      })
    ).isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  selectedColor: PropTypes.string.isRequired,
  handleColorClick: PropTypes.func.isRequired,
};

export default ColorSelector;
