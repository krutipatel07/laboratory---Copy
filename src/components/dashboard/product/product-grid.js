import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from './project-card';


export default function ProjectGrid() {

  const projectsData = [
    {
      title : 'Rustic Vancouver Cottage',
      description:'Modern cottage on the coast for a family of 4.',
      members : 2,
      link :'/workspace'
    },
    {
      title : 'Modern Montreal Bungalow',
      description : 'Modern cottage on the coast for a family of 4.',
      members : 3,
      link : '/workspace'
    },
    {
      title: 'Seaside Vacation Home',
      description : 'Vacation home for a family of 4',
      members : 2,
      link : '/workspace'
    },
    {
      title: 'Manitoba Country Getaway',
      description : 'Farmhouse for family of 6',
      members : 2,
      link : '/workspace'
    },
    {
      title: 'Contemporary Family Home in Laval',
      description : 'Functional home for a new family with 2 dogs and a baby.',
      members : 2,
      link : '/workspace'
    },
    {
      title: 'Lakeside Cottage',
      description : 'Summer cottage for a family of 3 in the lake country of Ontario.',
      members : 2,
      link : '/workspace'
    },
    {
      title: 'Penticton Mansion',
      description : 'Large Modern home for an adventurous family',
      members : 2,
      link : '/workspace'
    }
  ]

  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          
        }}
      >
      <Grid container 
        spacing={3}>
        {
          projectsData.map(project => {
            return (
              <Grid item 
              xs>
                <ProductCard
                  title={project.title}
                  description={project.description}
                  members = {project.members}
                  link={project.link}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  );
}