import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../../../../pages/client/Collection/component/ProductList";

const ProductListSearch = () => {
  const location = useLocation();
  const { query, results = [] } = location.state || { query: "", results: [] };

  const [noResultsMessage, setNoResultsMessage] = useState("");

  useEffect(() => {
    if (results.length === 0) {
      setNoResultsMessage("Không có sản phẩm nào.");
    } else {
      setNoResultsMessage("");
    }
  }, [results]);

  return (
    <div className="w-full bg-cover flex bg-white rounded-sm flex-col bg-center gap-3 h-auto p-4">
      <div className="relative z-20 flex flex-col gap-6 2xl:w-[80%] 2xl:mx-auto md:px-10">
        <h1 className="text-2xl mb-4">Kết quả tìm kiếm cho: {query}</h1>
        {results.length > 0 ? (
          <ProductList products={results} />
        ) : (
          <div className="text-red-500 text-center mt-4">
            {noResultsMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListSearch;
