import { useState } from 'react';
import { Button} from '@mui/material';
const Need = () => {
    
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
              width: '200px'
            }}
          >
           Văn phòng
          </Button>
   
    </div>
  )
}


export default Need
