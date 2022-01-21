import NextLink from 'next/link';
import React, { useState, useRef,useEffect } from "react";
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
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
      {...other}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex'
        }}
      >
        <form>
        {versions? versions.length ? 
            <>
              { isVersion && 
                  <>
                  <NextLink
                      href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${versions[0].versionOf}` :`/workspace/${projectId}?designId=${versions[0].versionOf}`}
                      passHref
                    >
                    <MenuItem component="a">
                        <ListItemText
                        primary={(
                            <Typography variant="body1">
                                Default
                            </Typography>
                        )}
                        />
                    </MenuItem>
                  </NextLink>
                  <Divider/></>}
              {versions.map((version, i) =>
                  <><NextLink
                        key={version._id}
                        href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${version._id}&isVersion=true` :`/workspace/${projectId}?designId=${version._id}&isVersion=true`}
                        passHref
                      >
                      <MenuItem component="a">
                          <ListItemText
                          primary={(
                              <Typography variant="body1">
                                  {version.title}
                              </Typography>
                          )}
                          />
                      </MenuItem>
                  </NextLink>
                  <Divider key={`DividerVersionList ${version._id}`}/>
                  </>)}
            </>
            : <h3>No versions available</h3> : <h3>loading</h3>}
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
