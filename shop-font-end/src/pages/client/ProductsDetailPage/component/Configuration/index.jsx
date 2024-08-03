/* eslint-disable react/prop-types */
const ProductConfiguration = ({ product }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold border-b pb-2 mb-4">Cấu hình</h2>
      <div className="m-3 border border-gray-100 rounded-md">
        <ul className="list-none">
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
            <span>RAM</span>
            <span>{product.ram}</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300">
            <span>LCD</span>
            <span>{product.lcd}</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
            <span>CPU</span>
            <span>{product.cpu}</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300">
            <span>VGA</span>
            <span>{product.vga}</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
            <span>SSD</span>
            <span>{product.ssd}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ProductConfiguration;
