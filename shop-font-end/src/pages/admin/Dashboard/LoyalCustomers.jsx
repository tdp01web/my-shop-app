import React, { useState } from "react";
import { Table, Button, Space, DatePicker } from "antd";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../configs/instance";

const { RangePicker } = DatePicker;

const LoyalCustomers = () => {
  const [pageSize, setPageSize] = useState(3);
  const [dateRange, setDateRange] = useState([]);

  // Fetch dữ liệu khách hàng thân thiết
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["loyalCustomers", dateRange],
    queryFn: async () => {
      const params = {};
      if (dateRange.length === 2) {
        params.startDate = dateRange[0].format("YYYY-MM-DD");
        params.endDate = dateRange[1].format("YYYY-MM-DD");
      }

      const response = await instance.get("/stats/getLoyalCustomers", {
        params,
      });
      return response.data.customers || [];
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
      <Space style={{ marginBottom: 16 }}>
        <RangePicker onChange={(values) => setDateRange(values)} />
        <Button type="primary" onClick={refetch}>
          Lọc
        </Button>
      </Space>
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
