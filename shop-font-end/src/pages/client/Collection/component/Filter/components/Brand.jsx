import { useState } from 'react';
import { Button} from '@mui/material';
const Brand = () => {
    const [selected, setSelected] = useState(false); 
    const handleSelect = () => {
      setSelected((prev) => !prev); 
    };
  
   
  return (
    <div>
       <Button
            variant="outlined"
            onClick={handleSelect}
            color="primary"
            fullWidth
            sx={{
              color: selected ? '#007bff': 'black',
              fontWeight: selected ? 700 : 400,
              width:'100px',
              marginLeft: '10'
            }}
          >
          ASUS
          </Button>
    </div>
  )
}

export default Brand
