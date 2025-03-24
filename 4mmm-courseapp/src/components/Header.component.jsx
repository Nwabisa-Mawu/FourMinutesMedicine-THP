import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../utils/context/AuthContext.service';
import { removeToken } from '../utils/helpers';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box,
  useMediaQuery, useTheme, Drawer, Link, List, ListItem, ListItemText, ListItemIcon, Divider
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon, Login, PersonAdd, Edit, Logout, Add as AddIcon } from '@mui/icons-material';
import "./css/Header.component.css";

const HeaderComponent = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // User menu state
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  // drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleLogout = () => {
    handleUserMenuClose();
    removeToken();
    localStorage.clear();
    //trigger a re-render in the header
    setUser(null); 
    navigate("/login", { replace: true });
  };

  const goToSignUp = () => {
    navigate("/signup", { replace: true});
  }

  const goToAddCourse = () => {
    navigate("/add-course", { replace: true })
  };

  const goToEditUser = () => {
    navigate("/edit-user", { replace: true })
  }
     
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
            { !user ? <Button 
              variant="contained" 
              color="secondary" 
              sx={{ mr: 2 }}
              startIcon={<PersonAdd
              />}
              onClick={goToSignUp}
            >
              Sign Up
            </Button> : <p></p>}

            { user ?
            <IconButton
              size="large"
              onClick={goToAddCourse}
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
            <AddIcon />
            </IconButton> : <p></p>}
            
            { user ?
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
              <MenuItem onClick={goToEditUser}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
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
