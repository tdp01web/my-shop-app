/* eslint-disable react/prop-types */
const Promotions = ({ product }) => {
  const { promotions } = product;

  return (
    <div className="space-y-2">
      <div className="hidden md:block border-b border-gray-300 mb-40"></div>
      <div className="border rounded-lg">
        <h1 className="text-xs font-semibold bg-[#CFCFCF] p-3 rounded-t-lg">
          <span className="ml-2">Khuyến mãi</span>
        </h1>
        <ul className="list-none p-4 space-y-2">
          {promotions && promotions.length > 0 ? (
            promotions.map((promo, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-green-700 text-white text-[10px] font-900 rounded-full flex items-center justify-center w-4 h-4 mr-2 mt-1">
                  ✓
                </span>
                <span className="text-[14px]">
                  {promo.description}
                  <a href={promo.linkHref} className="text-blue-500">
                    {promo.linkText}
                  </a>
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Sản phẩm không có khuyến mãi nào.</li>
          )}
        </ul>
      </div>
      <div className="p-2"></div>
    </div>
  );
};

export default Promotions;
