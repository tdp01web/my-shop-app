import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NotSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.state?.query || "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Không tìm thấy sản phẩm
        </h1>
        <p className="text-lg text-gray-700">
          Không có kết quả nào phù hợp với từ khóa <strong>{query}</strong>.
        </p>
        <button
          onClick={() => navigate("/admin/products")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    </div>
  );
};

export default NotSearch;
