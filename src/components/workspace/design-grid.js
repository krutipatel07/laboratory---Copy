import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GenerateDesignCard from './generateDesignCard';

export default function DesignGrid({data}) {
  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          
        }}
      >
      <Grid container style={{width:'100%', marginLeft:0}}
      spacing={3}>   
      {data.map(design => {
        return (                
          <Grid item 
          key = {design._id}
          style = {{paddingLeft: 0}}
          xs>
              <GenerateDesignCard
              image={design.url}
              />
          </Grid> )})}
      </Grid>
    </Box>
  );
}