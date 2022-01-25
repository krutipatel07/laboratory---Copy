import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from './project-card';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Plus as PlusIcon } from '../../../icons/plus';
import NextLink from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProjectGrid() {

  const [projectsData, setProjectsData] = useState();
  const images = "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80"

  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    axios.get(`/api/${owner}/projects`)
    .then(res => setProjectsData(res.data.data))
    .catch(error => console.log(error));
  },[])
  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          
        }}
      >
        {projectsData ? 
            <Grid container 
                spacing={3}>
          {projectsData.length? 
            projectsData.map(project => {
              return (
                <Grid 
                key={project.id}
                item 
                xs>
                  <ProductCard
                    id={project.id}
                    title={project.title}
                    description={(project.description.replace(/(<([^>\s]+)>)/gi, ""))}
                    // description={(project.description.replace(/\s+/, " "))}
                    members = {project.collaborators.length}
                    image={images}
                    link= {`/workspace?id=${project.id}`}
                  />
                </Grid> )})
                :
                <Card sx={{
                  maxWidth: 300, 
                  minWidth: 400,
                  margin: "auto",
                  alignItems: "center",
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'background.hover',
                    } }}
                  variant="elevation">  
                  <CardContent>
                    <Typography gutterBottom 
                    variant="subtitle1" 
                    component="div" 
                    textAlign = "center"
                    color="text.secondary">
                      <NextLink
                                href="/dashboard/projects/new"
                                passHref
                                ><PlusIcon 
                                fontSize="large" 
                                cursor = "pointer"/>
                              </NextLink>
                    </Typography>
                    <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    fontSize="small"                   
                    textAlign = "center">
                        create new project
                    </Typography>
                  </CardContent>
                </Card>}
            </Grid>
           : <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '70vh' }}>
                <CircularProgress />
              </Box>
        }
    </Box>
  );
}