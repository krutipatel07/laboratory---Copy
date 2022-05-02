import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Button, Divider, FormHelperText, TextField, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';
import axios from 'axios'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
      border: '1px solid #F0C88E'
  },
}
}));

export const FirebaseLogin = (props) => {

  const isMounted = useMounted();
  const router = useRouter();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await signInWithEmailAndPassword(values.email, values.password);

        if (isMounted()) {    
          const {data} = await axios.get(`/api/owner/${values.email}`)
          .catch(error => console.log(error));
          
          localStorage.setItem("lab-user", data.data._id); 
          localStorage.setItem("is-owner", "true"); 
          const project_list = data.data.projects.map(project => ({
            id: project._id,
            title : project.title,
            path : `/workspace?id=${project._id}`
          }))
          localStorage.setItem('project_list', JSON.stringify(project_list));   

          if(!data.data.limnu_userId || !data.data.limnu_token){   
            const limnu_userCreate = await axios.post("https://api.apix.limnu.com/v1/userCreate", {
              apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
              displayName: data.data.name
            })
            .catch(error => console.log(error));
            await axios.put(`/api/user/${data.data._id}`, {
              limnu_userId: limnu_userCreate.data.userId,
              limnu_token: limnu_userCreate.data.token
            })
            .catch(error => console.log(error));
            localStorage.setItem('limnu_token', limnu_userCreate.data.token)
          }else{
            localStorage.setItem("limnu_token", data.data.limnu_token)
          }
          
          const returnUrl = router.query.returnUrl || '/dashboard/projects';
          router.push(returnUrl);
        }
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

  const handleGoogleClick = async () => {
    try {
      const googleLogin = await signInWithGoogle();

      if (isMounted()) {
        const {data} = await axios.get(`/api/owner/${googleLogin.user.email}`)
        .catch(error => console.log(error));
        localStorage.setItem("lab-user", data.data._id);

        const returnUrl = router.query.returnUrl || '/dashboard/projects';
        router.push(returnUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const classes = useStyles();


  return (
    <div {...props}>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
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
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          className={classes.button}

          >
            Log In
          </Button>
        </Box>
      </form>
    </div>
  );
};
