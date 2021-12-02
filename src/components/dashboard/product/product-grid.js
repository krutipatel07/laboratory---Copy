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
  const images = ["https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/carrington/plans/annex/elevations---will-need-to-be-expanded/elevationcraftsman_carrington_annex_main.jpg?sc_lang=en-ca",
                  "https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/caspian/exterior-styles-images/elevationprairie_cityscape_caspian_main.jpg?sc_lang=en-ca",
                  "https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/thames/exterior-styles-images/elevationprairie_cityscape_thames_main.jpg?sc_lang=en-ca",
                  "https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/hurley/exterior-styles-images/elevationcraftsman_cityscape_hurley_main.jpg?sc_lang=en-ca",
                  "https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/whistler/elevations/prairie_cityscape_whistler_main.jpg",
                  "https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/carrington/plans/vanier-end/exterior-styles-images/elevationprairie_carrington_vanierend_main.jpg?sc_lang=en-ca",
                  "https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/carrington/plans/graydon-corner/exterior-styles-images/elevationcraftsman_carrington_graydoncorner_main.jpg?sc_lang=en-ca"
                ]

  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    axios.get(`/api/${owner}/projects`)
    .then(res => setProjectsData(res.data.data))
    .catch(error => console.log(error));
  })

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
            projectsData.map((project, i) => {
              return (
                <Grid key={i}
                item 
                xs>
                  <ProductCard
                    title={project.title}
                    description={(project.description.replace("<p>", "").replace("</p>", ""))}
                    members = {project.collaborators.length}
                    image={images[i]}
                    link= {`/workspace/title?${project.title}`}
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
                                href="/dashboard/products/new"
                                passHref
                                ><PlusIcon fontSize="large" cursor = "pointer"/>
                              </NextLink>
                    </Typography>
                    <Typography 
                    variant="body2" 
                    color="text.secondary" fontSize="small"                   
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