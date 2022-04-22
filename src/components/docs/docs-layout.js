import { useState } from 'react';
import { styled } from '@mui/material/styles';


const DocsLayoutRoot = styled('div')(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    marginLeft: 256
  }
}));

export const DocsLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DocsLayoutRoot>
      <DocsNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <DocsSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
      {children}
    </DocsLayoutRoot>
  );
};