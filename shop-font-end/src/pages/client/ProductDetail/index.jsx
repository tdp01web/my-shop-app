import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../configs/instance";
import ProductDetailMain from "./component/ProductDetailMain";
import Loader from "../../../components/Loading";
import SimilarProducts from "./component/SimilarProducts";
import ProductDescription from "./component/ProductDescription";
import ProductComments from "./component/ProductComments";
import Notification from "../../../components/Notification";
import { useQuery } from "@tanstack/react-query";

const ProductDetail = () => {
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await instance.get(`product/getaProduct/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data?.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  useEffect(() => {
    if (data?.variants?.length > 0) {
      setSelectedVariant(data.variants[0]);
    }
  }, [data]);
  const idCategory = data?.category?._id;
  const {
    data: dataRelated,
    isLoading: isLoadingRelated,
    isError: isErrorRelated,
    refetch: refetchRelated,
    error: errorRelated,
  } = useQuery({
    queryKey: ["productRelated", idCategory],
    queryFn: async () => {
      const { data } = await instance.get(
        `/product/getRelatedProducts/${idCategory}/${id}`
      );
      return data;
    },
    enabled: !!idCategory,
  });
  useEffect(() => {
    setRelatedProducts(dataRelated);
  }, [dataRelated]);

  if (isLoading && isLoadingRelated)
    return (
      <div>
        <Loader />
      </div>
    );

  if (isError && isErrorRelated)
    return (
      <Link to={"/"}>
        <Notification
          text1={"Đã có lỗi xảy ra"}
          text2={"Vui lòng quay về trang chủ "}
        />
      </Link>
    );

  return data?.status === 0 ? (
    <Link to={"/"}>
      <Notification
        text1={"Sản phẩm này không khả dụng"}
        text2={"Vui lòng quay về trang chủ "}
      />
    </Link>
  ) : (
    <div className="flex flex-col gap-5 mx-auto p-5 w-full lg:w-[80%]">
      {data && (
        <ProductDetailMain
          product={data}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
      )}

      <div className="flex lg:flex-row flex-col gap-4">
        {data && (
          <ProductDescription
            description={data.description}
            selectedVariant={selectedVariant}
          />
        )}

        {relatedProducts && (
          <SimilarProducts dataProductCategory={relatedProducts} />
        )}
      </div>
      <ProductComments data={data} />
    </div>
  );
};

export default ProductDetail;
