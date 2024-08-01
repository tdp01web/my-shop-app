const ProductConfiguration = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold border-b pb-2 mb-4">Cấu hình</h2>
      <div className="m-3 border border-gray-100 rounded-md">
        <ul className="list-none">
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
            <span>RAM</span>
            <span>32 GB</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300">
            <span>LCD</span>
            <span>14” WUXGA OLED</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
            <span>CPU</span>
            <span>Ultra 7 155H</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300">
            <span>VGA</span>
            <span>Onboard</span>
          </li>
          <li className="grid grid-cols-2 p-3 border text-[14px] border-gray-300 bg-gray-300">
            <span>SSD</span>
            <span>1TB</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductConfiguration;
