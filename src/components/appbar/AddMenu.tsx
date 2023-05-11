import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../hooks';
import { setModalOpenState } from '../../slices/kanbanBoardSlice';
import { styled } from '@mui/material';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({}));

export default function AddMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNewTask = () => {
    dispatch(setModalOpenState('addTask'));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewBoard = () => {
    dispatch(setModalOpenState('addBoard'));
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{
          color: 'white',
          backgroundColor: '#2196f3',
          borderRadius: '15px',
        }}
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <AddIcon sx={{ color: 'white', backgroundColor: 'primary' }} />
      </IconButton>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ color: 'white' }} onClick={handleNewBoard}>
          New Board
        </MenuItem>
        <MenuItem sx={{ color: 'white' }} onClick={handleNewTask}>
          New Task
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
