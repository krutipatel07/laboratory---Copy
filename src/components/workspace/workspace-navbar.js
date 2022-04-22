import { useRef, useState, useEffect , useCallback} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/core';
import axios from 'axios'
import { useRouter } from 'next/router';
import { withRouter} from 'next/router';
import AssetSideBar from './projectAssetSidebar'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// const [click, setClick] = useState(false)


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  projectTitle: {
    fontSize:28,
    display: 'block'
  },
  projectName: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0
    },
  },
  title: {
    color:'#000000',
    fontSize: 24,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14
    },
  }
}));

export const WorkspaceNavbar = withRouter((props) => {
  const { onOpenSidebar, ...other } = props;
  const router = useRouter();

  const projectId = router.query.id || router.query.projectId;
  const [projectTitle, setProjectTitle] = useState();
  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
    .then(res => setProjectTitle(res.data.data.title))
    .catch(error => console.log(error));
  },[projectId]);

  const isInvited = router.query.invite
  // let width;
  // isInvited ? width = '100%': width = "calc(100% - 280px)"

  const WorkspaceNavbarRoot = styled(AppBar)(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#0B0F19",
    // width: width,
    // [theme.breakpoints.down('md')]: {
    //   width: '100%',
    // },
    ...(theme.palette.mode === 'light'
      ? {
        color:'#002E4E',
        boxShadow: theme.shadows[0],
        backgroundColor: "#F9FAFC",
        right: 'auto',
        display: 'contents'
      }
      : {
        // backgroundColor: theme.palette.background.paper,
        // borderBottomColor: theme.palette.divider,
        // borderBottomStyle: 'solid',
        // borderBottomWidth: 1,
        boxShadow: 'none',
        color:'#F0C88E'
      })
  }));

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <WorkspaceNavbarRoot
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            // p: 1,
            backgroundColor: 'rgba(255, 255, 255)',
            borderBottom: '1px solid black',
            // mx:1
          }}
        >
          <Box sx={{ flexGrow: 1, pl: 1 }} className={classes.projectName}>
              <NextLink
                href="/dashboard/projects"
                passHref
              >
                <Typography variant="h6"  style={{fontSize:12, color:'rgba(0, 0, 0, 0.6)', cursor: 'pointer'}}>
                  <span>Project/</span>
                </Typography>
              </NextLink>   
              <Typography variant="h4" className={classes.title}>
                <span>{projectTitle && projectTitle}</span>
              </Typography>
          </Box>
          <AssetSideBar/>
        </Toolbar>
      </WorkspaceNavbarRoot>
    </>
  );
});

WorkspaceNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
