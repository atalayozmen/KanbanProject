import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import './App.css';
import SidebarComp from './components/sidebar/SidebarComp';
import AppbarComp from './components/appbar/AppbarComp';
import KanbanBoardComp from './components/board/KanbanBoardComp';
import { ThemeProvider, createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // White
    },
    secondary: {
      main: '#dc004e', // Red
    },
    background: {
      default: '#21212D', // Dark Grey

      paper: '#2C2C38', // Light Grey

      // default: '#2C2C38', // Light Grey
      // paper: '#21212D', // Dark Grey
    },
  },
});

function App() {
  return (
    <Box
      style={{
        overflowY: 'hidden',
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppbarComp />
        <SidebarComp />
        <KanbanBoardComp />
      </ThemeProvider>
    </Box>
  );
}

export default App;
