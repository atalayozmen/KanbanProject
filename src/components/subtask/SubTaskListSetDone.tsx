import React from 'react';
import { Subtask } from '../../slices/kanbanBoardSlice';
import CheckableSubtaskComp from './CheckableSubtaskComp';
import { Box } from '@mui/material';

interface SubTaskListSetDoneProps {
  columnId: number;
  taskId: number;
  subTasks: Subtask[];
}

const SubTaskListSetDone = (props: SubTaskListSetDoneProps) => {
  const { subTasks, columnId, taskId } = props;

  return (
    <Box sx={{ marginBottom: '4vh' }}>
      {subTasks.map((subtask) => {
        return (
          <CheckableSubtaskComp
            columnId={columnId}
            taskId={taskId}
            subtaskId={subtask.id}
            subtaskName={subtask.name}
            done={subtask.done}
          />
        );
      })}
    </Box>
  );
};

export default SubTaskListSetDone;
