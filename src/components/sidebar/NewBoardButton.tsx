import React, { Fragment, useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addKanbanBoard,
  setModalOpenState,
} from '../../slices/kanbanBoardSlice';
import ModalComp, { ModalElement } from '../modal/ModalComp';

const NewBoardButton = () => {
  const [newBoardName, setNewBoardName] = useState<string>('');

  const modalOpenState = useAppSelector((state) => state.kanbanBoard.modalOpen);

  const dispatch = useAppDispatch();

  const submitNewBoardHandler = (event: any) => {
    event.preventDefault();
    dispatch(addKanbanBoard(newBoardName));
    handleCloseModal();
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    dispatch(setModalOpenState(false));
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
        label: 'New Board Name',
        value: newBoardName,
        onChange: handleInputChange,
      },
    },
    {
      type: 'button',
      label: 'Add Board',
      props: { sx: { width: '100%' }, type: 'submit', variant: 'contained' },
    },
  ];

  return (
    <Fragment>
      <ModalComp
        modalOpen={modalOpen || modalOpenState === 'addBoard'}
        handleCloseModal={handleCloseModal}
        onSubmit={submitNewBoardHandler}
        modalElements={modalElements}
      />
      <ListItem sx={{ paddingLeft: '0px' }}>
        <ListItemButton onClick={handleOpenModal}>
          <ListItemIcon>
            <DashboardIcon
              sx={{
                color: '#b388ff',
                '&:hover': {
                  backgroundColor: '#b388ff',
                  color: '#b388ff',
                },
              }}
            />{' '}
          </ListItemIcon>
          <ListItemText
            sx={{
              color: '#b388ff',
              '&:hover': {
                color: '#b388ff',
              },
            }}
            primary='+ Create a new board'
          />
        </ListItemButton>
      </ListItem>
    </Fragment>
  );
};
export default NewBoardButton;
