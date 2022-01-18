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
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
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
      role: Yup
        .string()
        .required('Role is required'),
    }),
    onSubmit: async (values) => {
      const existingCollaboratorList = props.variantData.collaborators;
      const isExisting = existingCollaboratorList.filter(collaborator => collaborator===values.email);
      if(isExisting.length){
        try {
          if (isMounted()) {     
            const {data} = await axios.get(`/api/owner/${values.email}`)
            .catch(error => console.log(error));
            localStorage.setItem("lab-user", data.data.id);
          }
        } catch (err) {
          const {data} = await axios.post("/api/user", {
                name: values.name,
                email: values.email,
                role: values.role
              })
              .catch(error => console.log(error));
              localStorage.setItem("lab-user", data.data.id);
        }
        setOpen(false);
        toast.success("Collaborator verified")
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
                <FormControl fullWidth 
                style={{marginTop:8, marginBottom: 4}}>
                <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                <Select
                  error={Boolean( formik.touched.name && formik.touched.role)}
                  fullWidth
                  margin="dense"
                  name="role"
                  type="text"
                  label="Role"
                  helperText={formik.touched.role && formik.errors.role}
                  value={formik.values.role}             
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  >
                  <MenuItem value="" 
                  disabled>
                    <em>select your role</em>
                  </MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Architect">Architect</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                </Select>
                </FormControl>
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
