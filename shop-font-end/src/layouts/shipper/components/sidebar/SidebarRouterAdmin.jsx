import React from 'react';
import {
  LaptopOutlined,
  MobileOutlined,
  MessageOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  InfoOutlined,
  PhoneOutlined,
  HomeOutlined,
  InsuranceOutlined,
  ProductOutlined,
  MenuOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function getItem(
  label,
  key,
  icon,
  children,
  type
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const items = [
  getItem(<Link to="/shipper">Dashboard</Link>, '/shipper/dashboard', <HomeOutlined />),
  getItem('Đơn hàng', 'Đơn hàng', <ShoppingCartOutlined />, [
    getItem(<Link to="/shipper/carts">Danh sách đơn hàng</Link>, '/shipper/carts'),
  ]),
  getItem('Đơn hàng của tôi', 'Đơn hàng của tôi', <LaptopOutlined />, [
    getItem(<Link to="/shipper/my-carts">Đơn hàng của tôi</Link>, '/shipper/my-carts'),
  ]),
];