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
import { makeStyles } from '@material-ui/styles';

DashboardModalTutorial.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  basicColor: {
    color:'#F0C88E'
  },
  skipBtn: {
    marginRight:'auto', 
    color:'#BDBDBD'
  }
}));

export default function DashboardModalTutorial(props) {
  const [open, setOpen] = React.useState(true);
  const [index, setIndex] = useState(0);

  const setIsOpen = props.setIsOpen;
  const setModalShown = props.setModalShown;
  
  const welcomeGuide = [{
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/Tutorial_sidebar.png',
    title: 'Welcome to your Project Dashboard!',
    description: 'This quick tutorial will show you how to navigate the platform and generate your first designs. If you would like to skip and explore on your own, you can always revisit this tutorial in your side navigation bar'
  },{
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/Create_new_project.png',
    title: 'Create a new project',
    description: 'To begin, click on the create new project button in the top right corner of the screen'
  },{
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/Generate.png',
    title: 'Generate a design',
    description: 'To generate your first design, input your design constraints using the dropdown menu When you’ve inputted all your constraints, click on the generate button'
  },{
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/project_card.png',
    title: 'Save designs to your project',
    description: 'Now that you’ve generated your floorplans using your specified constraints, you can browse the floorplans and save your favorite floorplans to your project. '
  },{
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/Generate_tab.png',
    title: 'Save designs to your project',
    description: 'Once you have saved your favorite designs, you can view and edit them on the designs page'
  },

  {
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/Card.png',
    title: 'Edit and collaborate on your design',
    description: 'Now that you are in your saved designs page, you can edit and collaborate on the floorplans. Click on the floorplan that you want to edit.'
  },
  {
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/Collaborators.png',
    title: 'Add collaborators',
    description: 'You are now in the editing page. To add a collaborator to your design, click on the button on the top right corner of the page'
  },
  {
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/limnu_bar.png',
    title: 'Edit your design',
    description: 'Use the bottom tool bar to edit your design. You can add comments for your collaborators, you can draw on the plan, and add arrows and symbols.Once you have finished editing, you can also export your design.'
  },
  {
    img: 'https://maket-laboratory-content.s3.ca-central-1.amazonaws.com/onboarding/Version.png',
    title: 'Save new versions',
    description: 'After you have edited your design, you can create new versions of the design and start fresh by pressing on the button a the bottom left of the screen.'
  }]

  const handleClose = () => {
    setOpen((prevState) => !prevState);
    setIsOpen((prevState) => !prevState)
    setModalShown((prevState) => !prevState);
  };
  const handleNext = () => {
    setIndex((prev)=>prev+1)
  };
  const handlePrevious = () => {
    setIndex((prev)=>prev-1)
  };
  const handleSkip = () => {
    setIndex(welcomeGuide.length-1)
  };
  useEffect(() => {

  },[index])

  const classes = useStyles();
  
  return (
    <Dialog  open={open}>
      <DialogTitle id="alert-dialog-title">
        <DialogContentText id="alert-dialog-description" 
        style={{color:'#000000DE', fontSize:20, textAlign:'center'}}>
          {welcomeGuide[index].title}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description" 
        style={{color:'#000000DE', fontSize:16, marginTop:10}}>
          {welcomeGuide[index].description}
        </DialogContentText>
      </DialogTitle>

      <DialogContent sx={{pt:50}}>
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
            // height="260"
            height='100%'
            src={welcomeGuide[index].img}
          />
        </Card>
      </DialogContent>

        <DialogActions 
        style={{backgroundColor: '#000000DE'}}>
          {index !== welcomeGuide.length-1 && <Button onClick={handleSkip} 
          autoFocus 
          className={classes.skipBtn}>SKIP</Button>}
          
          {index !== 0 && <Button onClick={handlePrevious} 
          className={classes.basicColor} >PREVIOUS</Button>}
          {index !== welcomeGuide.length-1 && <> <Button onClick={handleNext} 
          className={classes.basicColor}>NEXT</Button>
          </>}
          {index === welcomeGuide.length-1 && <Button onClick={handleClose} 
          className={classes.basicColor}>CLOSE</Button>}
        </DialogActions>
    </Dialog>
    
  );
}