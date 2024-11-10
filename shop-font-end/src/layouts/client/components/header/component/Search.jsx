import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { instance } from "./../../../../../configs/instance";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setQuery("");
    }
  }, [location.pathname]);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (query.length > 0) {
      const results = await fetchProducts(query);
      if (results) {
        navigate("/search", { state: { query, results } });
      } else {
        setErrorMessage("Không tìm thấy sản phẩm nào.");
        navigate("/not-found-search", { state: { query } });
      }
    }
  };

  return (
    <div className="w-[60%] sm:w-[80%] md:w-[50%] 2xl:w-[35%]">
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 40,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Bạn muốn tìm gì"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default SearchProduct;
