import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Button, Popover } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import SSDcon from "./components/SSD";
import { useSearchParams } from "react-router-dom";

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
const SSDFilter = ({ SSDnames, selectedSSD, setSelectedSSD }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReset = () => {
    setSelectedSSD([]); 
    setSearchParams({}); 
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: selectedSSD.length > 0 ? "#007bff" : "grey.500",
          color: selectedSSD.length > 0 ? "#007bff" : "black",
          fontWeight: selectedSSD.length > 0 ? 450 : 400,
        }}
      >
        SSD
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
          <SSDcon
            SSDnames={SSDnames}
            selectedSSD={selectedSSD}
            setSelectedSSD={setSelectedSSD}
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
            <Box ml={1} />
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default SSDFilter;
