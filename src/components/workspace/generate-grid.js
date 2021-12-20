import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VariantCard from './variantCard';
import axios from 'axios';
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
          <Grid container spacing={3}>
          {projectData.designs.length &&
              projectData.designs.map((design, i) => {
                return (                
                  <Grid item 
                  key = {design.id}
                  xs>
                      <VariantCard                     
                      title={design.title}
                      members = {1}
                      comments = {design.comments.length}
                      image={"https://static.turbosquid.com/Preview/001201/665/78/floor-plan-3D_DHQ.jpg"}
                      link={`/workspace/${projectData.id}?designId=${design.id}`}
                      />
                  </Grid> )})}
            </Grid>
           : <Box sx={{ 
                width: "100%",
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