import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import { Box, Container, Grid , Typography, Tab, Button } from '@mui/material/';
import { withRouter, useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard'
import { makeStyles } from '@material-ui/core';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import NextLink from 'next/link';
import axios from 'axios'
import { color } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '18px',
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  payment: {
    // border:"1px solid #f2f2f2",
		// height:"340px",
    borderRadius:"15px",
    background:"#000",
    padding:"10px",
    margin: "auto",
    maxWidth:500,
    color: "#ffffff"
  },
  content: {
    fontSize:34
  },
  subcontent: {
    fontSize:14,
  }
}));

const StripeCheckout = withRouter((props) => {
  const router = useRouter();
  const {status, session_id} = router.query
  const classes = useStyles();

  useEffect(async () => {
    // if subscription payment is successful, it will return the checkout session id, and using this id retrieve its data and save details like subscription id, cust id etc
    if(status === "success" && session_id)
    {const user = localStorage.getItem("lab-user"); 
    const {data} = await axios.post('/api/stripe/get-stripe-session', {session_id, user});
    await axios.put(`/api/user/${user}`, {
      subscription_id: data.subscription_id,
    })
    .catch(error => console.log(error));
    await axios.post('/api/stripe', data)
    .catch(error => console.log(error));}
  },[])

  return (
    <>
    <Head>
      <title>
        Checkout | Maket Colaboratory
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        // mb: 8,
        backgroundColor:'#000000',
        display: 'flex'
      }}
    >
      <Box className={classes.payment}>
        <Grid container spacing={0}  maxWidth="xl">
          <Grid item xs={2}>
            {status === "success" ?
            <CheckCircleOutlineIcon sx={{height:"50px", width:"50px", color:"#2E7D32", mt:2}}/> :
            <CloseIcon sx={{height:"50px", width:"50px",color:"#DC143C",  mt:2}}/>
            }
          </Grid>
          <Grid item xs={10}>
            
            {status === "success" ?
            <>
            <Typography className={classes.content}>Payment Successful</Typography>
            <span className={classes.subcontent}>You will recieve an invoice by email. Billing is on a 30 day cycle.</span></>:
            <>
            <Typography className={classes.content}>Payment Failed</Typography>
            <span className={classes.subcontent}>Something went wrong</span>
            </>
            }
          </Grid>
          {status === "success" ?

            <Typography sx={{fontSize:14, mt:2}}>Thanks for signing up!  We’re excited to see what you accomplish with the worlds most advanced generative technology for architects.</Typography> :
            <Typography sx={{fontSize:14, mt:2}}>Oops! Your payment didn’t go through. Try again or contact us for support.</Typography>

          }
          {status === "success" ?
          <>
            <NextLink
              href="/dashboard/projects"
              passHref
            >
              <Button sx={{mt:"40px", color:"#000000", background:"#FFB800", width: "100%"}}>GO TO DASHBOARD</Button>
            </NextLink></> :
            <>
            <NextLink
              href="/dashboard/projects"
              passHref
            >
              <Button sx={{mt:"40px", color:"#000000", background:"#FFB800", width: "100%"}}>GO BACK TO PAYMENT PAGE</Button>
            </NextLink></>}
        </Grid>
      </Box>
    </Box>
    </>
  );
})
export default withAuthGuard(StripeCheckout)