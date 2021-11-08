import { useEffect, useMemo, useRef, useState } from 'react';
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
import { WorkspaceSidebarSection } from './workspace-sidebar-section';

const getSections = (t) => [
  {
    title: t('Budget'),
    items: [
      {
        title: t('Collaborators'),
        path: '/dashboard/customers',
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/customers'
          },
          {
            title: t('Details'),
            path: '/dashboard/customers/1'
          },
          {
            title: t('Edit'),
            path: '/dashboard/customers/1/edit'
          }
        ]
      },
      {
        title: t('Projects'),
        path: '/dashboard/products',
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/products'
          },
          {
            title: t('Create'),
            path: '/dashboard/products/new'
          }
        ]
      },
    ]
  },
  {
    title: t('Floor'),
    items: [
      
      {
        title: t('Mail'),
        path: '/dashboard/mail',
        icon: <MailIcon fontSize="small" />,
        chip: <Chip
          color="secondary"
          label={(
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#000000'
              }}
            >
              COMING SOON!
            </Typography>
          )}
          size="small"
        />
      },
      {
        title: t('Chat'),
        path: '/dashboard/chat',
        icon: <ChatAlt2Icon fontSize="small" />,
        chip: <Chip
          color="secondary"
          label={(
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#000000'
              }}
            >
              COMING SOON!
            </Typography>
          )}
          size="small"
        />
      }
    ]
  },
  {
    title: t('Rooms'),
    items: [
      {
        title: t('Kanban'),
        path: '/dashboard/kanban',
        icon: <ClipboardListIcon fontSize="small" />,
        chip: <Chip
          color="secondary"
          label={(
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#000000'
              }}
            >
              COMING SOON!
            </Typography>
          )}
          size="small"
        />
      },
      {
        title: t('Calendar'),
        path: '/dashboard/calendar',
        icon: <CalendarIcon fontSize="small" />,
        chip: <Chip
          color="secondary"
          label={(
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#000000'
              }}
            >
              COMING SOON!
            </Typography>
          )}
          size="small"
        />
      }
    ]
  },
  {
    title: t('Adjacencies'),
    items: [
      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <UserCircleIcon fontSize="small" />
      }
    ]
  },
  {
    title: t('Number of designs'),
    items: [
      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <UserCircleIcon fontSize="small" />
      }
    ]
  }
];

export const WorkspaceSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t), [t]);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
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
            <Box sx={{ p: 3 }}>
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
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
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Anika Visser
                  </Typography>
                  <Typography
                    color="neutral.400"
                    variant="body2"
                  >
                    {t('Your tier')}
                    {' '}
                    : Student
                  </Typography>
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
              <WorkspaceSidebarSection
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

WorkspaceSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
