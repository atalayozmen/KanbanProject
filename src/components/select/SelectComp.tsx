import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select/Select';
import { InputLabel } from '@mui/material';

interface SelectCompProps extends SelectProps {
  inputlabel: string;
  options: { value: string; label: string }[];
}

const SelectComp = (props: SelectCompProps) => {
  const { options } = props;

  return (
    <FormControl
      sx={{
        width: '100%',
        marginBottom: '2vh',
      }}
    >
      <InputLabel
        sx={{
          width: '100%',
          color: '#bdbdbd',
        }}
      >
        {props.inputlabel}
      </InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        {...props}
        onChange={props.onChange}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white', // set the font color here
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          width: '100%',
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value + option.label} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectComp;
