import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useGetAllBrand } from '../../../hooks/queries/useGetAllBrand';
import { useDeleteBrand } from '../../../hooks/mutations/useDeleteBrand';

const ListBrand = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { data: brand, isLoading, isError } = useGetAllBrand({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { mutate } = useDeleteBrand({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái hãng thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-brand"] });
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
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

  const dataSource = brand?.data.map((item) => {
    return {
      key: item.id,
      _id: item._id,
      title: item.title,
      status: item.status === 1 ? "Sử dụng" : "Đình chỉ",
      isDisabled: item.status !== 1,
    };
  });
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
      render: (_, brand) => {
        const isActive = brand.status === "Sử dụng";
        return (
          <div className="flex space-x-3">
            <Popconfirm
              title={isActive ? "Đình chỉ hãng?" : "Kích hoạt hãng?"}
              onConfirm={() => {
                mutate(brand._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" style={{ backgroundColor: isActive ? '#ff4d4f' : '#52c41a' }}>
                {isActive ? "Đình chỉ" : "Sử dụng"}
              </Button>
            </Popconfirm>
            <Button>
              <Link to={`/admin/brand/${brand._id}/edit`}>Chi tiết</Link>
            </Button>
          </div>
        );
      },
    },
  ];
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>

  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý hãng</h1>
        <Button type="primary">
          <Link to="/admin/brand/add">
            <PlusCircleFilled /> Thêm hãng
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

export default ListBrand