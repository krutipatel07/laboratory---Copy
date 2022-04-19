import { useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { Adjustments as AdjustmentsIcon } from '../icons/adjustments';
import { SettingsDrawer } from './settings-drawer';

export const SettingsButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Settings">
        <Fab
          color="primary"
          // onClick={handleOpen}
          size="medium"
          sx={{
            bottom: 0,
            margin: (theme) => theme.spacing(4),
            position: 'fixed',
            right: 0,
            zIndex: 1900
          }}
        >
              <div class="fb-customerchat"
                attribution='setup_tool'
                page_id="108824634140889"
                theme_color="#002E4F">
              </div>
        </Fab>
      </Tooltip>
      <SettingsDrawer
        onClose={handleClose}
        open={open}
      />
    </>
  );
};
