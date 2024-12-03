import React, { useState } from "react";
import { Button, Input, Layout, Typography, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined, SearchOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { instance } from "../../../../configs/instance";

const HeaderLayoutAdmin = () => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user" , user.role)

  const fetchProducts = async (query) => {
    try {
      const response = await instance.get(`/product/search?query=${query}`);
      if (response.data.message === "Không tìm thấy sản phẩm nào.") {
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      return null;
    }
  };

  const handleSearch = async () => {
    setErrorMessage("");
    if (query.trim().length > 0) {
      const results = await fetchProducts(query);
      if (results) {
        navigate("/admin/products", { state: { query, results } });
      } else {
        setErrorMessage("Không tìm thấy sản phẩm nào.");
        navigate("/admin/NotSearch", { state: { query } });
      }
    }
  };

  const menu = (
    <Menu style={{ width: 200}}>
      <Menu.Item key="user" onClick={() => navigate("/")}>
        <SmileOutlined /> Về trang người dùng
      </Menu.Item>
      <Menu.Item key="account" onClick={() => navigate(`/admin/users/${user._id}/edit`)}>
        <UserOutlined /> Tài khoản
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => handleLogout()}>
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const handleLogout = () => {
    console.log("Đăng xuất...");
    navigate("/login");
  };

  return (
    <Layout.Header
      className="flex items-center bg-primary-admin h-[64px] text-white header"
      style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex flex-1 justify-between items-center">
        <Link to="/admin" className="flex items-center w-[190px]">
          <img src="/images/logo/logoDesktop.png" alt="logo" />
        </Link>
        <div className="flex justify-center items-center gap-x-2 !w-[500px]">
          <Input
            placeholder="Tìm kiếm"
            className="w-full"
            prefix={<SearchOutlined />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button className="bg-black text-white" onClick={handleSearch}>
            <SearchOutlined />
          </Button>
        </div>
        <div>
          <Dropdown overlay={menu} trigger={['hover']}>
            <Typography.Title
              level={5}
              className="mr-44 !mb-0 !text-white cursor-pointer"
            >
              {!user.role === "Owner" && !user.role === "Admin" ?  `Nhân viên ${user.lastName} ${user.firstName}`: `Quản trị ${user.lastName} ${user.firstName}`}
            </Typography.Title>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderLayoutAdmin;