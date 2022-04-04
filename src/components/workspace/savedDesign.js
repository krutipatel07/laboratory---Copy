import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VariantCard from './variantCard';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Button} from '@mui/material';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import { FormHelperText, TextField, Modal } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FileDropzone } from '../file-dropzone';

export default function SavedDesign({projectId, setNewDesign}) {
  const [projectData, setProjectData] = useState([]);  
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    setNewDesign(0)
    axios.get(`/api/projects/${projectId}`)
    .then(res => setProjectData(res.data.data))
    .catch(error => console.log(error));
  }, [projectId, update])

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false); 
  
  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };
  const handleRemoveAll = () => {
    setFiles([]);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      lg: '700px'
    },
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    p: 4,
  };
  
  const formik = useFormik({
    initialValues: {
      designName: '',
      submit: null
    },
    validationSchema: Yup.object({
      designName: Yup
        .string()
        .max(255)
        .required('Design name is required'),
    }),
    onSubmit: async (values) => {
      handleCloseModal()
      const formData = new FormData();
      formData.append('file', files[0])
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
        importDesign(res.secure_url, values.designName);
        handleRemoveAll()
        values.designName = ''
      }).catch(err => console.log(err))
    }})

const importDesign = async (secure_url, designName) => {  
  const limnu_boardCreate = await axios.post("https://api.apix.limnu.com/v1/boardCreate", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardName: `Board-${designName}`,
    whiteLabel:true
  })
  .catch(error => console.log(error));
  
  await axios.post("https://api.apix.limnu.com/v1/boardImageURLUpload", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardId: limnu_boardCreate.data.boardId,
    imageURL: secure_url
    })
    .catch(error => console.log(error));

  const addDesign = await axios.post(`/api/projects/${projectId}/design`, {
    title : designName,
    url: secure_url,
    limnu_boardUrl : limnu_boardCreate.data.boardUrl,
  });

  addDesign ? toast.success('Design imported!') : toast.error('Something went wrong!');
  addDesign && setUpdate((prev) => !prev)
};

  return (
    <Box
        sx={{
          // backgroundColor: 'background.default',
          backgroundColor: '#fffff'
        }}
      >
      <div style={{display:'block', marginLeft: 'auto', width: '112px'}}>
          <Button
            component="a"
            type="submit"
            onClick={handleOpenModal}
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
                  !design.versionOf && <Grid item xs={12} sm={6} md={3}
                  key = {design.id}
                  style = {{padding: 10 }}
                  >
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
      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow: "scroll"}}
      >
        <Box sx={style}>  
          <Typography variant="h6">Import Design</Typography>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              error={Boolean(formik.touched.designName && formik.errors.designName)}
              fullWidth
              helperText={formik.touched.designName && formik.errors.designName}
              label="name"
              margin="normal"
              name="designName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.designName}
              variant="standard"
            />
            <FileDropzone
                accept="image/*"
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            {formik.errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>
                  {formik.errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box sx={{ display: 'flex' , justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseModal}>
                CANCEL
              </Button>
              <Button
                disabled={formik.isSubmitting}
                type="submit"
              >
                IMPORT
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}