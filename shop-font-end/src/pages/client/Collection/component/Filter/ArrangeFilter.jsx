import React from 'react';
import { Button, Popover, Box, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';

const ArrangeFilter = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState("Nổi bật");
    const [anchorEl, setAnchorEl] = React.useState(null);

    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
        setIsOpen((prev) => !prev);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setIsOpen(false);
        setAnchorEl(null);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
            <div className="relative inline-block text-left">
                <Button
                    onClick={toggleDropdown}
                    variant="outlined"
                    sx={{
                        borderColor: 'grey.500',
                        color: 'black',
                        textTransform: 'none',
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <i className="fas fa-sort"></i>
                    <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                    <SortIcon /> Xếp theo: {selectedOption} 
                    </Typography>
                    <ArrowDropDownIcon sx={{ marginLeft: '8px' }} />
                </Button>

                <Popover
                    open={isOpen}
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
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    <Box
                        sx={{
                            padding: '8px',
                            width: '200px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                           
                        }}
                    >
                        {["Nổi bật", "Tên từ A-Z", "Tên từ Z-A", "Giá tăng dần", "Giá giảm dần"].map((option) => (
                            <MenuItem
                                key={option}
                                onClick={() => selectOption(option)}
                                sx={{
                                    justifyContent: 'flex-start',
                                    textTransform: 'none',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        fontWeight: '500'
                                    },
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Box>
                </Popover>
            </div>
        </div>
    );
};

export default ArrangeFilter;