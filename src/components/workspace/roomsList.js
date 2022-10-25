import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Adjacency from "./adjacency/adjacency";
import React from "react";
import toast from "react-hot-toast";

const RoomsList = ({ type, typeDisplayName, row_color_scheme, data, setData, setChanged }) => {
  const groupedRooms = (rooms) => {
    const roomsMap = {
      'Bedroom': [],
      'Bathroom': [],
      'Kitchen': [],
      'Living': [],
      'Dining': [],
      'Garage': []
    };
    if(rooms.length > 0)
      rooms.forEach(room => roomsMap[room.select].push(room));
    return roomsMap;
  }

  const handleAddButton = async (type, counter, setChanged) => {
    const newRname = `${type} ${counter + 1}`;
    const repeatName = data.filter(rooms => newRname === rooms.Rname);
    if (repeatName.length > 0) {
      toast.error("Room name must be unique");
      return
    }

    let xValue = '10';
    let yValue = '12';
    if (type === "Bedroom") {
      xValue = '10';
      yValue = '12';
    } else if (type === "Bathroom") {
      xValue = '10';
      yValue = '10';
    } else if (type === "Garage") {
      xValue = '15';
      yValue = '20';
    } else if (type === "Dining") {
      xValue = '12';
      yValue = '12';
    } else if (type === "Kitchen") {
      xValue = '12';
      yValue = '14';
    } else if (type === "Living") {
      xValue = '14';
      yValue = '14';
    }

    const newRoom = {
      select: type,
      Rname: newRname,
      selectFloor: 1,
      Xvalue: xValue,
      Yvalue: yValue,
      adjacencies: [],
      id: Date.now(),
    };
    setData(prev => [ ...prev, newRoom]);
    setChanged(true);
  };

  const handleDelete = async (rName, setChanged) => {
    const givenRoomRemoved = data.filter(rooms => rName !== rooms.Rname);
    setData(givenRoomRemoved);
    setChanged(true);
  };

  const handleChangeName = async (event, row) => {
    const newRname = event.target.value;
    const repeatName = data.filter(room => newRname === room.Rname);
    if (repeatName.length > 0) {
      toast.error("Room name must be unique");
      return
    }

    const previousRname = row.Rname;
    const updatedData = data.map(room => {
      let newRoom = room;
      if (row.id === room.id) {
        newRoom = { ...room, ...{ Rname: newRname} }
      }

      newRoom.adjacencies = newRoom.adjacencies
        .map(adjacency => adjacency.map(item => item.replace(previousRname, newRname)));
      return newRoom;
    });
    setData(updatedData);
    setChanged(true);
  };

  const handleChange = async (event, row, property) => {
    const value = event.target.value;
    const updatedData = data.map(room => row.id === room.id ? { ...room, ...{ [property]: value } } : room);
    setData(updatedData);
    setChanged(true);
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={`${type}-header`}
        options={{selection: true}}
      >
        <TableCell padding="checkbox" sx={{borderBottom: "none"}}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => handleAddButton(type, groupedRooms(data)[type].length, setChanged)}
            sx={{borderRadius: 8, width: '10px', minWidth: '26px'}}
          >
            +
          </Button>
        </TableCell>
        <TableCell component="th"
                   scope="row"
                   sx={{borderBottom: "none"}}>
          <Typography
            style={{
              color: row_color_scheme[type].color
            }}>
            {typeDisplayName}
          </Typography>
        </TableCell>
        <TableCell padding="checkbox" sx={{borderBottom: "none"}}/>
        <TableCell padding="checkbox" sx={{borderBottom: "none"}}/>
        <TableCell padding="checkbox" sx={{borderBottom: "none"}}/>
        <TableCell padding="checkbox" sx={{borderBottom: "none"}}/>
        <TableCell padding="checkbox" sx={{borderBottom: "none"}}/>
      </TableRow>
      {groupedRooms(data)[type] && groupedRooms(data)[type].map((row) => (
        <TableRow
          hover
          role="checkbox"
          tabIndex={-1}
          key={row.id}
          sx={{
            "&:last-child td, &:last-child th": {border: 0}
          }}
          options={{selection: true}}
        >
          <TableCell padding="checkbox" sx={{borderBottom: "none"}}/>
          <TableCell component="th"
                     scope="row"
                     sx={{borderBottom: "none", minWidth: '190px'}}>
            <TextField
              id="Rname"
              name="Rname"
              value={row.Rname}
              label="Name"
              variant="outlined"
              onChange={(event) => handleChangeName(event, row)}
            />
          </TableCell>
          <TableCell align="right" sx={{borderBottom: "none", minWidth: '100px'}}>
            <TextField
              defaultValue={row.Xvalue}
              name="Xfeet"
              type="number"
              inputProps={{ min: "10", step: "1" }}
              onChange={(event) => handleChange(event, row, 'Xvalue')}
            />
          </TableCell>
          <TableCell align="right" sx={{borderBottom: "none", minWidth: '100px'}}>
            <TextField
              defaultValue={row.Yvalue}
              name="Yfeet"
              type="number"
              inputProps={{ min: "10", step: "1" }}
              onChange={(event) => handleChange(event, row, 'Yvalue')}
            />
          </TableCell>
          <TableCell align="right" sx={{borderBottom: "none"}}>
            <Select
              labelId="demo-simple-select-label"
              id="select"
              name="selectFloor"
              value={row.selectFloor}
              label="floor"
              onChange={(event) => handleChange(event, row, 'selectFloor')}
            >
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </TableCell>
          <TableCell align='right' sx={{borderBottom: "none"}}>
            <Box>
              <Adjacency roomId={row.id} data={data} setData={setData} setChanged={setChanged}/>
            </Box>
          </TableCell>
          <TableCell padding="checkbox" sx={{borderBottom: "none"}}>
            <Button
              type="button"
              variant="text"
              onClick={() => handleDelete(row.Rname, setChanged)}
              sx={{borderRadius: 8, width: '10px', minWidth: '26px'}}
            >
              X
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default RoomsList;