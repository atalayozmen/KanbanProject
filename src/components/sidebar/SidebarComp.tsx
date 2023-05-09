import { Box, List, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useAppSelector } from '../../hooks';

import React from 'react';
import BoardButton from './BoardButton';
import NewBoardButton from './NewBoardButton';

const SidebarComp = () => {
  const sidebarItems = useAppSelector(
    (state) => state.kanbanBoard.kanbanBoards
  );

  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: '18vw',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '18vw',
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
            src={require('../../logo-no-background.png')}
            alt='Logo'
          ></img>
        </Box>

        <Typography
          variant='h6'
          sx={{
            color: '#858995',
            display: 'flex',
            marginTop: '15%',
            marginLeft: '15%',
          }}
        >
          All Boards ({sidebarItems.length})
        </Typography>

        <List>
          {sidebarItems.map((item) => (
            <BoardButton
              key={item.id}
              boardName={item.boardName}
              boardId={item.id}
            />
          ))}
          <NewBoardButton />
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default SidebarComp;
