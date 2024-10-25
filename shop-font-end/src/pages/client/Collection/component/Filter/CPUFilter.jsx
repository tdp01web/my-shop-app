import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CPUcon from "./components/CPU";

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
const CPUFilter = ({ Gpunames, selectedGpu, setSelectedGpu }) => {
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
          borderColor: selectedGpu.length > 0 ? "#007bff" : "grey.500",
          color: selectedGpu.length > 0 ? "#007bff" : "black",
          fontWeight: selectedGpu.length > 0 ? 450 : 400,
        }}
      >
        CPU
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
          <CPUcon
            Gpunames={Gpunames}
            selectedGpu={selectedGpu}
            setSelectedGpu={setSelectedGpu}
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
              onClick={() => setSelectedGpu([])}
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

export default CPUFilter;
