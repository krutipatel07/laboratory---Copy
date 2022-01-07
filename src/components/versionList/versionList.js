import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/styles';
import { Divider, MenuItem, ListItemText, Typography } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { withRouter } from 'next/router';

const VersionList = withRouter((props) => {
    const {designId, projectId} = props.router.query;


  return (
    <div style={{ padding: 14, borderRadius: 8, minWidth: 282, width: "calc(100% - 50px)", maxWidth: "calc(40ch + 14px)" }}>
        <form>
            <MenuItem component="a">
                <ListItemText
                primary={(
                    <Typography variant="body1">
                        Version1
                    </Typography>
                )}
                />
            </MenuItem>
            <Divider />
            <MenuItem component="a">
                <ListItemText
                primary={(
                    <Typography variant="body1">
                        Version2
                    </Typography>
                )}
                />
            </MenuItem>
        </form>
    </div>
  );
})

export default VersionList;