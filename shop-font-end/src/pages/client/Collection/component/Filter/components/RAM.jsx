import { Button, Box } from "@mui/material";
/* eslint-disable react/prop-types */
const RAMcon = ({
  ramSizes = [],
  selectedIndices = [],
  setSelectedIndices,
}) => {
  const handleSelect = (index) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
        {ramSizes.length > 0 ? (
          ramSizes.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              sx={{
                borderColor: selectedIndices.includes(index)
                  ? "success.main"
                  : "grey.500",
                color: selectedIndices.includes(index)
                  ? "success.main"
                  : "black",
                fontWeight: selectedIndices.includes(index) ? 450 : 400,
                margin: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có RAM để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default RAMcon;
