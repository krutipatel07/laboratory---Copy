import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Users as UsersIcon } from '../../icons/users';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DashboardModal from '../../components/modal/dashboard-modal';
import { useAuth } from '../../hooks/use-auth';
import axios from 'axios'
import { useTheme } from "@mui/material/styles";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidthOpen = 280;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

const getSections = (t, projectList) => [
  {
    title: t('Workspace'),
    items: [
      {
        title: t('Collaborators'),
        path: '/dashboard/customers',
        // icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/customers'
          }

        ]
      },
      {
        title: t('Projects'),
        path: '/dashboard/projects',
        // icon: <DesignServicesIcon fontSize="small" />,
        children: projectList
      },
    ]
  },
  // {
  //   title: t('General'),
  //   items: [
  //     {
  //       title: t('Account'),
  //       path: '/dashboard/account',
  //       icon: <UserCircleIcon fontSize="small" />
  //     },
  //   ]
  // }
];

const getBottomSections = (t) => [
  {
    title: t('General'),
    items: [
      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <UserCircleIcon fontSize="small" />
      },
      {
        title: t('Contact us'),
        path: '/contact',
        icon: <InfoOutlinedIcon fontSize="small" />
      },
    ]
  }
];

export const DashboardSidebar = (props) => {
  const { onClose, projectList } = props;
  const [isModalShown, setModalShown] = useState(false)
  // const [isOpen, setOpen] = React.useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t, projectList), [t]);
  const BottomSections = useMemo(() => getBottomSections(t), [t]);
  // const { user } = useAuth();

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };
  
  const [user, setUser] = useState();
  
  useEffect(() => {
    const user = localStorage.getItem("lab-user");
    axios.get(`/api/user/${user}`)
    .then(res => setUser(res.data.data))
    .catch(error => console.log(error));
  })

  const handleClick = (e) =>{
    e.preventDefault();
    setModalShown(true);
    setOpen(true);
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    function toogleOpen() {
      setOpen(!open);
    }

    const isInvited = router.query.invite

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div>

            <Box sx={open ? { p: 1, mt: 4 } : {p: 3}} style={{textAlign: 'center'}}>
              <NextLink
                href="/dashboard/projects"
                passHref
              >
                <a>
                <Logo
                  sx={{
                    height: open ? 45 : 55,
                    width: open ? 55 : 55,
                    justifyContent: 'center'
                  }}
                  variant="light"
                />
              </a> 
                
              </NextLink>
            </Box>
            <Button
              onClick={toogleOpen}
              sx={{
                position: 'absolute',
                top: 10,
                right: 0,
                minWidth: "initial",
                padding: "10px",
                color: "gray",
                borderRadius: "8px",
                backgroundColor: open ? "transparent" : "transparent",
                "&:hover": {
                  backgroundColor: "#26284687"
                }
              }}
            >
              {open 
              ? <ChevronRightIcon sx={{ fontSize: "20px", color: open ? "lightgray" : "lightGray" }}></ChevronRightIcon>
              : <ChevronLeftIcon sx={{ fontSize: "20px", color: open ? "lightgray" : "lightGray" }}></ChevronLeftIcon>}
              
            </Button>
          </div>
          {open ? 
          <Box sx={{ flexGrow: 1 }}>
           <IconButton style={{display: 'grid', width: '100%'}}>
             <NextLink href="/dashboard/customers">
              <UsersIcon fontSize="small" />
             </NextLink>
             <NextLink href="/dashboard/projects">
              <DesignServicesIcon fontSize="small" style={{display:'block', marginTop: 30}}/>
             </NextLink>
           </IconButton>
          </Box> : 
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section} />
            ))}
          </Box>
          }
          {/* <Box sx={{p:2}}>
            <Button
                color="primary"
                component="a"
                variant="contained"
                type="submit"
                fullWidth
                onClick={handleClick}
              >
                REVISIT GUIDE
            </Button>
            {isModalShown && <DashboardModal open={isOpen}/>}
          </Box> */}

          {/* <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          /> */}
          <Box>
            {open ?
            <Box sx={{ flexGrow: 1 }}>
              <IconButton style={{display: 'grid', width: '100%'}}>
                <NextLink href="/dashboard/account">
                  <UserCircleIcon fontSize="small" />
                </NextLink>
                <NextLink href="/contact">
                  <InfoOutlinedIcon fontSize="small" style={{display:'block', marginTop: 30}}/>
                </NextLink>
              </IconButton>
            </Box> :
            <Box sx={{ flexGrow: 1 }}>
              {BottomSections.map((section) => (
                <DashboardSidebarSection
                  key={section.title}
                  path={router.asPath}
                  sx={{
                    mt: 2,
                    '& + &': {
                      mt: 2
                    }
                  }}
                  {...section} />
              ))}
            </Box>
            }
          </Box>
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer

      variant="permanent"
        open={open}
        sx={{
          width: open
            ? { xs: "0px", sm: drawerWidthClose }
            : { xs: drawerWidthClose, sm: drawerWidthOpen },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen
          }),
          "& .MuiDrawer-paper": {
            justifyContent: "space-between",
            overflowX: "hidden",
            width: open
              ? { xs: "0px", sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            borderRight: "0px",
            // borderRadius: "0px 16px 16px 0px",
            boxShadow: theme.shadows[8],
            backgroundColor: open ? "#212121" : "#212121",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen
            })
          }
        }}
        // anchor="left"
        // open
        // PaperProps={{
        //   sx: {
        //     // backgroundColor: 'neutral.900',
        //     backgroundColor: '#212121',
        //     borderRightColor: 'divider',
        //     borderRightStyle: 'solid',
        //     borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
        //     color: '#FFFFFF',
        //     width: 280
        //   }
        // }}
        // variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  if (lgDown) {
    
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          backgroundColor: '#212121',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
