import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { instance } from "../../../configs/instance";

export const UserPage = () => {
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
      title: 'Mike',
      email: 'mike@example.com',
      phone: '0123456789',
      address: '10 Downing Street',
    },
    {
      key: '2',
      title: 'John',
      email: 'john@example.com',
      phone: '9876543210',
      address: '20 Whitehall',
    },
    {
      key: '3',
      title: 'Anna',
      email: 'anna@example.com',
      phone: '1234567890',
      address: '30 Parliament St',
    },
    {
      key: '4',
      title: 'Tom',
      email: 'tom@example.com',
      phone: '0987654321',
      address: '40 Baker Street',
    },
  ];
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "title",
      key: "title",
      width: '30%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, user) => (
        <div className="flex space-x-3">
          <Popconfirm
            title="Xóa tài khoản"
            onConfirm={() => mutation.mutate(user._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Button>
            <Link to={`/admin/users/${user._id}/edit`}>Cập nhật</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý tài khoản</h1>
        <Button type="primary">
          <Link to="/admin/users/add">
            <PlusCircleFilled /> Thêm tài khoản
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
