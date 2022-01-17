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
      // oldPrice: 0,
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
      // oldPrice: Yup.number().min(0),
      sku: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try {        
        const users = await axios.get("/api/user")
        .then(res => res.data.data)
        .catch(error => console.log(error));

        var user_filter = users.filter( user => user.email === values.memberSearch);

        let collaborators;
        user_filter.length?  collaborators = user_filter[0].id : collaborators = [];
        const owner = localStorage.getItem("lab-user");

        await axios.post("/api/projects", {
          owner,
          title: values.name,
          description: values.description,
          budget: values.newPrice,
          collaborators
        })
        .catch(error => console.log(error));

        toast.success('Product created!');
        router.push('/dashboard/projects');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

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
      {/* <Card sx={{ mt: 3 }}>
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
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3
                }}
                variant="subtitle2"
              >
                Notes and Documents
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
      </Card> */}
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
              {/* <TextField
                error={Boolean(formik.touched.oldPrice && formik.errors.oldPrice)}
                fullWidth
                label="Min"
                name="oldPrice"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.oldPrice}
              /> */}
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
      {/* <Card sx={{ mt: 3 }}>
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
                Collaborators
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
              >
                These are the people you will work together with on this project.
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                label="Add collaborators"
                name="memberSearch"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="enter name or email"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
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
