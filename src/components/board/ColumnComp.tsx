import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import {
  Column,
  Task,
  addTask,
  deleteTask,
  selectChosenBoardId,
} from '../../slices/kanbanBoardSlice';
import TaskComp, { TaskCompProps } from '../task/TaskComp';
import { useDrop } from 'react-dnd/dist/hooks';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Toolbar from '@mui/material/Toolbar/Toolbar';

const shapeStyles = {
  minWidth: '10px',
  minHeight: '10px',
  maxWidth: '14px',
  maxHeight: '14px',
  width: '1.5vw',
  height: '1.5vw',
  marginRight: '1vw',
};
const shapeCircleStyles = { borderRadius: '50%' };

const ColumnComp = (props: Column) => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector(selectChosenBoardId);

  const { name, id, tasks } = props;

  useEffect(() => {
    // This code will run every time the `boardId` value changes
  }, [boardId, props]);

  const addTaskToColumn = (task: Task) => {
    if (boardId != null) {
      dispatch(
        addTask({
          columnId: id,
          taskName: task.name,
          taskDescription: task.description,
          subtasks: task.subtasks,
        })
      );
    }
  };

  const deleteItemFromColumn = (id: number, columnId: number) => {
    if (boardId != null)
      dispatch(
        deleteTask({ boardId: boardId, columnId: columnId, taskId: id })
      );
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'task',
      drop: (item: TaskCompProps) => {
        addTaskToColumn(item);
        deleteItemFromColumn(item.id, item.columnId);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [props]
  );

  return (
    <Grid
      ref={drop}
      item
      justifyContent={'center'}
      xs={3}
      sx={{ paddingY: '2vh', paddingX: '1vw', background: '#21212D' }}
      position={'static'}
    >
      <Box
        component='span'
        sx={{
          ...shapeStyles,
          ...shapeCircleStyles,
          display: 'inline-block',
          bgcolor:
            name === 'DOING'
              ? '#8370EF'
              : name === 'TO DO'
              ? '#90caf9'
              : '#1de9b6',
        }}
      ></Box>
      <Typography
        fontFamily='sans-serif'
        fontWeight={500}
        sx={{ color: '#858995' }}
        variant='body1'
        component='span'
      >
        {name === 'DOING' ? 'Doing' : name === 'TO DO' ? 'To Do' : 'Done'}
      </Typography>

      {tasks.map((task) => {
        return (
          <Grid item>
            <TaskComp {...task} key={task.id} columnName={name} columnId={id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ColumnComp;
