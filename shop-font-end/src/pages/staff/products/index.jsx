import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Input,
  message,
  Popconfirm,
  Popover,
  Space,
  Table,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link, useLocation } from "react-router-dom";
import { useDeleteProduct } from "../../../hooks/mutations/useDeleteProduct";
import { useDeleteVarriantsProuduct } from "../../../hooks/mutations/useDeleteVarriantProduct";
import { useGetAllProducts } from "../../../hooks/queries/useGetAllProduct";

const ListProductStaff = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.results) {
      setFilteredData(location.state.results);
    }
  }, [location.state]);

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái sản phẩm thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
    },
    onError(error) {
      const errorMessage =
        error.response && error.response.status === 400
          ? "Danh mục hoặc hãng đình chỉ không thể sử dụng biến thể."
          : error.message;
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    },
  });
  const { mutate: deleteVrProduct } = useDeleteVarriantsProuduct({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái biến thể thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
    },
    onError(error) {
      const errorMessage =
        error.response && error.response.status === 400
          ? "Sản phẩm đình chỉ không thể sử dụng biến thể."
          : error.message;
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    },
  });
  const { data: product } = useGetAllProducts({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const dataSource =
    filteredData
      ? filteredData.map((item) => {
        const prices = item?.variants.map(variant => variant.price) || [];
        const minPrice = prices.length > 0 ? Math.min(...prices) : null;
        return {
          id: item._id,
          key: item._id,
          title: item.title,
          image: item.images,
          description: item.description,
          brand: item.brand?.title,
          category: item.category?.name,
          price: minPrice,
          variants: item.variants || [],
          prices: prices,
          status: item.status === 1 ? "Sử dụng" : "Đình chỉ",
          isDisabled: item.status !== 1,
        };
      })
      : product?.data?.filter((item) => item.status === 1).map((item) => {
        const prices = item?.variants.map(variant => variant.price) || [];
        const minPrice = prices.length > 0 ? Math.min(...prices) : null;
        return {
          id: item._id,
          key: item._id,
          title: item.title,
          image: item.images,
          description: item.description,
          brand: item.brand?.title,
          category: item.category?.name,
          price: minPrice,
          variants: item.variants || [],
          prices: prices,
          status: item.status === 1 ? "Sử dụng" : "Đình chỉ",
          isDisabled: item.status !== 1,
        };
      });

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
      width: "15%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: "15%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (images) =>
        images && images.length > 0 ? (
          <img
            src={images[0].url}
            alt="product"
            style={{ width: 100, height: 100, borderRadius: 5 }}
          />
        ) : (
          "Không có ảnh"
        ),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Hãng",
      dataIndex: "brand",
      key: "brand",
      ...getColumnSearchProps("brand"),
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, product) => {
        const isActive = product.status === "Sử dụng";
        return (
          <div className="flex space-x-3">
            <Button>
              <Link to={`/staff/products/${product.id}/edit`}>Chi tiết</Link>
            </Button>
          </div>
        );
      },
    },
  ];

  const expandColumns = [
    {
      title: "Mã biến thể", dataIndex: "id", key: "id",
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "CPU", dataIndex: "cpu", key: "cpu",
      ...getColumnSearchProps('cpu'),
      sorter: (a, b) => a.cpu.localeCompare(b.cpu),
    },
    {
      title: "GPU", dataIndex: "gpu", key: "gpu",
      ...getColumnSearchProps('gpu'),
      sorter: (a, b) => a.gpu.localeCompare(b.gpu),
    },
    {
      title: "RAM", dataIndex: "ram", key: "ram",
      ...getColumnSearchProps('ram'),
      sorter: (a, b) => a.ram.localeCompare(b.ram),
    },
    {
      title: "SSD", dataIndex: "ssd", key: "ssd",
      ...getColumnSearchProps('ssd'),
      sorter: (a, b) => a.ssd.localeCompare(b.ssd),
    },
    {
      title: "Giá", dataIndex: "price", key: "price",
      sorter: (a, b) => a.price.localeCompare(b.price),
    },
    {
      title: "Số lượng", dataIndex: "quantity", key: "quantity",
      sorter: (a, b) => a.quantity.localeCompare(b.quantity),
    },
  ];
  const expandedRowRender = (record) => {
    const variantsData = record.variants?.filter((item) => item.status === 1).map((variant) => ({
      id: variant._id,
      key: variant._id,
      cpu: variant?.processor?.name,
      gpu: variant?.gpu?.name,
      ram: variant?.ram?.size,
      ssd: variant?.storage?.capacity,
      quantity: (variant.quantity).toString(),
      price:( variant.price).toString(),
      statusVr: variant.status === 1 ? "Sử dụng" : "Đình chỉ",
      isDisabled: variant.status !== 1,
    }));

    return (
      <Table
        columns={expandColumns}
        dataSource={variantsData}
        pagination={false}
        rowClassName={record => (record.isDisabled ? 'bg-gray-300 ' : '')}
      />
    );
  };
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Danh sách sản phẩm</h1>
      </div>
      <>
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{ expandedRowRender }}
          rowClassName={record => (record.isDisabled ? 'bg-gray-300 ' : '')}
        />
      </>
    </div>
  );
};

export default ListProductStaff;
