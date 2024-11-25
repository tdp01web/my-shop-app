import React, { useRef, useState } from "react";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useGetAllComments } from "../../../hooks/queries/useGetAllComments";
import { useDeleteComments } from "../../../hooks/mutations/useDeleteComments";
import moment from "moment/moment";
import { useDeleteCommentsById } from "../../../hooks/mutations/useDeleteCommentsById";
const ListComment = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { data: cmt, isLoading, isError } = useGetAllComments({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const { mutate } = useDeleteComments({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái bình luận đánh giá thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-comments"] });
    },
    onError(error) {
      const errorMessage =
        error.response && error.response.status === 400
          ? "Sản phẩm đình chỉ không thể mở bình luận"
          : error.message;
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    },
  })
  const { mutate: mutateDetail } = useDeleteCommentsById({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái bình luận đánh giá thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-comments"] });
    },
    onError(error) {
      const errorMessage =
        error.response && error.response.status === 400
          ? "Bình luận sản phẩm đóng không thể mở lại bình luận"
          : error.message;
      messageApi.open({
        type: "error",
        content: errorMessage,
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
  const dataSource = cmt?.data?.data.map((item) => {
    return {
      key: item.id,
      id: item.id,
      title: item.productTitle,
      countComments: item.totalComments,
      countRate: item.averageRating,
      dateNewComments: item.latestCommentDate ? moment(item.latestCommentDate).format("YYYY-MM-DD") : "Không có dữ liệu",
      statusCmt: item.statusCmt === 1 ? "Sử dụng" : "Đình chỉ",
      ratings: item.ratings,
      isDisabled: item.statusCmt !== 1,
    }
  });

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
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
      title: "Trung bình đánh giá",
      dataIndex: "countRate",
      key: "countRate",
      sorter: (a, b) => a.countRate - b.countRate,
    },
    {
      title: "Ngày đánh giá mới nhất",
      dataIndex: "dateNewComments",
      key: "dateNewComments",
      ...getColumnSearchProps('dateNewComments'),
      sorter: (a, b) => a.dateNewComments.localeCompare(b.dateNewComments),
    },
    {
      title: "Trạng thái",
      dataIndex: "statusCmt",
      key: "statusCmt",
      ...getColumnSearchProps('statusCmt'),
      sorter: (a, b) => a.statusCmt.localeCompare(b.statusCmt),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, cmts) => {
        const isActive = cmts.statusCmt === "Sử dụng";
        return (
          <div className="flex space-x-3">
            <Button onClick={() => mutate(cmts?.id)} type="primary" style={{ backgroundColor: isActive ? '#ff4d4f' : '#52c41a' }}>
              {isActive ? "Đóng bình luận" : "Mở bình luận"}
            </Button>
          </div>
        )
      }
    },
  ];
  const expandColumns = [
    {
      title: "Mã bình luận", dataIndex: "id", key: "id",
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Người bình luận", dataIndex: "user", key: "user",
      ...getColumnSearchProps('user'),
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: "Email", dataIndex: "email", key: "email",
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Bình luận", dataIndex: "comment", key: "comment",
      ...getColumnSearchProps('comment'),
      sorter: (a, b) => a.comment.localeCompare(b.comment),
    },
    {
      title: "Đánh giá", dataIndex: "star", key: "star",
      sorter: (a, b) => a.star.localeCompare(b.star),
    },
    {
      title: "Ngày bình luận", dataIndex: "date", key: "date",
      ...getColumnSearchProps('date'),
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Trạng thái", dataIndex: "isClose", key: "isClose",
      ...getColumnSearchProps('isClose'),
      sorter: (a, b) => a.isClose.localeCompare(b.isClose),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, record) => {
        const isActive = record.isClose === "Hiển thị";
        return (
          <div className="flex space-x-3">
            <Button onClick={() => {
              mutateDetail(record.id);
            }} type="primary" style={{ backgroundColor: isActive ? '#ff4d4f' : '#52c41a' }}>
              {isActive ? "Khóa" : "Mở"}
            </Button>
          </div>
        );
      },
    },
  ];
  const expandedRowRender = (record) => {
    const ratingsData = record.ratings.map((rating) => ({
      id: rating.id,
      user: rating.user,
      email: rating.email,
      comment: rating?.comment,
      star: rating?.star,
      date: moment(rating?.date).format("YYYY-MM-DD HH:mm"),
      ssd: rating?.storage?.capacity,
      isClose: rating.isClose === 1 ? "Hiển thị" : "Dừng hiển thị ",
      isDisabled: rating.isClose !== 1,
    }));
    console.log("first", ratingsData)
    return (
      <Table
        columns={expandColumns}
        dataSource={ratingsData}
        pagination={false}
        rowClassName={record => (record.isDisabled ? 'bg-gray-300 ' : '')}
      />
    );
  };
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Quản lý bình luận</h1>
      </div>
      <Table dataSource={dataSource} columns={columns}
        expandable={{ expandedRowRender }}
        rowClassName={record => (record.isDisabled ? 'bg-gray-300 ' : '')} />
    </div>
  );
};

export default ListComment;