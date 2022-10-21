import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material/';
import DesignSavedGrid from '../../components/workspace/savedDesign';
import GenerateDesignTab from '../../components/workspace/generateDesignTab';
import { withRouter, useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard'
import { makeStyles } from '@material-ui/core';
import {DashboardSidebar} from '../../components/dashboard/dashboard-sidebar';
import {WorkspaceNavbar} from '../../components/workspace/workspace-navbar'

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '18px',
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  tab: { 
    '& .MuiBox-root': {
      padding: '0px',
      },
    },
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
  // get index from url and open tabpanel accordingly
  const index = router.query.i ? parseInt(router.query.i) : 1;
  const [value, setValue] = React.useState(index);
  const [newDesign, setNewDesign] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <>
    <Head>
      <title>
        Workspace | Maket
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
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
            marginBottom: '10px' }}>
            <Tabs value={value} 
            onChange={handleChange} 
            aria-label="basic tabs example">
              <Tab label="Generate" 
              {...a11yProps(0)} 
              className={classes.font} />
              <Tab label={`Design ${newDesign !== 0 ? `(${newDesign})` : ""}`} 
              {...a11yProps(1)} 
              className={classes.font}/>
            </Tabs>
          </Box>
          <TabPanel value={value} 
          index={0} 
          classes={{ root: classes.tab }}>
            <GenerateDesignTab projectId= {props.router.query.id} 
            setNewDesign={setNewDesign} 
            setValue={setValue} 
            style={{p:0}}/>
          </TabPanel>
          <TabPanel value={value} 
          index={1}>
            <DesignSavedGrid 
            projectId= {props.router.query.id} 
            setNewDesign={setNewDesign}/>
          </TabPanel>
        </Box>
      </Container>
    </Box>
    </>
  );
})
export default withAuthGuard(ProjectWorkspace)