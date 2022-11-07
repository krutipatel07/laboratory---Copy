import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { ProjectEditForm } from '../../../components/dashboard/product/project-edit-form';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { gtm } from '../../../lib/gtm';
import {DashboardSidebar} from '../../../components/dashboard/dashboard-sidebar'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuth } from "../../../hooks/use-auth";


const ProjectEdit = () => {
    const [project, setProject] = useState()
    const {query} = useRouter();
    const { user: loggedInUser } = useAuth();

    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);
    
    useEffect(async () => {
      loggedInUser.getIdToken().then(async token => {
        const {data} = await axios.get(`/api/projects/${query.id}`, { headers: {'Authorization': `Bearer ${token}`} }).catch(error =>console.log(error))
        setProject(data.data)
      });
    }, []);
  
  return (
    <>
      <Head>
        <title>
          Dashboard: Edit Project | Maket
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          display: 'flex'
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">
              Edit project details
            </Typography>
          </Box>
          {project && <ProjectEditForm project={project}/>}
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(ProjectEdit);

