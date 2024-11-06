import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "./../../../../../configs/instance";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async (query) => {
    const response = await instance.get(`/product/search?query=${query}`);
    return response.data;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length > 0) {
      const results = await fetchProducts(query);
      console.log(results);
      navigate("/search", { state: { query, results } });
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
    </div>
  );
};

export default SearchProduct;
