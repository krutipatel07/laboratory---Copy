import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, Container} from '@mui/material';
import DesignSavedGrid from '../../components/workspace/savedDesign';
import GenerateDesign from '../../components/workspace/generateDesign';
import { withRouter, useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard'
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import {DashboardSidebar} from '../../components/dashboard/dashboard-sidebar';
import {WorkspaceNavbar} from '../../components/workspace/workspace-navbar'

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '18px',
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  }
}));

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

const ProjectWorkspace = withRouter((props) => {
  const router = useRouter();
  const i = router.query.i;
  const [value, setValue] = React.useState(1);
  const [newDesign, setNewDesign] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
    <Head>
      <title>
        Workspace | Maket Colaboratory
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        // mb: 8,
        backgroundColor:'#ffffff',
        display: 'flex'
      }}
    >
      <DashboardSidebar/>
      <Container maxWidth="xl">
        <WorkspaceNavbar/>
        <Box sx={{ width: '100%' }}>
          <Box 
          sx={{ pl:1.1,
            // borderBottom: 1, borderColor: 'divider', 
            marginBottom: '10px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Generate" {...a11yProps(0)} className={classes.font} />
              <Tab label={`Design ${newDesign !== 0 ? `(${newDesign})` : ""}`} {...a11yProps(1)} className={classes.font}/>
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <GenerateDesign projectId= {props.router.query.id} setNewDesign={setNewDesign}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DesignSavedGrid projectId= {props.router.query.id} setNewDesign={setNewDesign}/>
          </TabPanel>
        </Box>
      </Container>
    </Box>
    </>
  );
})
export default withAuthGuard(ProjectWorkspace)