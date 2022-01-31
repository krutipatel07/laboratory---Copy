import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VariantCard from './variantCard';
import axios from 'axios';
import { Plus as PlusIcon } from '../../icons/plus';
import Button from '@mui/material/Button';
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