import React from "react";
import ProductList from "../../../../../components/ProductList";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../../configs/instance";

const LaptopSellWell = ({ products }) => {
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Category_HomePage"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("/category/getAllCategory");
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn: ~ error:", error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  // Nếu categoriesData hoặc products không có giá trị, trả về null hoặc render thông báo
  const categories = categoriesData?.map((category) => category.name) || [];
  const productList = products?.length > 0 ? products : [];

  return (
    <div className="mx-auto w-full">
      <ProductList
        title="Laptop bán chạy"
        categories={categories}
        titleSale="Miễn Phí giao hàng"
        products={productList}
        seeAllLink="/collection"
      />
    </div>
  );
};

export default LaptopSellWell;
