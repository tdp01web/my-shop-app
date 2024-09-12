import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { instance } from "../../../configs/instance";

export const ListVouchers = () => {
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
      title: 'Voucher Giảm Giá 10%',
      discounts: 10, // Kiểu số
      date: '2024-12-31', // Ngày hết hạn
    },
    {
      key: '2',
      title: 'Voucher Giảm Giá 20%',
      discounts: 20, // Kiểu số
      date: '2024-11-30',
    },
    {
      key: '3',
      title: 'Voucher Giảm Giá 15%',
      discounts: 15, // Kiểu số
      date: '2024-10-15',
    },
    {
      key: '4',
      title: 'Voucher Giảm Giá 5%',
      discounts: 5, // Kiểu số
      date: '2025-01-01',
    },
  ];
  const columns = [
    {
      title: "Tên vouchers",
      dataIndex: "title",
      key: "title",
      width: '30%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Discounts",
      dataIndex: "discounts",
      key: "discounts",
      sorter: (a, b) => a.discounts - b.discounts,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, cart) => (
        <div className="flex space-x-3">
          <Button>
            <Link to={`/admin/`}>Xóa </Link>
          </Button>
          <Button>
            <Link to={`/admin/`}>Cập nhật</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý Vouchers</h1>
        <Button type="primary">
          <Link to="/admin/vouchers">
            <PlusCircleFilled /> Thêm mới vouchers
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
