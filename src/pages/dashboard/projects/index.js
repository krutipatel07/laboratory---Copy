import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import ProjectGrid from '../../../components/dashboard/product/product-grid.js';
import DashboardModal from '../../../components/modal/dashboard-modal';
import CreateProjectModal from '../../../components/modal/createProject-modal'
import {DashboardSidebar} from '../../../components/dashboard/dashboard-sidebar'
import {GenerateImportDialog} from '../../../components/modal/generateImportModal'

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [modal, setModal] = useState(false);  
  const [projectId, setProjectId] = useState()

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  // Added a new column in the User Model 
  // Called the User Model 
  // useEffect should update when true to be false only once > PUT 
  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    axios.get(`/api/user/${owner}`)
    .then(res => setUserData(res.data.data))
    .catch(error => console.log(error));
  },[]);

  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    if (owner && userData && userData.isFirstTime === true) {

      axios.put(`/api/user/${owner}`, {
        isFirstTime:false
      })
      .catch(error => console.log(error));
    } 
  }, [userData]);
  
  const createProject = (e) => {
    setOpen(prev=>!prev);
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Project List | Maket Colaboratory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
          height: '100%',
          display: 'flex'
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="xl" sx={{backgroundColor: "white" }}>
          <Box sx={{ mb: 4 , backgroundColor: "white"}}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4" style={{fontSize: '24px'}}>
                  Projects
                </Typography>
              </Grid>
              <Grid item>
                  <Button
                    component="a"
                    startIcon={<PlusIcon 
                    fontSize="small" />}
                    onClick={createProject}
                  >
                    CREATE NEW PROJECT
                  </Button>
                  {/* display create new project modal */}
                {open && <CreateProjectModal open={open} setOpen={setOpen} setModal={setModal} setProjectId={setProjectId}/>}
              </Grid>
            </Grid>
          </Box>
          <Card>
            <ProjectGrid/>
          </Card>
        </Container>
      </Box>
      {
        // display tutorial modal if user is the new first time user
        userData && userData.isFirstTime ? 
        <DashboardModal/> : ''
      }
      {/* display generate or import modal after creating project */}
      {modal && <GenerateImportDialog modal={modal} setModal={setModal} projectId={projectId}/>}
    </>
  );
};

export default withAuthGuard(ProductList);
