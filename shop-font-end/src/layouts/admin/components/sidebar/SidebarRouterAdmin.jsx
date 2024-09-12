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
  HomeOutlined
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
  getItem(<Link to="/admin">Dashboard</Link>, '/admin/dashboard', <HomeOutlined />),
  getItem('Sản phẩm', 'Sản phẩm', <MobileOutlined />, [
    getItem(<Link to="/admin/products">Danh sách sản phẩm</Link>, '/admin/products'),
    getItem(<Link to="/admin/products/add">Thêm mới sản phẩm</Link>, '/admin/products/add'),

  ]),
  getItem('Danh mục', 'Danh mục', <LaptopOutlined />, [
    getItem(<Link to="/admin/categories">Danh sách danh mục</Link>, '/admin/categories'),
  ]),
  getItem('Tài khoản', 'Tài khoản', <UserOutlined />, [
    getItem(<Link to="/admin/users">Danh sách tài khoản</Link>, '/admin/users'),
  ]),
  getItem('Bình luận', 'Bình luận', <MessageOutlined />, [
    getItem(<Link to="/admin/comments">Danh sách bình luận</Link>, '/admin/comments'),
  ]),
  getItem('Đơn hàng', 'Đơn hàng', <ShoppingCartOutlined />, [
    getItem(<Link to="/admin/carts">Danh sách Đơn hàng</Link>, '/admin/carts'),
  ]),
  getItem('Vouchers', 'Vouchers', <TagsOutlined />, [
    getItem(<Link to="/admin/vouchers">Danh sách Vouchers</Link>, '/admin/vouchers'),
  ]),
];