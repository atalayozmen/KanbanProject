import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select/Select';
import { InputLabel } from '@mui/material';

interface SelectCompProps extends SelectProps {
  inputlabel: string;
  options: { value: string; label: string }[];
}

const SelectComp = (props: SelectCompProps) => {
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
      >
        {props.options.map((option) => {
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
