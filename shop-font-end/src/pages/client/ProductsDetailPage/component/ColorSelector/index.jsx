import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const ColorSelector = ({ product, selectedColor, handleColorClick }) => {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (product && product.colors.length > 0) {
      const defaultColor = product.colors[0].hex;
      if (!selectedColor) {
        handleColorClick(defaultColor);
      }
    }
  }, [product, selectedColor, handleColorClick]);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
      setNotification("");
    } else {
      setNotification("Số lượng đã đạt giới hạn.");
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setNotification("");
    }
  };

  return (
    <div className="mt-6 flex flex-col">
      <div>
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
      <div className="mt-4 flex items-center">
        <h3 className="text-lg font-semibold text-gray-700">Chọn số lượng</h3>
        <div className="flex items-center ml-3">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="px-3 py-1 bg-gray-300 border"
          >
            -
          </button>
          <input
            type="text"
            readOnly
            value={quantity}
            className="w-[40px] py-1 text-center border-t border-b border-gray-300"
          />
          <button
            onClick={() => {
              if (quantity >= maxQuantity) {
                setNotification("Số lượng đã đạt giới hạn.");
              } else {
                handleIncrease();
              }
            }}
            className="px-3 py-1 bg-gray-300 border"
          >
            +
          </button>
        </div>
        <div className="ml-4 -mt-2">
          {notification && <p className="mt-2 text-red-600">{notification}</p>}
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
