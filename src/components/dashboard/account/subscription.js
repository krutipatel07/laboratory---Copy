import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from "../../../hooks/use-auth";


export const Subscription = (props) => {
  const { user: loggedInUser } = useAuth();
  const [subscription_id, setSubscription_id] = useState();
  const [open, setOpen] = useState(false);
  const [subscriptionPlanId, setSubscriptionPlanId] = useState()
  const [details, setDetails] = useState([
    {
      title: "Professional",
      description: "$30 per user per month",
    }, 
    {
      title: "Premium",
      description: "$75 per user per month",
    }
  ])
  const [priceId, setPriceId] = useState(['price_1LUtZTD5NXEtAziPSaPiJqO1', 'price_1LUtchD5NXEtAziPEkhg4Ptd']);
  const [signupDate, setSignupDate] = useState("")

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
    loggedInUser.getIdToken().then(async token => {
      axios.get(`/api/user/${user}`, { headers: {'Authorization': `Bearer ${token}`} })
        .then(async res => {
          setSignupDate(res.data.data.dateCreated)
          if(res.data.data.subscription_id){
            const {data} = await axios.post('/api/stripe/retrieve-subscription', {subscription_id : res.data.data.subscription_id},
              { headers: {'Authorization': `Bearer ${token}`} })
            setSubscriptionPlanId(data.plan)
            setSubscription_id(res.data.data.subscription_id)
          }
        }).catch(error => console.log(error));
    });
  },[])

  const cancelSubscription = async () => {
    loggedInUser.getIdToken().then(async token => {
      const {data} = await axios.post('/api/stripe/cancel-stripe-subscription', {subscription_id},
        { headers: {'Authorization': `Bearer ${token}`} });
      data.status === "canceled" && router.push("/dashboard/projects");
    });
   }

  return (
    <>
    <Box
      sx={{ mt: 4 }}
      {...props}>
      {subscription_id ? 
      <Card>
        <CardContent>
            <Box>
                <Typography 
                    style={{fontSize:24}}>
                    {subscriptionPlanId === priceId[0] ? details[0].title : details[1].title }
                </Typography>
                <span style={{fontSize:16, paddingTop:5, color: "rgba(0, 0, 0, 0.6)"}}> {subscriptionPlanId === priceId[0] ? details[0].description : details[1].description}</span>
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
      </Card> : 
      <Card>
        <CardContent>
            <Box>
                <Typography 
                    style={{fontSize:24}}>
                    14 Day free trial
                </Typography>
                <span style={{fontSize:16, paddingTop:5, color: "rgba(0, 0, 0, 0.6)"}}>Started on {signupDate.slice(0,14)}</span>
                <Box sx={{mt:2}}>
                  <Button 
                    variant="contained"
                    type="submit"
                    sx={{bgcolor:"#2E7D32", color:"#ffffff", borderRadius:16, }}>
                      <Typography variant="body1" sx={{fontSize:13}}>
                        ACTIVE
                      </Typography>
                  </Button>
                </Box>
            </Box>
        </CardContent>
      </Card>}
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
