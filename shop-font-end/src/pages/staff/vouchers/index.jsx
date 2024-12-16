import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useGetAllVouchers } from "../../../hooks/queries/useGetAllVouchers";
import { useDeleteVouchers } from "../../../hooks/mutations/useDeleteVouchers";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment/moment";

export const ListVouchersStaff = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

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
  const { data: vouchers, isLoading, isError } = useGetAllVouchers({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { mutate } = useDeleteVouchers({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái bình luận thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-vouchers"] });
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  })
  const dataSource = vouchers?.data?.filter(voucher => voucher.status === 1)?.map((voucher) => ({
    key: voucher._id,
    id: voucher._id,
    title: voucher.name,
    discounts: voucher.maxDiscountAmount,
    maxUses: voucher.maxUses,
    usageCount: voucher.usageCount,
    date: moment(voucher.startDate).format("YYYY-MM-DD"),
    endDate: moment(voucher.expiry).format("YYYY-MM-DD"),
    status: voucher.status === 1 ? "Sử dụng" : "Đình chỉ",
    isDisabled: voucher.status !== 1,
  }))
  const columns = [
    {
      title: "Mã vouchers",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Tên vouchers",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Giá giảm",
      dataIndex: "discounts",
      key: "discounts",
      ...getColumnSearchProps('discounts'),
      sorter: (a, b) => a.discounts - b.discounts,
    },
    {
      title: "Số lần sử dụng",
      dataIndex: "maxUses",
      key: "maxUses",
      ...getColumnSearchProps('maxUses'),
      sorter: (a, b) => a.maxUses - b.maxUses,
    },
    {
      title: "Số lần đã sử dụng",
      dataIndex: "usageCount",
      key: "usageCount",
      ...getColumnSearchProps('usageCount'),
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps('date'),
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "endDate",
      key: "endDate",
      ...getColumnSearchProps('endDate'),
      sorter: (a, b) => a.endDate - b.endDate,
    },
  ];
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        {contextHolder}
        <h1 className="font-semibold text-2xl">Danh sách mã giảm giá</h1>
      </div>
      <Table dataSource={dataSource} columns={columns} rowClassName={record => (record.isDisabled ? 'bg-gray-300 ' : '')} />
    </div>
  );
};
