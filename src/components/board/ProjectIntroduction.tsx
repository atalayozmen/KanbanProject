import { useMediaQuery } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';

const ProjectIntroduction = () => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Grid
      container
      flexDirection={'column'}
      justifyContent={'center'}
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#21212D',
      }}
      paddingLeft={matches ? 'max(250px, 25vw)' : '5vw'}
    >
      <Box>
        <Typography
          variant={matches ? 'h3' : 'h4'}
          sx={{
            color: '#fff',
            wordWrap: 'break-word',
            marginRight: '5vw',
          }}
        >
          Welcome to my Kanban Board application built with React, Redux, MUI
          and TypeScript.
        </Typography>

        <Typography
          variant={matches ? 'h5' : 'h6'}
          sx={{
            color: '#fff',
            marginTop: '5vh',
            marginRight: '5vw',
          }}
        >
          {matches
            ? 'Use the "Create a new board" button to start.'
            : 'Use the + button to create a board and add tasks.'}
        </Typography>
        <Typography
          variant={matches ? 'h5' : 'h6'}
          sx={{
            color: '#fff',
            marginTop: '2vh',
            marginRight: '5vw',
          }}
        >
          {matches
            ? 'Choose a board from the sidebar to view it.'
            : 'Choose a board from the left top menu to change it.'}
        </Typography>
        <Typography
          variant={matches ? 'h5' : 'h6'}
          sx={{
            color: '#fff',
            marginTop: '2vh',
            marginRight: '5vw',
          }}
        >
          {matches ? 'Tasks can be dragged and dropped between columns.' : ''}
        </Typography>
      </Box>
      <Box height={'10%'} />
    </Grid>
  );
};

export default ProjectIntroduction;
