import React, { useState, useRef,useEffect } from "react";
import { makeStyles } from '@material-ui/styles';
import { Divider, MenuItem, ListItemText, Typography } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { withRouter } from 'next/router';
import axios from 'axios'
import NextLink from 'next/link';

const VersionList = withRouter((props) => {
    const {projectId, designId, invite} = props.router.query;
    const [versions, setVersions] = useState();
  
    useEffect(() => {
      axios.get(`/api/projects/${projectId}/design/${designId}`)
      .then(res => setVersions(res.data.data.versions))
      .catch(error => console.log(error));
    }, [designId])

  return (
    <div style={{ padding: 14, borderRadius: 8, minWidth: 282, width: "calc(100% - 50px)", maxWidth: "calc(40ch + 14px)" }}>
        <form>
            {versions? versions.length ? versions.map((version, i) => 
            <><NextLink
                  href={ invite ? `/workspace/collaborator?invite=true&designId=${version._id}&isVersion=true` :`/workspace/${projectId}?designId=${version._id}&isVersion=true`}
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
    </div>
  );
})

export default VersionList;