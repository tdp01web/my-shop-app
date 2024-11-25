import {
  BackwardFilled,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByID } from "../../../hooks/queries/useGetOrderByID";
import { usePutOrder } from "../../../hooks/mutations/usePutOrder";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment/moment";
const DetailCart = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [cancellationReason, setCancellationReason] = useState("");

  const options = [
    { value: "Đang Xử Lý", label: "Đang Xử Lý" },
    { value: "Đã Xác Nhận", label: "Đã Xác Nhận" },
    { value: "Đang Giao Hàng", label: "Đang Giao Hàng" },
    { value: "Đã Giao Hàng", label: "Đã Giao Hàng" },
    { value: "Hoàn Thành", label: "Hoàn Thành" },
    { value: "Đã Hủy", label: "Đã Hủy" },
  ];

  const { data, isLoading, isError } = useGetOrderByID(id, {
    onSuccess: () => {
      console.log("Order fetched successfully.");
    },
    onError: () => {
      messageApi.error("Lỗi khi tải dữ liệu đơn hàng!");
    },
  });

  const { mutate, isPending } = usePutOrder(id, {
    onSuccess: () => {
      messageApi.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["get-all-orders"] });
      setTimeout(() => {
        navigate("/admin/carts");
      }, 500);
    },
    onError: (error) => {
      messageApi.error(error.response?.data?.message || "Đã xảy ra lỗi!");
    },
  });

  const onFinish = (values) => {
    mutate({
      orderStatus: values.orderStatus,
      cancellationReason: values.cancellationReason,
    });
  };

  const handleValuesChange = (changedValues) => {
    if (changedValues === "Đã Hủy") {
      setCancellationReason("Đã Hủy");
    } else {
      setCancellationReason("");
    }
  };

  useEffect(() => {
    if (data?.data.orderStatus === "Đã Hủy") {
      setCancellationReason("Đã Hủy");
    }
  }, [data?.data.orderStatus]);

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
          <Link to="/admin/carts">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>

      <div className="px-6 py-4">
        <p className="font-semibold text-[#FF7A00] text-[24px]">
          Trạng thái: {order.orderStatus}
        </p>
        <p className="font-semibold text-[24px]">
          Ngày đặt: {moment(order.createdAt).format("YYYY-MM-DD HH:mm")}
        </p>
        <div className="gap-4 grid grid-cols-12 mt-6">
          <div className="col-span-12 md:col-span-8 p-4 border rounded">
            <div className="flex items-center gap-x-3 mb-3">
              <img src="/svg/customer-info.svg" alt="Icon" className="h-7" />
              <p className="font-semibold text-[#333]">Thông tin khách hàng</p>
            </div>
            <p>Người nhận: {order.shippingAddress.name}</p>
            <p>Số điện thoại: {order.shippingAddress.phone}</p>
            <p>
              Địa chỉ: {order.shippingAddress.addressLine1},{" "}
              {order.shippingAddress.ward}, {order.shippingAddress.district},{" "}
              {order.shippingAddress.city}
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
                  <p>{product.title} | {product.processor} | {product.gpu} | {product.ram} | {product.storage}</p>
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

          <div className="flex items-center mb-3">
            <p className="flex items-center gap-x-1 w-1/2">
              <FaCheckCircle className="text-[#24b400] text-[14px]" />
              <span>Số tiền đã thanh toán:</span>
            </p>
            <p className="text-right w-1/2 font-bold text-[#e30019]">
              {order.paidAmount?.toLocaleString() || "0"}đ
            </p>
          </div>
        </div>
        <div className="mt-6 p-4 border rounded">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{
              orderStatus: order.orderStatus,
              cancellationReason: order.cancellationReason,
            }}
            autoComplete="off"
          >
            <Form.Item label="Trạng thái đơn hàng" name="orderStatus">
              <Select
                showSearch
                placeholder="Trạng thái đơn hàng"
                optionFilterProp="label"
                options={options}
                onChange={handleValuesChange}
              />
            </Form.Item>

            {cancellationReason === "Đã Hủy" && (
              <Form.Item
                label="Lý do hủy"
                name="cancellationReason"
                rules={[
                  { required: true, message: "Lý do hủy bắt buộc phải điền" },
                ]}
              >
                <Input placeholder="Nhập lý do hủy" />
              </Form.Item>
            )}

            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isPending}
                loading={isPending}
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
