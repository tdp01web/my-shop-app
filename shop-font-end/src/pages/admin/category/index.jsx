import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

const ListCategories = () => {
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
      _id: '1',
      title: 'Hãng A',
      status: 'Kích hoạt',
      isDisabled: false,
    },
    {
      _id: '2',
      title: 'Hãng B',
      status: 'Đình chỉ',
      isDisabled: true,
    },
    {
      _id: '3',
      title: 'Hãng C',
      status: 'Kích hoạt',
      isDisabled: false,
    },
    {
      _id: '4',
      title: 'Hãng D',
      status: 'Kích hoạt',
      isDisabled: false,
    },
    {
      _id: '5',
      title: 'Hãng E',
      status: 'Đình chỉ',
      isDisabled: true,
    },
  ];
  const columns = [
    {
      title: "Mã hãng",
      dataIndex: "_id",
      key: "_id",
      width: '20%',
      ...getColumnSearchProps('_id'),
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Tên hãng",
      dataIndex: "title",
      key: "title",
      width: '30%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, category) => {
        return (
          <div className="flex space-x-3">
            <Popconfirm
              title={"Kích hoạt danh mục?"}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" >
                Sử dụng
              </Button>
            </Popconfirm>
            <Button>
              <Link to={`/admin/category/${category._id}/edit`}>Chi tiết</Link>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý danh mục</h1>
        <Button type="primary">
          <Link to="/admin/category/add">
            <PlusCircleFilled /> Thêm danh mục
          </Link>
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={record => (record.isDisabled ? 'bg-gray-300 ' : '')}
      />
    </div>
  );
};

export default ListCategories