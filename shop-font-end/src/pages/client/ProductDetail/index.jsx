import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../configs/instance";
import ProductDetailMain from "./component/ProductDetailMain";
import Loader from "../../../components/Loading";
import SimilarProducts from "./component/SimilarProducts";
import ProductDescription from "./component/ProductDescription";
import ProductComments from "./component/ProductComments";
import Notification from "../../../components/Notification";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null); // Thêm state cho selectedVariant

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await instance.get(`product/getaProduct/${id}`);
        setData(data);

        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }

        if (data?.category?._id) {
          const { data: relatedData } = await instance.get(
            `/product/getRelatedProducts/${data.category._id}/${id}`
          );
          setRelatedProducts(relatedData);
        }
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error)
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
    <div className="lg:w-[80%] w-full flex flex-col mx-auto gap-5  p-5">
      {data && (
        <ProductDetailMain
          product={data}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-4">
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
