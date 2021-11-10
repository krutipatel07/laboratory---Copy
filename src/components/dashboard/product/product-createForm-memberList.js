import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { SeverityPill } from '../../severity-pill';


export default function MembersList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cao Yu" 
          src="../../../static/mock-images/avatars/avatar-cao-yu.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Cao Yu"
          secondary={
            <React.Fragment>
              <SeverityPill
                    color='info'
                    >
                    client
                </SeverityPill>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" 
          src="../../../static/mock-images/avatars/avatar-fran_perez.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Fram Perez"
          secondary={
            <React.Fragment>
              <SeverityPill
                    color='primary'
                    >
                    architect
                </SeverityPill>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Penjani Inyene" 
          src="../../../static/mock-images/avatars/avatar-penjani_inyene.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Penjani Inyene"
          secondary={
            <React.Fragment>
                <SeverityPill
                    color='primary'
                    >
                    architect
                </SeverityPill>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}