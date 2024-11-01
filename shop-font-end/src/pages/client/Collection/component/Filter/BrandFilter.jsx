// components/Filter/BrandFilter.js
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Brandcon from "./components/Brand";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 400,
        },
      },
    },
  },
});

/* eslint-disable react/prop-types */
const BrandFilter = ({ Brand, selectedBrand, setSelectedBrand }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: selectedBrand.length > 0 ? "#007bff" : "grey.500",
          color: selectedBrand.length > 0 ? "#007bff" : "black",
          fontWeight: selectedBrand.length > 0 ? 450 : 400,
        }}
      >
        Hãng <ArrowDropDownIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Brandcon
            Brand={Brand}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default BrandFilter;
