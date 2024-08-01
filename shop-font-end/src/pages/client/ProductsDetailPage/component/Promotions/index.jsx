const Promotions = () => {
  return (
    <div className="space-y-2">
      <div className="hidden md:block border-b border-gray-300 mb-40"></div>
      <div className="border rounded-lg">
        <h1 className="text-xs font-semibold bg-[#CFCFCF] p-3 rounded-t-lg">
          <span className="ml-2">Khuyến mãi</span>
        </h1>
        <ul className="list-none p-4 space-y-2">
          <li className="flex items-start">
            <span className="bg-green-700 text-white text-[10px] font-900 rounded-full flex items-center justify-center w-4 h-4 mr-2 mt-1">
              ✓
            </span>
            <span className="text-[14px]">
              Giảm ngay 100.000đ khi mua Microsoft Office kèm Laptop tại GEARVN.
              <a href="#" className="text-blue-500">
                (Xem thêm)
              </a>
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-green-700 text-white text-[10px] font-900 rounded-full flex items-center justify-center w-4 h-4 mr-2 mt-1">
              ✓
            </span>
            <span className="text-[14px]">
              Ưu đãi 50.000đ khi mua thêm túi chống sốc kèm Laptop.
              <a href="#" className="text-blue-500">
                (Xem thêm)
              </a>
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-green-700 text-white text-[10px] font-900 rounded-full flex items-center justify-center w-4 h-4 mr-2 mt-1">
              ✓
            </span>
            <span className="text-[14px]">
              Ưu đãi 100.000đ khi mua thêm RAM Laptop với Laptop Văn Phòng.
              <a href="#" className="text-blue-500">
                (Xem thêm)
              </a>
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-green-700 text-white text-[10px] font-900 rounded-full flex items-center justify-center w-4 h-4 mr-2 mt-1">
              ✓
            </span>
            <span className="text-[14px]">
              Ưu đãi 50.000đ khi mua giá treo kèm Laptop.
              <a href="#" className="text-blue-500">
                (Xem thêm)
              </a>
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-green-700 text-white text-[10px] font-900 rounded-full flex items-center justify-center w-4 h-4 mr-2 mt-1">
              ✓
            </span>
            <span className="text-[14px]">
              Ưu đãi 50.000đ khi mua đế tản nhiệt kèm Laptop.
              <a href="#" className="text-blue-500">
                (Xem thêm)
              </a>
            </span>
          </li>
        </ul>
      </div>
      <div className="p-2"></div>
    </div>
  );
};

export default Promotions;
