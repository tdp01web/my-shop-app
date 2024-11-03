import { Box, Button } from "@mui/material";
/* eslint-disable react/prop-types */
const SSDcon = ({ SSDnames = [], selectedSSD = [], setSelectedSSD }) => {
  const handleSelect = (index) => {
    setSelectedSSD((prev) =>
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
        {SSDnames.length > 0 ? (
          SSDnames.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              color="primary"
              sx={{
                color: selectedSSD.includes(index) ? "#007bff" : "black",
                fontWeight: selectedSSD.includes(index) ? 700 : 400,
                flexBasis: "40%",
                margin: "5px",
                width: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có SSD để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default SSDcon;
