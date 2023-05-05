import React from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  Subtask,
  addTask,
  chooseBoard,
  selectChosenBoardName,
} from '../slices/kanbanBoardSlice';
import ModalComp, { ModalElement } from './ModalComp';
import { makeStyles } from '@material-ui/core';
import SubTaskListComp from './SubTaskListComp';

const useStyles = makeStyles({
  input: {
    color: 'white',
  },
});

interface SelectPropOption {
  value: number;
  label: string;
}

function AppbarComp() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const chosenBoard = useAppSelector((state) => state.kanbanBoard.chosenBoard);
  const chosenBoardName = useAppSelector(selectChosenBoardName);

  const [newTaskName, setNewTaskName] = React.useState<string>('');
  const [newTaskDescription, setNewTaskDescription] =
    React.useState<string>('');

  const [selectPropOption, setSelectPropOption] =
    React.useState<SelectPropOption>({ value: 0, label: 'To Do' });
  const [subtasks, setSubtasks] = React.useState<string[]>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    resetState();
  };

  const resetState = () => {
    setNewTaskName('');
    setNewTaskDescription('');
    setSelectPropOption({ value: 0, label: 'To Do' });
    setSubtasks([]);
  };

  const handleSelectPropChange = (event: any) => {
    if (event.target.value === '0')
      setSelectPropOption({ value: 0, label: 'To Do' });
    if (event.target.value === '1')
      setSelectPropOption({ value: 1, label: 'In Progress' });
    if (event.target.value === '2')
      setSelectPropOption({ value: 2, label: 'Done' });

    console.log('selectPropValue: ' + selectPropOption.label);
  };

  const handleNewTaskNameInputChange = (event: any) => {
    setNewTaskName(event.target.value);
  };

  const handleNewTaskDescriptionInputChange = (event: any) => {
    setNewTaskDescription(event.target.value);
  };

  const onModalAddTaskButtonClick = (event: any) => {
    event.preventDefault();
    console.log(chosenBoard);
    if (chosenBoard != null) {
      dispatch(chooseBoard(chosenBoard));
      console.log('test');

      const subtaskList: Subtask[] = subtasks.map((subtask, index) => {
        const newSubtask: Subtask = {
          id: index,
          name: subtask,
          done: false,
        };
        return newSubtask;
      });

      dispatch(
        addTask({
          taskName: newTaskName,
          taskDescription: newTaskDescription,
          columnId: selectPropOption.value,
          subtasks: subtaskList,
        })
      );
    }
    handleCloseModal();
  };

  const onTaskButtonClick = () => {
    setModalOpen(true);
  };

  const onAddSubtaskButtonClick = () => {
    setSubtasks([...subtasks, '']);
  };

  const onSubtaskTextFieldChange = (index: number, value: string) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);
  };

  const modalElements: ModalElement[] = [
    {
      type: 'textfield',
      label: 'Add New Task',
      props: {
        label: 'New Task Name',
        value: newTaskName,
        onChange: handleNewTaskNameInputChange,
        InputProps: { className: classes.input },
      },
    },
    {
      type: 'textfield',
      label: 'Add Task Description',
      props: {
        label: 'New Task Description',
        value: newTaskDescription,
        onChange: handleNewTaskDescriptionInputChange,
        InputProps: { className: classes.input },
        multiline: true,
        rows: 3,
      },
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
          label: 'In Progress',
        },
        {
          value: '2',
          label: 'Done',
        },
      ],
    },
    {
      type: 'custom',
      label: 'subtask',
      props: { value: subtasks },
      customElement: (
        <SubTaskListComp
          key={'subtask'}
          subTaskFields={subtasks}
          addSubTask={onAddSubtaskButtonClick}
          onSubtaskTextFieldChange={onSubtaskTextFieldChange}
        />
      ),
    },
    {
      type: 'button',
      label: 'Add Task',
      props: {
        sx: {
          width: '50%',
        },
        variant: 'contained',
        onClick: onModalAddTaskButtonClick,
      },
    },
  ];

  return (
    <React.Fragment>
      <ModalComp
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        onSubmit={onModalAddTaskButtonClick}
        modalElements={modalElements}
      />

      <AppBar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#2c2c38',
        }}
        position='static'
      >
        <Box
          sx={{
            marginLeft: '16vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight='bold' variant='h5' component='div'>
            {chosenBoardName}
          </Typography>
        </Box>

        <Toolbar sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={onTaskButtonClick}
            variant='contained'
            sx={{ bgColor: '#2196f3' }}
          >
            + Add New Task
          </Button>
          <IconButton color='primary'>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default AppbarComp;
