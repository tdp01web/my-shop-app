import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Quantity from "../../../../components/quantity";
import { instance } from "../../../../configs/instance";

const ProductDetailMain = ({ product }) => {
  const availableVariants = product.variants.filter(
    (variant) => variant.quantity > 0
  );
  const [selectedVariant, setSelectedVariant] = useState(
    availableVariants[0] || null
  );
  const [count, setCount] = useState(1);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
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
        console.error("🚀 ~ Error in Mutation:", error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      message.success("Thêm vào giỏ hàng thành công");
    },
    onError: (error) => {
      message.error("Đã có lỗi xảy ra");
      console.log(error);
    },
  });

  return (
    <div className="w-full flex gap-4 bg-white rounded-md">
      <div className="slider-product w-1/3 ">
        <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
          {product.images.map((image) => (
            <div key={image._id}>
              <img src={image.url} alt="Product" />
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
            <div key={image._id}>
              <img src={image.url} alt="Product Thumbnail" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-2/3 p-5 border-l-2 flex flex-col gap-4 border-solid">
        <h2 className="text-[24px] font-600">{product.title}</h2>
        <p className="text-[20px] font-500 text-red-600">
          {selectedVariant
            ? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(selectedVariant.price)
            : "Không có biến thể nào có sẵn"}
        </p>

        {selectedVariant ? (
          <>
            <table className="min-w-full border border-gray-200">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 bg-gray-100 font-semibold">SSD</td>
                  <td className="p-3">{selectedVariant.storage.capacity}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 bg-gray-100 font-semibold">CPU</td>
                  <td className="p-3">{selectedVariant.processor.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 bg-gray-100 font-semibold">VGA</td>
                  <td className="p-3">{selectedVariant.gpu.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 bg-gray-100 font-semibold">RAM</td>
                  <td className="p-3">{selectedVariant.ram.size}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 bg-gray-100 font-semibold">LCD</td>
                  <td className="p-3">
                    {product.lcd.resolution} | {product.lcd.size}
                  </td>
                </tr>

                <tr>
                  <td className="p-3 bg-gray-100 font-semibold">Số lượng</td>
                  <td className="p-3">{selectedVariant.quantity}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-wrap gap-2 mt-5">
              {availableVariants.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => handleVariantChange(variant)}
                  className={`px-4 py-2 border ${
                    variant._id === selectedVariant._id
                      ? "border-orange-400"
                      : "border-gray-300"
                  }`}
                >
                  {variant.processor.name} | {variant.ram.size} |{" "}
                  {variant.storage.capacity}
                </button>
              ))}
            </div>
            <Quantity
              maxQuantity={selectedVariant.quantity}
              onChange={setCount}
            />
            <Button
              variant="contained"
              onClick={handleAddToCart}
              className="w-[40%] p-4 bg-[#E30019]"
            >
              Thêm vào giỏ hàng
            </Button>
          </>
        ) : (
          <Link to={"/"}>
            <Button variant="contained" className="w-[50%] p-4 bg-[#E30019]">
              Sản phẩm này hiện đang hết hàng
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductDetailMain;
