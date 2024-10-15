import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../configs/instance";
import ProductDetailMain from "./component/ProductDetailMain";
import Loader from "../../../components/Loading";

const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async () => {
      try {
        const { data } = await instance.get(`product/getaProduct/${id}`);
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn: ~ error:", error);
      }
    },
  });

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError) return <div>Lỗi khi tải chi tiết sản phẩm.</div>;

  return (
    <div className="w-[80%] mx-auto bg-white rounded-md p-5">
      {/* Chỉ hiển thị ProductDetailMain khi dữ liệu đã sẵn sàng */}
      {data && <ProductDetailMain product={data} />}
    </div>
  );
};

export default ProductDetail;
