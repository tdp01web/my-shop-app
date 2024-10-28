import React from "react";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";

const SearchProduct = () => {
  const { mobile } = useBreakpoints();

  return (
    <div className=" w-[40%] sm:w-[70%] md:w-[50%] 2xl:w-[35%]">
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 40,
        }}
      >
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Bạn muốn tìm gì" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchProduct;
