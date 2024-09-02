import { useState } from "react";
import styles from "./index.module.css";
import { Empty, Input } from "antd";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";

const TABS = [
  {
    id: 1,
    label: "Tất cả",
  },
  {
    id: 2,
    label: "Mới",
  },
  {
    id: 3,
    label: "Đang xử lý",
  },
  {
    id: 4,
    label: "Đang vận chuyển",
  },
  {
    id: 5,
    label: "Hoàn thành",
  },
  {
    id: 6,
    label: "Huỷ",
  },
];

const OrdersHistory = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <>
      <h2 className="text-[24px] font-semibold px-6 py-4 text-[#333] leading-tight">
        Quản lý đơn hàng
      </h2>

      {/* tab */}
      <div className="flex items-center justify-between mt-3 overflow-x-auto">
        {TABS.map((it, idx) => (
          <p
            key={idx}
            className={`${styles.tabItem} ${
              activeTab === it.id && styles.active
            }`}
            onClick={() => setActiveTab(it.id)}
          >
            <span>{it.label}</span>

            {activeTab === it.id && (
              <span className="text-[#ff3c53]"> (1)</span>
            )}
          </p>
        ))}
      </div>

      {/* search box */}
      <div className="bg-[#ececec]">
        <Input
          placeholder="Tìm đơn hàng theo Mã đơn hàng"
          className="my-3 rounded"
          size="large"
          prefix={<IoSearchSharp className="text-[#111] text-[16px]" />}
          suffix={<p className="text-[#1982f9] cursor-pointer">Tìm đơn hàng</p>}
        />
      </div>

      {/* not found */}
      {activeTab === 1 && (
        <div className="py-6">
          <Empty
            description={
              <p className="text-[#111]">Quý khách chưa có đơn hàng nào.</p>
            }
          />

          <div className="text-center mt-4">
            <Link className="bg-[#e30019] rounded h-[40px] inline-flex text-white items-center px-3">
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      )}

      {activeTab !== 1 && <OrderList />}
    </>
  );
};

export default OrdersHistory;
