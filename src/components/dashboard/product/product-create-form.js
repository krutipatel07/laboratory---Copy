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
import { Search as SearchIcon } from '../../../icons/search';
import { FileDropzone } from '../../file-dropzone';
import { QuillEditor } from '../../quill-editor';
import MemberList from './product-createForm-memberList.js'
import axios from 'axios'


export const ProductCreateForm = (props) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const formik = useFormik({
    initialValues: {
      barcode: '925487986526',
      category: '',
      description: '',
      images: [],
      name: '',
      newPrice: 0,
      sku: 'IYV-8745',
      submit: null
    },
    validationSchema: Yup.object({
      barcode: Yup.string().max(255),
      category: Yup.string().max(255),
      description: Yup.string().max(5000),
      images: Yup.array(),
      name: Yup.string().max(255).required(),
      newPrice: Yup.number().min(0).required(),
      sku: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      let url ;
      let url_list = [];
      const formData = new FormData();
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
            await axios.post("/api/projects", {
              owner,
              title: values.name,
              description: values.description,
              assets: url_list,
              budget: values.newPrice,
            })
            .catch(error => console.log(error));

            toast.success('Project created!');
            router.push('/dashboard/projects');
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...props}>
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
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
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
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3
                }}
                variant="subtitle2"
              >
                Description
              </Typography>
              <QuillEditor
                onChange={(value) => {
                  formik.setFieldValue('description', value);
                }}
                placeholder="..."
                sx={{ height: 400 }}
                value={formik.values.description}
              />
              {(formik.touched.description && formik.errors.description) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
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
                Project Assets
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
              >
                You will be able to view and edit these from the project workspace.
              </Typography>
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
                Images
              </Typography>
              <FileDropzone
                accept="image/*"
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
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
                Budget
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.newPrice && formik.errors.newPrice)}
                fullWidth
                label="Price"
                name="newPrice"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.newPrice}
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
          Create
        </Button>
      </Box>
    </form>
  );
};
