import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Button, Popover, Box, Paper, Grid } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Status from './components/Status';
import Price from './components/Price';
import Brand from './components/Brand';
import CPUcon from './components/CPU';
import RAMcon from './components/RAM';
import SSDcon from './components/SSD';
import Size from './components/Size';
import Need from './components/Need';
import VGAcon from './components/VGA';

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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const filters = [
    { label: 'Tình trạng sản phẩm', component: <Status /> },
    { label: 'Giá', component: <Price /> },
    { label: 'Hãng', component: <Brand /> },
    { label: 'CPU', component: <CPUcon /> },
    { label: 'RAM', component: <RAMcon /> },
    { label: 'SSD', component: <SSDcon /> },
    { label: 'Kích thước màn hình', component: <Size /> },
    { label: 'Nhu cầu sử dụng', component: <Need /> },
    { label: 'VGA', component: <VGAcon /> }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: selected ? '#007bff' : 'grey.500',
          color: selected ? '#007bff' : 'black',
          fontWeight: selected ? 450 : 400,
          height: '50px',
        }}
      >
        <FilterAltOutlinedIcon fontSize="small" /> Bộ lọc
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
        sx={{ marginTop: '10px', maxWidth: '100%', width: '90%' }}
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Paper sx={{ marginTop: 2, width: '100%' }}>
            <Grid container spacing={2} sx={{ px: 2, py: 2 }}>
              {filters.map((filter, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}  
                  md={4}   
                  key={index}
                  sx={{ borderBottom: '1px solid #e0e0e0' }}
                >
                  <Box>
                    <strong>{filter.label}</strong>
                    {filter.component}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="error" onClick={() => setSelected(false)}>
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

export default TotalFilter;
