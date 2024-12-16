import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NotSearchStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.state?.query || "";

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-4xl text-red-500">
          Không tìm thấy sản phẩm
        </h1>
        <p className="text-gray-700 text-lg">
          Không có kết quả nào phù hợp với từ khóa <strong>{query}</strong>.
        </p>
        <button
          onClick={() => navigate("/staff/products")}
          className="bg-blue-500 hover:bg-blue-600 mt-6 px-6 py-3 rounded font-medium text-white"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    </div>
  );
};

export default NotSearchStaff;
