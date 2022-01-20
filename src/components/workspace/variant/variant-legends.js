import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  ButtonBase,
  Toolbar,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { blue, brown, green, orange, pink, purple, red } from '@mui/material/colors';
import { makeStyles } from '@material-ui/styles';


export default function Legends() {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    list: {
      display: 'flex',
      '& ListItem': {
        margin: '0 5px'
      }
    },
    listItem: {
      margin: '0 5px'
    }
  }));
  const classes = useStyles();

  return (
    <>
      <Box>
<List
      className={classes.list}
      sx={{ width: '100%'}}
      aria-label="contacts"
    >
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: green[500] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: green[500] }} 
          primary="Bedroom" />
      </ListItem>      
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: blue[500] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: blue[500] }} 
          primary="Bathroom" />
      </ListItem>     
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: purple[500] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: purple[500] }} 
          primary="Kitchen" />
      </ListItem>
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: orange[500] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: orange[500] }} 
          primary="Living-room" />
      </ListItem>
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: red[500] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: red[500] }} 
          primary="Dining-room" />
      </ListItem>
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: pink[500] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: pink[500] }} 
          primary="Entrance" />
      </ListItem>
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: brown[500] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: brown[500] }} 
          primary="Garage" />
      </ListItem>
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: blue[300] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: blue[300] }} 
          primary="Deck" />
      </ListItem>
      <ListItem disablePadding 
      className={classes.listItem}>
          <ListItemIcon>
            <CircleIcon sx={{ color: pink[400] }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: pink[400] }} 
          primary="Other" />
      </ListItem>
    </List>
      </Box>
    </>
  );
}