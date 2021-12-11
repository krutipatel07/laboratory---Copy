import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VariantCard from './variantCard';
import axios from 'axios';
import { Plus as PlusIcon } from '../../icons/plus';
import NextLink from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function DesignGrid({projectId}) {
  const [projectData, setProjectData] = useState([]);
  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
    .then(res => setProjectData(res.data.data))
    .catch(error => console.log(error));
  }, [projectId])

  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          
        }}
      >
      <Grid container 
      spacing={3}>        
        {projectData.designs ? 
          <Grid container 
          spacing={3}>
          {projectData.designs.length? 
              projectData.designs.map((design, i) => {
                return (                
                  <Grid item 
                  key = {design.id}
                  xs>
                      <VariantCard                     
                      title={`Design_${i+1}`}
                      members = {1}
                      comments = {design.comments.length}
                      image={"https://static.turbosquid.com/Preview/001201/665/78/floor-plan-3D_DHQ.jpg"}
                      link={`/workspace/${projectData.id}?designId=${design.id}`}
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
                                href="#"
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
                        create new design
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
      </Grid>
    </Box>
  );
}