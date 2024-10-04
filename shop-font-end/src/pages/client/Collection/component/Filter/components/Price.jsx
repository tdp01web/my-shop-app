import { useState } from 'react';
import {Box } from '@mui/material';
import { TextField, Slider } from '@mui/material';
const Price = () => {
    const [selected, setSelected] = useState(false); 
    const [priceRange, setPriceRange] = useState([10000000, 60000000]); 
    const defaultPriceRange = [10000000, 60000000]; 
    const handlePriceChange = (event, newValue) => {
      setPriceRange(newValue); 
      if (newValue[0] !== defaultPriceRange[0] || newValue[1] !== defaultPriceRange[1]) {
        setSelected(true); 
      }
    };
  return (
    <div>
         <Box p={2} width="250px">
          
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
    </div>
  )
}

export default Price
