import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

export const GenerateImportDialog = (props) =>{
  const router = useRouter();
  const modal = props.modal;
  const setModal = props.setModal;
  const projectId = props.projectId;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setModal(prev=>!prev);
  };
  
  const importDesign = () => {
  router.push(`/workspace?id=${projectId}&i=1`);
  };

  const generate = () => {
    router.push(`/workspace?id=${projectId}&i=0`);
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
          <Button autoFocus onClick={generate}>
            GENERATE
          </Button>
          <Button autoFocus onClick={importDesign}>
            IMPORT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
