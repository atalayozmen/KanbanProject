import React from 'react';
import { Button, TextField, IconButton, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SubTaskListCompProps {
  subTaskFields: string[];
  addSubTask: () => void;
  onSubtaskTextFieldChange: (index: number, value: string) => void;
}

const SubTaskListComp = (props: SubTaskListCompProps) => {
  const onTextFieldChange = (index: number, value: string) => {
    props.onSubtaskTextFieldChange(index, value);
  };

  return (
    <React.Fragment>
      <Typography sx={{ fontSize: 16 }} color='#FFFFFF' component='div'>
        Subtasks
      </Typography>
      {props.subTaskFields.map((subTask: string, index: number) => (
        <Grid
          sx={{ marginBottom: '2vh' }}
          container
          alignItems='center'
          justifyContent='center'
          spacing={2}
        >
          <Grid item xs={11}>
            <TextField
              value={subTask}
              onChange={(event) => onTextFieldChange(index, event.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'white', // set the font color here
                },
                width: '100%',
              }}
              InputLabelProps={{
                style: {
                  color: 'white', // set the label font color here
                },
              }}
            ></TextField>
          </Grid>
          <Grid item xs={1}>
            <IconButton sx={{ width: '100%', color: '#bdbdbd' }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button variant='contained' onClick={props.addSubTask}>
        {' '}
        +Add New Subtask
      </Button>
    </React.Fragment>
  );
};

export default SubTaskListComp;
