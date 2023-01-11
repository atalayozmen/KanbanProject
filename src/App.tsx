import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
} from '@mui/material';
import React from 'react';
import './App.css';
import SidebarComp from './components/SidebarComp';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: '#2c2c38' }} position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant='contained'>+ Add New Task</Button>
          <IconButton color='primary'>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SidebarComp />
    </React.Fragment>
  );
}

export default App;
