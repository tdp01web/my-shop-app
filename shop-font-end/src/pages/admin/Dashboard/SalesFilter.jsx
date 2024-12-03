import React, { useState, useEffect } from "react";
import { Select, DatePicker, Space, Button } from "antd";
import axios from "axios";
import { instance } from "../../../configs/instance";

const { Option } = Select;
const { RangePicker } = DatePicker;

const SalesFilter = () => {
  const [filterType, setFilterType] = useState("month");
  const [customDateRange, setCustomDateRange] = useState([]);
  const [salesData, setSalesData] = useState(null);

  // Hàm gọi API
  const fetchSalesData = async (type = "month", startDate, endDate) => {
    try {
      let params = { filterType: type };

      if (type === "custom" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await instance.get("/stats/getSalesByTime", {
        params,
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Gọi API lần đầu khi component được mount
  useEffect(() => {
    fetchSalesData("month");
  }, []);

  // Hàm xử lý khi áp dụng bộ lọc
  const handleApplyFilter = async () => {
    if (filterType === "custom" && customDateRange.length === 2) {
      const [start, end] = customDateRange;
      fetchSalesData(
        filterType,
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );
    } else {
      fetchSalesData(filterType);
    }
  };

  // Render dữ liệu doanh thu

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <p className="font-bold text-[20px]">Doanh số </p>
        <Space>
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
      </div>
      <p>
        <strong>Tổng số đơn hàng:</strong> {salesData?.totalOrders}
      </p>
      <p>
        <strong>Tổng doanh thu:</strong> {salesData?.totalRevenue} VND
      </p>
    </div>
  );
};

export default SalesFilter;
