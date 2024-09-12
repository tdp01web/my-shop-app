import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { instance } from "../../../configs/instance";

export const CartPageAdmin = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

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

  const dataSource = [
    {
      key: '1',
      title: 'Đơn hàng A',
      count: 3,
      totalPrice: 150000,
      users: 'Mike',
      comple: 'Đang xử lý',
    },
    {
      key: '2',
      title: 'Đơn hàng B',
      count: 5,
      totalPrice: 250000,
      users: 'John',
      comple: 'Hoàn thành',
    },
    {
      key: '3',
      title: 'Đơn hàng C',
      count: 2,
      totalPrice: 100000,
      users: 'Anna',
      comple: 'Đã hủy',
    },
    {
      key: '4',
      title: 'Đơn hàng D',
      count: 1,
      totalPrice: 50000,
      users: 'Tom',
      comple: 'Đang giao',
    },
  ];
  const columns = [
    {
      title: "Tên đơn hàng",
      dataIndex: "title",
      key: "title",
      width: '30%',
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
      render: (_, cart) => (
        <div className="flex space-x-3">
          <Button>
            <Link to={`/admin/carts/${cart._id}/detail`}>Chi tiết đơn hàng</Link>
          </Button>
          <Button>
            <Link to={`/admin/carts/${cart._id}/update`}>Cập nhật đơn hàng</Link>
          </Button>
        </div>
      ),
    },
  ];

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
