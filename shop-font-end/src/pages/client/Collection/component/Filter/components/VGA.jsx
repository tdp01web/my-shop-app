import { useState } from 'react';
import { Button,  Box } from '@mui/material';
const VGAcon = () => {
    const [selectedIndices, setSelectedIndices] = useState([]); 
  

    const handleSelect = (index) => {
      setSelectedIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) 
          : [...prev, index] 
      );
    };
  
  
  
  return (
    <div>
       <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" width="100%">
            {['RTX 2050', 'RTX 3050', 'RTX 3060', 'RTX 4060', 'RTX 4050'].map((label, index) => (
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
                  flexBasis: '30%', 
                   width:'50px'
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
    </div>
  )
}

export default VGAcon
