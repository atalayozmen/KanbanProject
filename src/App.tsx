import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import './App.css';
import SidebarComp from './components/sidebar/SidebarComp';
import AppbarComp from './components/appbar/AppbarComp';
import KanbanBoardComp from './components/board/KanbanBoardComp';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#2C2C38', // Dark Grey
      paper: '#2C2C38', // Light Grey
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#655DC3',
          borderRadius: '40px',
          '&:hover': {
            backgroundColor: '#655DC3',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#2C2C38',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: '#2C2C38',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& > fieldset': {
            borderColor: '#404258',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#bdbdbd',
        },
      },
    },
  },
});

function App() {
  return (
    <Box style={{}}>
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
