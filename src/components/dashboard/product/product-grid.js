import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from './project-card';
import axios from 'axios'

export default function ProjectGrid() {

  const [projectsData, setProjectsData] = useState();

  useEffect(() => {
    axios.get("/api/projects")
    .then(res => setProjectsData(res.data.data))
    .catch(error => console.log(error));
  })

  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          
        }}
      >
      <Grid container 
        spacing={3}>
        {projectsData ?
          projectsData.map((project, i) => {
            return (
              <Grid key={i}
              item 
              xs>
                <ProductCard
                  title={project.title}
                  description={(project.description.replace("<p>", "").replace("</p>", ""))}
                  members = {project.owner}
                  link="/workspace"
                />
              </Grid>
            )
          }) : <h1> Loading </h1>
        }
      </Grid>
    </Box>
  );
}