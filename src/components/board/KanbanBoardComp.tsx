import React from 'react';
import ColumnComp from './ColumnComp';
import { useAppSelector } from '../../hooks';
import { Column, selectChosenBoard } from '../../slices/kanbanBoardSlice';
import { Grid, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box/Box';

const KanbanBoardComp = () => {
  const board = useAppSelector(selectChosenBoard);

  if (board) {
    return (
      <DndProvider backend={HTML5Backend}>
        <Grid
          container
          sx={{
            background: '#21212D',
            height: '100vh',
            width: '100%',
            overflowY: 'hidden',
          }}
        >
          <Box width='18%' />
          {board.columns.map((column: Column) => (
            <ColumnComp {...column} key={column.id} />
          ))}
        </Grid>
      </DndProvider>
    );
  } else {
    return (
      <Grid
        container
        flexDirection={'column'}
        justifyContent={'center'}
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#21212D',
        }}
      >
        <Box>
          <Typography
            variant='h3'
            sx={{
              color: '#fff',
              wordWrap: 'break-word',
              marginLeft: '25vw',
              marginRight: '5vw',
            }}
          >
            Welcome to my Kanban Board application built with React, Redux, MUI
            and Typescript.
          </Typography>

          <Typography
            variant='h5'
            sx={{ color: '#fff', marginLeft: '25vw', marginTop: '4vh' }}
          >
            Use the "Create a new board" to start.
          </Typography>
          <Typography
            variant='h5'
            sx={{ color: '#fff', marginLeft: '25vw', marginTop: '2vh' }}
          >
            Choose a board from the sidebar to view it.
          </Typography>
        </Box>
        <Box height={'10%'} />
      </Grid>
    );
  }
};

export default KanbanBoardComp;
