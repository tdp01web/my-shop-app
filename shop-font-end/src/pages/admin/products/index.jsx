import React, { useRef, useState } from "react";
import { DownOutlined, PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Dropdown, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { instance } from "../../../configs/instance";
import { useGetAllProducts } from "../../../hooks/queries/useGetAllProduct";
import { useDeleteProduct } from "../../../hooks/mutations/useDeleteProduct";
import { useDeleteVarriantsProuduct } from "../../../hooks/mutations/useDeleteVarriantProduct";

const ListProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate: deleteProduct } = useDeleteProduct(
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Xoá sản phẩm thành công",
        });
        queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
      },
      onError(error) {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      },
    }
  )
  const { mutate: deleteVrProduct } = useDeleteVarriantsProuduct(
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Xoá biến thể thành công",
        });
        queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
      },
      onError(error) {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      },
    }
  )
  const { data: product } = useGetAllProducts(
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    }
  )

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small">
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes((value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const dataSource = product?.data.map((item, index) => {
    return {
      id: item._id,
      key: item._id,
      title: item.title,
      image: item?.images,
      description: item.description,
      brand: item?.brand?.title,
      category: item?.category?.name,
      price: item.title,
      variants: item?.variants || [],
    };
  });
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: '15%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (images) => (
        images && images.length > 0 ? (
          <img src={images[0].url} alt="product" style={{ width: 100, height: 100, borderRadius: 5 }} />
        ) : (
          'Không có ảnh'
        )
      ),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Hãng",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, product) => (
        <div className="flex space-x-3">
          <Popconfirm
            title="Xóa sản phẩm"
            onConfirm={() => deleteProduct(product.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Button>
            <Link to={`/admin/products/${product.id}/edit`}>Cập nhật</Link>
          </Button>
        </div>
      ),
    },
  ];

  const expandColumns = [
    { title: 'CPU', dataIndex: 'cpu', key: 'cpu' },
    { title: 'GPU', dataIndex: 'gpu', key: 'gpu' },
    { title: 'RAM', dataIndex: 'ram', key: 'ram' },
    { title: 'SSD', dataIndex: 'ssd', key: 'ssd' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, record) => (
        <div className="flex space-x-3">
          <Popconfirm
            title="Xóa biến thể"
            onConfirm={() => {
              deleteVrProduct(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const expandedRowRender = (record) => {
    const variantsData = record.variants.map((variant) => ({
      id: variant._id,
      key: variant._id,
      cpu: variant?.processor?.name,
      gpu: variant?.gpu?.name,
      ram: variant?.ram?.size,
      ssd: variant?.storage?.capacity,
      quantity: variant.quantity,
      price: variant.price,
    }));

    return <Table columns={expandColumns} dataSource={variantsData} pagination={false} />;
  };
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý sản phẩm</h1>
        <Button type="primary">
          <Link to="/admin/products/add">
            <PlusCircleFilled /> Thêm sản phẩm
          </Link>
        </Button>
      </div>
      <>
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{ expandedRowRender }}
        />
      </>
    </div>
  );
};

export default ListProduct;
