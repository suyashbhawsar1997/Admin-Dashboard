import React, { useState } from 'react';
import { AppBar, Avatar, Box, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import { MenuItem } from '@material-ui/core';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar className="header">
                    <Typography className="text" variant="h5">
                        Dashboard
                    </Typography>
                    <Box ml="auto">
                        <IconButton onClick={handleMenuClick}>
                            <Avatar>U</Avatar>
                        </IconButton>
                        <Menu
                            id="logout-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem>
                                <ExitToAppIcon />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
