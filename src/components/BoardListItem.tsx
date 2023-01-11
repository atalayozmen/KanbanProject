import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';

interface ListItemProps {
  boardName: string;
}

const BoardListItem = (props: ListItemProps) => {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon sx={{ color: '#858995' }} />{' '}
        </ListItemIcon>
        <ListItemText sx={{ color: '#858995' }} primary={props.boardName} />
      </ListItemButton>
    </ListItem>
  );
};

export default BoardListItem;
