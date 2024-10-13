/* eslint-disable react/prop-types */
const ProductConfiguration = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold border-b pb-2 mb-4">Cấu hình</h2>
      <div className="m-3 border border-gray-100 rounded-md">
        {product.variants.length > 0 && (
          <ul className="list-none">
            <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
              <span>RAM</span>
              <span>{product.variants[0].ram || "N/A"}</span>
            </li>
            <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300">
              <span>LCD</span>
              <span>{product.variants[0].lcd || "N/A"}</span>
            </li>
            <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
              <span>CPU</span>
              <span>{product.variants[0].cpu || "N/A"}</span>
            </li>
            <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300">
              <span>VGA</span>
              <span>{product.variants[0].vga || "N/A"}</span>
            </li>
            <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
              <span>SSD</span>
              <span>{product.variants[0].ssd || "N/A"}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default ProductConfiguration;
