import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SortIcon from "@mui/icons-material/Sort";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

/* eslint-disable react/prop-types */
const ArrangeFilter = ({ onSortChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) onSortChange(option);
    setAnchorEl(null);
  };

  return (
    <div className="arrange-filter">
      <Button
        variant="outlined"
        startIcon={<SortIcon />}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{
          borderColor: onSortChange.length > 0 ? "grey.500" : "grey.500",
          color: onSortChange.length > 0 ? "black" : "black",
          fontWeight: onSortChange.length > 0 ? 450 : 400,
        }}
      >
        Sắp xếp
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("Tên từ A-Z")}>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText>Tên từ A-Z</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose("Tên từ Z-A")}>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText>Tên từ Z-A</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose("Giá tăng dần")}>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText>Giá tăng dần</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose("Giá giảm dần")}>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText>Giá giảm dần</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ArrangeFilter;
