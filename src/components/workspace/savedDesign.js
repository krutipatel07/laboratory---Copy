import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VariantCard from './variantCard';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function SavedDesign({projectId}) {
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
      <Grid container style={{width:'100%', marginLeft:0}}
      spacing={3}>        
        {projectData.designs ? 
          <Grid container
          spacing={3}
          >
          {projectData.designs.length ?
              projectData.designs.map((design, i) => {
                return (                
                  !design.versionOf && <Grid item 
                  key = {design.id}
                  style = {{paddingLeft: 0}}
                  xs>
                      <VariantCard
                      designId = {design.id}                     
                      title={design.title}
                      members = {design.collaborators.length}
                      comments = {design.comments.length}
                      image={design.url}
                      link={`/workspace/${projectData.id}?designId=${design.id}`}
                      />
                  </Grid> )}) : <h3 style={{fontSize:24, color:"#F0C88E", margin:"50px auto 0"}}>No designs</h3> }
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