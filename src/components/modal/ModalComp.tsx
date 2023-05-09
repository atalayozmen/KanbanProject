import React, { FC } from 'react';
import {
  Modal,
  Grid,
  TextField,
  Button,
  TextFieldProps,
  ButtonProps,
  SelectProps,
  RadioProps,
  TypographyProps,
  Typography,
  Box,
} from '@mui/material';
import SelectComp from '../select/SelectComp';

export interface ModalElement {
  type: 'textfield' | 'button' | 'select' | 'radio' | 'custom' | 'typography';
  label: string;
  render?: boolean;
  props:
    | TextFieldProps
    | ButtonProps
    | SelectProps
    | RadioProps
    | TypographyProps;
  selectPropsOptions?: { value: string; label: string }[];
  customElement?: JSX.Element;
}

interface ModalCompProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCloseModal: () => void;
  modalOpen: boolean;
  modalElements: ModalElement[];
}

const ModalComp: FC<ModalCompProps> = (props) => {
  const { modalOpen, handleCloseModal, onSubmit, modalElements } = props;
  return (
    <Modal
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      open={modalOpen}
      onClose={handleCloseModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          borderRadius: '3px',
          width: '30vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          backgroundColor: '#2c2c38',
          paddingTop: '2vh',
          paddingBottom: '2vh',
          paddingLeft: '2vw',
          paddingRight: '2vw',
        }}
      >
        <Grid justifyContent={'center'} container>
          <Grid item justifyContent={'center'} xs={12}>
            {modalElements.map((element) => {
              if (element.type === 'textfield') {
                return (
                  <Box key={element.label}>
                    <Typography></Typography>
                    <TextField
                      sx={{
                        marginBottom: '2vh',
                        width: '100%',
                      }}
                      {...(element.props as TextFieldProps)}
                    ></TextField>
                  </Box>
                );
              }
              if (element.type === 'typography') {
                if (element.render !== undefined && element.render === false) {
                  return <></>;
                }

                return (
                  <Typography
                    key={element.label}
                    {...(element.props as TypographyProps)}
                  >
                    {element.label}
                  </Typography>
                );
              }
              if (element.type === 'button') {
                return (
                  <Box
                    key={element.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '1vh',
                    }}
                  >
                    <Button {...(element.props as ButtonProps)}>
                      {element.label}
                    </Button>
                  </Box>
                );
              }
              if (element.type === 'select' && element.selectPropsOptions) {
                return (
                  <SelectComp
                    key={element.label}
                    options={element.selectPropsOptions}
                    inputlabel={element.label}
                    {...(element.props as SelectProps)}
                  ></SelectComp>
                );
              }
              if (element.type === 'custom') {
                return element.customElement;
              } else {
                return <></>;
              }
            })}
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default ModalComp;
