import React from "react";

const ProductDescription = ({ description }) => {
  return (
    <div className="flex flex-col w-[60%] bg-white p-4 gap-3 rounded-md">
      <h2 className="text-[24px] font-600">Đặc điểm nổi bật</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;
