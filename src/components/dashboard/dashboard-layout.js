import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { Box } from '@mui/material';
import axios from 'axios'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projectList, setProjectList] = useState();

  useEffect(() => {
    const user = localStorage.getItem("lab-user");
    axios.get(`/api/user/${user}`)
    .then(res => {
    const project_list = res.data.data.projects.map(project => ({
        title : project.title,
        path : `/workspace?id=${project._id}`
      }))
      setProjectList(project_list.reverse())
    })
    .catch(error => console.log(error));
  },[])

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      {projectList && <DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
        projectList={projectList}
      />}
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
