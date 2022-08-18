import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Box, Container, Grid , Typography, Tab, Button } from '@mui/material/';
import { withRouter, useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard'
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '18px',
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  payment: {
    border:"1px solid #f2f2f2",
		// height:"340px",
    borderRadius:"15px",
    background:"#fff",
    padding:"10px",
    margin: "auto",
    maxWidth:480
  },
  content: {
    fontSize:34
  },
  subcontent: {
    fontSize:14,
    color: "rgba(0, 0, 0, 0.6)"
  }
}));

const StripeCheckout = withRouter((props) => {
  const router = useRouter();
  const {status} = router.query
  const classes = useStyles();
  return (
    <>
    <Head>
      <title>
        Workspace | Maket Colaboratory
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        // mb: 8,
        backgroundColor:'#f2f2f2',
        display: 'flex'
      }}
    >
          <Box className={classes.payment}>
            <Grid container spacing={0}  maxWidth="xl">
              <Grid item xs={2}>
                {status === "success" ?
                <CheckCircleOutlineIcon sx={{height:"50px", width:"50px", color:"#2E7D32", mt:2}}/> :
                <CancelOutlinedIcon sx={{height:"50px", width:"50px",color:"#DC143C"}}/>
                }
              </Grid>
              <Grid item xs={10}>
                {status === "success" ?
                <>
                <Typography className={classes.content}>Payment Successful</Typography>
                <span className={classes.subcontent}>You will recieve an invoice by email. Billing is on a 30 day cycle.</span></> :
                <Typography className={classes.content}>Payment incompleted!</Typography>
                }
              </Grid>
              {status === "success" &&
              <Box>
                <Typography sx={{fontSize:14, color: "rgba(0, 0, 0, 0.6)", mt:2}}>Thanks for signing up!  We’re excited to see what you accomplish with the worlds most advanced generative technology for architects.</Typography>
              </Box>
              }
              <NextLink
                href="/dashboard/projects"
                passHref
              >
                <Button sx={{mt:"40px", color:"#ffffff", background:"#FFB800", width: "100%"}}>Go to Dashboard</Button>
              </NextLink>
            </Grid>
          </Box>
    </Box>
    </>
  );
})
export default withAuthGuard(StripeCheckout)