import { useState } from 'react';
import { Button} from '@mui/material';
const Status = () => {
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
            Hiện sản phẩm hết hàng
          </Button>
    </div>
  )
}

export default Status
