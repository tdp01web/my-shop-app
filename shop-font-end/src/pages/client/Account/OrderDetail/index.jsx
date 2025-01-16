import { Button } from "antd";

import { FaCheckCircle } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import { instance } from "../../../../configs/instance";
import dayjs from "dayjs";
import CancelOrderModal from "./component/CancelOrderModal";
import { useState } from "react";

const OrderDetail = () => {
  const { id } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["ORDER_DETAIL", id],
    queryFn: async () => {
      const r = await instance.get(`/order/${id}`);

      return r.data;
    },
    enabled: !!id,
  });

  if (isFetching && !data) return;

  return (
    <>
      <div className="px-6 py-4 flex items-center justify-between gap-x-2">
        <p className="text-[24px] font-semibold text-[#333]">
          <span>Chi tiết đơn hàng #{data._id}</span>
        </p>

        <p className="text-[#111]">
          Đặt lúc: {dayjs(data.createdAt).format("HH:mm DD.MM.YYYY")}
        </p>
      </div>

      <div className="px-6 flex justify-between items-center mb-2">
        <p className="text-[24px] font-semibold text-[#FF7A00]">
          {data.orderStatus}
        </p>

        {data.orderStatus === "Đang Xử Lý" && (
          <Button danger type="primary" onClick={onOpenModal}>
            Huỷ Đơn hàng
          </Button>
        )}
      </div>

      <div className="px-6 py-4">
        {/* <Steps
          className="pb-4 overflow-y-visible overflow-x-auto pt-9"
          current={1}
          progressDot={customDot}
          items={[
            {
              title: <p className="mt-3">Đơn hàng đã đặt</p>,
              description: (
                <p>
                  {dayjs(data.createdAt).format("HH:mm")} -{" "}
                  {dayjs(data.createdAt).format("DD.MM.YYYY")}
                </p>
              ),
            },
            {
              title: <p className="mt-3">Tiếp nhận và chờ xử lý</p>,
            },
            {
              title: <p className="mt-3">Đã giao cho ĐVVC</p>,
            },
            {
              title: <p className="mt-3">Đang giao</p>,
            },
            {
              title: <p className="mt-3">Đánh giá</p>,
            },
          ]}
          labelPlacement="horizontal"
          responsive={false}
        /> */}

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 rounded border border-[#CFCFCF] pt-3 px-4 pb-4">
            <div className="flex items-center gap-x-3 mb-3">
              <img src="/svg/customer-info.svg" alt="Icon" className="h-7" />

              <p className="text-[#333] font-semibold">Thông tin khách hàng</p>
            </div>

            <div className="flex items-center mb-3 gap-x-3">
              <p className="w-1/3">Người nhận:</p>
              <p className="flex-1">
                {data.shippingAddress.name} - {data.shippingAddress.phone}
              </p>
            </div>

            <div className="flex items-center mb-3 gap-x-3">
              <p className="w-1/3">Địa chỉ nhận hàng:</p>
              <p className="flex-1">
                {data.shippingAddress.addressLine1}, {data.shippingAddress.ward}
                , {data.shippingAddress.district}, {data.shippingAddress.city}
              </p>
            </div>

            {data.orderStatus === "Đã Hủy" && (
              <div className="flex items-center mb-3 gap-x-3">
                <p className="w-1/3">Lý do huỷ:</p>
                <p className="flex-1">{data?.cancellationReason}</p>
              </div>
            )}

            {/* {data.orderStatus !== "Đã Hủy" ? (
              <div className="flex items-center mb-3 gap-x-3">
                <p className="w-1/3">Thời gian nhận hàng:</p>
                <p className="flex-1"></p>
              </div>
            ) : (
              <div className="flex items-center mb-3 gap-x-3">
                <p className="w-1/3">Lý do huỷ:</p>
                <p className="flex-1">{data?.cancellationReason}</p>
              </div>
            )} */}
          </div>

          <div className="col-span-12 md:col-span-4 pt-3 px-2 pb-4 border border-[#CFCFCF] rounded">
            <div className="flex items-center gap-x-3 mb-3">
              <img src="/svg/payment-method.svg" alt="Icon" className="h-7" />

              <p className="text-[#333] font-semibold">Hình thức thanh toán:</p>
            </div>

            <p className="text-[#ff7300]">{data.paymentMethod} </p>
            <div className="flex gap-[5px] mt-3">
              <p className="text-[#333] font-semibold">
                Trạng thái thanh toán:
              </p>
              <p className="text-[#ff7300]">{data.paymentStatus}</p>
            </div>
          </div>
        </div>

        <div className="pt-3 px-4 pb-4 mt-4 border border-[#CFCFCF] rounded">
          <div className="flex items-center gap-x-3 mb-3">
            <img src="/svg/product-info.svg" alt="Icon" className="h-7" />

            <p className="text-[#333] font-semibold">Thông tin sản phẩm</p>
          </div>

          {data.products.map((it) => (
            <div key={it._id} className="p-2 flex gap-x-4">
              <div className="w-3/4 flex gap-x-3 items-center">
                <img
                  src={it?.images?.[0]?.url}
                  alt="Product image"
                  className="w-[60px] h-[60px] object-cover"
                />

                <div>
                  <p className="text-[#111]">
                    {it?.title} | {it?.gpu} | {it?.ram} | {it?.storage}
                  </p>

                  <p className="text-[14px] text-[#535353] mt-1">
                    Số lượng: {it.count}
                  </p>
                </div>
              </div>

              <div className="w-1/4">
                <p className="text-[#e30019] text-right break-words">
                  {(it.count * it.price).toLocaleString()}đ
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:ml-[50%] mt-4">
          {/* <div className="flex items-center mb-3">
            <p className="w-1/2">Giá tạm tính:</p>
            <p className="w-1/2 text-right">
              {data.totalPrice.toLocaleString()}đ
            </p>
          </div> */}

          <div className="flex items-center mb-3">
            <p className="w-1/2">Phí vận chuyển:</p>
            <p className="w-1/2 text-right">
              {data.shippingFee === 0
                ? "Miễn phí"
                : data.shippingFee.toLocaleString() + "đ"}
            </p>
          </div>

          {/* <div className="flex items-center mb-3">
            <p className="w-1/2">Giảm giá trên đơn hàng:</p>
            <p className="w-1/2 text-right">- 50.000₫</p>
          </div> */}

          <div className="flex items-center mb-3">
            <p className="w-1/2">Tổng tiền:</p>
            <p className="w-1/2 text-right">
              {data.totalPrice.toLocaleString()}đ
            </p>
          </div>

          {/* <div className="flex items-center mb-3">
            <p className="w-1/2 flex items-center gap-x-1">
              <FaCheckCircle className="text-[14px] text-[#24b400]" />
              <span>Số tiền đã thanh toán:</span>
            </p>
            <p className="w-1/2 text-right font-bold text-[#e30019]">0₫</p>
          </div> */}
        </div>

        <div className="my-40 text-center">
          <Link
            to="/account/orders-history"
            className="inline-flex items-center px-6 text-white bg-[#1982f9] rounded h-[50px]"
          >
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </div>

      <CancelOrderModal
        open={openModal}
        onClose={onCloseModal}
        orderId={id}
        refetch={refetch}
      />
    </>
  );
};

export default OrderDetail;
