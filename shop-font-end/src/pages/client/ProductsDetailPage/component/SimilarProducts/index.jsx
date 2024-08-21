import { AiFillStar } from "react-icons/ai";

const SimilarProducts = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-[24px] font-semibold pb-2 mb-4">Sản phẩm tương tự</h2>
      <ul className="list-none space-y-2">
        <li className="flex justify-between items-center mb-10">
          <img
            src="https://product.hstatic.net/200000722513/product/ava_39a1d4796c6a4d0c9c9c7ba46a717d4a_medium.png"
            alt=""
            className="w-[22%]"
          />
          <div className="w-[60%] mr-32">
            <span className="text-[14px] font-semibold">
              Laptop Lenovo Yoga Pro 7 14IMH9 83E2005DVN
            </span>
            <br />
            <span className="line-through text-gray-800 font-400 text-[13px]">
              37.990.000đ
            </span>
            <br />
            <span className="text-red-500 gap-3 flex font-semibold">
              <span> 36.990.000đ</span>
              <span className=" border border-red-600 px-2 text-[13px] bg-red-100">
                -3%
              </span>
            </span>
            <div className="flex gap-1 items-center md:text-[12px] font-semibold text-[#FF8A00]">
              <span>0.0</span>
              <AiFillStar className="text-[#FF8A00] " />
              <span className="text-[#6D6E72] font-400 text-[12px] ml-1">
                (0 đánh giá)
              </span>
            </div>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <img
            src="https://product.hstatic.net/200000722513/product/ava_39a1d4796c6a4d0c9c9c7ba46a717d4a_medium.png"
            alt=""
            className="w-[22%]"
          />
          <div className="w-[60%] mr-32">
            <span className="text-[14px] font-semibold">
              Laptop Lenovo Yoga Pro 7 14IMH9 83E2005DVN
            </span>
            <br />
            <span className="line-through text-gray-800 font-400 text-[13px]">
              37.990.000đ
            </span>
            <br />
            <span className="text-red-500 gap-3 flex font-semibold">
              <span> 36.990.000đ</span>
              <span className=" border border-red-600 px-2 text-[13px] bg-red-100">
                -3%
              </span>
            </span>
            <div className="flex gap-1 items-center md:text-[12px] font-semibold text-[#FF8A00]">
              <span>0.0</span>
              <AiFillStar className="text-[#FF8A00] " />
              <span className="text-[#6D6E72] font-400 text-[12px] ml-1">
                (0 đánh giá)
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SimilarProducts;
