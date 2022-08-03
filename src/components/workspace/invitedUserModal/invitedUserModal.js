import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Grid, 
  Typography
} from '@mui/material';
import { useMounted } from '../../../hooks/use-mounted';
import axios from 'axios'
import toast from 'react-hot-toast';
import * as React from 'react';
import {useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const InvitedUserModal = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const projectId = router.query.projectId; 
  const [error, setError] = React.useState({
    status: false,
    message: undefined,
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('name is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      if(!props.variantData ){
        setError({
                  status: true,
                  message : "OOPS! This design is not available or deleted by owner of the project!"})
        return
      }
      const existingCollaboratorList = props.variantData.collaborators;
      const isExisting = existingCollaboratorList.filter(collaborator => collaborator===values.email);
      if(isExisting.length){
        try {
          if (isMounted()) {    
            const {data} = await axios.get(`/api/owner/${values.email}`)
            .catch(error => console.log(error));
            const id = data.data.id;
            const projects = await axios.get(`/api/projects/${projectId}`)
            const projectsCollaborators = projects.data.data.collaborators
            const filteredProjectsCollaborators = projectsCollaborators.filter(collaborator => collaborator._id === id)
            
            if(filteredProjectsCollaborators.length === 0) {
            await axios.put(`/api/projects/${projectId}`, {
              collaborators : id,
            })
            .catch(error => console.log(error));
          }

          if(!data.data.limnu_userId || !data.data.limnu_token){
            await createLimnuUser(data.data)
          } else{
            localStorage.setItem("limnu_token", data.data.limnu_token)
          }

          localStorage.setItem("lab-user", id);
          }
          setOpen(false);
          toast.success("Collaborator verified")
          location.reload();
        } catch (err) {
          const created = await createCollaborator(values, projectId);
          if(created){ 
            setOpen(false);
            toast.success("Collaborator verified")
            location.reload();
          }
        }
      }
      else{
        toast.error("Please enter correct email address")
      }
    }
  });

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    if (!owner) {
      setOpen(true);
    }
  },[])

  const createLimnuUser = async ({name, _id }) => {
    const limnu_userCreate = await axios.post("https://api.apix.limnu.com/v1/userCreate", {
      apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
      displayName: name
    })
    .catch(error => console.log(error));
    await axios.put(`/api/user/${_id}`, {
      limnu_userId: limnu_userCreate.data.userId,
      limnu_token: limnu_userCreate.data.token
    })
    .catch(error => console.log(error));    
    localStorage.setItem('limnu_token', limnu_userCreate.data.token)
  }

  const createCollaborator = async (values, projectId) => {
    const limnu_userCreate = await axios.post("https://api.apix.limnu.com/v1/userCreate", {
      apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
      displayName: values.name
    })
    .catch(error => console.log(error));
    localStorage.setItem('limnu_token', limnu_userCreate.data.token)

    const {data} = await axios.post("/api/user", {
      name: values.name,
      email: values.email,
      role: "Collaborator",
      limnu_userId: limnu_userCreate.data.userId
    })
    .catch(error => {
      toast.error("This name is already taken!")
      return false
    });

    const id = data.data.id;
    localStorage.setItem("lab-user", id);

    await axios.put(`/api/projects/${projectId}`, {
     collaborators : id,
   })
   .catch(error => console.log(error));
   return true;
  }

   return (
    <div {...props}>
      <Dialog open={open}>
        { error.status ? 
          <Grid container 
          style={{width:'100%', marginLeft:0}}
          spacing={3}
          >
            <Typography 
            style={{fontSize:20, textAlign:"center", width:'100%', padding:50}}>
              {error.message}
            </Typography> 
          </Grid>: 
          <>
          <DialogTitle>Please confirm your identity</DialogTitle>
          <DialogContent>
            <form
            noValidate
            onSubmit={formik.handleSubmit}
            >
                <TextField
                error={Boolean(formik.touched.name && formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.name}
                label="Full Name"
                margin="dense"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
                />
                <TextField
                error={Boolean(formik.touched.name && formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="dense"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                />
                <DialogActions>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Verify
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </DialogContent></>}
      </Dialog>
    </div>
  );
};
