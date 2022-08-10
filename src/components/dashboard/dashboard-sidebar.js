import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, Drawer, Typography, useMediaQuery } from '@mui/material';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Users as UsersIcon } from '../../icons/users';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DashboardModalTutorial from '../modal/dashboard-modal-tutorial';
import { useAuth } from '../../hooks/use-auth';
import { useTheme } from "@mui/material/styles";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import toast from 'react-hot-toast';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Tooltip from '@mui/material/Tooltip';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

const drawerWidthOpen = 280;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;
const smDrawerWidthClose = 40;

const getSections = (t) => [
  {
    title: t('Workspace'),
    items: [
      {
        title: t('Projects'),
        // style: {backgroundColor: 'yellow'},
        path: '/dashboard/projects',
        // icon: <DesignServicesIcon fontSize="small" />,
        children: JSON.parse(localStorage.getItem('project_list') || "[]").reverse()
      },
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

    ]
  },

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
        title: t('Feedback'),
        path: 'https://maket.canny.io/feature-requests',
        icon: <RateReviewOutlinedIcon fontSize="small" />
      },
      {
        title: t('Contact us'),
        path: '/contact',
        icon: <InfoOutlinedIcon fontSize="small" />
      },

    ],
  },


];

export const DashboardSidebar = (props) => {  
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  const { onClose } = props;
  const [isModalShown, setModalShown] = useState(false)
  
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });  
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t), [t]);
  const BottomSections = useMemo(() => getBottomSections(t), [t]);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  const isInvited = router.query.invite
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    isInvited && setOpen(true);
  },[])

  const handleClick = (e) =>{
    e.preventDefault();
    setModalShown((prevState) => !prevState);
    setIsOpen((prevState) => !prevState);
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

    const theme = useTheme();

    function toogleOpen() {
      setOpen(!open);
    }

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

            <Box sx={open ? { p: 1, mt: 4 } : {p: 3}} 
            style={{textAlign: 'center'}}>
              <NextLink
                href={isInvited ? "#" : "/dashboard/projects"}
                passHref
              >
                <a>
                <Logo
                  sx={{
                    height: open ? 45 : 55,
                    width: open ? 55 : 55,
                    justifyContent: 'center',
                    [theme.breakpoints.down('sm')]: {
                      width: '25px',
                    },
                  }}
                  variant="light"
                />
              </a> 
                
              </NextLink>
            </Box>
            {!isInvited &&
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
              
            </Button> }
          </div>
          {!isInvited ? (open ? 
          <Box sx={{ flexGrow: 1 }}>
           <IconButton 
           style={{display: 'grid', width: '100%'}}>            
             <Tooltip title="collaborators">
               <IconButton>
                <NextLink href="/dashboard/customers">
                  <UsersIcon 
                  fontSize="small" />
                </NextLink>
               </IconButton>
             </Tooltip>

             <Tooltip title="Projects">
               <IconButton>
                <NextLink href="/dashboard/projects">
                  <DesignServicesIcon 
                  fontSize="small" 
                  style={{display:'block', marginTop: 10}}/>
                </NextLink>
               </IconButton>
             </Tooltip>
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
          </Box>) : <Box sx={{ flexGrow: 1 }}></Box>
          }
          
          {!open && !isInvited && <Box>
            <Box sx={{ flexGrow: 1, }}>
              <IconButton 
              style={{width: '100%', justifyContent: 'flex-start'}}>
                <Tooltip title="Tutorial">
                  <IconButton onClick={handleClick}>
                    <><StarBorderIcon 
                    fontSize="small" 
                    style={{marginLeft:'18px'}} ></StarBorderIcon>
                    <Typography variant="h6" 
                    style={{color:'#D1D5DB', fontSize:14,letterSpacing:1,marginLeft:6}}>Tutorial</Typography></>
                  </IconButton>
                </Tooltip>
              </IconButton>
            </Box>
          </Box>}
          {isModalShown && <DashboardModalTutorial open={isOpen} 
          setIsOpen={setIsOpen} 
          setModalShown={setModalShown}/>}
          <Box>
            {open ?
            <Box sx={{ flexGrow: 1 }}>
              <IconButton 
              style={{display: 'grid', width: '100%'}}>
                {!isInvited ? 
                <>
                <Tooltip title="Tutorial">
                  <IconButton onClick={handleClick}>
                    <StarBorderIcon 
                    fontSize="small"></StarBorderIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account">
                  <IconButton>
                    <NextLink href="/dashboard/account">
                      <UserCircleIcon 
                      fontSize="small" />
                    </NextLink>
                  </IconButton>
                </Tooltip>
                </> : 

                <Tooltip title='Logout'>
                  <IconButton>
                    <LogoutIcon onClick={handleLogout} 
                    fontSize="small" 
                    style={{display:'block', marginTop: 30}}/>
                  </IconButton>
                </Tooltip>
                
                }
                <Tooltip title='Feedback' 
                placement="left-end">
                <IconButton>
                  <NextLink href="https://maket.canny.io/feature-requests">
                    <RateReviewOutlinedIcon 
                    fontSize="small" 
                    style={{display:'block', marginTop: 10, marginTop: 10}}/>
                  </NextLink>
                </IconButton>
                </Tooltip>
                <Tooltip title='Info' 
                placement="left-end">
                  <IconButton>
                    <NextLink href="/contact">
                      <InfoOutlinedIcon 
                      fontSize="small" 
                      style={{display:'block', marginTop: 10, marginBottom: 10}}/>
                    </NextLink>
                  </IconButton>
                </Tooltip>
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
      >
        {content}
      </Drawer>
    );
  }

  if (lgDown) {
    return (
      <Drawer

      variant="permanent"
        open={open}
        sx={{
          width: open
            ? { xs: smDrawerWidthClose, sm: drawerWidthClose }
            : { xs: drawerWidthOpen, sm: drawerWidthOpen },
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
              ? { xs: smDrawerWidthClose, sm: drawerWidthClose }
              : { xs: drawerWidthOpen, sm: drawerWidthOpen },
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
      >
        {content}
      </Drawer>
    );
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
