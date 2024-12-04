import { useQuery } from "@tanstack/react-query";
import { DatePicker, Table } from "antd";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { instance } from "../../configs/instance";
import LoyalCustomers from "./Dashboard/LoyalCustomers";
import OrderAndProductStats from "./Dashboard/OrderAndProductStats";
import OrderStatusStats from "./Dashboard/OrderStatusStats";
import ProductSalesFilter from "./Dashboard/ProductSalesFilter";
import SalesFilter from "./Dashboard/SalesFilter";

const { RangePicker } = DatePicker;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"], // Nhãn trục X
    datasets: [
      {
        label: "Hóa đơn", // Tên cho dataset 1
        data: [12, 19, 3, 5, 2, 3], // Dữ liệu của dataset 1
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Màu nền của dataset 1
        borderColor: "rgba(255, 99, 132, 1)", // Màu viền của dataset 1
        borderWidth: 1,
      },
      {
        label: "Sản phẩm", // Tên cho dataset 2
        data: [5, 2, 3, 9, 6, 7], // Dữ liệu của dataset 2
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Màu nền của dataset 2
        borderColor: "rgba(54, 162, 235, 1)", // Màu viền của dataset 2
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true, // Đảm bảo trục X bắt đầu từ 0
      },
      y: {
        beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0
      },
    },
  };

  //top các sản phẩm bán chạy
  const { data: dataTopProduct } = useQuery({
    queryKey: ["dataTopProduct"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("/product/products-by-sales");
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn:async ~ error:", error);
        return [];
      }
    },
  });

  const { data: dataLowStockProducts } = useQuery({
    queryKey: ["dataLowStockProducts"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("/stats/low-stock");
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn:async ~ error:", error);
        return [];
      }
    },
  });

  const dataSourceTopProducts =
    dataTopProduct?.products?.map((product, index) => ({
      stt: index + 1,
      key: product._id,
      name: product.title,
      image: product?.images[0]?.url,
      quantity: product.sold,
    })) || [];

  // Cấu hình các cột của bảng
  const columnsTopProducts = [
    {
      title: "Stt",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const dataStatusOrder = {
    labels: [
      "Thanh công",
      "Trả hàng",
      "Vận chuyển",
      "Hóa đơn chờ",
      "Chờ xác nhận",
      "Đã thanh toán",
    ],
    datasets: [
      {
        label: "Trạng Thái Đơn Hàng Tháng Này",
        data: [68.88, 15.77, 1.66, 0.83, 3.2, 1.24], // Dữ liệu cho tỷ lệ phần trăm
        backgroundColor: [
          "#36A2EB", // Thanh công
          "#FF6384", // Trả hàng
          "#FFCE56", // Vận chuyển
          "#4BC0C0", // Hóa đơn chờ
          "#9966FF", // Chờ xác nhận
          "#FF9F40", // Đã thanh toán
        ], // Màu sắc cho từng phần của biểu đồ
        hoverOffset: 4, // Độ giãn cách khi hover
      },
    ],
  };

  const optionsStatusOrder = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Vị trí của legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw.toFixed(2) + "%"; // Hiển thị tỷ lệ phần trăm trong tooltip
          },
        },
      },
    },
  };

  const dataTable = [
    {
      key: "1",
      metric: "Doanh thu ngày",
      value: "11.000.000 VND",
      growth: "0%",
    },
    {
      key: "2",
      metric: "Doanh thu tháng",
      value: "641.025.000 VND",
      growth: "0%",
    },
    {
      key: "3",
      metric: "Doanh thu năm",
      value: "641.025.000 VND",
      growth: "0%",
    },
    {
      key: "4",
      metric: "Sản phẩm tháng",
      value: "366 Sản phẩm",
      growth: "0%",
    },
    {
      key: "5",
      metric: "Hóa đơn ngày",
      value: "2 Hóa đơn",
      growth: "0%",
    },
    {
      key: "6",
      metric: "Hóa đơn tháng",
      value: "204 Hóa đơn",
      growth: "0%",
    },
  ];

  const columnsTable = [
    {
      title: "Tên chỉ số",
      dataIndex: "metric",
      key: "metric",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Tăng trưởng",
      dataIndex: "growth",
      key: "growth",
      render: (text) => <span style={{ color: "green" }}>{text}</span>,
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-5">
      {/* <h1 className="text-center text-xl">Thống kê</h1> */}
      <div className="flex gap-5">
        <div className="flex flex-col gap-1 bg-gray-200 p-4 rounded-md w-1/3">
          <SalesFilter />
        </div>

        <div className="flex flex-col gap-1 bg-gray-200 p-4 rounded-md">
          <ProductSalesFilter />
        </div>
      </div>

      <div className="bg-gray-200 p-4 rounded-md">
        <OrderAndProductStats />
      </div>
      <div className="flex gap-3 w-full">
        <div className="flex flex-col gap-4 w-3/5">
          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="mb-2 font-bold text-[20px] text-center">
              Top các sản phẩm bán chạy
            </h2>
            <Table
              dataSource={dataSourceTopProducts}
              columns={columnsTopProducts}
              loading={!dataTopProduct}
              pagination={{
                pageSize: 5,
              }}
            />
          </div>
          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="mb-2 font-bold text-[20px] text-center">
              Các sản phẩm sắp hết hàng
            </h2>
            <Table
              dataSource={
                dataLowStockProducts?.map((product, index) => ({
                  stt: index + 1,
                  key: product?._id,
                  name: product?.product?.title,
                  image: product?.product?.images[0]?.url,
                  quantity: product?.quantity,
                })) || []
              }
              columns={[
                {
                  title: "Stt",
                  dataIndex: "stt",
                  key: "stt",
                },
                {
                  title: "Tên sản phẩm",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Ảnh sản phẩm",
                  dataIndex: "image",
                  key: "image",
                  render: (image) => (
                    <img
                      src={image}
                      alt="product"
                      style={{ width: 50, height: 50 }}
                    />
                  ),
                },
                {
                  title: "Số lượng còn lại",
                  dataIndex: "quantity",
                  key: "quantity",
                },
              ]}
              loading={!dataLowStockProducts}
              pagination={{
                pageSize: 5,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-2/5">
          <div className="bg-gray-200 p-4 rounded-md">
            <OrderStatusStats />
          </div>
          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="mb-2 font-bold text-[20px] text-center">
              Biểu đồ thống kê hóa đơn và sản phẩm
            </h2>
            <Table
              dataSource={dataTable}
              columns={columnsTable}
              pagination={false}
            />
          </div>
          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="mb-2 font-bold text-[20px] text-center">
              Top khách hàng thân thiết
            </h2>
            <LoyalCustomers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
