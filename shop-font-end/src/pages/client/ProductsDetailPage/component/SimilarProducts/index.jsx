const SimilarProducts = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4">
        Sản phẩm tương tự
      </h2>
      <ul className="list-none space-y-2">
        <li className="flex justify-between items-center">
          <span>Laptop Lenovo ThinkPad T14 Gen 5 21ML007GVA</span>
          <span className="text-red-500">
            36.990.000đ <span className="line-through">37.990.000đ</span>{" "}
            <span className="text-green-500">-3%</span>
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span>Laptop Lenovo ThinkPad X1 Carbon G12 21K0008MWN</span>
          <span className="text-red-500">
            55.990.000đ <span className="line-through">57.990.000đ</span>{" "}
            <span className="text-green-500">-3%</span>
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span>Laptop Lenovo ThinkPad X1 Carbon G12 21K0008MWN</span>
          <span className="text-red-500">
            53.990.000đ <span className="line-through">55.990.000đ</span>{" "}
            <span className="text-green-500">-3%</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SimilarProducts;
