import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Popover, Radio, Select, Space, Switch, Table, Tabs, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useTabsContext } from './contextTab';
import ModalProduct from './modalProduct';
import ModalUser from './modalUser';
import FormUser from './FormUser';

const Sales = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const modalProductRef = useRef();
  const { items, handleAddItems, handleRemoveItem, handleRemoveProduct, handleAddQuantities, handleSetTotalPrice } = useTabsContext()
  console.log("items", items)
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
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "keyPr",
      key: "keyPr",
      width: '20%',
      ...getColumnSearchProps('keyPr'),
      sorter: (a, b) => a.keyPr.localeCompare(b.keyPr),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: '20%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (_, record) => {
        return (
          <div className='flex flex-col'>
            <span>{record.title}</span>
            <span className='text-[1.4rem] text-red-500'>{Number(record.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          </div>
        )
      }
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: "10%",
      render: (images) =>
        images && images.length > 0 ? (
          <img
            src={images[0].url}
            alt="product"
            style={{ width: 100, height: 100, borderRadius: 5 }}
          />
        ) : (
          "Không có ảnh"
        ),
    },
    {
      title: "Số lượng",
      width: 100,
      render: (_, record) => (
        <InputNumber
          defaultValue={1}
          min={1}
          max={record.quantity}
          onChange={(value) => {
            handleAddQuantities(activeKey, record, value)
            handleSetTotalPrice(activeKey, record, value * record.price)
          }}
        />
      )
    },
    {
      title: "Tổng tiền",
      sorter: (a, b) => a.price.localeCompare(b.price),
      render: (_, record) => {
        return <span className='text-[1.4rem] text-red-500'>{Number(record.totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>;
      }
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 250,
      render: (_, record) => {
        return (
          <div className="flex space-x-3">
            <Button type="primary" danger onClick={() => handleRemoveProduct(activeKey, record.keyPr)}>
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  const [activeKey, setActiveKey] = useState(1);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      handleAddItems();
    } else {
      handleRemoveItem(targetKey);
    }
  };

  return (
    <>
      {contextHolder}
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items.map((i, index) => ({
          label: `Hóa đơn ${index + 1}`,
          children: <>
            <div>
              <div className='flex flex-row justify-between items-center'>
                <h1 className='font-bold text-2xl'>Danh sách sản phẩm</h1>
                <Button type="primary" onClick={() => {
                  modalProductRef.current.open(i.key)
                }}>
                  <PlusCircleFilled /> Thêm sản phẩm
                </Button>
              </div>
              <Table
                dataSource={i.product}
                columns={columns}
              />
            </div>
            <div>
              <FormUser item={i} />
            </div>
          </>,
          key: i.key
        }))}
        hideAdd={items.length >= 10}
      />
      <ModalProduct ref={modalProductRef} />
    </>

  );
};

export default Sales;