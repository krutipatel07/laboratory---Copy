import { useRef, useState, useEffect , useCallback} from 'react';
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
import { ContactsPopover } from '../dashboard/contacts-popover';
import { ContentSearchDialog } from '../dashboard/content-search-dialog';
import { NotificationsPopover } from '../dashboard/notifications-popover';
import { SharePopover } from '../dashboard/share-popover';
import { LanguagePopover } from '../dashboard/language-popover';
import { Bell as BellIcon } from '../../icons/bell';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Search as SearchIcon } from '../../icons/search';
import { Users as UsersIcon } from '../../icons/users';
import NextLink from 'next/link';
import { Logo } from '../logo';
import { useAuth } from '../../hooks/use-auth';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import { useRouter } from 'next/router';
import DownloadIcon from '@mui/icons-material/Download';
import toast from 'react-hot-toast';
import {useDropzone} from 'react-dropzone'

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

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenSearchDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton
          onClick={handleOpenSearchDialog}
          sx={{ ml: 1 }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog
        onClose={handleCloseSearchDialog}
        open={openDialog}
      />
    </>
  );
};

const ShareButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  // To get the user from the authContext, you can use
  const { user } = useAuth();

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    sharebtn: {
      fontWeight: 'bold',
      fontSize: '0.875rem',
      padding: '7px 11px',
      borderRadius: '8px',
      color: 'white',
      transition: 'all 150ms ease',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#007FFF',
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Box
        component={ButtonBase}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Stack spacing={2} direction="row" onClick={handleOpenPopover}
          ref={anchorRef}>
          <Button variant="contained" className={classes.sharebtn}>Share</Button>
        </Stack>
      </Box>
      <SharePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      /> 
    </>
  );
};

const ContactsButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Tooltip title="Contacts">
        <IconButton
          onClick={handleOpenPopover}
          sx={{ ml: 1 }}
          ref={anchorRef}
        >
          <UsersIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContactsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

const NotificationsButton = () => {
  const anchorRef = useRef(null);
  const [unread, setUnread] = useState(0);
  const [openPopover, setOpenPopover] = useState(false);
  // Unread notifications should come from a context and be shared with both this component and
  // notifications popover. To simplify the demo, we get it from the popover

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  const handleUpdateUnread = (value) => {
    setUnread(value);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          ref={anchorRef}
          sx={{ ml: 1 }}
          onClick={handleOpenPopover}
        >
          <Badge
            color="error"
            badgeContent={unread}
          >
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        onUpdateUnread={handleUpdateUnread}
        open={openPopover}
      />
    </>
  );
};

const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  // To get the user from the authContext, you can use
  // const { user } = useAuth();
  
  const [userName, setUserName] = useState();
  
  useEffect(() => {
    const user = localStorage.getItem("lab-user");
    axios.get(`/api/user/${user}`)
    .then(res => setUserName(res.data.data.name))
    .catch(error => console.log(error));
  })

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
        {userName ? 
          <Avatar
            sx={{
              height: 40,
              width: 40
            }}
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${userName}`}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> : 
          <Avatar
          sx={{
            height: 40,
            width: 40
          }}
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=anonymous`}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        }
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
        userName={userName}
      />
    </>
  );
};

const ExportButton = () => {
  const router = useRouter();
  const downloadDesign = async () => {
    const data = await axios.get(`/api/projects/_/design/${router.query.designId}`);
    // const data = await axios.get(`/api/projects/_/design/61c117a67ce63dc2be7e1870`);
    const file = await data.data.data.url;

    axios.get(file, {
      responseType: "blob",
    }).then(response => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "maket-design.jpg");
      document.body.appendChild(link);
      link.click();
    });
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    sharebtn: {
      fontWeight: 'bold',
      fontSize: '0.875rem',
      padding: '7px 11px',
      borderRadius: '8px',
      color: 'white',
      transition: 'all 150ms ease',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#007FFF',
      marginRight: '8px'
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Box
        component={ButtonBase}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Stack spacing={2} direction="row">
          <Button variant="contained" className={classes.sharebtn} onClick={downloadDesign}>
            Export Design
            <DownloadIcon style={{marginLeft:"10px"}}/>
          </Button>
          
        </Stack>
      </Box>
    </>
  );
};

const ImportButton = () => {
  const router = useRouter();
  const {projectId, designId, isVersion} = router.query;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    importbtn: {
      fontWeight: 'bold',
      fontSize: '0.875rem',
      padding: '7px 11px',
      borderRadius: '8px',
      color: 'white',
      transition: 'all 150ms ease',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#007FFF',
      marginRight: '8px'
    },
  }));
  const classes = useStyles();
  
  const onDrop = useCallback(acceptedFiles => {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0])
      formData.append('upload_preset', 'maket_design');

      const url = "https://api.cloudinary.com/v1_1/maket/image/upload";
      fetch(url, {
        method: "POST",
        body: formData
      }).then(res => res.json())
      .then(res =>{
        importDesign(res.secure_url);
      }).catch(err => console.log(err))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const importDesign = async (secure_url) => {
    const addVariant = axios.post(`/api/projects/${projectId}/design`, {
      title : "Variant Title with image upload",
      versionOf : designId,
      url: secure_url
    });

    addVariant ? toast.success('Variant design added!') : toast.error('Something went wrong!');
    location.reload();
  };

  return (
    <>
      <Box
        component={ButtonBase}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        { !isVersion && 
        <Stack spacing={2} direction="row">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button variant="contained" className={classes.importbtn}>
              Imports
            </Button>
          </div>
        </Stack>}
      </Box>
    </>
  );
};

export const WorkspaceNavbar = (props) => {
  const { onOpenSidebar, ...other } = props;
  const router = useRouter();

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
        <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                    variant="primary"
                  />
                </a>
              </NextLink>
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {/*<LanguageButton />*/}
          {/*<ContentSearchButton />*/}
          
          {router.query.projectId && !router.query.invite && <><ExportButton/><ImportButton/><ShareButton/></>}
          {
            !(router.query.invite) && <>
            <ContactsButton />
            <NotificationsButton />
            </>
          }
          {
            router.query.invite && <ExportButton/> 
          }
          <AccountButton />
        </Toolbar>
      </WorkspaceNavbarRoot>
    </>
  );
};

WorkspaceNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
