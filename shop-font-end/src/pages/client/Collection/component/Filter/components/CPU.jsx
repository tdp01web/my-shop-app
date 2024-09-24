import { useState } from 'react';
import { Button, Box } from '@mui/material';

const CPUcon = () => {
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
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start" width="100%">
                {['AMD Ryzen 5', 'Intel Core i5', 'AMD Ryzen 7', 'Intel Core i7', 'AMD Ryzen 9'].map((label, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        onClick={() => handleSelect(index)} 
                        color="primary"
                        sx={{
                            color: selectedIndices.includes(index) ? '#007bff' : 'black', 
                            fontWeight: selectedIndices.includes(index) ? 700 : 400,
                            flexBasis: '40%', 
                            margin: '5px', 
                           width:'5px'
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </Box>
        </div>
    );
};

export default CPUcon;
