import { AiFillStar } from "react-icons/ai";

/* eslint-disable react/prop-types */
const SimilarProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>không có sản phẩm tương tự</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-[24px] font-semibold pb-2 mb-4">Sản phẩm tương tự</h2>
      <ul className="list-none space-y-2">
        {products.map((product) => (
          <li
            key={product._id}
            className="flex justify-between items-center mb-10"
          >
            <img
              src={product.images[0].url}
              alt={product.title}
              className="w-[22%] h-[150px] md:h-[100px]"
            />
            <div className="w-[60%] mr-40">
              <span className="text-[14px] font-semibold">{product.title}</span>
              <br />
              {product.variants.length > 0 && (
                <span className="text-red-500 font-semibold">
                  {product.variants[0].price.toLocaleString()}đ
                </span>
              )}
              <div className="flex gap-1 items-center md:text-[12px] font-semibold text-[#FF8A00]">
                <span>{product.totalrating || "0.0"}</span>
                <AiFillStar className="text-[#FF8A00]" />
                <span className="text-[#6D6E72] font-400 text-[12px] ml-1">
                  ({product.ratings.length} đánh giá)
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarProducts;
