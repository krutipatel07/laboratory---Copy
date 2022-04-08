import { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';import * as React from 'react';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainBox: {
    width: "650px",
    [theme.breakpoints.down("xs")]: {
      width: '100%',
    },
  },
}));

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
            return url_list.push({documents : url, name : file.name})
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
    accept: 'image/jpeg, image/png, .pdf'
  });

  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
    .then(res => setAssetData(res.data.data.assets))
    .catch(error => console.log(error));
  }, [projectId])

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (

    <Box
        sx={{
          // backgroundColor: 'background.default',
          backgroundColor: '#ffffff',
          flexGrow: 1
        }}
        className={classes.mainBox}
        style={{paddingTop:'80px', 
        // width:650
      }}
        
      > 
        <section>
          <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                style={{padding: 5, fontSize: 12, margin: 12}}
                variant="contained"
                type="submit"
              >
                UPLOAD
              </Button>
            </div>
        </section>

        <Grid container spacing={3} style={{marginLeft:0, width: "100%", justifyContent:'center', marginTop: "10px", paddingLeft:10}}>
          {assetData ? assetData.length ?   
            assetData.map((asset, i) => {
              return (                
                <Grid item 
                key = {`Asset ${i}`}
                style={{paddingLeft: 0}}
                xs>
                  <Box
                  sx={{
                  maxWidth: 200, 
                  minWidth: 280, }}>
                    {asset.images && <img 
                        style={{maxWidth: '100%', minWidth: '100%', height:200}}
                        alt=""
                        src={asset.images}
                    />}
                    {asset.length && asset[0].images && <img 
                        style={{maxWidth: '100%', minWidth: '100%', height:200}}
                        alt=""
                        src={asset[0].images}
                    />}

                    {asset.documents && 
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        <ImageButton
                          focusRipple
                          style={{
                            width: 400,
                          }}
                        >
                          <ImageSrc style={{ backgroundImage: `url(https://cdn1.iconfinder.com/data/icons/adobe-acrobat-pdf/154/adobe-acrobat-pdf-figure-512.png)` }} />
                          <ImageBackdrop className="MuiImageBackdrop-root" />
                          <a href={asset.documents} target="_blank" rel="noreferrer">
                            <Image>
                              <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                  position: 'relative',
                                  p: 4,
                                  pt: 2,
                                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                              >
                                {asset.name ? asset.name : "PDF"} 
                                <ImageMarked className="MuiImageMarked-root" />
                              </Typography>
                            </Image>
                          </a>
                        </ImageButton>
                      </Box>
                    }
                    {asset.length && asset[0].documents && 
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        <ImageButton
                          focusRipple
                          style={{
                            width: 400,
                          }}
                        >
                          <ImageSrc style={{ backgroundImage: `url(https://cdn1.iconfinder.com/data/icons/adobe-acrobat-pdf/154/adobe-acrobat-pdf-figure-512.png)` }} />
                          <ImageBackdrop className="MuiImageBackdrop-root" />
                          <a href={asset[0].documents} target="_blank" rel="noreferrer"><Image>
                            <Typography
                              component="span"
                              variant="subtitle1"
                              color="inherit"
                              sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                              }}
                            >
                              {asset[0].name ? asset[0].name : "PDF"}  
                              <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                          </Image></a>
                        </ImageButton>
                      </Box>
                    }
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