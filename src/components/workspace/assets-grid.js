import { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

export default function AssetsGrid({projectId, props}) {
  const [assetData, setAssetData] = useState();

  const onDrop = useCallback(acceptedFiles => {
    let url ;
    let url_list = [];
    const formData = new FormData();
    const uploaders = acceptedFiles.map( async file => {
          url = await storeFiles(file, formData);
          if(file.type.includes('image')) {
            return url_list.push({images : url})
          }
          else{
            return url_list.push({documents : url})
          }
    });
    
    axios.all(uploaders).then(async () => {
      try {
          await axios.put(`/api/projects/${projectId}`, {
            assets: url_list
          })
          .catch(error => console.log(error));
          toast.success('Assets updated successfully!');
          location.reload();
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        location.reload();
      }
    }).catch(err => console.log(err))
}, [])

const storeFiles = async (file, formData) => {
  formData.append('file', file)
  formData.append('upload_preset', 'maket_design');
  const url = "https://api.cloudinary.com/v1_1/maket/image/upload";
  const secure_file_url = await fetch(url, {
    method: "POST",
    body: formData 
  }).then(res => res.json())
  .then(res =>{
    if(res.error) {
      return
    }
    return res.secure_url
  }).catch(err => console.log(err))
  return secure_file_url;
}

  const {getRootProps,getInputProps} = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

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
        <section>
          <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                      component="a"
                      variant="contained"
                      type="submit"
                    >
                      UPLOAD
                    </Button>
            </div>
        </section>

        <Grid container spacing={3} style={{marginLeft:0, width: "100%", justifyContent:'center', marginTop: "10px"}}>
          {assetData ? assetData.length ?   
            assetData.map((asset, i) => {
              return (                
                <Grid item 
                key = {`Asset ${i}`}
                style={{paddingLeft: 0}}
                xs>
                  <Box
                  sx={{
                  maxWidth: 300, 
                  minWidth: 400, }}>
                    {asset.images && <img 
                          style={{maxWidth: '100%', minWidth: '100%', height:200}}
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