import { useQuery } from "@tanstack/react-query";
import React from "react";
import { instance } from "../../../configs/instance";
import { Table } from "antd";

const TopView = () => {
  const { data } = useQuery({
    queryKey: ["TopView"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("/product/products-by-views");
        console.log("🚀 ~ queryFn: ~ data:", data);
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn: ~ error:", error);
      }
    },
  });
  const dataTable = data?.products.map((item, index) => ({
    key: index + 1,
    name: item?.title,
    images: item?.images[0].url,
    views: item?.views,
  }));

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (text) => (
        <img src={text} alt="product" style={{ width: 50, height: 50 }} />
      ),
    },
    { title: "Số lượng xem", dataIndex: "views", key: "views" },
  ];
  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="mb-2 font-bold text-[20px] text-center">
        Top các sản phẩm có lượt xem nhiều nhất
      </h2>
      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TopView;
