import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAppDispatch } from '../hooks';
import { chooseBoard } from '../slices/kanbanBoardSlice';

interface ListItemProps {
  boardName: string;
  boardId: number;
}

const BoardButton = (props: ListItemProps) => {
  const dispatch = useAppDispatch();

  const onBoardButtonClick = () => {
    dispatch(chooseBoard(props.boardId));
  };

  return (
    <ListItem>
      <ListItemButton onClick={onBoardButtonClick}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: '#858995' }} />{' '}
        </ListItemIcon>
        <ListItemText sx={{ color: '#858995' }} primary={props.boardName} />
      </ListItemButton>
    </ListItem>
  );
};

export default BoardButton;
