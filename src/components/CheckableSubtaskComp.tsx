import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Typography, Card } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { setSubtaskDone } from '../slices/kanbanBoardSlice';

interface CheckableSubtaskCompProps {
  columnId: number;
  taskId: number;
  subtaskId: number;
  subtaskName: string;
  done: boolean;
}

const CheckableSubtaskComp = (props: CheckableSubtaskCompProps) => {
  const [checked, setChecked] = useState(props.done);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.checked: ', event.target.checked);
    setChecked(event.target.checked);
    dispatch(
      setSubtaskDone({
        columnId: props.columnId,
        taskId: props.taskId,
        subtaskId: props.subtaskId,
        done: event.target.checked,
      })
    );
  };

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '2vh',
        paddingTop: '1vh',
        paddingBottom: '1vh',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        background: '#21212D',
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            sx={{
              color: '#bdbdbd',
              '&.Mui-checked': {
                color: '#615FBE',
              },
            }}
          />
        }
        label={
          <Typography
            sx={{ marginLeft: '1vw', color: '#FFFFFF' }}
            variant='body1'
          >
            {props.subtaskName}
          </Typography>
        }
      />
    </Card>
  );
};

export default CheckableSubtaskComp;
