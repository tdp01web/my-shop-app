import { Box, Button } from "@mui/material";
/* eslint-disable react/prop-types */
const CPUcon = ({ Cpunames = [], selectedCpu = [], setSelectedCpu }) => {
  const handleSelect = (index) => {
    setSelectedCpu((prev) =>
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
        {Cpunames.length > 0 ? (
          Cpunames.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              color="primary"
              sx={{
                color: selectedCpu.includes(index) ? "#007bff" : "black",
                fontWeight: selectedCpu.includes(index) ? 700 : 400,
                flexBasis: "40%",
                margin: "5px",
                width: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có CPU để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default CPUcon;
