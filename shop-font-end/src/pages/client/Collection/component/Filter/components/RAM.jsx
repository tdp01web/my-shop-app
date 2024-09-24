import { useState } from 'react';
import { Button, Box } from '@mui/material';
const RAMcon = () => {
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
            {['4GB', '8GB', '16GB', '32GB'].map((label, index) => (
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
    </div>
  )
}

export default RAMcon
