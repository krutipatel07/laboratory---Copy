import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Calendar as CalendarIcon } from '../../icons/calendar';
import { ChatAlt2 as ChatAlt2Icon } from '../../icons/chat-alt2';
import { ClipboardList as ClipboardListIcon } from '../../icons/clipboard-list';
import { Mail as MailIcon } from '../../icons/mail';
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Users as UsersIcon } from '../../icons/users';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DashboardModal from '../../components/modal/dashboard-modal';
import { useAuth } from '../../hooks/use-auth';
import axios from 'axios'

const getSections = (t, projectList) => [
  {
    title: t('Workspace'),
    items: [
      {
        title: t('Collaborators'),
        path: '/dashboard/customers',
        icon: <UsersIcon fontSize="small" />,
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
        icon: <DesignServicesIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/projects',
            children: projectList
          }
        ]
      },
    ]
  },
  {
    title: t('General'),
    items: [
      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <UserCircleIcon fontSize="small" />
      }
    ]
  }
];

export const DashboardSidebar = (props) => {
  const { onClose, open, projectList } = props;
  const [isModalShown, setModalShown] = useState(false)
  const [isOpen, setOpen] = React.useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t, projectList), [t]);
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
            <Box sx={{ p: 3 }} style={{textAlign:'center'}}>
              <NextLink
                href="/dashboard/projects"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                    variant="light"
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1
                }}
              >
                <div>
                  {user ? <><Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    color="neutral.400"
                    variant="body2"
                  >
                    {t('Your tier')}
                    {' '}
                    : {user.tier}
                  </Typography></> : <h3>loading...</h3>}
                </div>
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
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

          <Box sx={{p:2}}>
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
          </Box>

          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography
              color="neutral.100"
              variant="subtitle2"
            >
              {t('Need Help?')}
            </Typography>
            <Typography
              color="neutral.500"
              variant="body2"
            >
              {t('Reach out to us')}
            </Typography>
            <NextLink
              href="/contact"
              passHref
            >
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t('Contact us')}
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
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
