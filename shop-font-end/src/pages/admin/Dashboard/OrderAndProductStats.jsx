import React, { useState, useEffect } from "react";
import { Select, DatePicker, Space, Button } from "antd";
import { Bar } from "react-chartjs-2"; // Sử dụng biểu đồ cột đôi
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { instance } from "../../../configs/instance";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderAndProductStats = () => {
  const [filterType, setFilterType] = useState("year");
  const [customDateRange, setCustomDateRange] = useState([]);
  const [orderStats, setOrderStats] = useState([]);

  const fetchOrderStats = async (type = "year", startDate, endDate) => {
    try {
      let params = { filterType: type };

      if (type === "custom" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await instance.get("/stats/getOrderAndProductStats", {
        params,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setOrderStats(response.data.stats || []);
    } catch (error) {
      console.error("Error fetching order stats:", error);
      setOrderStats([]);
    }
  };

  useEffect(() => {
    fetchOrderStats("year");
  }, []);

  const handleApplyFilter = async () => {
    if (filterType === "custom" && customDateRange.length === 2) {
      const [start, end] = customDateRange;
      fetchOrderStats(
        filterType,
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );
    } else {
      fetchOrderStats(filterType);
    }
  };

  const chartData = {
    labels: orderStats.map((stat) => stat.timeLabel),
    datasets: [
      {
        label: "Số Lượng Đơn Hàng",
        data: orderStats.map((stat) => stat.totalOrders),
        backgroundColor: "#36A2EB", // Màu cột cho số lượng đơn hàng
      },
      {
        label: "Số Lượng Sản Phẩm",
        data: orderStats.map((stat) => stat.totalProducts),
        backgroundColor: "#FF6384", // Màu cột cho số lượng sản phẩm
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center w-full gap-2 mb-3">
        <p className="font-bold text-[20px]">Thống kê Đơn Hàng và Sản Phẩm</p>
        <Space>
          <Select
            defaultValue="year"
            onChange={(value) => setFilterType(value)}
            style={{ width: 150 }}
          >
            {" "}
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
      <div style={{ maxWidth: "800px", margin: "auto" }}>
        {orderStats.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Thống kê Đơn Hàng và Sản Phẩm",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text:
                      filterType === "custom"
                        ? "Ngày"
                        : filterType.charAt(0).toUpperCase() +
                          filterType.slice(1),
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Số Lượng",
                  },
                },
              },
            }}
          />
        ) : (
          <p>Không có dữ liệu để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default OrderAndProductStats;
