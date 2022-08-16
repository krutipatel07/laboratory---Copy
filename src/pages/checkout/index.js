import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Box, Container, Grid , Typography, Tab, Button } from '@mui/material/';
import { withRouter, useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard'
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
		height:"340px",
    borderRadius:"20px",
    background:"#fff",
  },
  payment_header: {
    background:"#2E7D32",
	  padding:"20px",
    borderRadius:"20px 20px 0px 0px",
  },
  check: {
    margin: "0 auto",
    verticalAlign: "middle",
    height: "50px",
    width: "50px"
  },
  content: {
    textAlign: "center",
    padding: "20px"
  },
}));

const StripeCheckout = withRouter((props) => {
  const classes = useStyles();
  const handleClick = () => {

  }
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
      <Grid container spacing={0}  maxWidth="xl" direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={8}>
          <Box className={classes.payment}>
            <Box className={classes.payment_header}>
              <Box className={classes.check}><CheckCircleOutlineIcon sx={{height:"50px", width:"50px", color:"#ffffff"}}/></Box>
            </Box>
            <Box className={classes.content}>
              <h1>Payment Success !</h1>
              <Typography>Congratulations on becoming our member</Typography>
              
          <NextLink
            href="/dashboard/projects"
            passHref
          >
            <a> <Button variant="contained" sx={{mt:"40px"}} onClick={handleClick}>Go to Dashboard</Button> </a>
            </NextLink>
            </Box>
          </Box>
          </Grid>
      </Grid>
    </Box>
    </>
  );
})
export default withAuthGuard(StripeCheckout)