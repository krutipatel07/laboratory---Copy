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
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';
import axios from 'axios'
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius:"8px",
  },
}));

export const FirebaseRegister = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { createUserWithEmailAndPassword, signInWithGoogle } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      policy: true,
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
      password: Yup
        .string()
        .min(7)
        .max(255)
        .required('Password is required'),
      role: Yup
        .string()
        .required('Role is required'),
      policy: Yup
        .boolean()
        .oneOf([true], 'This field must be checked'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await createUserWithEmailAndPassword(values.email, values.password);

        try {
          if (isMounted()) {     
            const {data} = await axios.get(`/api/owner/${values.email}`)
            .catch(error => console.log(error));
            await axios.put(`/api/user/${data.data._id}`, {
              name: values.name,
              role: values.role
            })
            .catch(error => console.log(error));

            localStorage.setItem("lab-user", data.data.id);
            const returnUrl = router.query.returnUrl || '/dashboard/projects';
            router.push(returnUrl);
          }
        } catch (err) {
          const {data} = await axios.post("/api/user", {
                name: values.name,
                email: values.email,
                role: values.role
              })
              .catch(error => console.log(error));

              localStorage.setItem("lab-user", data.data.id);
              const returnUrl = router.query.returnUrl || '/dashboard/projects';
              router.push(returnUrl);
        } finally {
            const user_id = localStorage.getItem("lab-user");
            const limnu_userCreate = await axios.post("https://api.apix.limnu.com/v1/userCreate", {
              apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
              displayName: values.name
            })
            .catch(error => console.log(error));
            localStorage.setItem('limnu_token', limnu_userCreate.data.token)

            await axios.put(`/api/user/${user_id}`, {
              limnu_userId: limnu_userCreate.data.userId,
              limnu_token: limnu_userCreate.data.token
            })
            .catch(error => console.log(error)); 

            await axios.post("/api/emails/welcome_email", {
              name: values.name,
              email: values.email
            })
            .catch(error => console.log(error));
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
      const googleSignup = await signInWithGoogle();

      if (googleSignup.additionalUserInfo.isNewUser) {          
        const {data} = await axios.post("/api/user", {
          name: googleSignup.user.displayName,
          email: googleSignup.user.email
        })
        .catch(error => console.log(error));
        localStorage.setItem("lab-user", data.data.id);

        const returnUrl = router.query.returnUrl || '/dashboard/projects';
        router.push(returnUrl);
      }
      else {
        toast.error('User already have an account!');
      }
    } catch (err) {
      console.error(err);
    }  
  };

  const handleClick = async () => {
    console.log("clicked...........")
  };

  const classes = useStyles();


  return (
    <div {...props}>
      <Button
        // fullWidth
        onClick={handleGoogleClick}
        size="large"
        sx={{
          background: "linear-gradient(to left, #2B2824 0%, #D59C5A 100%)",
          border: "1px solid #D59C5A",
          color: 'secondary.contrastText',
          '&:hover': {
            backgroundColor: 'common.white',
            color: 'common.black'
          },
          display: 'block',
          margin: "0 auto",
          borderRadius:50
        }}
        variant="contained"
      >
        <Box
          alt="Google"
          sx={{ mr: 1 }}
        />
        SIGN IN WITH GOOGLE
      </Button>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 2
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
        <Typography
          color="#FFFFFF"
          sx={{ m: 2 }}
          variant="body1"
        >
          OR
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <TextField
          error={Boolean(formik.touched.name && formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.name}
          label="First"
          margin="dense"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
          color="primary"
          variant="filled"
          InputProps={{ classes: { root: classes.inputRoot } }}
          sx={{
            "& .MuiFormLabel-root": {
                color: 'white'
            },
            "& .MuiFormLabel-root.Mui-focused": {
                color: 'white'
            },
            "& .MuiInputBase-root.MuiFilledInput-root:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
            input: {color:"white"},
          }}
        />
        {/* <TextField
          id="standard-basic-lastname"
          error={Boolean(formik.touched.name && formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.name}
          label="Last"
          margin="dense"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
          color="primary"
          variant="filled"
          InputProps={{ classes: { root: classes.inputRoot } }}
          sx={{
            "& .MuiFormLabel-root": {
                color: 'white'
            },
            "& .MuiFormLabel-root.Mui-focused": {
                color: 'white'
            },
            "& .MuiInputBase-root.MuiFilledInput-root:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
            input: {color:"white"},
          }}
        /> */}
        <TextField
          error={Boolean(formik.touched.name && formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email"
          margin="dense"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
          color="primary"
          variant="filled"
          InputProps={{ classes: { root: classes.inputRoot } }}
          sx={{
            "& .MuiFormLabel-root": {
                color: 'white'
            },
            "& .MuiFormLabel-root.Mui-focused": {
                color: 'white'
            },
            "& .MuiInputBase-root.MuiFilledInput-root:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
            input: {color:"white"},
          }}
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
          color="primary"
          variant="filled"
          InputProps={{ classes: { root: classes.inputRoot } }}
          sx={{
            "& .MuiFormLabel-root": {
                color: 'white'
            },
            "& .MuiFormLabel-root.Mui-focused": {
                color: 'white'
            },
            "& .MuiInputBase-root.MuiFilledInput-root:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
            input: {color:"white"},
          }}
        />
        {Boolean(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>
            {formik.errors.policy}
          </FormHelperText>
        )}
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
            size="large"
            type="submit"
            variant="contained"
            sx={{   
            background: "linear-gradient(to left, #2B2824 0%, #D59C5A 100%)",
            border: "1px solid #D59C5A",
            color: '#ffffff',
            display: 'block',
            margin: "0 auto",
            borderRadius:50,
            minWidth: '220px',
            }}
            onClick={handleClick}
          >
            SIGN UP
          </Button>
        </Box>
      </form>
    </div>
  );
};
