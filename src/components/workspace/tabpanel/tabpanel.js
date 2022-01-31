import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DesignGrid from '../design-grid';
import AssetsGrid from '../assets-grid';
import { withRouter, useRouter } from 'next/router'
import { withWorkspaceLayout } from '../../../hocs/with-workspace-layout';
import { withAuthGuard } from '../../../hocs/with-auth-guard'


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

const BasicTabs = withRouter((props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '30px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Design" {...a11yProps(0)} style={{fontSize: '1.5rem'}} />
          <Tab label="Assets" {...a11yProps(1)} style={{fontSize: '1.5rem'}} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DesignGrid projectId= {props.router.query.id}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AssetsGrid projectId= {props.router.query.id}/>
        
      </TabPanel>
    </Box>
  );
})
export default withAuthGuard(withWorkspaceLayout(BasicTabs));