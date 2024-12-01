import { Box, Button } from "@mui/material";
/* eslint-disable react/prop-types */
const Categorycon = ({
  Category = [],
  selectedCategory = [],
  setSelectedCategory,
}) => {
  const handleSelect = (index) => {
    setSelectedCategory((prev) => {
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
        {Category.length > 0 ? (
          Category.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              sx={{
                borderColor: selectedCategory.includes(index)
                  ? "success.main"
                  : "grey.500",
                color: selectedCategory.includes(index)
                  ? "success.main"
                  : "black",
                fontWeight: selectedCategory.includes(index) ? 450 : 400,
                margin: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có tác vụ để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default Categorycon;
