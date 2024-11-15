import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import * as React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Quantity from "../components/quantity";
import { instance } from "../configs/instance";
import Swal from "sweetalert2";

const ItemProductCard = ({ item }) => {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: async (cartData) => {
      const token = localStorage.getItem("token");
      const result = await Swal.fire({
        title: "Bạn có chắc muốn xóa không?",
        text: "Bạn sẽ không thể khôi phục lại!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa nó!",
      });

      if (result.isConfirmed) {
        try {
          const { data } = await instance.delete(
            `/cart/removeProductFromCart/${cartData.productId}/${cartData.variantId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          Swal.fire({
            title: "Đã xóa!",
            text: "Sản phẩm của bạn đã được xóa.",
            icon: "success",
          });
          return data;
        } catch (error) {
          console.error("🚀 ~ Lỗi trong Mutation:", error);
          throw error;
        }
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      message.error("Đã có lỗi xảy ra");
      console.log(error);
    },
  });

  const mutation = useMutation({
    mutationFn: async (cartData) => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await instance.put(
          `/cart/updateProductInCart/${cartData.productId}/${cartData.variantId}`,
          {
            count: cartData.count,
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
      message.success("Cập nhật giỏ hàng thành công");
    },
    onError: (error) => {
      message.error("Đã có lỗi xảy ra");
      console.log(error);
    },
  });

  const handleQuantityChange = (newQuantity) => {
    mutation.mutate({
      productId: item.product._id,
      variantId: item.variant._id,
      count: newQuantity,
    });
  };

  const handleDelete = () => {
    mutationDelete.mutate({
      productId: item.product._id,
      variantId: item.variant._id,
    });
  };
  return (
    <div className="flex gap-5">
      <div className="flex flex-col justify-center w-[25%]">
        {/* Use optional chaining to safely access the image */}
        <img src={item.product.images[0]?.url} alt={item.product.title} />
        <Button
          onClick={handleDelete}
          className="flex items-center gap-2 mx-auto w-[20%] text-[12px] text-gray-500 hover:text-[#E30019]"
        >
          Xóa <FaRegTrashCan />
        </Button>
      </div>
      <div className="md:flex flex-col justify-center md:gap-2">
        <div>
          <Link to={`/products/${item.product._id}`} className="w-[50%]">
            <p className="font-semibold text-[14px]">
              {item.product.title}
              {item.variant.color ? `| ${item.variant.color.title}` : ""} |{" "}
              {item.variant.gpu.name} | {item.variant.ram.size} |{" "}
              {item.variant.storage.capacity}
            </p>
          </Link>
        </div>
        {item.unavailable ? (
          <span style={{ color: "red" }}>Sản phẩm này hiện không khả dụng</span>
        ) : (
          <div className="w-[25%] md:w-[40%]">
            <p className="font-semibold text-[#E30019] text-[20px]">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.price)}
            </p>
            <Quantity
              maxQuantity={item.variant.quantity}
              initialQuantity={item.count}
              onChange={handleQuantityChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemProductCard;
