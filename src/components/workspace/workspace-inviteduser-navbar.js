import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon } from '../../icons/menu';
import { AccountPopover } from '../dashboard/account-popover';
import { SharePopover } from '../dashboard/share-popover';
import { ContactsPopover } from '../dashboard/contacts-popover';
import { ContentSearchDialog } from '../dashboard/content-search-dialog';
import { NotificationsPopover } from '../dashboard/notifications-popover';
import { LanguagePopover } from '../dashboard/language-popover';
import { Bell as BellIcon } from '../../icons/bell';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Search as SearchIcon } from '../../icons/search';
import { Users as UsersIcon } from '../../icons/users';
import NextLink from 'next/link';
import { Logo } from '../logo';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';



const languages = {
  en: '/static/icons/uk_flag.svg',
  de: '/static/icons/de_flag.svg',
  es: '/static/icons/es_flag.svg'
};

const WorkspaceNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
      boxShadow: theme.shadows[3]
    }
    : {
      backgroundColor: theme.palette.background.paper,
      borderBottomColor: theme.palette.divider,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      boxShadow: 'none'
    })
}));

const LanguageButton = () => {
  const anchorRef = useRef(null);
  const { i18n } = useTranslation();
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{ ml: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 20,
            width: 20,
            '& img': {
              width: '100%'
            }
          }}
        >
          <img
            alt=""
            src={languages[i18n.language]}
          />
        </Box>
      </IconButton>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};


const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  // To get the user from the authContext, you can use
  

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40
          }}
          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.email}`}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export const InvitedUserNavbar = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <>
      <WorkspaceNavbarRoot
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >

          <Box sx={{ flexGrow: 1 }} />
          {/*<LanguageButton />*/}
          {/*<ContentSearchButton />*/}
          <AccountButton />
        </Toolbar>
      </WorkspaceNavbarRoot>
    </>
  );
};

InvitedUserNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
