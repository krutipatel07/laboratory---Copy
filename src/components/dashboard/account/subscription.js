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
import extractDate from '../../../utils/extractDate';
import CircularProgress from '@mui/material/CircularProgress';

export const Subscription = (props) => {
  const { user: loggedInUser } = useAuth();
  const [subscription_id, setSubscription_id] = useState();
  const [open, setOpen] = useState(false);
  const [subscriptionPlanId, setSubscriptionPlanId] = useState()
  const [dateDiff, setDateDiff] = useState()
  const freetrialDays = 14;
  const [loading, setLoading] = useState(true)  
  const [details, setDetails] = useState([
    {
      title: "Professional",
      description: "$30 per user per month",
    }, 
    {
      title: "Premium",
      description: "$75 per user per month",
    }
  ]);
  const prices = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'preview'
    ? ['price_1LUtZTD5NXEtAziPSaPiJqO1', 'price_1LUtchD5NXEtAziPEkhg4Ptd'] // products: prod_MDKDUUWZfhhpLS, prod_MDKHusWy9lI4hO
    : ['price_1LkqjnD5NXEtAziPS5jF5LOe', 'price_1LkqlJD5NXEtAziPpbhdCT7d'] // products: prod_MToIB6q1feknUK, prod_MToJ78XEFcLT0c
  const [priceId, setPriceId] = useState(prices);
  const [signupDate, setSignupDate] = useState("")

  // get difference in days between signup and current date to check if 14 days free trial is over
  const getDiffs = date => {
    let dateCreated = date      
      dateCreated = extractDate(dateCreated)
      const date_1 = new Date(dateCreated);
      const date_2 = new Date();
      const difference = date_1.getTime() - date_2.getTime();
      return Math.ceil(difference / (1000 * 3600 * 24))
  }

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
          setDateDiff(getDiffs(res.data.data.dateCreated))
          if( getDiffs(res.data.data.dateCreated) <= -(freetrialDays) && !res.data.data.subscription_id){
            router.push({
              pathname: '/dashboard/projects'
          })}
          setSignupDate(res.data.data.dateCreated)
          if(res.data.data.subscription_id){
            const {data} = await axios.post('/api/stripe/retrieve-subscription', {subscription_id : res.data.data.subscription_id, isSubscribed: true},
              { headers: {'Authorization': `Bearer ${token}`} })
            setSubscriptionPlanId(data.plan)
            setSubscription_id(res.data.data.subscription_id)
            setLoading(false)
          }
        }).catch(error => console.log(error));
    });
  },[])

  const cancelSubscription = async () => {
    const user = localStorage.getItem("lab-user");
    loggedInUser.getIdToken().then(async token => {
      const {data} = await axios.post('/api/stripe/cancel-stripe-subscription', {subscription_id},
        { headers: {'Authorization': `Bearer ${token}`} });        
        await axios.put(`/api/user/${user}`, {
          subscription_id : ""
        })
        .catch(error => console.log(error));
      data.status === "canceled" && router.push("/dashboard/projects");
    });
   }

  return (
    <>
    <Box
      sx={{ mt: 4 }}
      {...props}>
      {loading ?
        <Card>
          <CardContent>
              <Box>
                  <CircularProgress />
              </Box>
          </CardContent>
        </Card> 
        : subscription_id ? 
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
          {
            dateDiff >= -(freetrialDays) &&
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
            </CardContent> }
          </Card>
      }
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
