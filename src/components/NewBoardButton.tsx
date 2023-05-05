import React, { Fragment, useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAppDispatch } from '../hooks';
import { makeStyles } from '@material-ui/core';
import { addKanbanBoard } from '../slices/kanbanBoardSlice';
import ModalComp, { ModalElement } from './ModalComp';

const useStyles = makeStyles({
  input: {
    color: 'white', // set the text color to red
  },
  textField: {
    '& .MuiInputBase-input': {
      color: 'white', // set the font color here
    },
  },
});

const NewBoardButton = () => {
  const dispatch = useAppDispatch();

  const classes = useStyles();

  const [newBoardName, setNewBoardName] = useState<string>('');

  const submitNewBoardHandler = (event: any) => {
    event.preventDefault();
    console.log('Submit new board');
    dispatch(addKanbanBoard(newBoardName));
    handleCloseModal();
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewBoardName('');
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleInputChange = (event: any) => {
    setNewBoardName(event.target.value);
  };

  const modalElements: ModalElement[] = [
    {
      type: 'textfield',
      label: 'New Board Name',
      props: {
        className: classes.textField,
        label: 'New Board Name',
        value: newBoardName,
        onChange: handleInputChange,
        InputProps: { className: classes.input },
      },
    },
    {
      type: 'button',
      label: 'Add Board',
      props: { type: 'submit', variant: 'contained' },
    },
  ];

  return (
    <Fragment>
      <ModalComp
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        onSubmit={submitNewBoardHandler}
        modalElements={modalElements}
      />
      <ListItem>
        <ListItemButton onClick={handleOpenModal}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#858995' }} />{' '}
          </ListItemIcon>
          <ListItemText
            sx={{ color: '#858995' }}
            primary='+ Create a new board'
          />
        </ListItemButton>
      </ListItem>
    </Fragment>
  );
};
export default NewBoardButton;
