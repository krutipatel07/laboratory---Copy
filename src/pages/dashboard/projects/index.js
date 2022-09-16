import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import ProjectGrid from '../../../components/dashboard/product/product-grid.js';
import CreateProjectModal from '../../../components/modal/createProject-modal'
import { DashboardSidebar } from '../../../components/dashboard/dashboard-sidebar'
import { PricingPlan } from '../../../components/modal/pricingPlanModal'
import extractDate from '../../../utils/extractDate';
import { useAuth } from "../../../hooks/use-auth";

const ProductList = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [modal, setModal] = useState(false);  
  const [projectId, setProjectId] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [isModalShown, setModalShown] = useState(false)  
  const [dateDiff, setDateDiff] = useState()
  const [subscriptionStatus, setSubscriptionStatus] = useState("canceled")
  const freetrialDays = 14;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  // get difference in days between signup and current date to check if 14 days free trial is over
  const getDiffs = date => {
    let dateCreated = date      
      dateCreated = extractDate(dateCreated)
      const date_1 = new Date(dateCreated);
      const date_2 = new Date();
      const difference = date_1.getTime() - date_2.getTime();
      return Math.ceil(difference / (1000 * 3600 * 24))
  }

  // Added a new column in the User Model
  // Called the User Model 
  // useEffect should update when true to be false only once > PUT 
  useEffect(() => {
    const owner = localStorage.getItem("lab-user");

    user.getIdToken().then(async token => {
      axios.get(`/api/user/${owner}`, { headers: {'Authorization': `Bearer ${token}`} })
        .then(async res => {
          setUserData(res.data.data)
          // check the status of plan subscribed using its subscription id, if it is cancelled by user, display payment again
          if(res.data.data.subscription_id){
            const {data} = await axios.post('/api/stripe/retrieve-subscription', {subscription_id : res.data.data.subscription_id},
              { headers: {'Authorization': `Bearer ${token}`} })
            setSubscriptionStatus(data.status);
          }
          setDateDiff(getDiffs(res.data.data.dateCreated))
        })
        .catch(error => console.log(error));
    })
  },[]);

  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    if (owner && userData && userData.isFirstTime === true) {

      user.getIdToken().then(async token => {
        axios.put(`/api/user/${owner}`, {
          isFirstTime: false
        }, {headers: {'Authorization': `Bearer ${token}`}})
          .catch(error => console.log(error));
      });
    }
  }, [userData]);
  
  const createProject = (e) => {
    setOpen(prev=>!prev);
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Project List | Maket Colaboratory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
          height: '100%',
          display: 'flex'
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="xl" 
        sx={{backgroundColor: "white" }}>
          <Box 
          sx={{ mb: 4 , backgroundColor: "white"}}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4" 
                style={{fontSize: '24px'}}>
                  Projects
                </Typography>
              </Grid>
              <Grid item>
                  <Button
                    component="a"
                    startIcon={<PlusIcon 
                    fontSize="small" />}
                    onClick={createProject}
                  >
                    CREATE NEW PROJECT
                  </Button>
                  {/* display create new project modal */}
                {open && <CreateProjectModal 
                open={open} 
                setOpen={setOpen} 
                setModal={setModal} 
                setProjectId={setProjectId}/>}
              </Grid>
            </Grid>
          </Box>
          <Card>
            <ProjectGrid/>
          </Card>
        </Container>
      </Box>
      {/* {
        // display tutorial modal if user is the new first time user
        userData && userData.isFirstTime ? 
        <DashboardModalTutorial 
        open={isOpen} 
        setIsOpen={setIsOpen} 
        setModalShown={setModalShown}/> : ''
      } */}
      {/* display generate or import modal after creating project */}
      {/* {modal && <GenerateImportDialog 
      modal={modal} 
      setModal={setModal} 
      projectId={projectId}/>} */}

      // TODO: uncomment this when Stripe endpoints are fixed
      // display payment modal if 14 days trial period is passed and subscription status is not active
      {/*{ dateDiff <= -(freetrialDays) && subscriptionStatus !== "active"  && <PricingPlan email={userData.email}/>}*/}
    </>
  );
};

export default withAuthGuard(ProductList);
