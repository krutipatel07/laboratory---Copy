import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { WorkspaceNavbar } from './workspace-navbar';
import { Box } from '@mui/material';
import { WorkspaceDesignNavbar } from './workspace-designcard-navbar'
import { useRouter } from 'next/router';
import { InvitedUserModal } from './invitedUserModal/invitedUserModal';
import {InvitedUserNavbar} from '../../components/workspace/workspace-inviteduser-navbar'

const WorkspaceLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

export const WorkspaceLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <WorkspaceLayoutRoot>
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
      </WorkspaceLayoutRoot>
      {
      router.query.designId ? 
      <WorkspaceDesignNavbar onOpenSidebar={() => setIsSidebarOpen(true)} /> :
      <WorkspaceNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      }
      
      {/* <InvitedUserNavbar/> */}
      
      
    </>
  );
};

WorkspaceLayout.propTypes = {
  children: PropTypes.node
};
