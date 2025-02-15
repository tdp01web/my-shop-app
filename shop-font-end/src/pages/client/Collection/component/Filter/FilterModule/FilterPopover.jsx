import { Box, Button, Grid, Paper } from "@mui/material";
import Brandcon from "../components/Brand";
import CPUcon from "../components/CPU";
import Price from "../components/Price";
import RAMcon from "../components/RAM";
import SSDcon from "../components/SSD";
import VGAcon from "../components/VGA";
import Categorycon from "./../components/Category";

/* eslint-disable react/prop-types */
const FilterPopover = ({
  priceRange,
  setPriceRange,
  selectedBrand,
  setSelectedBrand,
  selectedCpu,
  setSelectedCpu,
  selectedIndices,
  setSelectedCategory,
  setSelectedIndices,
  selectedSSD,
  setSelectedSSD,
  selectedVga,
  setSelectedVga,
  selectedCategory,
  Brand,
  Cpunames,
  ramSizes,
  Category,
  SSDnames,
  Vganames,
}) => {
  const resetFilters = () => {
    setSelectedCpu([]);
    setSelectedVga([]);
    setSelectedBrand([]);
    setSelectedIndices([]);
    setSelectedCategory([]);
    setSelectedSSD([]);
    setPriceRange([0, 10000000000]);
  };

  const filters = [
    {
      label: "Giá",
      component: (
        <Price priceRange={priceRange} onPriceChange={setPriceRange} />
      ),
    },
    {
      label: "Hãng",
      component: (
        <Brandcon
          Brand={Brand}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
        />
      ),
    },
    {
      label: "CPU",
      component: (
        <CPUcon
          Cpunames={Cpunames}
          selectedCpu={selectedCpu}
          setSelectedCpu={setSelectedCpu}
        />
      ),
    },
    {
      label: "RAM",
      component: (
        <RAMcon
          ramSizes={ramSizes}
          selectedIndices={selectedIndices}
          setSelectedIndices={setSelectedIndices}
        />
      ),
    },
    {
      label: "SSD",
      component: (
        <SSDcon
          SSDnames={SSDnames}
          selectedSSD={selectedSSD}
          setSelectedSSD={setSelectedSSD}
        />
      ),
    },
    {
      label: "Nhu cầu sử dụng",
      component: (
        <Categorycon
          Category={Category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ),
    },
    {
      label: "VGA",
      component: (
        <VGAcon
          Vganames={Vganames}
          selectedVga={selectedVga}
          setSelectedVga={setSelectedVga}
        />
      ),
    },
  ];

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Paper sx={{ marginTop: 2, width: "100%" }}>
        <Grid container spacing={2} sx={{ px: 2, py: 2 }}>
          {filters.map((filter, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={index}
              sx={{ borderBottom: "1px solid #e0e0e0" }}
            >
              <Box>
                <strong>{filter.label}</strong>
                {filter.component}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box mt={2} display="flex" justifyContent="space-between" width="100%">
        <Button variant="outlined" color="error" onClick={resetFilters}>
          Bỏ chọn
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPopover;
