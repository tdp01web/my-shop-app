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
  FolderOpenOutlined,
  ShopOutlined,
  NotificationOutlined
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
  getItem(<Link to="/admin/sales">Bán hàng</Link>, '/admin/sales', <ShopOutlined />),
  getItem('Danh mục', 'Danh mục', <MenuOutlined />, [
    getItem(<Link to="/admin/categories">Danh sách danh mục</Link>, '/admin/categories'),
  ]),
  getItem('Hãng', 'Hãng', <InsuranceOutlined />, [
    getItem(<Link to="/admin/brand">Danh sách hãng</Link>, '/admin/brand'),
  ]),
  getItem('Biến thể', 'Biến thể', <ProductOutlined />, [
    getItem('CPU', 'CPU', <FolderOpenOutlined />, [
      getItem(<Link to="/admin/cpu">Danh sách CPU</Link>, '/admin/cpu'),
    ]),
    getItem('GPU', 'GPU', <FolderOpenOutlined />, [
      getItem(<Link to="/admin/gpu">Danh sách GPU</Link>, '/admin/gpu'),
    ]),
    getItem('RAM', 'RAM', <FolderOpenOutlined />, [
      getItem(<Link to="/admin/ram">Danh sách RAM</Link>, '/admin/ram'),
    ]),
    getItem('SSD', 'SSD', <FolderOpenOutlined />, [
      getItem(<Link to="/admin/ssd">Danh sách SSD</Link>, '/admin/ssd'),
    ]),
  ]),
  getItem('Sản phẩm', 'Sản phẩm', <LaptopOutlined />, [
    getItem(<Link to="/admin/products">Danh sách sản phẩm</Link>, '/admin/products'),
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
  getItem('Tin tức', 'Tin tức', <NotificationOutlined />, [
    getItem(<Link to="/admin/blog">Danh sách Tin tức</Link>, '/admin/blog'),
  ]),
];