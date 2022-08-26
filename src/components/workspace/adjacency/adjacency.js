import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, ListItemText, ModCheckbox, Checkbox , OutlinedInput, Grid } from '@mui/material';
import GroupBadges from './groupBadges'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    "bedroom 1",
    "Bedroom 2",
    "Bathroom 1",
    "Bathroom 2",
    "Living Room",
    "Dining Rooms",
    "Garage",
    "Kitchen"
];


const types = [
    "bedroom",
    "Bedroom",
    "Bathroom",
    "Bathroom",
    "living",
    "dining",
    "garage",
    "kitchen"
];
// master list of rooms and their types

// right now if you add or remove entries from this list you
// see the presented badges change accordingly. For example add: ["living room", "living"]
const rooms = [
    ["bedroom 1", "bedroom"],
    ["Bedroom 2", "bedroom"],
    ["Bathroom 1", "bathroom"],
    ["Bathroom 2", "bathroom"]
];

export default function Adjacency(props) {
  const {setOpen,roomId, data, setData, setChanged} = props

  // nextTo is the list of rooms that the currenty room is next to
  const [nextTo, setNextTo] = React.useState([]);
  // change this function to manage a list that is the same structure
  // as the above "rooms" list. This list will always be a sub-list of the master rooms list

  // once you change this handle function the presented badges should be
  // dynamic according to what is selected in the select list
      

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setNextTo(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

  return (
    <div>
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={0}
        >
            <Grid item xs="auto">
                <GroupBadges rooms={rooms} />
            </Grid>

            <Grid item xs="auto">
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
                    <Select
                    //   labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    displayEmpty
                    multiple
                    value={nextTo}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={nextTo.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    </div>
  );
}
