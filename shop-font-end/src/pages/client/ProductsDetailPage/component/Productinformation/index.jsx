import { useState } from "react";
/* eslint-disable react/prop-types */
const ProductInformation = ({ product }) => {
  const [showFullReview, setShowFullReview] = useState(false);

  const toggleReview = () => {
    setShowFullReview((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full lg:w-7/12">
      <div className="w-full">
        <h2 className="text-sm font-semibold border-b pb-2 mb-4">
          Thông tin sản phẩm
        </h2>
        <div>
          <h3 className="font-bold mb-2 text-sm">Thông số kĩ thuật:</h3>
          <table className="w-full text-left border-collapse border">
            <tbody>
              {product.specifications.map((spec, index) => (
                <tr className="border" key={index}>
                  <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                    {spec.key}
                  </th>
                  <td className="border px-3 text-xs">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          {showFullReview ? (
            <>
              <div className="mt-4">
                <h1 className="font-bold mb-2 text-[22px]">
                  {product.review.title}
                </h1>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="w-full">
                    <div className="mt-4">
                      {product.review.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="blur-sm">{product.review.title}</div>
          )}
          <button className="mt-2 text-blue-500" onClick={toggleReview}>
            {showFullReview ? "Thu gọn ▲" : "Đọc tiếp bài viết ▼"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
