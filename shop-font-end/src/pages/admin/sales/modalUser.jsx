import React, { startTransition, useImperativeHandle, useRef, useState } from 'react';
import { Button, Input, Modal, Space, Table } from 'antd';
import { useGetAllUser } from '../../../hooks/queries/useGetAllUser';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useTabsContext } from './contextTab';

const ModalUser = React.forwardRef((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const { handleAddUser, items } = useTabsContext()

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
  const { data, isLoading, isError } = useGetAllUser({
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  })
  const dataSource = data?.data
    .filter(item => item.status === 1 && item.role === "User")
    .map(item => {
      return {
        key: item._id,
        id: item._id,
        name: `${item.lastName} ${item.firstName}`,
        email: item.email,
        mobile: item.mobile,
        role: item.role,
        address: item.address ? item.address : "Chưa cập nhật địa chỉ",
      };
    });
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
      width: "12%",
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
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, user) => {
        return (
          <div className="flex space-x-3">
            <Button type="primary" onClick={() => {
              handleAddUser(key, user)
              handleOk()
            }}>
              Chọn
            </Button>
          </div>
        );
      },
    },
  ];
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>

  return (
    <>
      <Modal title="Danh sách tài khoản" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} centered width={1280} >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </>
  );
})

export default ModalUser;