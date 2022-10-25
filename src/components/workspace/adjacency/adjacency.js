import * as React from 'react';
import { useEffect, useState } from 'react';
import { Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import GroupBadges from './groupBadges'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      fontSize: "0.8rem",
    },
  },
};

export default function Adjacency({ roomId, data, setData, setChanged }) {
  const [nextTo, setNextTo] = React.useState([]);
  const [names, setNames] = useState([])
  const [rooms, setRooms] = useState([])
  let roomsList = {}

  // get rooms details which was clicked
  const roomDetails = data.filter(room => room.id === roomId)

  useEffect(() => {
    setNextTo([])
    setNames([])
    setRooms([])
    data.forEach(room => {
      roomsList[room.Rname] = room.select
    })

  // get other rooms list excluding existing adjacencies (left side non adjacent rooms list)
    let filterItem = data.filter(room => room.id !== roomId)
    if(roomDetails[0].adjacencies && roomDetails[0].adjacencies.length){
      roomDetails[0].adjacencies.forEach ((adjacency,i) =>
      {
        const availableRoom = data.filter(room => room.Rname === adjacency[1])
        // update room badge list if any adjacencies available
        roomsList[adjacency[1]] && roomsList[adjacency[1]].length && setRooms(prev => [...prev, [adjacency[1], roomsList[adjacency[1]].toLowerCase()]])
        
        availableRoom.length && setNextTo( prev=> [...prev,
          // On autofill we get a stringified value.
          typeof adjacency[1] === 'string' ? adjacency[1].split(',')[0] : adjacency[1]
        ])
      }
      )
    }
    const otherRooms =[]  
    filterItem.forEach((item) => otherRooms.push(item.Rname));
    setNames(otherRooms);
  
  },[data])

  const save = (value) => {
    let filterAdjacency =[]
    value.forEach(item => {
      data.forEach(room => {
        if (room.Rname === item) {
          filterAdjacency = room.adjacencies.filter(adjacency => adjacency[1] === roomDetails[0].Rname)
          !filterAdjacency.length && room.adjacencies.push([item, roomDetails[0].Rname])
        }
      })
    })

    let adjacencyList =[];
    value.forEach(item => adjacencyList.push([roomDetails[0].Rname,item]));
    data.forEach(room => {
      if (room.id === roomId){
        room.adjacencies = adjacencyList;
      }
    })
    setData(data);
    setChanged(true);
  }

    const handleChange = (event) => {
      const {
        target: {value},
      } = event;
      setNextTo(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      save(value)
      const nonRedundantRoomBadge = rooms.filter(room => room.indexOf(value[value.length - 1]) > -1)
      const filteredRoomBadgeList = rooms.filter(room => value.indexOf(room[0]) > -1)
      setRooms(filteredRoomBadgeList)

      data.forEach(room => {
        roomsList[room.Rname] = room.select
      })
      value.length && !(nonRedundantRoomBadge.length) && setRooms(prev => [...prev, [value[value.length - 1], roomsList[value[value.length - 1]].toLowerCase()]])
    };

    const removeRoomBadge = (e,name) => {
      if (e.target.checked === false) {
        const checkedRoom = data.filter(room => room.Rname === name)
        const checkedRoomAdjacencyList = checkedRoom[0].adjacencies.filter(adjacency => adjacency[1] !== roomDetails[0].Rname)

        // if room name is unchecked, it will remove it from the room list
        const updatedBadgeList = rooms.filter(room => name !== room[0])
        setRooms(updatedBadgeList)

        data.forEach(room => {
          if (room.Rname === name) {
            room.adjacencies = checkedRoomAdjacencyList
          }
        })
        setData(data);
      }
    }

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
                    <InputLabel id="demo-multiple-checkbox-label" sx={{fontSize: "0.8rem"}}>Select</InputLabel>
                    <Select
                      id="demo-multiple-checkbox"
                      displayEmpty
                      multiple
                      size="small"
                      value={nextTo}
                      onChange={handleChange}
                      input={<OutlinedInput label="Select" />}
                      sx={{fontSize: "0.8rem"}}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox 
                            onChange={(e) => removeRoomBadge(e,name)}
                            checked={nextTo.indexOf(name) > -1} />
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
