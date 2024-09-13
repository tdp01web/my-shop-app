import { useEffect } from "react";
import Quantity from "../../../../../components/Quantity";

/* eslint-disable react/prop-types */
const ColorSelector = ({ product, selectedColor, handleColorClick }) => {
  useEffect(() => {
    if (product && product.colors.length > 0) {
      const defaultColor = product.colors[0].hex;
      if (!selectedColor) {
        handleColorClick(defaultColor);
      }
    }
  }, [product, selectedColor, handleColorClick]);

  return (
    <div className="flex flex-col">
      <div>
        <h3 className="text-sm font-semibold text-gray-700">Chọn màu</h3>
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
                  selectedColor === color.hex
                    ? "border-black"
                    : "border-gray-300"
                }`}
              />
              <p className="">{color.name}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Chọn số lượng */}
      <div>
        <Quantity />
      </div>
    </div>
  );
};

export default ColorSelector;
