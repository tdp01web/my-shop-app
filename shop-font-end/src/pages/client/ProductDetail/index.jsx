import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../configs/instance";
import ProductDetailMain from "./component/ProductDetailMain";
import Loader from "../../../components/Loading";
import SimilarProducts from "./component/SimilarProducts";
import ProductDescription from "./component/ProductDescription";
import ProductComments from "./component/ProductComments";

const ProductDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Lấy chi tiết sản phẩm
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async () => {
      const { data } = await instance.get(`product/getaProduct/${id}`);

      console.log("🚀 ~ queryFn: ~ data:", data);
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch, data]);

  const {
    data: relatedProductsData,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
  } = useQuery({
    queryKey: ["Product_Relate", data?.category?._id, data?._id],
    queryFn: async () => {
      if (!data?.category?._id) return [];
      const { data: relatedData } = await instance.get(
        `/product/getRelatedProducts/${data.category._id}/${data._id}`
      );
      return relatedData;
    },
    enabled: !!data,
  });

  if (isLoading || isRelatedLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError || isRelatedError)
    return (
      <Link to={"/"}>
        Lỗi khi tải dữ liệu sản phẩm vui lòng quay trở về trang chủ.
      </Link>
    );

  return (
    <div className="lg:w-[80%] w-full flex flex-col mx-auto gap-5  p-5">
      {data && <ProductDetailMain product={data} />}

      <div className="flex flex-col lg:flex-row gap-4">
        {data && <ProductDescription description={data.description} />}

        {relatedProductsData && (
          <SimilarProducts dataProductCategory={relatedProductsData} />
        )}
      </div>
      <ProductComments data={data} />
    </div>
  );
};

export default ProductDetail;
