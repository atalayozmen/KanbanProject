import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Typography, Card } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { setSubtaskDone } from '../../slices/kanbanBoardSlice';

interface CheckableSubtaskCompProps {
  columnId: number;
  taskId: string;
  subtaskId: number;
  subtaskName: string;
  done: boolean;
}

const CheckableSubtaskComp = (props: CheckableSubtaskCompProps) => {
  const { done } = props;

  const [checked, setChecked] = useState(done);
  const dispatch = useAppDispatch();

  const { columnId, taskId, subtaskId, subtaskName } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(
      setSubtaskDone({
        columnId: columnId,
        taskId: taskId,
        subtaskId: subtaskId,
        done: event.target.checked,
      })
    );
  };

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '1.5vh',
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
            {subtaskName}
          </Typography>
        }
      />
    </Card>
  );
};

export default CheckableSubtaskComp;
