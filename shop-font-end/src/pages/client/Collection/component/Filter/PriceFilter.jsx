import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Button, Popover, Box } from '@mui/material';
import { TextField, Slider } from '@mui/material';
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

const PriceFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(false); 
  const [priceRange, setPriceRange] = useState([10000000, 60000000]); 
  const defaultPriceRange = [10000000, 60000000]; 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleClose = () => {
    setAnchorEl(null); 
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue); 
    if (newValue[0] !== defaultPriceRange[0] || newValue[1] !== defaultPriceRange[1]) {
      setSelected(true); 
    }
  };

  const handleReset = () => {
    setPriceRange(defaultPriceRange);
    setSelected(false); 
  };

  const open = Boolean(anchorEl);
  const id = open ? 'price-popover' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: selected ? '#007bff' : 'grey.500',
          color: selected ? '#007bff' : 'black',
          fontWeight: selected ? 450 : 400,
        }}
      >
        Giá <ArrowDropDownIcon />
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
        sx={{ marginTop: '10px', width: '900px' }}
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Box p={2} width="600px">
          
            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                value={priceRange[0].toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
                variant="outlined"
                size="small"
                sx={{ width: '45%' }}
              />
              <TextField
                value={priceRange[1].toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
                variant="outlined"
                size="small"
                sx={{ width: '45%' }}
              />
            </Box>

           
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              min={10000000}
              max={60000000}
              valueLabelDisplay="auto"
              sx={{ color: 'green' }}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="error" onClick={handleReset}>
              Bỏ chọn
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#007bff' }}>
              Xem kết quả
            </Button>
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default PriceFilter;
