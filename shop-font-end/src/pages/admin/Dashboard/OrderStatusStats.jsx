import React, { useState, useEffect } from "react";
import { Select, DatePicker, Space, Button } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { instance } from "../../../configs/instance";

ChartJS.register(ArcElement, Tooltip, Legend);

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderStatusStats = () => {
  const [filterType, setFilterType] = useState("month");
  const [customDateRange, setCustomDateRange] = useState([]);
  const [orderStatusStats, setOrderStatusStats] = useState([]);

  const fetchOrderStatusStats = async (type = "month", startDate, endDate) => {
    try {
      let params = { filterType: type };

      if (type === "custom" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await instance.get("/stats/getOrderStatusStats", {
        params,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setOrderStatusStats(response.data.stats || []);
    } catch (error) {
      console.error("Error fetching order status stats:", error);
      setOrderStatusStats([]);
    }
  };

  useEffect(() => {
    fetchOrderStatusStats("month");
  }, []);

  const handleApplyFilter = async () => {
    if (filterType === "custom" && customDateRange.length === 2) {
      const [start, end] = customDateRange;
      fetchOrderStatusStats(
        filterType,
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );
    } else {
      fetchOrderStatusStats(filterType);
    }
  };

  const chartData = {
    labels: orderStatusStats.map((status) => status.orderStatus),
    datasets: [
      {
        label: "Tỷ lệ phần trăm (%)",
        data: orderStatusStats.map((status) => status.percentage),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mb-3">
        <p className="font-bold text-[20px]">Thống kê Trạng Thái Đơn Hàng</p>
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
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        {orderStatusStats.length > 0 ? (
          <Pie data={chartData} />
        ) : (
          <p>Không có dữ liệu để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default OrderStatusStats;
