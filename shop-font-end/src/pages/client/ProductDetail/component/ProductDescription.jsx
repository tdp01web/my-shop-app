import React from "react";
import { Table } from "antd";

const ProductDescription = ({ description, selectedVariant }) => {
  // Xử lý dynamic attributes
  const dynamicAttributes =
    selectedVariant?.attributes?.map((attr, index) => ({
      key: `dynamic-${index}`,
      name: attr.keyA,
      value: attr.valueA,
    })) || [];

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "Thông số",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chi tiết",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-md w-full lg:w-[60%]">
      {dynamicAttributes.length > 0 && (
        <>
          <h3 className="mt-4 font-500 text-[20px]">Thông số biến thể</h3>
          <Table
            dataSource={dynamicAttributes}
            columns={columns}
            pagination={false}
            bordered
          />
        </>
      )}
      <h2 className="mt-4 font-600 text-[24px]">Đặc điểm nổi bật</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;
