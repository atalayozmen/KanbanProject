import { Box, List, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useAppSelector } from '../../hooks';

import React from 'react';
import BoardButton from './BoardButton';
import NewBoardButton from './NewBoardButton';
import { useMediaQuery } from '@mui/material';

const SidebarComp = () => {
  const sidebarItems = useAppSelector(
    (state) => state.kanbanBoard.kanbanBoards
  );

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: matches ? '18vw' : '0',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: matches ? '18vw' : '0',
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
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minWidth={'10%'}
            width={'15%'}
          >
            <img
              style={{ maxWidth: '100%', minWidth: '40px', height: 'auto' }}
              src={require('../../icons8-kanban-96.png')}
              alt='knban'
            ></img>
          </Box>

          <Typography
            variant='h4'
            fontWeight={'bold'}
            fontFamily={'sans-serif'}
            sx={{
              color: '#fff',
              wordWrap: 'break-word',
              marginLeft: '5%',
              marginRight: '5%',
            }}
          >
            kanban
          </Typography>
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
