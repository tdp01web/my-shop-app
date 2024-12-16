import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { instance } from "../../../configs/instance";
import { useGetAllUser } from "../../../hooks/queries/useGetAllUser";
import { useDeleteUser } from "../../../hooks/mutations/useDeleteUser";

export const ListUser = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user.role === "Owner"
  const { data, isLoading, isError } = useGetAllUser({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  })
  const { mutate } = useDeleteUser({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái tài khoản thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-user"] });
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

  const dataSource = data?.data.map((item) => {
    return {
      key: item.id,
      id: item._id,
      name: `${item.lastName} ${item.firstName}`,
      email: item.email,
      mobile: item.mobile,
      role: item.role,
      address: item.address ? item.address : "Chưa cập nhật địa chỉ",
      status: item.status === 1 ? "Sử dụng" : "Đình chỉ",
      isDisabled: item.status !== 1,
    };
  });;
  const columns = [
    {
      title: "Mã tài khoản",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile",
      key: "mobile",
      width: "10%",
      ...getColumnSearchProps('mobile'),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "30%",
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps('role'),
      sorter: (a, b) => a.role.localeCompare(b.role),
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
      render: (_, user) => {
        const isActive = user.status === "Sử dụng";
        const right = JSON.parse(localStorage.getItem("user"));
        const isOwner = right.role === "Owner";
        const isSelf = user.id === right._id;
        const isStaffUser = ["User", "Shipper", "Staff"].includes(user.role);

        return (
          <div className="flex space-x-3">
            {isStaffUser || isOwner && !isSelf  ? (
              <Popconfirm
                title={isActive ? "Đình chỉ tài khoản?" : "Kích hoạt tài khoản?"}
                onConfirm={() => { mutate(user.id) }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" style={{ backgroundColor: isActive ? '#ff4d4f' : '#52c41a' }}>
                  {isActive ? "Đình chỉ" : "Sử dụng"}
                </Button>
              </Popconfirm>
            ) : null}
            {isSelf || isStaffUser || isOwner ? (
              <Button>
                <Link to={`/admin/users/${user.id}/edit`}>Chi tiết</Link>
              </Button>
            ) : null}
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
        <h1 className="font-semibold text-2xl">Quản lý tài khoản</h1>
        <Button type="primary">
          <Link to="/admin/users/add">
            <PlusCircleFilled /> Thêm tài khoản
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} rowClassName={record => (record.isDisabled ? 'bg-gray-300 ' : '')} />
    </div>
  );
};
