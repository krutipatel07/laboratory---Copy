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


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AssetsGrid({projectId}) {
  const [assetData, setAssetData] = useState();
  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
    .then(res => setAssetData(res.data.data.assets))
    .catch(error => console.log(error));
  }, [projectId])

  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      > 
        <Box>
          <Button
            component="a"
            variant="contained"
            // onClick={handleSubmit}
            type="submit"
          >
            UPLOAD
          </Button>
          </Box>
      <Grid container 
      spacing={3} 
      style={{marginLeft:0, width: "100%", justifyContent:'center'}}>
        {assetData ? assetData.length ?   
          assetData.map((asset, i) => {
            return (                
              <Grid item 
              key = {`Asset ${i}`}
              xs>
                <Box
                sx={{
                maxWidth: 300, 
                minWidth: 400, }}>
                  {asset.images && <img 
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                        alt=""
                        src={asset.images}
                    />}
                  {asset.documents && <img 
                      style={{maxWidth: '100%', maxHeight: '100%'}}
                      alt=""
                      src={asset.documents}
                  />}
                </Box>
              </Grid> )}) 
            : <h3 style={{marginTop:50, fontSize:24, color:"#F0C88E"}}>No Assets</h3> 
        : <Box sx={{ 
              width: "100%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh' }}>
            <CircularProgress />
          </Box>}
      </Grid>
    </Box>
  );
}