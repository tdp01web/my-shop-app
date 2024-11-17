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
  getItem(<Link to="/staff">Dashboard</Link>, '/staff/dashboard', <HomeOutlined />),
  getItem('Sản phẩm', 'Sản phẩm', <LaptopOutlined />, [
    getItem(<Link to="/staff/products">Danh sách sản phẩm</Link>, '/staff/products'),
  ]),
  getItem('Đơn hàng', 'Đơn hàng', <ShoppingCartOutlined />, [
    getItem(<Link to="/staff/carts">Danh sách đơn hàng</Link>, '/staff/carts'),
  ]),
];