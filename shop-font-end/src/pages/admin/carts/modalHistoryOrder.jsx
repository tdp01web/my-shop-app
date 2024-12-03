import React, { useRef, useState } from 'react';
import { Button, Input, Modal, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useGetHistoryOrder } from '../../../hooks/queries/useGetHistoryOrder';
import moment from "moment/moment";
const ModalHistoryOrder = ({ id, isModalOpen, onOk, onCancel }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const { data, isLoading, isError } = useGetHistoryOrder(
    id,
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
  const dataSource = data?.data.map((item, index) => {
    return {
      key: index + 1,
      user: item.user,
      name: item.name,
      time: moment(item.time).format("YYYY-MM-DD HH:mm"),
      status: item.status
    }
  })

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "5%",
      sorter: (a, b) => a.key.localeCompare(b.key),
    },
    {
      title: "Mã tài khoản",
      dataIndex: "user",
      key: "user",
      width: "5%",
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: "Người xử lý",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: "30%",
      ...getColumnSearchProps('time'),
      sorter: (a, b) => a.time.localeCompare(b.time),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "30%",
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
  ];

  return (
    <>
      <Modal title="Lịch sử đơn hàng" open={isModalOpen} onOk={onOk} onCancel={onCancel} footer={null} centered width={800} >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 6 }}
        />
      </Modal>
    </>
  );
}

export default ModalHistoryOrder;