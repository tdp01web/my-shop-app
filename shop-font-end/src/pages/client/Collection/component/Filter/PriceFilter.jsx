import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Button, Popover } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";
import Price from "./components/Price";

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
const PriceFilter = ({ priceRange, setPriceRange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const defaultPriceRange = [1000, 60000000];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  const handleReset = () => {
    setPriceRange(defaultPriceRange);
  };

  const open = Boolean(anchorEl);
  const id = open ? "price-popover" : undefined;

  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: priceRange.length > 0 ? "grey.500" : "grey.500",
          color: priceRange.length > 0 ? "black" : "black",
          fontWeight: priceRange.length > 0 ? 450 : 400,
        }}
      >
        Giá <ArrowDropDownIcon />
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
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ marginTop: "10px", width: "400px" }} 
        disableRestoreFocus
        disableEnforceFocus
        ref={popoverRef} 
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Price
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            defaultPriceRange={defaultPriceRange}
          />
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Button variant="outlined" color="error" onClick={handleReset}>
              Bỏ chọn
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#007bff" }}>
              Xem kết quả
            </Button>
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default PriceFilter;
