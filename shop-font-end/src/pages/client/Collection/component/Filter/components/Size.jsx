import { Box, Button } from "@mui/material";
/* eslint-disable react/prop-types */
const Size = ({ LCD = [], selectedLcd = [], setSelectedLcd }) => {
  const handleSelect = (index) => {
    setSelectedLcd((prev) => {
      const newselectedLcd = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
      return newselectedLcd;
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
        {LCD.length > 0 ? (
          LCD.map((label, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSelect(index)}
              sx={{
                borderColor: selectedLcd.includes(index)
                  ? "success.main"
                  : "grey.500",
                color: selectedLcd.includes(index) ? "success.main" : "black",
                fontWeight: selectedLcd.includes(index) ? 450 : 400,
                margin: "5px",
              }}
            >
              {label}
            </Button>
          ))
        ) : (
          <div>Không có màn để hiển thị.</div>
        )}
      </Box>
    </div>
  );
};

export default Size;
