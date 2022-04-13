import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const GenerateImportDialog = (props) =>{
  const modal = props.modal;
  const setModal = props.setModal;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setModal(prev=>!prev);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={modal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
          Would you like to generate a floorplan or import an existing plan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus >
            GENERATE
          </Button>
          <Button autoFocus>
            IMPORT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
