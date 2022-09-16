import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
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
  const images = "https://maket-generatedcontent.s3.ca-central-1.amazonaws.com/platform-content/maket-logo.jpg"

  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    axios.get(`/api/${owner}/projects`)
    .then(res => {
      const proj_list = JSON.parse(localStorage.getItem('project_list'))
      if (!proj_list) {
        const project_list = res.data.data.map(project => ({
          id: project._id,
          title : project.title,
          path : `/workspace?id=${project._id}`
        }))
        localStorage.setItem('project_list', JSON.stringify(project_list));   
      }
      setProjectsData(res.data.data)
    })
    .catch(error => console.log(error));
  },[])
  return (
    <Box
        sx={{
          // backgroundColor: 'background.default',
          backgroundColor: '#ffffff'
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
                xs={12} 
                sm={6} 
                md={4}>
                  <ProductCard
                    id={project.id}
                    title={project.title}
                    description={(project.description.replace(/(<([^>\s]+)>)/gi, ""))}
                    // description={(project.description.replace(/\s+/, " "))}
                    members = {project.collaborators.length}
                    image={project.cover_image || images}
                    designsLength = {project.designs.length}
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
                      <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      fontSize="large"                   
                      textAlign = "center">
                          No projects available. <br/> Create a new project from button above.
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