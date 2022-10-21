import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, TabList , Tab, Tabs, Typography } from '@mui/material';
import { AccountGeneralSettings } from '../../components/dashboard/account/account-general-settings';
import { Subscription } from '../../components/dashboard/account/subscription'
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { gtm } from '../../lib/gtm';
import {DashboardSidebar} from '../../components/dashboard/dashboard-sidebar'
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Account = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Account | Maket
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          display: 'flex'
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="md">
          <Typography variant="h4">
            Account
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="General" {...a11yProps(0)}/>
                <Tab label="Subscriptions" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <AccountGeneralSettings/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Subscription/>
            </TabPanel>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(Account);
