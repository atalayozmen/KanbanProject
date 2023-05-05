import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import {
  Column,
  addTask,
  deleteTask,
  selectChosenBoardId,
} from '../slices/kanbanBoardSlice';
import TaskComp, { TaskCompProps } from './TaskComp';
import { useDrop } from 'react-dnd/dist/hooks';
import { useAppDispatch, useAppSelector } from '../hooks';

const shapeStyles = {
  width: '1.5vh',
  height: '1.5vh',
  marginRight: '1vw',
};
const shapeCircleStyles = { borderRadius: '50%' };

const ColumnComp = (props: Column) => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector(selectChosenBoardId);

  useEffect(() => {
    // This code will run every time the `boardId` value changes
    console.log('Board ID changed: ' + boardId);
  }, [boardId]);

  const addTaskToColumn = (taskName: string, description: string) => {
    console.log('board id: ' + boardId);

    if (boardId != null) {
      dispatch(
        addTask({
          columnId: props.id,
          taskName: taskName,
          taskDescription: description,
          subtasks: [],
        })
      );
      console.log('test');
    }
  };

  const deleteItemFromColumn = (id: number, columnId: number) => {
    if (boardId != null)
      dispatch(
        deleteTask({ boardId: boardId, columnId: columnId, taskId: id })
      );
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: TaskCompProps) => {
      addTaskToColumn(item.name, item.description);
      deleteItemFromColumn(item.id, item.columnId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  console.log('isOver: ' + isOver);
  return (
    <Grid
      ref={drop}
      item
      justifyContent={'center'}
      xs={2}
      sx={{ paddingX: '2vw', paddingY: '2vh', background: '#21212D' }}
    >
      <Box
        component='span'
        sx={{
          ...shapeStyles,
          ...shapeCircleStyles,
          display: 'inline-block',
          bgcolor:
            props.name === 'DOING'
              ? '#8370EF'
              : props.name === 'TO DO'
              ? '#90caf9'
              : '#1de9b6',
        }}
      ></Box>
      <Typography
        fontWeight='bold'
        sx={{ color: 'white', fontSize: '1vw' }}
        variant='body1'
        component='span'
      >
        {props.name}
      </Typography>

      {props.tasks.map((task) => {
        return (
          <Grid item>
            <TaskComp {...task} key={task.id} columnId={props.id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ColumnComp;
