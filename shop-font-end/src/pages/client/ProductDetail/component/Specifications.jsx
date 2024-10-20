import React from "react";

const Specifications = () => {
  return (
    <div>
      <table className="min-w-full border border-gray-200">
        <tbody>
          <tr className="border-b">
            <td className="p-3 bg-gray-100 font-semibold">SSD</td>
            <td className="p-3">{selectedVariant.storage.capacity}</td>
          </tr>
          <tr className="border-b">
            <td className="p-3 bg-gray-100 font-semibold">CPU</td>
            <td className="p-3">{selectedVariant.processor.name}</td>
          </tr>
          <tr className="border-b">
            <td className="p-3 bg-gray-100 font-semibold">VGA</td>
            <td className="p-3">{selectedVariant.gpu.name}</td>
          </tr>
          <tr className="border-b">
            <td className="p-3 bg-gray-100 font-semibold">RAM</td>
            <td className="p-3">{selectedVariant.ram.size}</td>
          </tr>
          <tr className="border-b">
            <td className="p-3 bg-gray-100 font-semibold">LCD</td>
            <td className="p-3">
              {product.lcd.resolution} | {product.lcd.size}{" "}
            </td>
          </tr>

          <tr>
            <td className="p-3 bg-gray-100 font-semibold">Số lượng</td>
            <td className="p-3">{selectedVariant.quantity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Specifications;
