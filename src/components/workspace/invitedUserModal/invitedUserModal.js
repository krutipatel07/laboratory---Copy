import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormHelperText,
  Link,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl
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

          if(!data.data.limnu_userId){
            createLimnuUser(data.data)
          }

          localStorage.setItem("lab-user", id);
          }
        } catch (err) {
          createCollaborator(values, projectId);
        }
        setOpen(false);
        toast.success("Collaborator verified")
        location.reload();
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
      limnu_userId: limnu_userCreate.data.userId
    })
    .catch(error => console.log(error));
  }

  const createCollaborator = async (values, projectId) => {
    const limnu_userCreate = await axios.post("https://api.apix.limnu.com/v1/userCreate", {
      apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
      displayName: values.name
    })
    .catch(error => console.log(error));

    const {data} = await axios.post("/api/user", {
      name: values.name,
      email: values.email,
      role: "Collaborator",
      limnu_userId: limnu_userCreate.data.userId
    })
    .catch(error => console.log(error));

    const id = data.data.id;
    localStorage.setItem("lab-user", id);

    await axios.put(`/api/projects/${projectId}`, {
     collaborators : id,
   })
   .catch(error => console.log(error));
  }

   return (
    <div {...props}>
      <Dialog open={open}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
