import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FileDropzone } from '../../file-dropzone';
import axios from 'axios'
import { useAuth } from "../../../hooks/use-auth";


export const ProjectEditForm = (props) => {
  const project = props.project
  const router = useRouter();
  const [coverImage, setCoverImage] = useState([]);
  const { user: loggedInUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      cover_image: [],
      images: [],
      name: '',
      // newPrice: '',
      sku: 'IYV-8745',
      submit: null
    },
    validationSchema: Yup.object({
      cover_image: Yup.array(),
      images: Yup.array(),
      name: Yup.string().max(255).required(),
      // newPrice: Yup.number().min(0).required(),
      sku: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      loggedInUser.getIdToken().then(async token => {
      let cover_image_url="";
      const formData = new FormData();
      
      if(coverImage.length){
        cover_image_url = await storeFiles(coverImage[0], formData);
      }
        try {
          const owner = localStorage.getItem("lab-user");
            const {data} = 
              await axios.put(`/api/projects/${project.id}`, {
                owner,
                title: values.name,
                cover_image: cover_image_url || project.cover_image,
                // budget: values.newPrice,
              },
              { headers: {'Authorization': `Bearer ${token}`} })
              .catch(error => console.log(error)); 

            let updated_project_list = JSON.parse(localStorage.getItem('project_list') || "[]")
            updated_project_list.forEach(project_list => {
                if(project_list.id === project.id){
                    project_list.title = data.data.title
                }
            })
            localStorage.project_list = JSON.stringify(updated_project_list)

            toast.success('Updated!');
            router.push(`/dashboard/projects`);
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
    <form
      onSubmit={formik.handleSubmit}
      >
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Basic details
              </Typography>
              <Typography
                // color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
              >
                Current Title: <strong>{ project.title }</strong>
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                autoFocus="true"
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
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Project Cover Image
              </Typography>
              <Typography 
                // color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}>
                Current cover image
              </Typography>
              <Box
          sx={{
            display: 'flex',
            height: 300,
            width: 300,
            '& img': {
              width: '100%'
            }
          }}
        >
              <img
            alt=""
            src={project.cover_image || "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80" }
          /> </Box>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3
                }}
                variant="subtitle2"
              >
                Change image from here
              </Typography>
              <FileDropzone
                accept="image/*"
                files={coverImage}
                onDrop={handleDropCoverImage}
                onRemove={handleRemoveCoverImage}
                onRemoveAll={handleRemoveAllCoverImage}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mx: -1,
          mb: -1,
          mt: 3
        }}
      >
        <Button
        onClick={() => {
          router.push('/dashboard/projects');
        }}
          sx={{ m: 1 }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};
