import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Quantity from "../../../../components/quantity";
import { instance } from "../../../../configs/instance";

const ProductDetailMain = ({ product, selectedVariant, onVariantChange }) => {
  const [count, setCount] = useState(1);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = localStorage.getItem("user");

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const handleVariantChange = (variant) => {
    onVariantChange(variant); // Gọi callback để cập nhật state ở cha
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      mutation.mutate({
        productId: product._id,
        variantId: selectedVariant._id,
        count: count,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async (cartData) => {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        return;
      }

      try {
        const { data } = await instance.post(
          "/cart",
          {
            products: [
              {
                product: cartData.productId,
                variant: cartData.variantId,
                count: cartData.count,
              },
            ],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return data;
      } catch (error) {
        // Kiểm tra nếu có phản hồi từ server
        if (error.response && error.response.data) {
          // Ném lỗi với thông báo từ server
          throw new Error(error.response.data.message);
        } else {
          // Ném lỗi chung nếu không có phản hồi cụ thể
          throw new Error("Đã xảy ra lỗi khi thêm vào giỏ hàng");
        }
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      message.success("Thêm vào giỏ hàng thành công");
    },
    onError: (error) => {
      message.error(error.message);
      console.error("🚀 ~ onError:", error.message);
    },
  });

  return (
    <div className="flex lg:flex-row flex-col gap-4 bg-white rounded-lg w-full">
      <div className="w-full lg:w-1/3 slider-product">
        {product?.images?.length > 2 ? (
          <>
            <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
              {product.images.map((image) => (
                <div key={image._id}>
                  <img
                    src={image.url}
                    alt="Product"
                    className="inset-0 rounded-lg w-full h-full object-center object-cover"
                  />
                </div>
              ))}
            </Slider>

            <Slider
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={3}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {product.images.map((image) => (
                <div key={image._id} className="w-full h-full">
                  <img
                    src={image.url}
                    alt="Product Thumbnail"
                    className="inset-0 p-1 w-full h-full cursor-pointer object-cover"
                  />
                </div>
              ))}
            </Slider>
          </>
        ) : (
          <div className="flex justify-center items-center p-5 h-full">
            <img
              src={product?.images[0]?.url || "fallback-image.jpg"}
              alt="Product"
              className="inset-0 rounded-lg w-full"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-5 border-l-2 border-solid w-full lg:w-2/3">
        <h2 className="font-600 text-[24px]">{product?.title}</h2>
        <p className="font-500 text-[20px] text-red-600">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(selectedVariant?.price)}
        </p>

        <table className="border-gray-200 border min-w-full">
          <tbody>
            <tr className="border-b">
              <td className="bg-gray-100 p-3 font-semibold">SSD</td>
              <td className="p-3">
                {selectedVariant?.storage?.capacity || "Chưa có thông tin"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="bg-gray-100 p-3 font-semibold">CPU</td>
              <td className="p-3">
                {selectedVariant?.processor?.name || "Chưa có thông tin"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="bg-gray-100 p-3 font-semibold">VGA</td>
              <td className="p-3">
                {selectedVariant?.gpu?.name || "Chưa có thông tin"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="bg-gray-100 p-3 font-semibold">RAM</td>
              <td className="p-3">
                {selectedVariant?.ram?.size || "Chưa có thông tin"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="bg-gray-100 p-3 font-semibold">LCD</td>
              <td className="p-3">{product?.lcd || "Chưa có thông tin"} | </td>
            </tr>
            <tr>
              <td className="bg-gray-100 p-3 font-semibold">Số lượng</td>
              <td className="p-3">
                {selectedVariant?.quantity || "Chưa có thông tin"}
              </td>
            </tr>
          </tbody>
        </table>

        {product?.variants?.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 mt-5">
              {product.variants.map((variant) => (
                <button
                  key={variant?._id}
                  onClick={() => handleVariantChange(variant)}
                  className={`px-4 py-2 border ${
                    variant?._id === selectedVariant?._id
                      ? "border-orange-400"
                      : "border-gray-300"
                  }`}
                  // disabled={variant?.quantity <= 0 || variant?.status === 0} // Disable nếu hết hàng hoặc không khả dụng
                >
                  {variant?.processor?.name} | {variant?.ram?.size} |{" "}
                  {variant?.storage?.capacity}
                  {variant?.quantity <= 0 && " (Hết hàng)"}
                  {variant?.status === 0 && " (Không khả dụng)"}{" "}
                  {/* Thêm thông báo */}
                </button>
              ))}
            </div>

            {user ? (
              <>
                {selectedVariant?.status === 0 ? (
                  <Link to={"/"}>
                    <Button
                      variant="contained"
                      className="bg-[#E30019] p-4 w-[50%]"
                    >
                      Sản phẩm này hiện không khả dụng
                    </Button>
                  </Link>
                ) : selectedVariant?.quantity <= 0 ? (
                  <Link to={"/"}>
                    <Button
                      variant="contained"
                      className="bg-[#E30019] p-4 w-[50%]"
                    >
                      Sản phẩm này hiện đang hết hàng
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Quantity
                      maxQuantity={selectedVariant?.quantity}
                      onChange={setCount}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddToCart}
                      className="bg-[#E30019] p-4 w-[40%]"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Link to={"/login"}>
                <Button
                  variant="contained"
                  className="bg-[#E30019] p-4 w-[50%]"
                >
                  Vui lòng đăng nhập để mua hàng
                </Button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailMain;
