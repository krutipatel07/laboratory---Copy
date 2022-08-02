import { useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import { useAuth } from '../../../hooks/use-auth';
import toast from 'react-hot-toast';

export const AccountGeneralSettings = (props) => {
  // To get the user from the authContext, you can use
  // const { user } = useAuth();
  
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [reload, setReload] = useState(false);

  const router = useRouter();
  const { logout } = useAuth();
  
  useEffect(() => {
    const user = localStorage.getItem("lab-user");
    axios.get(`/api/user/${user}`)
    .then(res => setUser(res.data.data))
    .catch(error => console.log(error));
  },[reload])

  const handleChange = (e) => {
    setName(e.target.value);
  }
  const updateName = async () => {
    const user = localStorage.getItem("lab-user");
    await axios.put(`/api/user/${user}`, {
      name
    })
    .catch(error => console.log(error));

    toast.success('Name updated successfully!');
    setReload(true);
    setName();
  }
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <Box
      sx={{ mt: 4 }}
      {...props}>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Basic details
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {user && <Avatar
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.name}`}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar> }
                {/* <Button>
                  Change
                </Button> */}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                {user && <TextField
                  defaultValue={user.name}
                  onChange={handleChange}
                  label="Full Name"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}
                />}
                <Button disabled={!name} 
                onClick={updateName}>
                  Save
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                { user && <TextField
                  defaultValue={user.email}
                  disabled
                  label="Email Address"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderStyle: 'dashed'
                    }
                  }}
                />}
                {/* <Button>
                  Edit
                </Button> */}
              </Box>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}>
              <Button 
              color="primary"
              component="a"
              variant="contained"
              type="submit"
              onClick={handleLogout}>
                <Typography variant="body1">
                  Logout
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
