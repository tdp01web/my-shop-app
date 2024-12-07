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

const SalesTypeStats = () => {
  const [filterType, setFilterType] = useState("year");
  const [customDateRange, setCustomDateRange] = useState([]);
  const [salesTypeStats, setSalesTypeStats] = useState([]); // Đổi tên biến cho chính xác hơn

  const fetchSalesTypeStats = async (type = "year", startDate, endDate) => {
    try {
      let params = { filterType: type };

      if (type === "custom" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await instance.get("/stats/getSalesTypeStats", {
        params,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setSalesTypeStats(response.data.stats || []); // Gán dữ liệu trả về từ API
    } catch (error) {
      console.error("Error fetching sales type stats:", error);
      setSalesTypeStats([]); // Xử lý khi lỗi
    }
  };

  useEffect(() => {
    fetchSalesTypeStats("year"); // Lấy dữ liệu mặc định cho năm
  }, []);

  const handleApplyFilter = async () => {
    if (filterType === "custom" && customDateRange.length === 2) {
      const [start, end] = customDateRange;
      fetchSalesTypeStats(
        filterType,
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );
    } else {
      fetchSalesTypeStats(filterType);
    }
  };

  const chartData = {
    labels: salesTypeStats.map((stat) => stat.timeLabel),
    datasets: [
      {
        label: "Bán hàng Online",
        data: salesTypeStats.map((stat) => stat.online), // Sử dụng dữ liệu online
        backgroundColor: "#36A2EB",
      },
      {
        label: "Bán hàng Offline",
        data: salesTypeStats.map((stat) => stat.offline), // Sử dụng dữ liệu offline
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center w-full gap-2 mb-3">
        <p className="font-bold text-[20px]">Thống kê Loại Bán Hàng</p>
        <Space>
          <Select
            defaultValue="year"
            onChange={(value) => setFilterType(value)}
            style={{ width: 150 }}
          >
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
        {salesTypeStats.length > 0 ? (
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
                  text: "Thống kê Loại Bán Hàng",
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

export default SalesTypeStats;
