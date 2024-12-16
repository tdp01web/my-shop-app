import React, { useRef, useState } from "react";
import { EditOutlined, PlusCircleFilled, QuestionCircleOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Select, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../configs/instance";
import { useGetAllOrders } from "../../../hooks/queries/useGetAllOrder";
import { usePutOrder } from "../../../hooks/mutations/usePutOrder";
import moment from "moment/moment";

const ListCart = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const { data: carts, isLoading, isError } = useGetAllOrders(
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

  const dataSource = carts?.data.map((item, index) => {
    return {
      id: item._id,
      key: item._id,
      title: item._id,
      count: (item?.products.length).toString(),
      totalPrice: (item.totalPrice).toString(),
      users: item?.shippingAddress.name,
      mobile: item?.shippingAddress.phone,
      paymentStatus: item?.paymentStatus,
      date: moment(item.createdAt).format("YYYY-MM-DD HH:mm"),
      comple: item?.orderStatus,
      isDone: item?.orderStatus === "Hoàn Thành",
      isCancel: item?.orderStatus === "Đã Hủy",
      salesTypes: item?.salesTypes === 0 ? "Offline" : "Online"
    }
  })

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Kháng hàng",
      dataIndex: "users",
      key: "users",
      ...getColumnSearchProps('users'),
      sorter: (a, b) => a.users.localeCompare(b.users),
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile",
      key: "mobile",
      width: "8%",
      ...getColumnSearchProps('mobile'),
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
      width: "5%",
      sorter: (a, b) => a.count.localeCompare(b.count)
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice.localeCompare(b.totalPrice)
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps('date'),
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Phương thức",
      dataIndex: "salesTypes",
      key: "salesTypes",
      ...getColumnSearchProps('salesTypes'),
      sorter: (a, b) => a.salesTypes.localeCompare(b.salesTypes),
    },
    {
      title: "Tình trạng thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      ...getColumnSearchProps('paymentStatus'),
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "comple",
      key: "comple",
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, carts) => (
        <div className="flex space-x-3">
          <Button>
            <Link to={`/admin/carts/${carts.id}/detail`}>Chi tiết đơn hàng</Link>
          </Button>
        </div>
      ),
    },
  ];
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý đơn hàng</h1>
      </div>
      <Table dataSource={dataSource} columns={columns} rowClassName={record => (record.isCancel ? 'bg-gray-300 ' : record.isDone ? 'bg-[#66FF99]' : null)} />
    </div>
  );
};
export default ListCart;