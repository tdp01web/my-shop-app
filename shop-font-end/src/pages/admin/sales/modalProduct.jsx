import React, { startTransition, useImperativeHandle, useRef, useState } from 'react';
import { Button, Input, Modal, Space, Table } from 'antd';
import { useGetAllProducts } from '../../../hooks/queries/useGetAllProduct';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useTabsContext } from './contextTab';
import { usePostOrderSales } from '../../../hooks/mutations/usePostOrderSales';

const ModalProduct = React.forwardRef((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const { handleAddProduct } = useTabsContext()

  useImperativeHandle(ref, () => ({
    open: (key) => {
      startTransition(() => {
        setIsModalOpen(true)
        setKey(key)
      })
    },
    onClose: () => {
      setIsModalOpen(false)
    }
  }))

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { data: product } = useGetAllProducts({
    onSuccess: (data) => {
      // console.log(data);
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
    product?.data.map((item) => {
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
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, record) => {
        return (
          <div className="flex space-x-3">
            <Button type='primary' onClick={() => {
              handleAddProduct(key, record)
              handleOk()
            }}>
              Chọn
            </Button>
          </div>
        );
      },
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
      title: `${record.title} | ${variant?.processor?.name} | ${variant?.gpu?.name} | ${variant?.ram?.size} | ${variant?.storage?.capacity} `,
      image: record.image,
      keyPr: record.id,
      quantity: (variant.quantity).toString(),
      price: (variant.price).toString(),
    }));
    return (
      <Table
        columns={expandColumns}
        dataSource={variantsData}
        pagination={false}
      />
    );
  }

  return (
    <>

      <Modal title="Danh sách sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} centered width={1280} >
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{ expandedRowRender }}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </>
  );
})

export default ModalProduct;