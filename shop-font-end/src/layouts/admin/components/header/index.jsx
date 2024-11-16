import React, { useState } from "react";
import { Button, Input, Layout, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { instance } from "../../../../configs/instance";

const HeaderLayoutAdmin = () => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  return (
    <Layout.Header
      className="header bg-primary-admin text-white h-[64px] flex items-center"
      style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex justify-between items-center flex-1">
        <Link to="/admin" className="flex items-center w-[190px]">
          <img src="/images/logo/logoDesktop.png" alt="logo" />
        </Link>
        <div className="!w-[500px] gap-x-2 flex justify-center items-center">
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
          <Typography.Title
            level={5}
            className="!mb-0 !text-white cursor-pointer"
          >
            Admin quản trị
          </Typography.Title>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderLayoutAdmin;
