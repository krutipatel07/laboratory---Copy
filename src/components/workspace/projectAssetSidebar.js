import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AssetsGrid from './assets-grid'
import { useRouter } from 'next/router';
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';
import { RotateRight } from '@mui/icons-material';


export default function AssetSideBar() {
    const [state, setState] = React.useState({
    right: false,
  });

  const router = useRouter();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
        <React.Fragment>
          <Button onClick={toggleDrawer("right", true)}>PROJECT ASSETS</Button>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
              <AssetsGrid projectId={router.query.id || router.query.projectId}/>
          </Drawer>
        </React.Fragment>
    </div>
  );
}
