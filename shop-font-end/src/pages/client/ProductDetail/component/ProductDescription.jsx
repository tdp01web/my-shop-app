import React from "react";
import { Table } from "antd";

const ProductDescription = ({ description, selectedVariant }) => {
  // Xử lý dynamic attributes
  const dynamicAttributes =
    selectedVariant.attributes?.map((attr, index) => ({
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
    <div className="flex flex-col w-full lg:w-[60%] bg-white p-4 gap-3 rounded-md">
      {dynamicAttributes.length > 0 && (
        <>
          <h3 className="text-[20px] font-500 mt-4">Thông số biến thể</h3>
          <Table
            dataSource={dynamicAttributes}
            columns={columns}
            pagination={false}
            bordered
          />
        </>
      )}
      <h2 className="text-[24px] font-600 mt-4">Đặc điểm nổi bật</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;
