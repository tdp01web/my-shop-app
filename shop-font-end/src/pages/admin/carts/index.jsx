import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { instance } from "../../../configs/instance";
import { useGetAllOrders } from "../../../hooks/queries/useGetAllOrder";

const DetailCart = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const { data: carts, isLoading, isError } = useGetAllOrders(
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    })

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

const dataSource =  carts?.data.map((item, index) =>{
  return{
    id: item._id,
    key: item._id,
    title: index+1,
    count: item?.products.length,
    totalPrice: item?.totalPrice,
    users: item?.shippingAddress.name,
    comple: item?.orderStatus
  }
})

const columns = [
  {
    title: "Đơn hàng số",
    dataIndex: "title",
    key: "title",
    ...getColumnSearchProps('title'),
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Số lượng",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Giá tiền",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
  {
    title: "Kháng hàng",
    dataIndex: "users",
    key: "users",
  },
  {
    title: "Trạng thái",
    dataIndex: "comple",
    key: "comple",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    width: 250,
    render: (_, carts) => (
      <div className="flex space-x-3">
        <Button>
          <Link to={`/admin/carts/${carts.id}/detail`}>Chi tiết đơn hàng</Link>
        </Button>
        <Button>
          <Link to={`/admin/carts/${carts.id}/update`}>Cập nhật đơn hàng</Link>
        </Button>
      </div>
    ),
  },
];
if (isLoading) return <p>Loading...</p>
if (isError) return <p>Error loading data.</p>
return (
  <div>
    <div className="flex justify-between items-center mb-5">
      <h1 className="font-semibold text-2xl">Quản lý đơn hàng</h1>
      <Button type="primary">
        <Link to="/admin/carts">
          <PlusCircleFilled /> Danh sánh đơn hàng đang giao
        </Link>
      </Button>
    </div>
    <Table dataSource={dataSource} columns={columns} />
  </div>
);
};
export default DetailCart;