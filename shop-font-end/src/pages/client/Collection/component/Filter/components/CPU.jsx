import { Box, Button } from "@mui/material";
/* eslint-disable react/prop-types */
const CPUcon = ({ Gpunames = [], selectedGpu = [], setSelectedGpu }) => {
  const handleSelect = (index) => {
    setSelectedGpu((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        width="100%"
      >
        {Gpunames.length > 0 ? (
          Gpunames.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              color="primary"
              sx={{
                color: selectedGpu.includes(index) ? "#007bff" : "black",
                fontWeight: selectedGpu.includes(index) ? 700 : 400,
                flexBasis: "40%",
                margin: "5px",
                width: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có GPU để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default CPUcon;
