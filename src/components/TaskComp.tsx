import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Task } from '../slices/kanbanBoardSlice';
import { useDrag } from 'react-dnd/dist/hooks';
import { CardActionArea } from '@material-ui/core';
import ModalComp, { ModalElement } from './ModalComp';
import SubTaskListSetDone from './SubTaskListSetDone';

export interface TaskCompProps extends Task {
  columnId: number;
}

const TaskComp = (props: TaskCompProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: props.id, name: props.name, columnId: props.columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [modalOpen, setModalOpen] = React.useState(false);

  const taskClickHandler = () => {
    setModalOpen(true);
  };

  const modalElements: ModalElement[] = [
    {
      type: 'typography',
      label: props.name,
      props: {
        fontWeight: 'bold',
        sx: { fontSize: 18, color: '#FFFFFF' },
        gutterBottom: true,
      },
    },
    {
      type: 'typography',
      label: props.description,
      props: {
        sx: { fontSize: 14, color: '#8C91A1', marginBottom: '2vh' },
      },
    },
    {
      type: 'custom',
      label: 'Subtasks',
      props: {},
      customElement: (
        <SubTaskListSetDone
          columnId={props.columnId}
          taskId={props.id}
          subTasks={props.subtasks}
        />
      ),
    },
  ];

  return (
    <>
      <ModalComp
        modalOpen={modalOpen}
        onSubmit={() => {}}
        handleCloseModal={handleCloseModal}
        modalElements={modalElements}
      />
      <Card
        ref={drag}
        sx={{ width: '100%', marginBottom: '2vh', background: '#2C2C38' }}
      >
        <CardActionArea onClick={taskClickHandler}>
          <CardContent>
            <Typography
              fontWeight='bold'
              sx={{ fontSize: 18 }}
              color='white'
              gutterBottom
            >
              {props.name}
            </Typography>
            <Typography sx={{ fontsize: 12 }} color='#8C91A1' component='div'>
              {props.subtasks.length > 0
                ? props.subtasks.filter((s) => s.done).length +
                  ' of ' +
                  props.subtasks.length +
                  ' Subtasks'
                : ''}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default TaskComp;
