import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
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

  const getQuantities = (variants) => {
    return variants?.map((variant) => variant.quantity) || [];
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async () => {
      const { data } = await instance.get(`product/getaProduct/${id}`);
      return data;
    },
    staleTime: 1000 * 60, // Giữ stale trong 1 phút
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const previousQuantitiesRef = useRef([]);

  const haveQuantitiesChanged = (prev, current) => {
    if (prev.length !== current.length) return true;
    return current.some((qty, index) => qty !== prev[index]);
  };

  useEffect(() => {
    const currentQuantities = getQuantities(data?.variants);

    if (
      currentQuantities.length > 0 &&
      previousQuantitiesRef.current.length > 0 &&
      haveQuantitiesChanged(previousQuantitiesRef.current, currentQuantities)
    ) {
      queryClient.invalidateQueries(["PRODUCTS", id]);
      refetch();
    }

    previousQuantitiesRef.current = currentQuantities;
  }, [data?.variants, refetch, id]);

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
