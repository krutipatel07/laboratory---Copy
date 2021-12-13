import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCommentIcon from '@mui/icons-material/AddComment';
import NoteIcon from '@mui/icons-material/Note';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CommentBox from '../../../components/commentbox/commentbox';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <Box>
      {/* <CommentBox/> */}
      </Box>

      <Box sx={{ width: 500 }}>

        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Comment" icon={<AddCommentIcon />} />
          <BottomNavigationAction label="Note" icon={<NoteIcon />} />
          <BottomNavigationAction label="Version" icon={<FormatListBulletedIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}