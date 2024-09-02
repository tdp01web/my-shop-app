import { useState } from "react";

const Quantity = () => {
  const [notification, setNotification] = useState("");
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;

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
    <div className=" mt-4 flex items-center flex-wrap">
      <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">
        Chọn số lượng
      </h3>
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
          value={quantity}
          className="w-[50px] py-1 text-center border-t border-b border-gray-300 appearance-none"
          max={maxQuantity}
        />
        <button
          onClick={handleIncrease}
          className="px-3 py-1 bg-gray-300 border"
        >
          +
        </button>
      </div>
      <div className="ml-4 -mt-2">
        {notification && <p className="mt-2 text-red-600">{notification}</p>}
      </div>
    </div>
  );
};

export default Quantity;
