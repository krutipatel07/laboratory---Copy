import { useState, useEffect, useCallback } from 'react';
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
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';




export default function AssetsGrid({projectId, props}) {
  const [assetData, setAssetData] = useState();

  // const {projectId} = router.query;
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    let url ;
    let url_list = [];
    const formData = new FormData();
    const uploaders = files.map( async file => {
      if(file.type.includes('image')) {
        return url_list.push({images : url})
      }
    });
    axios.all(uploaders).then(async () => {
      try {
        console.log(url_list)
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    });
    formData.append('file', acceptedFiles[0])
    formData.append('upload_preset', 'maket_design');
    url = "https://api.cloudinary.com/v1_1/maket/image/upload";
    fetch(url, {
      method: "POST",
      body: formData
    }).then(res => res.json())
    .then(res =>{
      if(res.error) {
        toast.error(res.error.message)
        return
      }
      // importDesign(res.secure_url);
    }).catch(err => console.log(err))
}, [])


  const {getRootProps,getInputProps} = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  // const importDesign = async (secure_url) => {
  //   const {data} = await axios.get(`/api/projects/${projectId}`);
  //   const addImage = await axios.post(`/api/projects/${projectId}`, {
  //     url: secure_url
  //   });

  //   addImage ? toast.success('Asset added!') : toast.error('Something went wrong!');
  //   location.reload();
  // };

  // useEffect(() => () => {
  //   files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, [files]);

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

        <Grid container spacing={3} style={{marginLeft:0, width: "100%", justifyContent:'center'}}>
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