import { Box } from "@mui/material";
import { TextField, Slider } from "@mui/material";

/* eslint-disable react/prop-types */
const Price = ({ priceRange = [0, 60000000], onPriceChange }) => {
  return (
    <Box p={2} width="250px">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          value={priceRange[0].toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
          variant="outlined"
          size="small"
          sx={{ width: "45%" }}
        />
        <TextField
          value={priceRange[1].toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
          variant="outlined"
          size="small"
          sx={{ width: "45%" }}
        />
      </Box>
      <Slider
        value={priceRange}
        onChange={onPriceChange} // Hàm thay đổi giá trị
        min={1000}
        max={60000000}
        valueLabelDisplay="auto"
        sx={{ color: "green" }}
      />
    </Box>
  );
};

export default Price;
