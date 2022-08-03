import { Box, Button, Grid, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios'

export const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      full_name: '',
      company_name: '',
      email: '',
      phone: '',
      company_size: "",
      team: "",
      message: "",
      submit: null
    },
    validationSchema: Yup.object({
      full_name: Yup.string().max(20).required(),
      company_name: Yup.string().max(20).required(),
      email: Yup.string().max(30).required(),
      phone: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .required(),
      company_size: Yup.string().max(255),
      team: Yup.string().max(255),
      message: Yup.string().max(255).required()
    }),
    onSubmit: async (values, helpers) => {
      try{
        axios.post("/api/emails/contact_us", { 
          full_name: values.full_name,
          company_name: values.company_name,
          email: values.email,
          phone: values.phone,
          company_size: values.company_size && values.company_size,
          team: values.team && values.team,
          message: values.message,
        })
        .catch(error => console.log(error));
        axios.post("/api/emails/contact_us_reply", { 
          full_name: values.full_name,
          email: values.email,
          phone: values.phone
        })
        .catch(error => console.log(error));
        
        toast.success("Message sent successfully!")
        location.reload();
      }
      catch(error){
        toast.error('Something went wrong!')
        location.reload();
      }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Full Name *
          </Typography>
          <TextField
            error={Boolean(formik.touched.full_name && formik.errors.full_name)}
            fullWidth
            helperText={formik.touched.full_name && formik.errors.full_name && "Full Name is a required field"}
            name="full_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.full_name}
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Company Name*
          </Typography>
          <TextField
            error={Boolean(formik.touched.company_name && formik.errors.company_name)}
            fullWidth
            helperText={formik.touched.company_name && formik.errors.company_name && "Company name is a required field"}
            name="company_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.company_name}
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Work Email *
          </Typography>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="email"
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Phone Number *
          </Typography>
          <TextField
            error={Boolean(formik.touched.phone && formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            fullWidth
            name="phone"
            required
            type="tel"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Company Size
          </Typography>
          <Select 
            error={Boolean( formik.touched.company_size && formik.errors.company_size)}
            name="company_size"
            type="text"
            helperText={formik.touched.company_size && formik.errors.company_size}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value = {formik.values.company_size}
            fullWidth>
            <MenuItem value="10-20">1-10</MenuItem>
            <MenuItem value="11-30">11-30</MenuItem>
            <MenuItem value="31-50">31-50</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Team
          </Typography>
          <Select 
            error={Boolean( formik.touched.team && formik.errors.team)}
            name="team"
            type="text"
            helperText={formik.touched.team && formik.errors.team}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value = {formik.values.team}
            fullWidth>
            <MenuItem value="engineering">Engineering</MenuItem>
            <MenuItem value="design">Design</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Message
          </Typography>
          <TextField
            error={Boolean(formik.touched.message && formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.message}
            fullWidth
            name="message"
            required
            multiline
            rows={6}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          type="submit"
          fullWidth
          size="large"
          variant="contained"
        >
          Let&apos;s Talk
        </Button>
      </Box>
      <Typography
        color="textSecondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        By submitting this, you agree to the
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Privacy Policy
        </Link>
        {' '}
        and
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Cookie Policy
        </Link>
        .
      </Typography>
    </form>
  );
};
