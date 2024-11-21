import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";
import { Empty, Input } from "antd";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../configs/instance";

const TABS = [
  {
    id: 1,
    label: "Tất cả",
  },
  {
    id: 2,
    label: "Đang Xử Lý",
  },
  {
    id: 3,
    label: "Đã Xác Nhận",
  },
  {
    id: 5,
    label: "Đang Giao Hàng",
  },
  {
    id: 6,
    label: "Đã Giao Hàng",
  },
  {
    id: 7,
    label: "Hoàn Thành",
  },
  {
    id: 8,
    label: "Đã Hủy",
  },
];

const OrdersHistory = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].label);
  const [searchStr, setSearchStr] = useState();
  const [orders, setOrders] = useState([]);

  const { data } = useQuery({
    queryKey: ["USER_ORDERS_HISTORY"],
    queryFn: async () => {
      const r = await instance.get("/order");

      return r.data;
    },
  });

  useEffect(() => {
    setOrders(data);
  }, [data]);

  const selectedOrders = useMemo(() => {
    if (activeTab === TABS[0].label) {
      return orders;
    }

    return orders?.filter((it) => it.orderStatus === activeTab);
  }, [activeTab, orders]);

  const renderOrderCount = (status) => {
    let count = 0;
    if (status === TABS[0].label) {
      count = orders?.length;
    } else {
      const data = orders?.filter((x) => x.orderStatus === status);
      count = data?.length;
    }

    if (count > 0) {
      return `(${count})`;
    }
  };

  const onSearch = () => {
    const orderFilters = data?.filter((it) => it._id.includes(searchStr));
    setOrders(orderFilters);
  };

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
              activeTab === it.label && styles.active
            }`}
            onClick={() => setActiveTab(it.label)}
          >
            <span>{it.label}</span>

            <span className="text-[#ff3c53]">
              {" "}
              {renderOrderCount(it.label)}
            </span>
          </p>
        ))}
      </div>

      {/* search box */}
      <div className="bg-[#ececec]">
        <Input
          placeholder="Tìm đơn hàng theo Mã đơn hàng"
          className="my-3 rounded"
          size="large"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          prefix={<IoSearchSharp className="text-[#111] text-[16px]" />}
          suffix={
            <p className="text-[#1982f9] cursor-pointer" onClick={onSearch}>
              Tìm đơn hàng
            </p>
          }
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              onSearch();
            }
          }}
        />
      </div>

      {/* not found */}
      {selectedOrders?.length === 0 && (
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

      {selectedOrders?.length > 0 && <OrderList data={selectedOrders} />}
    </>
  );
};

export default OrdersHistory;
