import React, { useState } from 'react';
import ColumnComp from './ColumnComp';
import { useAppSelector } from '../../hooks';
import {
  Column,
  addColumn,
  selectChosenBoard,
} from '../../slices/kanbanBoardSlice';
import { Grid, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Card, CardActionArea, CardContent } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import ModalComp, { ModalElement } from '../modal/ModalComp';
import ProjectIntroduction from './ProjectIntroduction';

const shapeStyles = {
  minWidth: '10px',
  minHeight: '10px',
  maxWidth: '14px',
  maxHeight: '14px',
  width: '1.5vw',
  height: '1.5vw',
  marginRight: '1vw',
};

const KanbanBoardComp = () => {
  const board = useAppSelector(selectChosenBoard);
  const matches = useMediaQuery('(min-width:600px)');
  const dispatch = useAppDispatch();

  const [newColumnName, setNewColumnName] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewColumnName('');
  };

  const handleInputChange = (event: any) => {
    setNewColumnName(event.target.value);
  };

  const handleNewColumnSubmit = () => {
    if (newColumnName !== '' && board !== undefined) {
      dispatch(
        addColumn({
          boardId: board.id,
          columnName: newColumnName,
        })
      );
      handleCloseModal();
    }
  };

  const onNewColumnClick = () => {
    setModalOpen(true);
  };

  const modalElements: ModalElement[] = [
    {
      type: 'textfield',
      label: 'New Column Name',
      props: {
        label: 'New Column Name',
        value: newColumnName,
        onChange: handleInputChange,
      },
    },
    {
      type: 'button',
      label: 'Add Column',
      props: { type: 'submit', variant: 'contained' },
    },
  ];

  if (board) {
    return (
      <React.Fragment>
        <ModalComp
          onSubmit={handleNewColumnSubmit}
          modalOpen={modalOpen}
          handleCloseModal={handleCloseModal}
          modalElements={modalElements}
        />
        <DndProvider backend={HTML5Backend}>
          <Grid
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateColumns: matches ? 'max(18%, 200px)' : '0', // first column is %18, to cover the sidebar in Desktop view
              gridAutoColumns: matches ? '20%' : '40%',
              background: '#21212D',
              paddingLeft: '1vw',
              height: '100%',
              width: '100%',
              overflowY: 'hidden',
              overflowX: 'scroll',
            }}
          >
            <Box />
            {board.columns.map((column: Column) => (
              <ColumnComp {...column} key={column.id} />
            ))}

            <Box sx={{ paddingY: '2vh', height: '100vh' }}>
              <Box sx={{ ...shapeStyles, display: 'inline-block' }} />

              <Card
                sx={{
                  background: '#222430',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardActionArea
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  disableRipple
                  onClick={onNewColumnClick}
                >
                  <CardContent>
                    <Typography
                      color={'#bdbdbd'}
                      gutterBottom
                      variant='h5'
                      component='div'
                    >
                      + New Column
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </DndProvider>
      </React.Fragment>
    );
  } else {
    return <ProjectIntroduction />;
  }
};

export default KanbanBoardComp;
