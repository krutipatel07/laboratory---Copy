import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCommentIcon from '@mui/icons-material/AddComment';
import NoteIcon from '@mui/icons-material/Note';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CommentBox from '../../../components/commentbox/commentbox';
import VersionList from '../../../components/versionList/versionList';
import Popper from '@mui/material/Popper';
import { Button } from '@mui/material';


export default function BottomNav({versions}) {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorE2);
  const id = open ? 'simple-popper' : undefined;
  const id1 = open1 ? 'simple-popper' : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorE2(anchorE2 ? null : event.currentTarget);
  };


  return (
    <Box>
      <Box sx={{ width: 500 }}>

        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{justifyContent:"space-around"}}
        >
          <div>
            <Button 
            aria-describedby={id} 
            type="button" 
            onClick={handleClick}
            style={{display:"block"}}
            >
              <span style={{display: "block", height:"23px"}}><AddCommentIcon/></span>  
              Comments
            </Button>

            <Popper id={id} open={open} anchorEl={anchorEl}>
            <Grid container justify="flex-end">
              <Box >              
                <Box >
                  <CommentBox/>
                </Box>
              </Box>
              </Grid>
            </Popper>
          </div>

          <div>
            <Button label="Note" aria-describedby={id} type="button" style={{display:"block"}}>
              <span style={{display: "block", height:"23px"}}><NoteIcon /></span>
              Note
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
            <Grid container justify="flex-end">
              <Box >              
                <Box >
                  <CommentBox/>
                </Box>
              </Box>
              </Grid>
            </Popper>
          </div>
          
          <div>
            <Button 
            label="Note" 
            aria-describedby={id1} 
            type="button" 
            style={{display:"block"}} 
            onClick={handleClick1}
            >
              <span style={{display: "block", height:"23px"}}><NoteIcon /></span>
              Version
            </Button>
            <Popper id={id1} open={open1} anchorE2={anchorE2}>
            <Grid container justify="flex-end">
              <Box >              
                <Box >
                  <VersionList/>
                </Box>
              </Box>
              </Grid>
            </Popper>
          </div>
   
          {/* <BottomNavigationAction label="Version" icon={<FormatListBulletedIcon />} /> */}
        </BottomNavigation>
      </Box>
    </Box>
  );
}