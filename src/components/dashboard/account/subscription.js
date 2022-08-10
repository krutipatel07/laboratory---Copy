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
import { fontSize } from '@mui/system';

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
            <Box>
                <Typography 
                    style={{fontSize:24}}>
                    14 Day free trial
                </Typography>
                <span style={{fontSize:16, paddingTop:5, color: "rgba(0, 0, 0, 0.6)"}}>Started on August 10th, 2022</span>
                <Box sx={{mt:2}}>
                    <Button 
                    variant="contained"
                    type="submit"
                    sx={{bgcolor:"#2E7D32", color:"#ffffff", borderRadius:16, }}>
                        <Typography variant="body1" sx={{fontSize:13}}>
                        ACTIVE
                        </Typography>
                    </Button>
                    <Button 
                    sx={{display:"block",pl:0, mt:1}}
                    color="primary"
                    type="submit">
                        <Typography variant="body1"  sx={{fontSize:13}}>
                        CANCEL SUBSCRIPTION 
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
