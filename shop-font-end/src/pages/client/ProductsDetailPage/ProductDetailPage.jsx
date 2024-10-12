import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../config/instance";
import ProductMainSection from "./component/comon/ProductMainSection";
import Review from "./component/Review";
import ProductInfoSection from "./component/comon/ProductInfoSection";

const ProductDetailPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(""); // Lưu hình ảnh đã chọn
  const { id } = useParams();

  // Query để lấy chi tiết sản phẩm
  const {
    data: product,
    isProductLoading,
    isProductError,
  } = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async () => {
      const { data } = await instance.get(`product/getaProduct/${id}`);
      if (!data) throw new Error("Product does not exist");
      return data;
    },
  });

  // Query để lấy tất cả sản phẩm
  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useQuery({
    queryKey: ["ALL_PRODUCTS"],
    queryFn: async () => {
      const { data } = await instance.get("product/getAllProduct");
      return data;
    },
  });

  const similarProducts =
    product && allProducts
      ? allProducts.filter((item) => {
          const currentProductCategoryId = product.category._id;
          const itemCategoryId = item.category._id;

          return (
            itemCategoryId === currentProductCategoryId &&
            item._id !== product._id
          );
        })
      : [];

  // Khi người dùng chọn màu, cập nhật hình ảnh tương ứng
  useEffect(() => {
    if (product && selectedColor) {
      const variant = product.variants.find(
        (variant) => variant.color.url === selectedColor
      );
      if (variant) {
        setSelectedImage(variant.color.url);
        setCurrentImageIndex(0); // Đặt lại ảnh đầu tiên
      }
    }
  }, [selectedColor, product]);

  if (isProductLoading || isAllProductsLoading) return <div>Loading...</div>;
  if (isProductError || isAllProductsError) return <div>Error occurred...</div>;

  return (
    <div className="relative z-20">
      <ProductMainSection
        product={product}
        selectedColor={selectedColor}
        handleColorClick={setSelectedColor}
        selectedImage={selectedImage}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
      <ProductInfoSection product={product} similarProducts={similarProducts} />
      <Review product={product} />
      <div className="p-3"></div>
    </div>
  );
};

export default ProductDetailPage;
