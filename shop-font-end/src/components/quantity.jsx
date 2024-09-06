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

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setNotification("Vui lòng điền số lượng phù hợp.");
      setQuantity("");
    } else if (isNaN(value)) {
      setNotification("Vui lòng điền số lượng phù hợp.");
    } else if (+value >= 1 && +value <= maxQuantity) {
      setQuantity(+value);
      setNotification("");
    } else if (+value > maxQuantity) {
      setNotification("Số lượng đã đạt giới hạn.");
    } else if (+value < 1) {
      setNotification("Số lượng tối thiểu là 1.");
    }
  };
  return (
    <div className=" mt-4 flex  flex-col">
      {/* <h3 className="text-sm font-semibold text-gray-700 whitespace-nowrap">
        Chọn số lượng
      </h3> */}
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
          onChange={handleQuantityChange}
          className="w-[50px] border-gray-500 py-1 text-center border-t border  appearance-none"
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
