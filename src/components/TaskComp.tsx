import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Task, setTaskStatus } from '../slices/kanbanBoardSlice';
import { useDrag } from 'react-dnd/dist/hooks';
import { Button, CardActionArea } from '@material-ui/core';
import ModalComp, { ModalElement } from './ModalComp';
import SubTaskListSetDone from './SubTaskListSetDone';
import { useAppDispatch } from '../hooks';

export interface TaskCompProps extends Task {
  columnId: number;
  columnName: string;
}

interface SelectPropOption {
  value: number;
  label: string;
}

const TaskComp = (props: TaskCompProps) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'task',
      item: props,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [props.subtasks]
  );

  const [selectPropOption, setSelectPropOption] =
    React.useState<SelectPropOption>({
      value: props.columnId,
      label: props.columnName,
    });

  useEffect(() => {
    console.log('taskcomp render');
  }, [props]);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [modalOpen, setModalOpen] = React.useState(false);

  const taskClickHandler = () => {
    setModalOpen(true);
  };

  const handleSelectPropChange = (event: any) => {
    if (event.target.value === '0') {
      setSelectPropOption({ value: 0, label: 'To Do' });
      dispatch(
        setTaskStatus({
          columnId: props.columnId,
          taskId: props.id,
          newColumnId: 0,
        })
      );
    }
    if (event.target.value === '1') {
      setSelectPropOption({ value: 1, label: 'Doing' });
      dispatch(
        setTaskStatus({
          columnId: props.columnId,
          taskId: props.id,
          newColumnId: 1,
        })
      );
    }
    if (event.target.value === '2') {
      setSelectPropOption({ value: 2, label: 'Done' });
      dispatch(
        setTaskStatus({
          columnId: props.columnId,
          taskId: props.id,
          newColumnId: 2,
        })
      );
    }
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
    {
      type: 'select',
      label: 'Status',
      props: {
        InputLabelProps: {
          style: {
            color: 'white', // set the label font color here
          },
        },
        sx: {
          '& .MuiInputBase-input': {
            color: 'white', // set the font color here
          },
          width: '100%',
        },
        label: 'Status',
        value: selectPropOption.value,
        onChange: handleSelectPropChange,
        SelectProps: {
          native: true,
        },
      },
      selectPropsOptions: [
        {
          value: '0',
          label: 'To Do',
        },
        {
          value: '1',
          label: 'Doing',
        },
        {
          value: '2',
          label: 'Done',
        },
      ],
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
      <Button
        onClick={() => {
          console.log(props);
        }}
      ></Button>
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
