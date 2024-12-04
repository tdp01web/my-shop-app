import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Button, Popover } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Categorycon from "./components/Category";

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
const CategoryFilter = ({
  Category,
  selectedCategory,
  setSelectedCategory,
}) => {
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
          borderColor: selectedCategory.length > 0 ? "#007bff" : "grey.500",
          color: selectedCategory.length > 0 ? "#007bff" : "black",
          fontWeight: selectedCategory.length > 0 ? 450 : 400,
        }}
      >
        Nhu cầu xử dụng <ArrowDropDownIcon />
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
          <Categorycon
            Category={Category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSelectedCategory([])}
            >
              Bỏ chọn
            </Button>
            <Box ml={1} />
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default CategoryFilter;
