import React, { useState } from 'react';
  import { AppBar, Box, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import HomeIcon from '@mui/icons-material/Home';
  import SummarizeIcon from '@mui/icons-material/Summarize';
  import HelpIcon from '@mui/icons-material/Help';
  import AccountCircle from '@mui/icons-material/AccountCircle';
  import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
  import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
  import LogoutIcon from '@mui/icons-material/Logout';
  import { Link, useNavigate } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { authActions } from '../store/authSlice';
  
  interface MenuProps {
    nombreUsuario?: string;  
  }
  
  const Menu: React.FC<MenuProps> = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const userData = useSelector((state: any) => state.authenticator);
    const nombreUsuario = userData?.nombreUsuario || 'Usuario';
    const userRole = userData?.rol; 
  
    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
  
    const handleLogout = () => {
      dispatch(authActions.logout());
      navigate('/'); 
    };
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>
          </Link>
  
          {userRole !== 'invitado' && userRole === 'admin' && (
            <Link to="/reports" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Informes" />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
  
          {userRole !== 'invitado' && userRole === 'admin' && (
            <Link to="/ManageUsers" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestión usuarios" />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
  
          <Link to="/help" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Ayuda" />
              </ListItemButton>
            </ListItem>
          </Link>
  
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
  
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {nombreUsuario}
            </Typography>
  
            <IconButton color="inherit">
              {userRole === 'admin' ? <AdminPanelSettingsIcon /> : userRole === 'invitado' ? <InsertEmoticonIcon /> : <AccountCircle />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };
  
  export default Menu;