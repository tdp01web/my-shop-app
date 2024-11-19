import { useGetAllCategory } from '../../../hooks/queries/useGetAllCategory';
import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useDeleteCategory } from '../../../hooks/mutations/useDeleteCategory';

const ListCategory = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { data: categories, isLoading, isError} = useGetAllCategory({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { mutate } = useDeleteCategory({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái danh mục thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-category"] });
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

  const dataSource = categories?.data.map((item) => {
    return {
      key: item.id,
      _id: item._id,
      status: item.status === 1 ? "Sử dụng" : "Đình chỉ",
      name: item.name
    };
  });
  const columns = [
    {
      title: "Mã danh mục",
      dataIndex: "_id",
      key: "_id",
      width: '20%',
      ...getColumnSearchProps('_id'),
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: '30%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: '15%',
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, categories) => {
        const isActive = categories.status === "Sử dụng";
        return (
          <div className="flex space-x-3">
            <Popconfirm
              title={isActive ? "Đình chỉ danh mục?" : "Kích hoạt danh mục?"}
              onConfirm={() => {
                mutate(categories._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                {isActive ? "Đình chỉ" : "Sử dụng"}
              </Button>
            </Popconfirm>
            <Button>
              <Link to={`/admin/categories/${categories._id}/edit`}>Cập nhật</Link>
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
        <h1 className="font-semibold text-2xl">Quản lý danh mục</h1>
        <Button type="primary">
          <Link to="/admin/categories/add">
            <PlusCircleFilled /> Thêm danh mục
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ListCategory