import { BackwardFilled, HistoryOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, message, Popconfirm } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByID } from "../../../hooks/queries/useGetOrderByID";
import { usePutOrder } from "../../../hooks/mutations/usePutOrder";
import { useState } from "react";
import moment from "moment/moment";
const DetailCartStaff = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();

  const { data, isLoading, isError } = useGetOrderByID(id, {
    onSuccess: () => {
      console.log("Order fetched successfully.");
    },
    onError: () => {
      messageApi.error("Lỗi khi tải dữ liệu đơn hàng!");
    },
  });


  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading data.</p>;
  const order = data.data;

  return (
    <div className="px-6 py-4">
      {contextHolder}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">
          Chi tiết đơn hàng #{order._id}
        </h1>
        <Button type="primary">
          <Link to="/staff/carts">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>

      <div className="px-6 py-4">
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-[#FF7A00] text-[24px]">
            Trạng thái: {order.orderStatus}
          </p>
          <p className="font-semibold text-[24px]">
            Ngày đặt: {moment(order.createdAt).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <div className="gap-4 grid grid-cols-12 mt-6">
          <div className="col-span-12 md:col-span-8 p-4 border rounded">
            <div className="flex items-center gap-x-3 mb-3">
              <img src="/svg/customer-info.svg" alt="Icon" className="h-7" />
              <p className="font-semibold text-[#333]">Thông tin khách hàng</p>
            </div>
            <p>Người nhận: {order.shippingAddress.name}</p>
            <p>Số điện thoại: {order.shippingAddress.phone}</p>
            <p>
              Địa chỉ:
              {` ${order.shippingAddress.addressLine1} ${order.shippingAddress.ward ? `, ${order.shippingAddress.ward}` : ""} ${order.shippingAddress.district ? `, ${order.shippingAddress.district}` : ""} ${order.shippingAddress.city ? `, ${order.shippingAddress.city}` : ""}`}
            </p>
            {order.orderStatus === "Đã Hủy" && (
              <p>Lý do hủy: {order.cancellationReason}</p>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 p-4 border rounded">
            <div className="flex items-center gap-x-3 mb-3">
              <img src="/svg/payment-method.svg" alt="Icon" className="h-7" />

              <p className="font-semibold text-[#333]">Hình thức thanh toán</p>
            </div>
            <p className="text-[#FF7A00]">{order.paymentMethod}</p>
            <p className="text-[#FF7A00]">{order.paymentStatus}</p>
          </div>
        </div>

        <div className="mt-6 p-4 border rounded">
          <div className="flex items-center gap-x-3 mb-3">
            <img src="/svg/product-info.svg" alt="Icon" className="h-7" />

            <p className="font-semibold text-[#333]">Thông tin sản phẩm</p>
          </div>
          {order.products.map((product) => (
            <div key={product._id} className="flex justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={product?.images?.[0]?.url}
                  alt={product.title}
                  className="mr-4 w-16 h-16 object-cover"
                />
                <div>
                  <p>
                    {product.title} | {product.processor} | {product.gpu} |{" "}
                    {product.ram} | {product.storage}
                  </p>
                  <p>Số lượng: {product.count}</p>
                </div>
              </div>
              <p className="text-right text-[#e30019]">
                {(product.count * product.price).toLocaleString()}đ
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 md:ml-[50%]">
          <div className="flex items-center mb-3">
            <p className="w-1/2">Giá tạm tính:</p>
            <p className="text-right w-1/2">
              {order.totalProductPrice.toLocaleString()}đ
            </p>
          </div>

          <div className="flex items-center mb-3">
            <p className="w-1/2">Phí vận chuyển:</p>
            <p className="text-right w-1/2">
              {order.shippingFee === 0
                ? "Miễn phí"
                : `${order.shippingFee.toLocaleString()}đ`}
            </p>
          </div>
          <div className="flex items-center mb-3">
            <p className="w-1/2">Tổng tiền:</p>
            <p className="text-right w-1/2">
              {order.totalPrice.toLocaleString()}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCartStaff;
