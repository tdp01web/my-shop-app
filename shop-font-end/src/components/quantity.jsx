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
    <div className=" mt-4 flex  flex-col">
      <div className="flex items-center ">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="px-3 py-1 rounded-l-md  border border-gray-500"
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          className="w-[50px] py-1 text-center border-t border-b border-gray-500  appearance-none"
          max={maxQuantity}
        />
        <button
          onClick={handleIncrease}
          className="px-3 py-1 rounded-r-md border border-gray-500"
        >
          +
        </button>
      </div>
      <div className="">
        {notification && <p className="mt-2 text-red-600">{notification}</p>}
      </div>
    </div>
  );
};

export default Quantity;
