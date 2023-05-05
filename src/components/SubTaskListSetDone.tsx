import React from 'react';
import { Subtask } from '../slices/kanbanBoardSlice';
import CheckableSubtaskComp from './CheckableSubtaskComp';

interface SubTaskListSetDoneProps {
  columnId: number;
  taskId: number;
  subTasks: Subtask[];
}

const SubTaskListSetDone = (props: SubTaskListSetDoneProps) => {
  return (
    <React.Fragment>
      {props.subTasks.map((subtask) => {
        return (
          <CheckableSubtaskComp
            columnId={props.columnId}
            taskId={props.taskId}
            subtaskId={subtask.id}
            subtaskName={subtask.name}
            done={subtask.done}
          />
        );
      })}
    </React.Fragment>
  );
};

export default SubTaskListSetDone;
