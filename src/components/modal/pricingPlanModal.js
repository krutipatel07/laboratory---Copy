import * as React from 'react';
import {useEffect} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Box, Button, ListItem, List, Typography, IconButton, ListItemIcon, CardContent, CardActions, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { makeStyles } from '@material-ui/styles';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    cardName: {
        fontSize: "24px"
    },
    Info: {
        fontSize: "14px",
        color: "rgba(0, 0, 0, 0.6)"
    },
    price: {
        fontSize: "34px"
    },
    startbtn: {
        borderRadius: 16,
        width:"100%", 
        background:"#FFB800", 
        color:"#ffffff", 
        padding:"10px"
    }
}));

const styles = theme => ({
    listItemText:{
      fontSize:'0.7em',//Insert your required size
    }
  });

export const PricingPlan = (props) =>{

    const [open, setOpen] = React.useState(true);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);
    const [priceId, setPriceId] = React.useState(['price_1LUtZTD5NXEtAziPSaPiJqO1', 'price_1LUtchD5NXEtAziPEkhg4Ptd']);

    const classes = useStyles();
    const styles = theme => ({
        listItemText:{
          fontSize:'0.7em',//Insert your required size
        }
      });

      const createCheckOutSession = async priceId => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-stripe-session', { priceId });
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
        console.log(result);
        if (result.error) {
          alert(result.error.message);
        }
      };

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>

      <Dialog
        // fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        // sx={{ borderRadius:0, minWidth:"800px", height:"100%"}}
      >
        <DialogTitle id="alert-dialog-title" sx={{padding:0}}>
            <Typography
            sx={{background:"#212121", color: "white", fontSize:60, pl:2}}>Pricing Plans</Typography>
        </DialogTitle>

        <DialogContent sx={{px:2, py:2, marginTop:"10px"}}>
          <DialogContentText style={{color:'#000', fontWeight:500, fontSize:12}}>
          Please select your plan to continue.
          </DialogContentText>
        </DialogContent>

        <DialogContent sx={{display:"flex", justifyContent: "space-evenly", padding: "70px 90px"}}>
            <Card 
            sx={{ maxWidth: 300, minWidth: 350, padding:"10px", 
                boxShadow: "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
                borderRadius:"4px"}}>
                <CardContent sx={{display: 'flex', justifyContent:"space-between", padding:0}}>
                    <Box >
                        <Typography sx={{ alignSelf: 'flex-start' }} className={classes.cardName}> Basic </Typography>
                        <Typography level="body2" className={classes.Info}>PERFECT FOR SMALL FIRMS (1-5 EMPLOYEES)</Typography>
                    </Box>
                    {/* <Box >
                        <Typography level="h4" className={classes.price}>$30USD</Typography>
                        <Typography level="body2" className={classes.Info}>per user per month</Typography>
                    </Box> */}
                </CardContent>
                <Box>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon sx={{color:'black'}} fontSize="small"/></ListItemIcon>
                            <ListItemText primary={<Typography sx={{fontSize: "13px"}}>14-day free trial</Typography>}></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon sx={{color:'black'}} fontSize="small"/></ListItemIcon>
                            <ListItemText primary={<Typography sx={{fontSize: "13px"}}>Unlimited designs</Typography>}></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon sx={{color:'black'}} fontSize="small"/></ListItemIcon>
                            <ListItemText primary={<Typography sx={{fontSize: "13px"}}>PDF & PNG Export </Typography>}></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon sx={{color:'black'}} fontSize="small"/></ListItemIcon>
                            <ListItemText primary={<Typography sx={{fontSize: "13px"}}>Real-Time Collaboration </Typography>} ></ListItemText>
                        </ListItem>
                        <CardActions sx={{padding: "16px 5px"}}>
                            <Button className={classes.startbtn} onClick={ () => createCheckOutSession(priceId[0])}>START NOW</Button>
                        </CardActions>
                    </List>
                </Box>
            </Card>
            <Card 
            sx={{ maxWidth: 300, minWidth: 350, padding:"10px",
                boxShadow: "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
                borderRadius:"4px"}}>
                <CardContent sx={{display: 'flex', justifyContent:"space-between", padding:0}}>
                    <Box >
                        <Typography sx={{ alignSelf: 'flex-start' }} className={classes.cardName}> Premium </Typography>
                        <Typography level="body2" className={classes.Info}>RIGHT FOR MEDIUM-LARGE FIRMS (15+ EMPLOYEES)</Typography>
                    </Box>
                </CardContent>
                <Box>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon sx={{color:'black'}} fontSize="small"/></ListItemIcon>
                            <ListItemText primary={<Typography sx={{fontSize: "13px"}}>All Basic features + </Typography>}></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon sx={{color:'black'}} fontSize="small"/></ListItemIcon>
                            <ListItemText primary={<Typography sx={{fontSize: "13px"}}>Text-to-plan generation </Typography>}></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon sx={{color:'black'}} fontSize="small"/></ListItemIcon>
                            <ListItemText primary={<Typography sx={{fontSize: "13px"}}>Access to premium 3D content</Typography>}></ListItemText>
                        </ListItem>                        
                        <CardActions sx={{padding: "16px 5px"}}>
                            <Button className={classes.startbtn} onClick={ () => createCheckOutSession(priceId[1])}>START NOW</Button>
                        </CardActions>
                    </List>
                </Box>               
            </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
