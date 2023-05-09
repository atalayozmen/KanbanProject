import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { chooseBoard } from '../../slices/kanbanBoardSlice';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(({ theme }) => ({}));

export default function BoardMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const kanbanBoards = useAppSelector(
    (state) => state.kanbanBoard.kanbanBoards
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClicked = (event: any) => {
    console.log('event target');
    console.log(event.target.innerText);
    kanbanBoards.forEach((board) => {
      if (board.boardName === event.target.innerText) {
        dispatch(chooseBoard(board.id));
      }
    });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton sx={{ color: '#FFFFFF' }} onClick={handleClick}>
        <KeyboardArrowDownIcon />
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
        {kanbanBoards.map((board) => (
          <MenuItem
            sx={{ color: '#FFFFFF' }}
            onClick={handleMenuItemClicked}
            disableRipple
          >
            {board.boardName}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
