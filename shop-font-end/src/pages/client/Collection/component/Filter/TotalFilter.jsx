import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Button, Popover, Box } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
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

const TotalFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(false); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleClose = () => {
    setAnchorEl(null); 
  };

  const handleSelect = () => {
    setSelected((prev) => !prev); 
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: selected ? '#007bff': 'grey.500',
          color: selected ?'#007bff': 'black',
          fontWeight: selected ? 450 : 400,
        }}
      >
    <FilterAltOutlinedIcon fontSize='small'/>    Bộ lọc
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
          <Button
            variant="outlined"
            onClick={handleSelect}
            color="primary"
            fullWidth
            sx={{
              color: selected ? '#007bff': 'black',
              fontWeight: selected ? 700 : 400,
            }}
          >
            Hiện sản phẩm hết hàng
          </Button>
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="error" onClick={() => setSelected(false)}>
              Bỏ chọn
            </Button>
            <Box ml={1} />
            <Button variant="contained"  sx={{backgroundColor: '#007bff'}}>
              Xem kết quả
            </Button>
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default TotalFilter;
