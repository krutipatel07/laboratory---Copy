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
import Popper from '@mui/material/Popper';


export default function BottomNav({versions}) {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
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
        >
          <BottomNavigationAction label="Comment" icon={<AddCommentIcon/>} aria-describedby={id} type="button" onClick={handleClick}/>
          <Popper id={id} open={open} anchorEl={anchorEl}>
          <Grid container justify="flex-end">
            <Box >              
              <Box >
                <CommentBox/>
              </Box>
            </Box>
            </Grid>
          </Popper>
          <BottomNavigationAction label="Note" icon={<NoteIcon />} />
          <BottomNavigationAction label="Version" icon={<FormatListBulletedIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}