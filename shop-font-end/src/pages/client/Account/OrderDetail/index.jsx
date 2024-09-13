import { Steps } from "antd";
import OrderStep1Icon from "../../../../components/JSXIcon/OrderStep1Icon";
import OrderStep2Icon from "../../../../components/JSXIcon/OrderStep2Icon";
import OrderStep3Icon from "../../../../components/JSXIcon/OrderStep3Icon";
import OrderStep5Icon from "../../../../components/JSXIcon/OrderStep5Icon";
import { FaCheckCircle } from "react-icons/fa";

import styles from "./index.module.css";
import { Link } from "react-router-dom";

const ORDER_ICONS = [
  OrderStep1Icon,
  OrderStep2Icon,
  OrderStep3Icon,
  OrderStep3Icon,
  OrderStep5Icon,
];

const customDot = (dot, { status, index }) => {
  const Icon = ORDER_ICONS[index];

  return (
    <div
      className={`-translate-y-1/2 -translate-x-10 ${
        status === "finish" && styles.activeIcon
      } ${styles.icon}`}
    >
      <Icon />
    </div>
  );
};

const OrderDetail = () => {
  return (
    <>
      <div className="px-6 py-4 flex items-center justify-between gap-x-2">
        <p className="text-[24px] font-semibold text-[#333]">
          <span>Chi tiết đơn hàng #206542 - </span>
          <span className="text-[#FF7A00]">Chưa nhận hàng</span>
        </p>

        <p className="text-[#111]">Đặt lúc: 11:32 Chủ Nhật, 01.09.2024</p>
      </div>

      <div className="px-6 py-4">
        <Steps
          className="pb-4 overflow-y-visible overflow-x-auto pt-9"
          current={1}
          progressDot={customDot}
          items={[
            {
              title: <p className="mt-3">Đơn hàng đã đặt</p>,
              description: <p>16:45 - 1.9.2024</p>,
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
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 rounded border border-[#CFCFCF] pt-3 px-4 pb-4">
            <div className="flex items-center gap-x-3 mb-3">
              <img src="/svg/customer-info.svg" alt="Icon" className="h-7" />

              <p className="text-[#333] font-semibold">Thông tin khách hàng</p>
            </div>

            <div className="flex items-center mb-3 gap-x-3">
              <p className="w-1/3">Người nhận:</p>
              <p className="flex-1">Bùi Xuân Đạt - 0983983983</p>
            </div>

            <div className="flex items-center mb-3 gap-x-3">
              <p className="w-1/3">Địa chỉ nhận hàng:</p>
              <p className="flex-1">Hồ Tùng Mậu, Phú Diễn, Bắc Từ Liêm, HN</p>
            </div>

            <div className="flex items-center mb-3 gap-x-3">
              <p className="w-1/3">Thời gian nhận hàng:</p>
              <p className="flex-1"></p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 pt-3 px-4 pb-4 border border-[#CFCFCF] rounded">
            <div className="flex items-center gap-x-3 mb-3">
              <img src="/svg/payment-method.svg" alt="Icon" className="h-7" />

              <p className="text-[#333] font-semibold">Hình thức thanh toán</p>
            </div>

            <p className="text-[#ff7300]">Chưa thanh toán</p>
          </div>
        </div>

        <div className="pt-3 px-4 pb-4 mt-4 border border-[#CFCFCF] rounded">
          <div className="flex items-center gap-x-3 mb-3">
            <img src="/svg/product-info.svg" alt="Icon" className="h-7" />

            <p className="text-[#333] font-semibold">Thông tin sản phẩm</p>
          </div>

          <div className="p-2 flex gap-x-4">
            <div className="w-3/4 flex gap-x-3 items-center">
              <img
                src="https://picsum.photos/200/200"
                alt="Product image"
                className="w-[60px] h-[60px] object-cover"
              />

              <div>
                <p className="text-[#111]">
                  PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX
                  4090)
                </p>

                <p className="text-[14px] text-[#535353] mt-1">
                  PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX
                  4090)
                </p>

                <p className="text-[14px] text-[#535353] mt-1">Số lượng: 1</p>
              </div>
            </div>

            <div className="w-1/4">
              <p className="text-[#e30019] text-right break-words">
                116.000.000₫
              </p>
            </div>
          </div>

          <div className="p-2 flex gap-x-4">
            <div className="w-3/4 flex gap-x-3 items-center">
              <img
                src="https://picsum.photos/200/200"
                alt="Product image"
                className="w-[60px] h-[60px] object-cover"
              />

              <div>
                <p className="text-[#111]">
                  PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX
                  4090)
                </p>

                <p className="text-[14px] text-[#535353] mt-1">
                  PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX
                  4090)
                </p>

                <p className="text-[14px] text-[#535353] mt-1">Số lượng: 1</p>
              </div>
            </div>

            <div className="w-1/4">
              <p className="text-[#e30019] text-right break-words">
                116.000.000₫
              </p>
            </div>
          </div>

          <div className="p-2 flex gap-x-4">
            <div className="w-3/4 flex gap-x-3 items-center">
              <img
                src="https://picsum.photos/200/200"
                alt="Product image"
                className="w-[60px] h-[60px] object-cover"
              />

              <div>
                <p className="text-[#111]">
                  PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX
                  4090)
                </p>

                <p className="text-[14px] text-[#535353] mt-1">
                  PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX
                  4090)
                </p>

                <p className="text-[14px] text-[#535353] mt-1">Số lượng: 1</p>
              </div>
            </div>

            <div className="w-1/4">
              <p className="text-[#e30019] text-right break-words">
                116.000.000₫
              </p>
            </div>
          </div>
        </div>

        <div className="md:ml-[50%] mt-4">
          <div className="flex items-center mb-3">
            <p className="w-1/2">Giá tạm tính:</p>
            <p className="w-1/2 text-right">139.990.000₫</p>
          </div>

          <div className="flex items-center mb-3">
            <p className="w-1/2">Phí vận chuyển:</p>
            <p className="w-1/2 text-right">Miễn phí</p>
          </div>

          <div className="flex items-center mb-3">
            <p className="w-1/2">Giảm giá trên đơn hàng:</p>
            <p className="w-1/2 text-right">- 50.000₫</p>
          </div>

          <div className="flex items-center mb-3">
            <p className="w-1/2">Tổng tiền:</p>
            <p className="w-1/2 text-right">139.940.000₫</p>
          </div>

          <div className="flex items-center mb-3">
            <p className="w-1/2 flex items-center gap-x-1">
              <FaCheckCircle className="text-[14px] text-[#24b400]" />
              <span>Số tiền đã thanh toán:</span>
            </p>
            <p className="w-1/2 text-right font-bold text-[#e30019]">0₫</p>
          </div>
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
    </>
  );
};

export default OrderDetail;
