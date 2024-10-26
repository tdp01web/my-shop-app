import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Size from "./components/Size";

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
const SizeFilter = ({ LCD, selectedLcd, setSelectedLcd }) => {
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
          borderColor: selectedLcd.length > 0 ? "#007bff" : "grey.500",
          color: selectedLcd.length > 0 ? "#007bff" : "black",
          fontWeight: selectedLcd.length > 0 ? 450 : 400,
        }}
      >
        Kích thước màn hình
        <ArrowDropDownIcon />
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
        sx={{
          marginTop: "10px",
          height: "200px",
        }}
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Size
            LCD={LCD}
            selectedLcd={selectedLcd}
            setSelectedLcd={setSelectedLcd}
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
              onClick={() => setSelectedLcd([])}
            >
              Bỏ chọn
            </Button>
            <Box ml={1} />
            <Button variant="contained" sx={{ backgroundColor: "#007bff" }}>
              Xem kết quả
            </Button>
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default SizeFilter;
