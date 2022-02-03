import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
import Image from '../../../public/static/mock-images/products/product_6.png'
import { setIn } from 'formik';

DashboardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function DashboardModal(props) {
  const [open, setOpen] = React.useState(true);
  const images = "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80"
  const [index, setIndex] = useState(0);
  
  const welcomGuide = [{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Welcome',
    description: 'You are now signed in. Would you like to get started with a guide on creating a project, and generating your first design? You can skip this guide and return to it at any time'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Projects',
    description: 'To start a new project, simply select the add button to get started. New and existing projects will be displayed on this page of the site.'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Projects',
    description: 'You can now enter a title and a description of your project'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Projects',
    description: 'Import the useful assets (documents, photos, etc.) for your project.'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Projects',
    description: 'Set your project budget. This is for your information only and will not affect the outcome of your generative designs'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Projects',
    description: 'Congrats! You’ve started your first project. You can view your created projects from your personal workspace at any time.'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Projects',
    description: 'Invite collaborators to your project, you can add members at any point in the design process'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Collaborators',
    description: 'You can view a list of the collaborators you’ve invited over at your personal workspace on the left hand side of the screen'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'Revisit Guide',
    description: 'Below the account button, you’ll find where you can open this startup guide again to view any aspect of the platform you may need help with'
  },{
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
    title: 'View Profile',
    description: 'Click on the “Account” button on the left hand side to view your profile, where you can change your infom billing, notification settings, and other useful options'
  }]

  const handleClose = () => {
    setOpen(false);
  };
  const handleNext = () => {
    setIndex((prev)=>prev+1)
  };
  const handlePrevious = () => {
    setIndex((prev)=>prev-1)
  };
  const handleSkip = () => {
    setIndex(welcomGuide.length-1)
  };
  useEffect(() => {

  },[index])

  
  return (
    <Dialog  open={open}>
      <DialogTitle id="alert-dialog-title">
        <Card sx={{
            margin: "auto",
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.hover',
            } }}
            variant="elevation">
            <CardMedia
              component="img"
              alt="green iguana"
              height="260"
              src={images}
            />
        </Card>
      </DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {welcomGuide[index].title}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
          {welcomGuide[index].description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {index !== 0 && <Button onClick={handlePrevious}>PREVIOUS</Button>}
          {index !== welcomGuide.length-1 && <> <Button onClick={handleNext}>NEXT</Button>
          <Button onClick={handleSkip} autoFocus>SKIP</Button></>}
          {index === welcomGuide.length-1 && <Button onClick={handleClose}>CLOSE</Button>}
        </DialogActions>
    </Dialog>
    
  );
}