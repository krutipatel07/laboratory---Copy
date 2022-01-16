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
import { useRouter } from 'next/router';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';


export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [placement1, setPlacement1] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClick1 = (newPlacement) => (event) => {
    setAnchorE2(event.currentTarget);
    setOpen1((prev) => placement1 !== newPlacement || !prev);
    setPlacement1(newPlacement);
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

          <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                <CommentBox/>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={handleClick('top-start')} style={{display:"block"}}>
              <span style={{display: "block", height:"23px"}}><AddCommentIcon/></span>  
              Comments
              </Button>
            </Grid>
          </Grid>

            {/* <Button 
            aria-describedby={id} 
            type="button" 
            onClick={handleClick}
            style={{display:"block"}}
            >
              <span style={{display: "block", height:"23px"}}><AddCommentIcon/></span>  
              Comments
            </Button> */}

            <Popper id={id} 
            open={open} anchorEl={anchorEl}>
            <Grid container 
            justify="flex-end">
              <Box >              
                <Box >
                  <CommentBox/>
                </Box>
              </Box>
              </Grid>
            </Popper> */}
          </div>

          {/* <div>
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
          </div> */}
          
          <div>

          <Popper  open={open1} anchorE2={anchorE2} placement={placement1} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                <VersionList/>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={handleClick1('top')} style={{display:"block"}}>
              <span style={{display: "block", height:"23px"}}><FormatListBulletedIcon/></span>  
              Version
              </Button>
            </Grid>
          </Grid>


            {/* <Button 
            label="Note" 
            aria-describedby={id1} 
            type="button" 
            style={{display:"block"}} 
            onClick={handleClick1}
            >
              <span style={{display: "block", height:"23px"}}><NoteIcon /></span>
              Version
            </Button>
            <Popper id={id1} 
            open={open1} anchorE2={anchorE2}>
            <Grid container 
            justify="flex-end">
              <Box >              
                <Box >
                  <VersionList/>
                </Box>
              </Box>
              </Grid>
            </Popper> */}
          </div>
   
          {/* <BottomNavigationAction label="Version" icon={<FormatListBulletedIcon />} /> */}
        </BottomNavigation>
      </Box>
    </Box>
  );
}