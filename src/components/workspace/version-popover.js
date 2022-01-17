import NextLink from 'next/link';
import React, { useState, useRef,useEffect } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/use-auth';
import axios from 'axios'
import { withRouter } from 'next/router';

export const VersionPopover = withRouter((props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  // To get the user from the authContext, you can use
  const { user } = useAuth();

  const {projectId, designId, invite, isVersion} = props.router.query;
  const [versions, setVersions] = useState();

  const getParentDesignVersions = () =>{
    axios.get(`/api/projects/${projectId}/design/${designId}`)
    .then(res => {
      const designId = res.data.data.versionOf._id;
      axios.get(`/api/projects/${projectId}/design/${designId}`)
      .then(res => setVersions(res.data.data.versions))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    (isVersion || invite) ? getParentDesignVersions() :
    axios.get(`/api/projects/${projectId}/design/${designId}`)
    .then(res => setVersions(res.data.data.versions))
    .catch(error => console.log(error))
  }, [designId])



  return (
    <Popover
      anchorEl={anchorEl}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}>
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex'
        }}
      >
        <form>
        {versions? versions.length ? versions.map((version, i) =>
            <><NextLink
                  href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${version._id}&isVersion=true` :`/workspace/${projectId}?designId=${version._id}&isVersion=true`}
                  passHref
                >
                <MenuItem component="a">
                    <ListItemText
                    key={version._id}
                    primary={(
                        <Typography variant="body1">
                            {version.title}
                        </Typography>
                    )}
                    />
                </MenuItem>
            </NextLink>
            <Divider /></>)
            : <h1>No versions available</h1> : <h1>loading</h1>}
        </form>

      </Box>

    </Popover>
  );
});

VersionPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
