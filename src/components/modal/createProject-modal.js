import * as React from 'react';
const { useState, useEffect } = React;
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { ProductCreateForm } from '../../components/dashboard/product/product-create-form';


DashboardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function DashboardModal(props) {
  const open = props.open;
  const setOpen = props.setOpen


  
  return (
    <Dialog  open={open} style={{overflowY:'hidden'}}>
        <ProductCreateForm setOpen={setOpen}/>
    </Dialog>
    
  );
}