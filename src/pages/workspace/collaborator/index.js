import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Chip,
  Typography } from '@mui/material';
import { useMounted } from '../../../hooks/use-mounted';
import { gtm } from '../../../lib/gtm';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { withRouter } from 'next/router';
import { Logo } from '../../../components/logo';
import {InvitedUserModal} from "../../../components/workspace/invitedUserModal/invitedUserModal"
import {DashboardSidebar} from '../../../components/dashboard/dashboard-sidebar';
import {WorkspaceNavbar} from '../../../components/workspace/workspace-navbar'
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }  

const InvitedUSerPage = withRouter((props) => {
  const isMounted = useMounted();
  const {designId, projectId, invite, isVersion} = props.router.query;

  const [variantData, setVariantData] = useState();  
  const [error, setError] = useState({
    status: false,
    message: undefined,
  });  
  const limnu_token = localStorage.getItem("limnu_token");
  const [versions, setVersions] = useState();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(async () => {
    // get design information
    await axios.get(`/api/projects/${projectId}/design/${designId}`)
    .then(res => {
      setVariantData(res.data.data)
      setVersions(res.data.data.versions)
    })
    // if design is not available, set error message
    .catch(error => setError({
      status: true,
      message : "OOPS! This design is not available or deleted by owner of the project!"}));
    // get parent design versions if design itself is a version
    isVersion && getParentDesignVersions()

  },[designId]);


  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getParentDesignVersions = () =>{
    axios.get(`/api/projects/${projectId}/design/${designId}`)
    .then(res => {
      const designId = res.data.data.versionOf._id;
      axios.get(`/api/projects/${projectId}/design/${designId}`)
      .then(res => setVersions(res.data.data.versions))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  return (
    <>
      <Head>
        <title>
          Variant | Maket Colaboratory
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="xl" 
        style={{width:'100%'}}>
          <WorkspaceNavbar/>
          
          <Box sx={{px:2, pt: 1}}> 
            <Tabs> 
              <Tab label={variantData && variantData.title} 
              disabled />
            </Tabs> 
          </Box>

          <Box 
          style={{width: "100%", marginLeft: 0}}>
            <Box xs={12}>
              <Container maxWidth="xl"> 
                <Box fullWidth
                sx={{
                  // maxWidth: 1260,
                  maxWidth: '100%',
                  mx: 'auto',
                  height: '550px'
                }}>
                  { error.status ? 
                  <Grid container 
                  style={{width:'100%', marginLeft:0}}
                  spacing={3}
                  >
                    {/* if there is any error occur while fetching design data, display the error message*/}
                    <Typography 
                    style={{fontSize:20, textAlign:"center", width:'100%', paddingTop:100}}>
                      {error.message}
                    </Typography> 
                  </Grid> :
                  <Box
                    sx={{
                      position: 'relative',
                      height: '100%',
                      '& img': {
                        height: 'auto',
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%'
                      }
                    }}
                  >
                  {/* display limnu board if available, else image only*/}
                    {variantData && variantData.limnu_boardUrl ? 
                      <iframe src={`${variantData.limnu_boardUrl}t=${limnu_token}&video=0`} 
                      title="description" 
                        style={{width: '100%', height: '100%'}}
                      ></iframe>
                      :  
                      <img
                        alt=""
                        src={variantData && variantData.url}
                    />
                    }
                  </Box>}
                </Box>
              </Container>
            </Box>

            <Paper 
              style={{ display: 'inline-flex', bottom: 0, width: '100%', paddingLeft:12}} 
              elevation={3}>
              <Box >
              {/* display default/parent version */}
              { variantData && variantData.versionOf ?
                <NextLink
                  href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${variantData.versionOf._id}` :`/workspace/${projectId}?designId=${variantData.versionOf._id}`}
                  passHref
                >
                  <Chip 
                    label="Default" 
                    variant="outlined" 
                    sx={{borderWidth: '2px', m: 1}}
                  />
                </NextLink> : 
                <NextLink
                  href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${designId}` :`/workspace/${projectId}?designId=${designId}`}
                  passHref
                >
                  <Chip 
                    label="Default" 
                    color="primary" 
                    sx={{borderWidth: '2px', m: 1}}
                  />
                </NextLink>
              }
              {/* display all versions */}
              {
                versions && variantData &&  versions.map(version =>
                  version.title === variantData.title ? 
                  <Chip 
                    label={`${version.title}`} 
                    color = "primary"
                    sx={{borderWidth: '2px', m: 1}}
                  /> : 
                  <NextLink 
                  href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${version._id}&isVersion=true` :`/workspace/${projectId}?designId=${version._id}&isVersion=true`}    
                  passHref
                  key = { version._id}
                  >
                    <Chip 
                      label={`${version.title}`} 
                      variant="outlined" 
                      sx={{borderWidth: '2px', m: 1}}
                    />
                  </NextLink>
                  )
              }
            </Box>
            </Paper>
          </Box>        
        {/* invited user modal to verify the collaborator */}
          <InvitedUserModal variantData={variantData}/>
        </Container>
      </Box>
    </>
  );
})

export default InvitedUSerPage;
