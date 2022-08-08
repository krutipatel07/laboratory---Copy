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

export const Subscription = (props) => {
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
              md={12}
              xs={12}
            >
              <Typography variant="h3">
                Professional
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}>
                <Box>
                    <Button 
                    variant="contained"
                    type="submit"
                    sx={{mr:1, bgcolor:"#2E7D32", color:"#ffffff", borderRadius:16}}>
                        <Typography variant="body1" sx={{fontSize:13}}>
                        ACTIVE
                        </Typography>
                    </Button>
                    <Button 
                    color="primary"
                    type="submit">
                        <Typography variant="body1"  sx={{fontSize:13}}>
                        CANCEL SUBSCRIPTION 
                        </Typography>
                    </Button>
                </Box>

            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
