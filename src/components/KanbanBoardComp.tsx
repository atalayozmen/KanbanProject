import React from 'react';
import ColumnComp from './ColumnComp';
import { useAppSelector } from '../hooks';
import { Column, selectChosenBoard } from '../slices/kanbanBoardSlice';
import { Grid } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const KanbanBoardComp = () => {
  const board = useAppSelector(selectChosenBoard);

  if (board && board.columns) {
    console.log('board columns');
    console.log(board.columns);
  }

  if (board) {
    return (
      <DndProvider backend={HTML5Backend}>
        <Grid
          container
          sx={{ marginLeft: '15vw', background: '#21212D', height: '100vh' }}
        >
          {board.columns.map((column: Column) => (
            <ColumnComp {...column} key={column.id} />
          ))}
        </Grid>
      </DndProvider>
    );
  } else {
    return <div>Choose a board</div>;
  }
};

export default KanbanBoardComp;
