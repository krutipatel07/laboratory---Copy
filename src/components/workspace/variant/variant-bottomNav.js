import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  ButtonBase,
  Toolbar,
} from '@mui/material';
import { CommentPopover } from '../comment-popover';
import { VersionPopover } from '../version-popover';
import BottomNavigation from '@mui/material/BottomNavigation';
import AddCommentIcon from '@mui/icons-material/AddComment';
import NoteIcon from '@mui/icons-material/Note';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';


const Comment = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Button 
          type="button" 
          style={{display:"block"}}
          >
            <span style={{display: "block", height:"23px"}}><AddCommentIcon/></span>  
            Comments
        </Button>
        
      </Box>
      <CommentPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};
const Note = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Button 
          type="button" 
          style={{display:"block"}}
          >
            <span style={{display: "block", height:"23px"}}><NoteIcon /></span>
            Note
        </Button>
        
      </Box>
    </>
  );

};
const Version = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Button 
          type="button" 
          style={{display:"block"}}
          >
            <span style={{display: "block", height:"23px"}}><FormatListBulletedIcon /></span>
            Version
        </Button>
        
      </Box>
      <VersionPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};


export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const isVersion = router.query.isVersion;

  return (
    <>
      <Box>
        <Toolbar 
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            style={{justifyContent:"space-around"}}
          >
            <Comment/>
            {/* <Note/> */}
            <Version/>

          </BottomNavigation>
        </Toolbar>
      </Box>
    </>
  );
}