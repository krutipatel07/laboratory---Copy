import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import { ProductCreateForm } from '../../components/dashboard/product/product-create-form';


CreateProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function CreateProjectModal(props) {
  const open = props.open;
  const setOpen = props.setOpen
  const setModal = props.setModal
  const setProjectId = props.setProjectId

  
  return (
    <Dialog  open={open} 
    PaperProps={{ sx: { overflow:'hidden' } }}>
        <ProductCreateForm setOpen={setOpen} 
        setModal={setModal} setProjectId={setProjectId}/>
    </Dialog>
    
  );
}