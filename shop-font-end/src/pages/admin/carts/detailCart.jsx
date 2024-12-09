import { BackwardFilled, HistoryOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, message, Popconfirm } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByID } from "../../../hooks/queries/useGetOrderByID";
import { usePutOrder } from "../../../hooks/mutations/usePutOrder";
import { useState } from "react";
import moment from "moment/moment";
import ModalHistoryOrder from "./modalHistoryOrder";
import CancelOrderModal from "./CancelOrderModal";
const DetailCart = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError } = useGetOrderByID(id, {
    onSuccess: () => {
      console.log("Order fetched successfully.");
    },
    onError: () => {
      messageApi.error("Lỗi khi tải dữ liệu đơn hàng!");
    },
  });

  const { mutate, mutateAsync, isPending } = usePutOrder(id, {
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

  const renderStatusButtons = () => {
    switch (data?.data?.orderStatus) {
      case "Đang Xử Lý":
        return (
          <>
            <PopConfirmWrap status="Đã Xác Nhận">
              <Button type="primary">Xác nhận đơn hàng</Button>
            </PopConfirmWrap>

            <Button onClick={() => setCancelModalOpen(true)} danger>
              Hủy
            </Button>
          </>
        );

      case "Đã Xác Nhận":
        return (
          <PopConfirmWrap status="Đang Giao Hàng">
            <Button type="primary">Đang Giao Hàng</Button>
          </PopConfirmWrap>
        );

      case "Đang Giao Hàng":
        return (
          <PopConfirmWrap status="Đã Giao Hàng">
            <Button type="primary">Đã Giao Hàng</Button>
          </PopConfirmWrap>
        );

      // case "Đã Giao Hàng":
      //   return (
      //     <PopConfirmWrap status="Hoàn Thành">
      //       <Button type="primary">Hoàn Thành</Button>
      //     </PopConfirmWrap>
      //   );

      default:
        return [];
    }
  };

  const onCancelOrder = async (values) => {
    await mutateAsync({
      orderStatus: "Đã Hủy",
      cancellationReason: values.cancelReason,
    });

    setCancelModalOpen(false);
  };

  const PopConfirmWrap = ({ children, status }) => {
    const onOk = () => {
      mutate({
        orderStatus: status,
      });
    };

    return (
      <Popconfirm
        title="Cập nhật trạng thái"
        description={`Xác nhận cập nhật trạng thái ${status}?`}
        onConfirm={onOk}
      >
        {children}
      </Popconfirm>
    );
  };

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
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-[#FF7A00] text-[24px]">
            Trạng thái: {order.orderStatus}
          </p>
          <p className="font-semibold text-[24px]">
            Ngày đặt: {moment(order.createdAt).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <Button type="primary" className="mt-4" onClick={showModal}>
          <HistoryOutlined /> Lịch sử đơn hàng
        </Button>
        <ModalHistoryOrder
          id={id}
          isModalOpen={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        />
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

        {order.orderStatus !== "Hoàn Thành" &&
          order.orderStatus !== "Đã Hủy" &&
          order.orderStatus !== "Đã Giao Hàng" && (
            <div className="mt-6 p-4 border rounded text-center">
              <p className="font-semibold text-[18px]">
                Cập nhật trạng thái đơn hàng
              </p>

              <Flex justify="center" className="mt-4" gap="8px">
                {renderStatusButtons()}
              </Flex>
            </div>
          )}
      </div>

      <CancelOrderModal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onOk={onCancelOrder}
        loading={isPending}
      />
    </div>
  );
};

export default DetailCart;
