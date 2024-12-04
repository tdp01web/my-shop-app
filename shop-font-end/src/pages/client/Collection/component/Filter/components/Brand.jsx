import { Box, Button } from "@mui/material";
/* eslint-disable react/prop-types */
const Brandcon = ({ Brand = [], selectedBrand = [], setSelectedBrand }) => {
  const handleSelect = (index) => {
    setSelectedBrand((prev) => {
      const newSelectedBrand = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
      return newSelectedBrand;
    });
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        width="100%"
      >
        {Brand.length > 0 ? (
          Brand.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              sx={{
                borderColor: selectedBrand.includes(index)
                  ? "success.main"
                  : "grey.500",
                color: selectedBrand.includes(index) ? "success.main" : "black",
                fontWeight: selectedBrand.includes(index) ? 450 : 400,
                margin: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có Hãng để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default Brandcon;
