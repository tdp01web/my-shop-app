import { useEffect, useState } from "react";

const Quantity = ({ maxQuantity, onChange, initialQuantity = 1 }) => {
  const [notification, setNotification] = useState("");
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setNotification("");
      onChange(newQuantity); // Chỉ gọi onChange khi thực sự có thay đổi
    } else {
      setNotification("Số lượng đã đạt giới hạn.");
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setNotification("");
      onChange(newQuantity); // Chỉ gọi onChange khi thực sự có thay đổi
    }
  };

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="px-3 py-1 rounded-l-md border border-gray-500"
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          className="w-[50px] py-1 text-center border-t border-b border-gray-500 appearance-none"
          readOnly
        />
        <button
          onClick={handleIncrease}
          className="px-3 py-1 rounded-r-md border border-gray-500"
        >
          +
        </button>
      </div>
      {notification && <p className="mt-2 text-red-600">{notification}</p>}
    </div>
  );
};

export default Quantity;
