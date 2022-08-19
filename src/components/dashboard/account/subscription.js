import { useState, useEffect} from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useRouter } from 'next/router';


export const Subscription = (props) => {  
  const [subscription_id, setSubscription_id] = useState();
  const [open, setOpen] = useState(false);

  // handle cancel subscription dialog box
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const router = useRouter();

  useEffect(() => {
    // get subscription id of plan subscribed by user
    const user = localStorage.getItem("lab-user");
    axios.get(`/api/user/${user}`)
    .then(res => setSubscription_id(res.data.data.subscription_id))
    .catch(error => console.log(error));
  },[])

  const cancelSubscription = async () => {
    const {data} = await axios.post('/api/stripe/cancel-stripe-subscription', {subscription_id})
    data.status === "canceled" && router.push("/dashboard/projects")
   }

  return (
    <>
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
                    type="submit"
                    onClick={handleToggle}                    
                  >
                    <Typography variant="body1"  sx={{fontSize:13}}>
                      CANCEL SUBSCRIPTION 
                    </Typography>
                  </Button>
                </Box>
            </Box>
        </CardContent>
      </Card>
    </Box>

    {/* cancel subscription dialog box */} 
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel Subscription?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this subscription?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={cancelSubscription} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
};
