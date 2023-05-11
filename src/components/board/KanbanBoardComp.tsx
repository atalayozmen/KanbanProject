import React from 'react';
import ColumnComp from './ColumnComp';
import { useAppSelector } from '../../hooks';
import { Column, selectChosenBoard } from '../../slices/kanbanBoardSlice';
import { Grid, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const KanbanBoardComp = () => {
  const board = useAppSelector(selectChosenBoard);
  const matches = useMediaQuery('(min-width:600px)');

  if (board) {
    return (
      <DndProvider backend={HTML5Backend}>
        <Grid
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateColumns: matches ? '18%' : '0', // first column is %18, to cover the sidebar in Desktop view
            gridAutoColumns: '33%',
            background: '#21212D',
            paddingLeft: '1vw',
            height: '100vh',
            width: '100%',
            overflowY: 'hidden',
            overflowX: 'auto',
          }}
        >
          <Box />
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
            variant={matches ? 'h3' : 'h4'}
            sx={{
              color: '#fff',
              wordWrap: 'break-word',
              marginLeft: matches ? '25vw' : '5vw',
              marginRight: '5vw',
            }}
          >
            Welcome to my Kanban Board application built with React, Redux, MUI
            and TypeScript.
          </Typography>

          <Typography
            variant={matches ? 'h5' : 'h6'}
            sx={{
              color: '#fff',
              marginLeft: matches ? '25vw' : '5vw',
              marginTop: '5vh',
              marginRight: '5vw',
            }}
          >
            {matches
              ? 'Use the "Create a new board" button to start.'
              : 'Use the + button to create a board and add tasks.'}
          </Typography>
          <Typography
            variant={matches ? 'h5' : 'h6'}
            sx={{
              color: '#fff',
              marginLeft: matches ? '25vw' : '5vw',
              marginTop: '2vh',
              marginRight: '5vw',
            }}
          >
            {matches
              ? 'Choose a board from the sidebar to view it.'
              : 'Choose a board from the left top menu to change it.'}
          </Typography>
          <Typography
            variant={matches ? 'h5' : 'h6'}
            sx={{
              color: '#fff',
              marginLeft: matches ? '25vw' : '5vw',
              marginTop: '2vh',
              marginRight: '5vw',
            }}
          >
            Tasks can be dragged and dropped between columns.
          </Typography>
        </Box>
        <Box height={'10%'} />
      </Grid>
    );
  }
};

export default KanbanBoardComp;
