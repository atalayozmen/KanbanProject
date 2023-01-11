import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from '@mui/icons-material/Dashboard';

import React from 'react';
import BoardListItem from './BoardListItem';

const SidebarComp = () => {
  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: '240px',

          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '240px',
            boxSizing: 'border-box',
            backgroundColor: '#2c2c38',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Box
          sx={{ display: 'flex', marginTop: '5%', justifyContent: 'center' }}
        >
          <img
            style={{ width: '55%' }}
            src={require('../logo-no-background.png')}
            alt='Logo'
          ></img>
        </Box>

        <List>
          <BoardListItem boardName='Marketing Plan' />
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default SidebarComp;
