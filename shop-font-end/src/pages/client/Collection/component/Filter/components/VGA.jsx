import { Box, Button } from "@mui/material";
/* eslint-disable react/prop-types */
const CPUcon = ({ Vganames = [], selectedVga = [], setSelectedVga }) => {
  const handleSelect = (index) => {
    setSelectedVga((prev) =>
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
        {Vganames.length > 0 ? (
          Vganames.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              color="primary"
              sx={{
                color: selectedVga.includes(index) ? "#007bff" : "black",
                fontWeight: selectedVga.includes(index) ? 700 : 400,
                flexBasis: "40%",
                margin: "5px",
                width: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có VGA để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default CPUcon;
