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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export const InvitedUserModal = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
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
              role: "Collaborator"
            })
            .catch(error => console.log(error));
            localStorage.setItem("lab-user", data.data.id);
      }
      handleClose();
    }
  });


  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

   return (
    <div {...props}>
      <Dialog open={open}>
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
                <TextField
                error={Boolean(formik.touched.name && formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="dense"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
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
                            Register
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
