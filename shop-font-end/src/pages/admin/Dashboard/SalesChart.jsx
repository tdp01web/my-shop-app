import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Select, Button, Space } from "antd";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { instance } from "../../../configs/instance";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesChart = () => {
  const [filterType, setFilterType] = useState("month"); // Mặc định là "month"
  const [customDateRange, setCustomDateRange] = useState([]);
  const [queryParams, setQueryParams] = useState({ filterType: "month" }); // Gửi filterType mặc định

  // Fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["salesStats", queryParams],
    queryFn: async () => {
      const { data } = await instance.get("/stats/sales-stats", {
        params: queryParams,
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache data trong 5 phút
  });

  // Cập nhật bộ lọc
  const handleApplyFilter = () => {
    if (filterType === "custom" && customDateRange.length === 2) {
      setQueryParams({
        filterType,
        startDate: moment(customDateRange[0]).format("YYYY-MM-DD"),
        endDate: moment(customDateRange[1]).format("YYYY-MM-DD"),
      });
    } else {
      setQueryParams({ filterType });
    }
  };

  // Cấu hình dữ liệu cho biểu đồ
  const chartData = {
    labels: data?.map((item) => item.salesType) || [], // Danh sách loại bán hàng
    datasets: [
      {
        label: "Doanh thu (VND)", // Tiêu đề biểu đồ
        data: data?.map((item) => item.totalSales) || [], // Dữ liệu doanh thu
        backgroundColor: ["#1890ff", "#ff4d4f"], // Màu sắc cho từng loại bán hàng
      },
    ],
  };

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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {!isLoading && !isError && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default SalesChart;
