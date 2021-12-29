import React, { useEffect, useState } from "react";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
  TextField,
  Input,
  Button,
  FormControl
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/use-auth';
import { Cog as CogIcon } from '../../icons/cog';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from '../../icons/switch-horizontal-outlined';
import { makeStyles } from '@material-ui/styles';
import Stack from '@mui/material/Stack';
import axios from 'axios';


export const SharePopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { logout } = useAuth();
  // To get the user from the authContext, you can use
  const { user } = useAuth();

    const [email, setEmail] = useState('');

    const [designData, setDesignData] = useState();
   
    useEffect(() => {
      const designId = router.query.designId;
      axios.get(`/api/projects/_/design/${designId}`)
      .then(res => setDesignData(res.data.data))
      .catch(error => console.log(error));
    }, []);

    const handleSubmit = async event => {
      event.preventDefault();
      await axios.post("/api/invite", {
       email,
     })
     .catch(error => console.log(error));
     setEmail('');
    }

    
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          '& .MuiOutlinedInput-root':{
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px black inset"
            },}
        //   '& .MuiOutlinedInput-root':{
        //     "&:-webkit-autofill": {
        //         WebkitBoxShadow: "0 0 0 1000px #111827 inset",
        //       } ,
        //   },
        //   'input:-webkit-autofill': {backgroundColor:"#111827"},
          }
        },
        
        invitebtn: {
          fontWeight: 'bold',
          fontSize: '0.885rem',
          padding: '7px 27px',
          borderRadius: '8px',
          color: 'white',
          transition: 'all 150ms ease', 
          cursor: 'pointer',
          border: 'none',
          backgroundColor: '#007FFF',
        },
        text: {
            padding: '6px 19px',
        }, 
        p: {
            fontWeight: 600,
            fontSize: '1.1rem'
        }
      }));
    const classes = useStyles();
      

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 400 } }}
      transitionDuration={0}
      {...other}>
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
          fontSize: '14px'
        }}
      >
        <form onSubmit={handleSubmit} method={'post'} style={{display:"inline-flex", justifyContent:'space-between', width:'100%'}}>
            <TextField label="Collaborater email" value={email} onInput={ e=>setEmail(e.target.value)}/>
            <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained" className={classes.invitebtn}>Invite</Button>
            </Stack>

        </form>
      </Box>
      <Box sx={{ my: 1 }} className={classes.text}>
        <Typography className={classes.p}>
            COLLABORATERS
        </Typography>
      </Box>
      <Box sx={{ my: 1 }}>
      {designData? designData.collaborators.length? designData.collaborators.map((collaborator) => 
          <>
          <MenuItem component="a">
            <ListItemText
              primary={(
                <Typography variant="body1">
                  {collaborator}
                </Typography>
              )}
            />
          </MenuItem> 
          <Divider /></>): <h5>add collaborator</h5>  : <h5>loading...</h5>}
      </Box>
    </Popover>
  );
};

SharePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
