import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Button, Popover, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 400,
        },
      },
    },
  },
});

const SizeFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleClose = () => {
    setAnchorEl(null); 
  };

  const handleSelect = (index) => {
    setSelectedIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: selectedIndices.length > 0 ? '#007bff' : 'grey.500',
          color: selectedIndices.length > 0 ? '#007bff' : 'black',
          fontWeight: selectedIndices.length > 0 ? 450 : 400,
        }}
      >
        Kích thước màn hình<ArrowDropDownIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose} 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}  
        sx={{ 
          marginTop: '10px',
          height: '200px',
        }}
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" width="100%">
            {['14 inch', '15.6 inch'].map((label, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleSelect(index)}
                color="primary"
                sx={{
                  color: selectedIndices.includes(index) ? '#007bff' : 'black',
                  fontWeight: selectedIndices.includes(index) ? 700 : 400,
                  flex: '1 1 auto',
                  margin: '5px',
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="error" onClick={() => setSelectedIndices([])}>
              Bỏ chọn
            </Button>
            <Box ml={1} />
            <Button variant="contained" sx={{ backgroundColor: '#007bff' }}>
              Xem kết quả
            </Button>
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default SizeFilter;