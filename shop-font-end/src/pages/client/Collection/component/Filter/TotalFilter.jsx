import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Button, Popover } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import FilterPopover from "./FilterModule/FilterPopover";

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
const TotalFilter = ({
  selectedCpu,
  selectedVga,
  selectedBrand,
  priceRange,
  ramSizes,
  Cpunames,
  Brand,
  Category,
  SSDnames,
  Vganames,
  selectedCategory,
  selectedSSD,
  setSelectedSSD,
  selectedIndices,
  setSelectedCategory,
  setSelectedIndices,
  setSelectedCpu,
  setSelectedVga,
  setSelectedBrand,
  setPriceRange,
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
          borderColor: anchorEl ? "#007bff" : "grey.500",
          color: anchorEl ? "#007bff" : "black",
          fontWeight: anchorEl ? 450 : 400,
          height: "50px",
        }}
      >
        <FilterAltOutlinedIcon fontSize="small" /> Bộ lọc
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{ marginTop: "10px", maxWidth: "100%", width: "90%" }}
      >
        <FilterPopover
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCpu={selectedCpu}
          setSelectedCpu={setSelectedCpu}
          selectedIndices={selectedIndices}
          setSelectedIndices={setSelectedIndices}
          selectedCategory={selectedCategory}
          selectedSSD={selectedSSD}
          setSelectedSSD={setSelectedSSD}
          selectedVga={selectedVga}
          setSelectedVga={setSelectedVga}
          setSelectedCategory={setSelectedCategory}
          Category={Category}
          Brand={Brand}
          Cpunames={Cpunames}
          ramSizes={ramSizes}
          SSDnames={SSDnames}
          Vganames={Vganames}
        />
      </Popover>
    </ThemeProvider>
  );
};

export default TotalFilter;
