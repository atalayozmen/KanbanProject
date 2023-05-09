import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { chooseBoard } from '../../slices/kanbanBoardSlice';

interface ListItemProps {
  boardName: string;
  boardId: number;
}

const BoardButton = (props: ListItemProps) => {
  const dispatch = useAppDispatch();
  const { boardName, boardId } = props;

  const chosenBoard = useAppSelector((state) => state.kanbanBoard.chosenBoard);

  const onBoardButtonClick = () => {
    dispatch(chooseBoard(boardId));
  };

  return (
    <ListItem sx={{ paddingLeft: '0px' }}>
      <ListItemButton
        sx={{
          backgroundColor: boardId === chosenBoard ? '#7c4dff' : '#2c2c38',
          borderRadius: '0px 40px 40px 0px',
          '&:hover': {
            backgroundColor: boardId === chosenBoard ? '#7c4dff' : '#2c2c38',
          },
        }}
        onClick={onBoardButtonClick}
      >
        <ListItemIcon>
          <DashboardIcon
            sx={{ color: boardId === chosenBoard ? '#FFFFFF' : '#858995' }}
          />{' '}
        </ListItemIcon>
        <ListItemText
          sx={{ color: boardId === chosenBoard ? '#FFFFFF' : '#858995' }}
          primary={boardName}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default BoardButton;
