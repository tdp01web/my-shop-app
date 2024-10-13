import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { instance } from "../../../configs/instance";

const ListComment = () => {
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
      title: 'Sản phẩm A',
      countComments: 25,
      countRate: 20,
      dateNewComments: '2024-09-10',
    },
    {
      key: '2',
      title: 'Sản phẩm B',
      countComments: 10,
      countRate: 8,
      dateNewComments: '2024-09-08',
    },
    {
      key: '3',
      title: 'Sản phẩm C',
      countComments: 15,
      countRate: 12,
      dateNewComments: '2024-09-05',
    },
    {
      key: '4',
      title: 'Sản phẩm D',
      countComments: 5,
      countRate: 3,
      dateNewComments: '2024-09-01',
    },
  ];
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: '30%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Tổng lượt bình luận",
      dataIndex: "countComments",
      key: "countComments",
      sorter: (a, b) => a.countComments - b.countComments,
    },
    {
      title: "Tổng lượt đánh giá",
      dataIndex: "countRate",
      key: "countRate",
      sorter: (a, b) => a.countRate - b.countRate,
    },
    {
      title: "Ngày đánh giá mới nhất",
      dataIndex: "dateNewComments",
      key: "dateNewComments",
      sorter: (a, b) => a.dateNewComments.localeCompare(b.dateNewComments),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, cart) => (
        <div className="flex space-x-3">
          <Button>
            <Link to={`/admin/carts/${cart._id}/detail`}>Chi tiết bình luận</Link>
          </Button>
          <Button>
            <Link to={`/admin/carts/${cart._id}/update`}>Dừng bình luận</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý bình luận</h1>
        <Button type="primary">
          <Link to="/admin/carts">
            <PlusCircleFilled /> Thống kê bình luận
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ListComment;