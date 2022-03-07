import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, Container} from '@mui/material';
import DesignSavedGrid from '../../components/workspace/savedDesign';
import AssetsGrid from '../../components/workspace/assets-grid';
import GenerateDesign from '../../components/workspace/generateDesign';
import { withRouter, useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard'
import { Button } from '@mui/material';
import NextLink from 'next/link';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { withDashboardLayout } from '../../hocs/with-dashboard-layout';

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
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        mb: 8
      }}
    >
    <Box
      component="form"
      sx={{
        flexGrow: 1,
        m: 1.5
      }}
    >
      <NextLink
        href="/dashboard/projects"
        passHref
      >
        <Button
          sx={{ m: 1.5 }}
          component="a"
          variant="text"
          style={{margin:7}}
        >
          <ArrowBackOutlinedIcon/>
        </Button>
      </NextLink>
    </Box>
      <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '10px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Generate" {...a11yProps(0)} style={{fontSize: '1.5rem'}} />
              <Tab label="Design" {...a11yProps(1)} style={{fontSize: '1.5rem'}} />
              {/* <Tab label="Assets" {...a11yProps(2)} style={{fontSize: '1.5rem'}} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <GenerateDesign projectId= {props.router.query.id}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DesignSavedGrid projectId= {props.router.query.id}/>
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            <AssetsGrid projectId= {props.router.query.id}/>
          </TabPanel> */}
        </Box>
      </Container>
    </Box>

    </>
  );
})
export default withAuthGuard(withDashboardLayout(ProjectWorkspace));