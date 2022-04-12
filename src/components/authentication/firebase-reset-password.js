import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { useMounted } from '../../hooks/use-mounted';
import toast from 'react-hot-toast';
import firebase from 'firebase';

const auth = firebase.auth();

export const FirebasePasswordReset = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        auth.sendPasswordResetEmail(values.email)
        .then(() => {
            toast.success("Email reset link was successfully sent! Check Your email.")
          
            if (isMounted()) {
              router.push('/authentication/login');
            }
        })
        .catch(error => {
            toast.error(error.message);
        });
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      {...props}>
        <TextField
            autoFocus
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
        />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Reset Password
        </Button>
      </Box>
    </form>
  );
};
