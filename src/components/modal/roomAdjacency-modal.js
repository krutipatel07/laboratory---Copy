import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 570,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    };
export default function RoomAdjacencyModal(props) {

  const setOpen = props.setOpen
  const roomName = props.roomName
  const data =props.data

  const filterItem = data.filter(room => room.select !== roomName)  
  const roomDetails = data.filter(room => room.select === roomName)
  const otherRooms =[]  
  filterItem.forEach((item) => otherRooms.push(item.select))

  const adjacentRoomsList = roomDetails[roomDetails.length -1].adjacencies ? roomDetails[roomDetails.length -1].adjacencies : []
  
  const [checked, setChecked] = React.useState([]);  
  const [left, setLeft] = React.useState(otherRooms);
  const [right, setRight] = React.useState(adjacentRoomsList);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleClose = () => setOpen(false);

  const save = () => {
    console.log(right);
  }

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto', border: '1px solid #ddd', borderRadius: '4px' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  return (
    <Box 
    // sx={style}
    >
        <Typography>{roomName}</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
                <Typography sx={{mb:'12px'}}>Non-Adjacent rooms</Typography>
                {customList(left)}
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Typography sx={{mb:'12px'}}>Adjacent Rooms</Typography>
                {customList(right)}
            </Grid>
        </Grid>
        <Box sx={{
            display: 'flex',
            justifyContent: 'end',
            mt:'5px'
        }}>
            <Button sx={{color: 'rgba(0, 0, 0, 0.6)'}} onClose={handleClose}>CANCEL</Button>
            <Button onClick={save}>SAVE</Button>
        </Box>
    </Box>
    
  );
}