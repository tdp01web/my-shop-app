import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VGAcon from "./components/VGA";
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
const VGAFilter = ({ Vganames, selectedVga, setSelectedVga }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReset = () => {
    setSelectedVga([]); 
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
          borderColor: selectedVga.length > 0 ? "#007bff" : "grey.500",
          color: selectedVga.length > 0 ? "#007bff" : "black",
          fontWeight: selectedVga.length > 0 ? 450 : 400,
        }}
      >
        VGA
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
          <VGAcon
            Vganames={Vganames}
            selectedVga={selectedVga}
            setSelectedVga={setSelectedVga}
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

export default VGAFilter;
