import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { instance } from "../../../configs/instance";

const LoyalCustomers = () => {
  const [pageSize, setPageSize] = useState(10);

  // Fetch dữ liệu khách hàng thân thiết
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["loyalCustomers"],
    queryFn: async () => {
      const response = await instance.get("/stats/getLoyalCustomers");
      return response.data.customers || []; // Đảm bảo trả về mảng
    },
  });

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Tổng Số Tiền (VND)",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (value) => value.toLocaleString("vi-VN"), // Format tiền
    },
    {
      title: "Số Lần Mua",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
  ];

  return (
    <div>
      {isLoading ? (
        <div>Đang tải dữ liệu...</div>
      ) : error ? (
        <div>Lỗi: {error.message}</div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={{
            pageSize,
            onChange: (page, size) => setPageSize(size),
          }}
        />
      )}
    </div>
  );
};

export default LoyalCustomers;
