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


export const SharePopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { logout } = useAuth();
  // To get the user from the authContext, you can use
  const { user } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log( 'Email:', email); 
       // You should see email and password in console.
       // ..code to submit form to backend here...

    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
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
            backgroundColor: '#212735'
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
        <form onSubmit={handleSubmit} style={{display:"inline-flex", justifyContent:'space-between', width:'100%'}}>
            {/* <TextField             
                value={email}
                onInput={ e=>setEmail(e.target.value)}
            /> */}
            {/* <Input placeholder="Collaborater email" inputProps={ariaLabel} /> */}
            <TextField label="Collaborater email" value={email} onInput={ e=>setEmail(e.target.value)}/>
            <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained" className={classes.invitebtn}>Invite</Button>
            </Stack>
        </form>
      </Box>
      <Box sx={{ my: 1 }} className={classes.text}>
        <Typography>
            COLLABORATERS
        </Typography>
      </Box>
      <Box sx={{ my: 1 }}>

          <MenuItem component="a">
            <ListItemText
              primary={(
                <Typography variant="body1">
                  sammy@gmail.com
                </Typography>
              )}
            />
          </MenuItem>

        <Divider />
        <MenuItem>
          <ListItemText
            primary={(
              <Typography variant="body1">
                lucia@hotmail.com
              </Typography>
            )}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

SharePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
