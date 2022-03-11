import { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VariantCard from './variantCard';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Button} from '@mui/material';
import {useDropzone} from 'react-dropzone'
import dateFormat from "../../utils/dateFormat"
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';

export default function SavedDesign({projectId}) {
  const [projectData, setProjectData] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
    .then(res => setProjectData(res.data.data))
    .catch(error => console.log(error));
  }, [projectId, update])
  
  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0])
    formData.append('upload_preset', 'maket_design');

    const url = "https://api.cloudinary.com/v1_1/maket/image/upload";
    fetch(url, {
      method: "POST",
      body: formData
    }).then(res => res.json())
    .then(res =>{
      if(res.error) {
        toast.error(res.error.message)
        return
      }
      importDesign(res.secure_url);
    }).catch(err => console.log(err))
}, [])

const importDesign = async (secure_url) => {
  const time = dateFormat(new Date());
  const title = time.replaceAll(" ", "").replaceAll(",", "").replaceAll("pm", "").replaceAll("at", "").replaceAll("th", "");
  
  const limnu_boardCreate = await axios.post("https://api.apix.limnu.com/v1/boardCreate", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardName: `Board-${title}`
  })
  .catch(error => console.log(error));
  
  await axios.post("https://api.apix.limnu.com/v1/boardImageURLUpload", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardId: limnu_boardCreate.data.boardId,
    imageURL: secure_url
    })
    .catch(error => console.log(error));

  const addDesign = await axios.post(`/api/projects/${projectId}/design`, {
    title : `Design-${title}`,
    url: secure_url,
    limnu_boardUrl : limnu_boardCreate.data.boardUrl,
  });

  addDesign ? toast.success('Design imported!') : toast.error('Something went wrong!');
  addDesign && setUpdate((prev) => !prev)
};

const {getRootProps,getInputProps} = useDropzone({
  onDrop,
  accept: 'image/jpeg, image/png'
});

  return (
    <Box
        sx={{
          // backgroundColor: 'background.default',
          backgroundColor: '#fffff'
        }}
      >
      <div {...getRootProps()} style={{display:'block', marginLeft: 'auto', width: '112px'}}>
        <input {...getInputProps()} />
          <Button
            component="a"
            type="submit"
          >
            <AddIcon/>
            IMPORT
          </Button>
      </div>

      <Grid container style={{width:'100%', marginLeft:0, marginTop:20}}
      spacing={3}>        
        {projectData.designs ? 
          <Grid container style={{width:'100%', marginLeft:0}}
          spacing={3}
          >
          {projectData.designs.length ?
              projectData.designs.map((design, i) => {
                return (                
                  !design.versionOf && <Grid item 
                  key = {design.id}
                  style = {{padding: 30 }}
                  xs>
                      <VariantCard
                      designId = {design.id}                     
                      title={design.title}
                      members = {design.collaborators.length}
                      comments = {design.comments.length}
                      image={design.url}
                      link={`/workspace/${projectData.id}?designId=${design.id}`}
                      setUpdate = {setUpdate}
                      versions = {design.versions.length}
                      />
                  </Grid> )})
                 : 
                 <Typography style={{fontSize:20, textAlign:"center", width:'100%', paddingTop:100}}>
                    You do not have any designs for this project <br/>
                    To begin, return to the generate page and set your design constraints <br/>
                    or<br/>
                    Import a design
                 </Typography> }
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