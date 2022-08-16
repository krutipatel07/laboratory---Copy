import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material/';
import { withRouter, useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard'
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '18px',
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  tab: { 
    '& .MuiBox-root': {
      padding: '0px',
      },
    },
}));

const ProjectWorkspace = withRouter((props) => {

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
        backgroundColor:'#ffffff',
        display: 'flex'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
          <Box 
          sx={{ pl:1.1,
            marginBottom: '10px' }}>
                Success
          </Box>
        </Box>
      </Container>
    </Box>
    </>
  );
})
export default withAuthGuard(ProjectWorkspace)