// frontend/src/ProductsBySales.js

import React, { useState } from "react";
import { Table, Select, Button, Space, DatePicker } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ProductsBySales = () => {
  const [filterType, setFilterType] = useState("month");
  const [customDateRange, setCustomDateRange] = useState([null, null]);

  // Fetch products data with filtering
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["productsBySales", filterType, customDateRange],
    queryFn: async () => {
      const response = await axios.get("/stats/getTopSellingProducts", {
        params: {
          filterType,
          startDate: customDateRange[0]
            ? customDateRange[0].toISOString()
            : null,
          endDate: customDateRange[1] ? customDateRange[1].toISOString() : null,
        },
      });
      return response.data.products || []; // Ensure it defaults to an empty array if undefined
    },
  });

  const handleApplyFilter = () => {
    refetch(); // Trigger refetch when filter is applied
  };

  // Table columns
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lượt bán",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <Select
          defaultValue="month"
          onChange={(value) => setFilterType(value)}
          style={{ width: 150 }}
        >
          <Option value="day">Ngày</Option>
          <Option value="week">Tuần</Option>
          <Option value="month">Tháng</Option>
          <Option value="year">Năm</Option>
          <Option value="custom">Tùy chỉnh</Option>
        </Select>
        {filterType === "custom" && (
          <RangePicker onChange={(values) => setCustomDateRange(values)} />
        )}
        <Button type="primary" onClick={handleApplyFilter}>
          Áp dụng
        </Button>
      </Space>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default ProductsBySales;
