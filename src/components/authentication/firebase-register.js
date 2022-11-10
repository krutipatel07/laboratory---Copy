import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  TextField,
  Typography,
  FormControl,
  InputLabel ,
  Select,
  MenuItem 
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
      lname: '',
      email: '',
      password: '',
      role: '',
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('name is required'),
      lname: Yup
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
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = await createUserWithEmailAndPassword(values.email, values.password);
        const jwtToken = await token.user.getIdToken();

        try {
          if (isMounted()) {     
            const {data} = await axios.get(`/api/owner`, { headers: {'Authorization': `Bearer ${jwtToken}`} })
            .catch(error => console.log(error));
            await axios.put(`/api/user/${data.data._id}`, {
              name: values.name,
              lname: values.lname,
              role: values.role
            })
            .catch(error => console.log(error));

            localStorage.setItem("lab-user", data.data.id);
            localStorage.setItem("is-owner", "true"); 
            const project_list = data.data.projects.map(project => ({
              id: project._id,
              title : project.title,
              path : `/workspace?id=${project._id}`
            }))
            localStorage.setItem('project_list', JSON.stringify(project_list));
            const returnUrl = router.query.returnUrl || '/dashboard/projects';
            router.push(returnUrl);
          }
        } catch (err) {
          const {data} = await axios.post("/api/user", {
                name: values.name,
                lname: values.lname,
                email: values.email,
                role: values.role
              }, { headers: {'Authorization': `Bearer ${token}`} })
              .catch(error => console.log(error));

              localStorage.setItem("lab-user", data.data.id);
              localStorage.setItem("is-owner", "true"); 
              const project_list = data.data.projects.map(project => ({
                id: project._id,
                title : project.title,
                path : `/workspace?id=${project._id}`
              }))
              localStorage.setItem('project_list', JSON.stringify(project_list));
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
            }, { headers: {'Authorization': `Bearer ${token}`} })
            .catch(error => console.log(error)); 

            await axios.post("/api/emails/welcome_email", {
              name: values.name,
              lname: values.lname,
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
      const token = await googleSignup.user.getIdToken();

      if (googleSignup.additionalUserInfo.isNewUser) {
        try { 
          if (isMounted()) {  
            const {data} = await axios.get(`/api/owner`, { headers: {'Authorization': `Bearer ${token}`} })
            .catch(error => console.log(error));  
            await axios.put(`/api/user/${data.data._id}`, {
              name: googleSignup.user.displayName,
              lname: googleSignup.additionalUserInfo.profile.family_name,
            }, { headers: {'Authorization': `Bearer ${token}`} })
            .catch(error => console.log(error));

            localStorage.setItem("lab-user", data.data.id);
            localStorage.setItem("is-owner", "true"); 

            const project_list = data.data.projects.map(project => ({
              id: project._id,
              title : project.title,
              path : `/workspace?id=${project._id}`
            }))
            localStorage.setItem('project_list', JSON.stringify(project_list));
            const returnUrl = router.query.returnUrl || '/dashboard/projects';
            router.push(returnUrl);
          }
        } catch (err) {          
          const {data} = await axios.post("/api/user", {
            name: googleSignup.user.displayName,
            email: googleSignup.user.email,
            lname: googleSignup.additionalUserInfo.profile.family_name
          }, { headers: {'Authorization': `Bearer ${token}`} })
          .catch(error => console.log(error));

          localStorage.setItem("lab-user", data.data.id);
          localStorage.setItem("is-owner", "true"); 
          const project_list = data.data.projects.map(project => ({
            id: project._id,
            title : project.title,
            path : `/workspace?id=${project._id}`
          }))
          localStorage.setItem('project_list', JSON.stringify(project_list));
          const returnUrl = router.query.returnUrl || '/dashboard/projects';
          router.push(returnUrl);
        } finally {
          const user_id = localStorage.getItem("lab-user");
          const limnu_userCreate = await axios.post("https://api.apix.limnu.com/v1/userCreate", {
            apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
            displayName: googleSignup.user.displayName
          })
          .catch(error => console.log(error));
          localStorage.setItem('limnu_token', limnu_userCreate.data.token)

          await axios.put(`/api/user/${user_id}`, {
            limnu_userId: limnu_userCreate.data.userId,
            limnu_token: limnu_userCreate.data.token
          }, { headers: {'Authorization': `Bearer ${token}`} })
          .catch(error => console.log(error)); 

          await axios.post("/api/emails/welcome_email", {
            name: googleSignup.user.displayName,
            lname: "",
            email: googleSignup.user.email
          })
          .catch(error => console.log(error));
        }
      }
      else {
        toast.error('User already have an account!');
      }
    } catch (err) {
      console.error(err);
    }  
  };

  const classes = useStyles();

  return (
    <div {...props}>
       <Button
        onClick={handleGoogleClick}
        size="large"
        variant="contained"
        sx={{
          background: "linear-gradient(to left, #2B2824 0%, #D59C5A 100%)",
          border: "1px solid #D59C5A",
          color: 'secondary.contrastText',
          display: 'block',
          margin: "0 auto",
          borderRadius:50,
          '&:hover': {
            outline: "2px solid #D59C5A"
          }
        }}
      >
        <Box
          alt="Google"
          sx={{ mr: 1 }}
        />
        SIGN UP WITH GOOGLE
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
            width:"46%",
            mr:2.5
          }}
        />
        <TextField
          error={Boolean(formik.touched.name && formik.touched.email && formik.errors.email)}
          helperText={formik.touched.name}
          label="Last"
          margin="dense"
          name="lname"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.lname}
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
            width:"50%",
          }}
        />
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
        <FormControl fullWidth 
          sx={{
            marginTop:1, 
            marginBottom: 4,
            "& .MuiFormLabel-root": {
              color: 'white'
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: 'white'
            },
            "& .MuiSelect-select.MuiSelect-outlined": {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.15)"
            },
            "& .MuiInputBase-root": {
              color: "#ffffff"
            },
            input: {color:"white"},
            }}>
          <InputLabel id="demo-multiple-name-label">Role</InputLabel>
          <Select
            error={Boolean( formik.touched.name && formik.touched.role && formik.errors.role)}
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
              '&:hover': {
                outline: "2px solid #D59C5A"
              }
              }}
          >
            SIGN UP
          </Button>
        </Box>
      </form>
    </div>
  );
};