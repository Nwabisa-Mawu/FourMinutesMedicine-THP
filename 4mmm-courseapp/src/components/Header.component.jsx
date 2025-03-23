import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box,
  useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon, Login, PersonAdd, Edit, Logout } from '@mui/icons-material';
import "./css/Header.component.css";

const HeaderComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLoggedIn = false;
  
  // User menu state
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  
  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleUserMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const mobileDrawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setMobileDrawerOpen(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <Login />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary="Sign Up" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Course App
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleMobileDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileDrawerOpen}
              onClose={toggleMobileDrawer}
            >
              {mobileDrawerContent}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Button color="inherit" sx={{ mr: 1 }} startIcon={<Login />}>
              Login
            </Button> */}
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ mr: 2 }}
              startIcon={<PersonAdd />}
            >
              Sign Up
            </Button>
            
            { isLoggedIn ?
            <IconButton
              size="large"
              onClick={handleUserMenu}
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
            <AccountCircle />
            </IconButton> : <p></p>}
            <Menu
              id="menu-appbar"
              anchorEl={userMenuAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isUserMenuOpen}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
