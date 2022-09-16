import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { FileDropzone } from '../../file-dropzone';
import axios from 'axios';


export const ProductCreateForm = (props) => {
  const router = useRouter();
  const setOpen = props.setOpen
  const setModal = props.setModal;
  const setProjectId = props.setProjectId
  const [files, setFiles] = useState([]);
  const [coverImage, setCoverImage] = useState([]);

  const formik = useFormik({
    initialValues: {
      barcode: '925487986526',
      category: '',
      description: '',
      cover_image: [],
      images: [],
      name: '',
      newPrice: 10000,
      sku: 'IYV-8745',
      submit: null
    },
    validationSchema: Yup.object({
      barcode: Yup.string().max(255),
      category: Yup.string().max(255),
      description: Yup.string().max(5000),
      cover_image: Yup.array(),
      images: Yup.array(),
      name: Yup.string().max(255).required(),
      newPrice: Yup.number().min(0).required(),
      sku: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      let url, cover_image_url="";
      let url_list = [];
      const formData = new FormData();
      if(coverImage.length){
        cover_image_url = await storeFiles(coverImage[0], formData);
      }

      const uploaders = files.map( async file => {
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
          const owner = localStorage.getItem("lab-user");
            const {data} = await axios.post("/api/projects", {
              owner,
              title: values.name,
              description: values.description,
              cover_image: cover_image_url || "https://maket-generatedcontent.s3.ca-central-1.amazonaws.com/platform-content/maket-logo.jpg",
              assets: url_list,
              budget: values.newPrice,
            })
            .catch(error => console.log(error));

            localStorage.project_list = JSON.stringify([... JSON.parse(localStorage.getItem('project_list') || "[]") , {
              id: data.data._id,
              title : data.data.title,
              path : `/workspace?id=${data.data._id}`
            }])

            toast.success('Project created!');
            setProjectId(data.data._id)
            setOpen(prev=>!prev)
            router.push(`/workspace?id=${data.data._id}&i=0`);
            // setModal(prev=>!prev)
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      });
    }
  });

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

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };
  const handleDropCoverImage = (newFiles) => {
    setCoverImage((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveCoverImage = (file) => {
    setCoverImage((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleRemoveAllCoverImage = () => {
    setCoverImage([]);
  };

  return (
    <>
    <form sx={{p:1}}
      onSubmit={formik.handleSubmit}
      {...props}>
      <Card sx={{boxShadow:'none', overflow:'auto', height:"auto"}}>
        <CardContent>
          <Box sx={{
            display: 'block',
            textAlign: 'center',
            mb:2
          }}>
            <Typography sx={{fontSize:18, fontWeight:600}}>Create a New Project</Typography>
          </Box>
        
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{paddingTop:8}}
            >
              <Typography
                color="textSecondary"
                sx={{
                  mb: 1,
                  mt: 1
                }}
                variant="subtitle2"
              >
                Project Title
              </Typography>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Project title"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
              style={{paddingTop:8}}
            >
              <Typography
                color="textSecondary"
                sx={{
                  mb: 1,
                  mt: 1
                }}
                variant="subtitle2"
              >
                Project Cover Photo
              </Typography>
              <FileDropzone
                accept="image/*"
                files={coverImage}
                onDrop={handleDropCoverImage}
                onRemove={handleRemoveCoverImage}
                onRemoveAll={handleRemoveAllCoverImage}
              />
            </Grid>

            {/* <Grid
              item
              md={12}
              xs={12}
              style={{paddingTop:8}}
            >
              <Typography
                color="textSecondary"
                sx={{
                  mb: 1,
                  mt: 1
                }}
                variant="subtitle2"
              >
                Project Assets
              </Typography>
              <FileDropzone
                accept="image/*,.pdf"
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Grid> */}

            {/* <Grid
              item
              md={12}
              xs={12}
              style={{paddingTop:8}}
            >
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
              >
                Budget
              </Typography>
              <TextField
                error={Boolean(formik.touched.newPrice && formik.errors.newPrice)}
                fullWidth
                label="Price"
                name="newPrice"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                inputProps={{ min: "10000", step: "10000" }}
                value={formik.values.newPrice}
              />
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mb: -1,
          mt: 3,
          background:'#212121',
          color:'#F0C88E'
        }}
      >
        <Button
        onClick={() => {
          setOpen(prev=>!prev)

        }}
          sx={{ m: 1, color:'#FFFFFF' }}
        >
          CANCEL
        </Button>
        <Button
          sx={{ m: 1, color:'#F0C88E' }}
          type="submit"
        >
          CREATE
        </Button>
      </Box>
    </form>
    </>
  );
};
