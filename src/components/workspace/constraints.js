import React, { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { useRouter, withRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import dynamic from "next/dynamic";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import RoomsList from "./roomsList";

const allRoomTypes = [
  { type: 'Bedroom', displayName: 'Bedroom'},
  { type: 'Bathroom', displayName: 'Bathroom'},
  { type: 'Kitchen', displayName: 'Kitchen'},
  { type: 'Living', displayName: 'Living Room'},
  { type: 'Dining', displayName: 'Dining Room'},
  { type: 'Garage', displayName: 'Garage'},
];

const Constraints = withRouter((props) => {
  const MapLandWithNoSSR = dynamic(() => import("../mapLand"), {
    ssr: false
  });
  const MapEnvelopeWithNoSSR = dynamic(() => import("../mapEnvelope"), {
    ssr: false
  });

  const [state, setState] = useState({
    select: "",
    Rname: "",
    selectFloor: "",
    Xvalue: "",
    Yvalue: "",
    adjacencies: []
  });
  const [data, setData] = useState({})
  const router = useRouter();
  const projectId = router.query.id || router.query.projectId;
  const [update, setUpdate] = useState(true);
  const [mapUpdate, setMapUpdate] = useState(true)
  const [changed, setChanged] = useState(false);
  const [selectedrows, setSelectedRows] = useState([]);
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [buttonText, setButtonText] = useState(true)
  const userId = localStorage.getItem("lab-user")
  const setValue = props.setValue
  const [envelope_parameters, set_envelope_parameters] = useState()
  const [land_parameters, set_land_parameters] = useState()

  const row_color_scheme = {
    Bedroom: {
      color: '#74C36B',
      backgroundColor: '#bff2c2'
    },
    Bathroom: {
      color: '#8BDDFD',
      backgroundColor: '#abe0fd'
    },
    Kitchen: {
      color: '#E5BDFF',
      backgroundColor: '#e7bbef'
    },
    Garage: {
      color: '#C6A88E',
      backgroundColor: 'rgb(157 154 154 / 87%)'
    },
    Living_Room: {
      color: '#FAC685',
      backgroundColor: '#ffddba'
    },
    Dining_Room: {
      color: '#FF8C8D',
      backgroundColor: '#ffb5b5'
    },
    "Living Room": {
      color: '#FAC685',
      backgroundColor: '#ffddba'
    },
    "Dining Room": {
      color: '#FF8C8D',
      backgroundColor: '#ffb5b5'
    },
    "Living": {
      color: '#FAC685',
      backgroundColor: '#ffddba'
    },
    "Dining": {
      color: '#FF8C8D',
      backgroundColor: '#ffb5b5'
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setButtonText(false)
    setOpen(!open);
    await save(false);
    // getting land and envelope parameters in desired format
    let lat_lngs_array_land = []
    land_parameters.forEach(coordinate => {
      lat_lngs_array_land.push([coordinate.lat, coordinate.lng])
    })
    let lat_lngs_array_envelope = []
    envelope_parameters.forEach(coordinate => {
      lat_lngs_array_envelope.push([coordinate.lat, coordinate.lng])
    })

    // getting room parameters in desired format
    let constraints_floor_1 = {}
    let constraints_floor_2 = {}
    let adjacencyList_floor_1 = []
    let adjacencyList_floor_2 = []
    let adjacencyListWithId_floor_1 = []
    let adjacencyListWithId_floor_2 = []
    let roomIdList = {}
    data.forEach((room, counter) => {
      room.selectFloor.toString() === '1' ?
        room.adjacencies.forEach(adjacency => adjacencyList_floor_1.push(adjacency))
        : room.adjacencies.forEach(adjacency => adjacencyList_floor_2.push(adjacency))

      roomIdList[room.Rname] = counter + 1
      const room_constraints = {
        "min_width": parseInt(room.Xvalue) - 3,
        "max_width": parseInt(room.Xvalue) + 3,
        "min_area": (parseInt(room.Xvalue) - 3) * parseInt(room.Yvalue),
        "max_area": (parseInt(room.Xvalue) + 3) * parseInt(room.Yvalue),
        "adj_ref": counter + 1,
        "type": room.select,
        "label": room.Rname
      }
      room.selectFloor === 1 ? constraints_floor_1[`${counter + 1}`] = room_constraints : constraints_floor_2[`${counter + 1}`] = room_constraints
    })

    // getting adjacency parameters in desired format
    adjacencyList_floor_1.forEach(adjacency =>
      adjacencyListWithId_floor_1.push([roomIdList[adjacency[0]], roomIdList[adjacency[1]]]))
    constraints_floor_1["adjs"] = adjacencyListWithId_floor_1.filter(adjacency => adjacency[0] !== undefined && adjacency[1] !== undefined)

    // getting land and envelope parameters in desired format
    constraints_floor_1["land"] = lat_lngs_array_land
    constraints_floor_1["envelope"] = lat_lngs_array_envelope
    const designs = await axios.post(`/api/generate-design`,
      {
        "userData": {
          "userID": userId,
          "constraints": {
            "1": constraints_floor_1,
            "2": {}
          }
        }
      }
    )
      .catch(error => console.log(error));


    if (!designs || !designs.data.data.designs || !designs.data.data.designs.length) {
      toast.error("Oops, no design found, please try other constraints")
      setButtonText(true)
      setOpen(false)
      return
    }
    localStorage.setItem("parameter", JSON.stringify(designs.data.data.designs))
    setButtonText(true)
    setValue(1)
  };

  const deleteBulkSelection = async () => {
    let newFilterRows = data;
    selectedrows.forEach(row => {
      newFilterRows = newFilterRows.filter(item => item.id !== row)
    })

    // update project database with new search parameter using project id
    const search_parameters_updated = await axios.put(`/api/projects/${projectId}`, {
      search_parameters: newFilterRows
    })
      .catch(error => console.log(error));
    setData([])
    setSelectedRows([])
    search_parameters_updated ? toast.success('Parameters deleted successfully') : toast.error('Something went wrong!');
    search_parameters_updated && setUpdate((prev) => !prev)
  }

  const save = async (display) =>{
    // update project database with new search parameter using project id
    const search_parameters_added = await axios.put(`/api/projects/${projectId}`, {
      search_parameters: data
    })
      .catch(error => console.log(error));

    setData([])
    setSelectedRows([])

    if (display === false) {
      return
    }
    search_parameters_added ? toast.success('Parameters saved successfully') : toast.error('Something went wrong!')
    search_parameters_added && setUpdate((prev) => !prev) 
    setChanged(false)

  }
  useEffect(() => {
    // remove parameters from localStorage
    localStorage.removeItem('parameter');
  }, []);

  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
      .then(res => {
          const searchParameters = res.data.data.search_parameters;
          res.data.data.envelope_parameters.length ? set_envelope_parameters(res.data.data.envelope_parameters[0].lat_lngs) : set_envelope_parameters([])
          res.data.data.land_parameters.length ? set_land_parameters(res.data.data.land_parameters[0].lat_lngs) : set_land_parameters([])
          setData(searchParameters);
        }
      )
      .catch(error => console.log(error));
  }, [projectId, update]);

  return (
    <>
      <Box component="form"
           method="POST"
           sx={{
             alignItems: 'center',
             display: 'flex',
             flexWrap: 'wrap',
             mt: '-30px'
           }}
      >
        <div align="right"
             style={{width: '100%'}}>
          <Accordion expanded>
            <AccordionSummary
              sx={{p: 0, padding: "0px 10px 0px"}}
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{fontWeight: 'bold'}}>Add rooms</Typography>
              {changed && <>
                <IconButton sx={{pt: '2px'}}>
                  <InfoOutlinedIcon fontSize="small"/>
                </IconButton>
                <Typography color='#E57373'>Unsaved Changes</Typography>
              </>}
            </AccordionSummary>
            <AccordionDetails sx={{p: 0}}>
              {/*<Stack spacing={2}*/}
              {/*       direction="row"*/}
              {/*       sx={{mb: 1.5}}>*/}
                {/*<FormControl*/}
                {/*  fullWidth*/}
                {/*  sx={{width: '50% '}}>*/}
                {/*  <InputLabel id="demo-simple-select-label">Room type</InputLabel>*/}
                {/*  <Select*/}
                {/*    // required*/}
                {/*    labelId="demo-simple-select-label"*/}
                {/*    id="select"*/}
                {/*    name="select"*/}
                {/*    value={state.select}*/}
                {/*    label="room"*/}
                {/*    onChange={handleChange}*/}
                {/*  >*/}
                {/*    <MenuItem*/}
                {/*      value="Bedroom">Bedroom</MenuItem>*/}
                {/*    <MenuItem*/}
                {/*      value="Bathroom">Bathroom</MenuItem>*/}
                {/*    <MenuItem*/}
                {/*      value="Garage">Garage</MenuItem>*/}
                {/*    <MenuItem*/}
                {/*      value="Kitchen">Kitchen</MenuItem>*/}
                {/*    <MenuItem*/}
                {/*      value="Living">Living Room</MenuItem>*/}
                {/*    <MenuItem*/}
                {/*      value="Dining">Dining Room</MenuItem>*/}
                {/*  </Select>*/}
                {/*</FormControl>*/}
                {/*<Box component="form"*/}
                {/*     noValidate*/}
                {/*     autoComplete="off">*/}
                {/*  <TextField*/}
                {/*    id="Rname"*/}
                {/*    name="Rname"*/}
                {/*    value={state.Rname}*/}
                {/*    label="Name"*/}
                {/*    variant="outlined"*/}
                {/*    onChange={handleChange}*/}
                {/*  />*/}
                {/*</Box>*/}
                {/*<FormControl*/}
                {/*  sx={{width: '30%'}}>*/}
                {/*  <InputLabel id="demo-simple-select-label">Floor</InputLabel>*/}
                {/*  <Select*/}
                {/*    labelId="demo-simple-select-label"*/}
                {/*    id="select"*/}
                {/*    name="selectFloor"*/}
                {/*    value={state.selectFloor}*/}
                {/*    label="floor"*/}
                {/*    onChange={handleChange}*/}
                {/*  >*/}
                {/*    <MenuItem value={1}>1</MenuItem>*/}
                {/*  </Select>*/}
                {/*</FormControl>*/}
                {/*<TextField id="Xvalue"*/}
                {/*           name="Xvalue"*/}
                {/*           value={state.Xvalue}*/}
                {/*           label="X (feet)"*/}
                {/*           variant="outlined"*/}
                {/*           onChange={handleChange}/>*/}
                {/*<TextField id="Yvalue"*/}
                {/*           name="Yvalue"*/}
                {/*           value={state.Yvalue}*/}
                {/*           label="Y (feet)"*/}
                {/*           variant="outlined"*/}
                {/*           onChange={handleChange}/>*/}
              {/*</Stack>*/}
              <TableContainer component={Paper}>
                <Table
                  sx={{minWidth: 650}}
                  size="small"
                  aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell sx={{width: "10%"}}>Type</TableCell>
                      <TableCell align="right">X&nbsp;(feet)</TableCell>
                      <TableCell align="right">Y&nbsp;(feet)</TableCell>
                      <TableCell align="right">Floor</TableCell>
                      <TableCell align="right">Next to (optional)</TableCell>
                      <TableCell/>
                    </TableRow>
                  </TableHead>
                  {/* List of data table entered by user */}
                  <TableBody sx={{borderBottom: "none"}}>
                    <>{allRoomTypes.map((roomType) => (
                      <RoomsList
                        type={roomType.type}
                        typeDisplayName={roomType.displayName}
                        row_color_scheme={row_color_scheme}
                        data={data}
                        setData={setData}
                        setChanged={setChanged}
                      />))}</>
                  </TableBody>

                </Table>
              </TableContainer>

              <Box
                sx={{display: 'flex', justifyContent: 'space-between'}}>

                {checkboxClicked && selectedrows.length && !changed ? <Button variant="text"
                                                                              sx={{color: '#C62828'}}
                                                                              onClick={deleteBulkSelection}
                >DELETE SELECTED ROOMS</Button> : <Typography></Typography>}

                {changed && <Button variant="text"
                                    onClick={save}>SAVE</Button>}
              </Box>

            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              sx={{p: 0, padding: "0px 10px 0px"}}
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{fontWeight: 'bold'}}>Add land (optional)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MapLandWithNoSSR
                mapUpdate={mapUpdate}
                setMapUpdate={setMapUpdate}
                projectId={projectId}/>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              sx={{p: 0, padding: "0px 10px 0px"}}
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{fontWeight: 'bold'}}>Envelope (optional)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MapEnvelopeWithNoSSR
                mapUpdate={mapUpdate}
                setMapUpdate={setMapUpdate}
                projectId={projectId}/>
            </AccordionDetails>
          </Accordion>

          <div>
            <Button variant="contained" sx={{mt: 3, '&:hover': {backgroundColor: "#000000"}}}
                    onClick={handleSubmit}>{buttonText ? "GENERATE DESIGNS" : "Generating"}</Button>
            <Backdrop
              sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
              open={open}
            >
              <CircularProgress color="inherit"/>
              <Typography sx={{position: "absolute", mt: "6%"}}>Generating floorplans...</Typography>
            </Backdrop>
          </div>

        </div>

      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mb: 8, mt: 4
        }}
      >
        <Container maxWidth="xl">
          <Typography
            sx={{textAlign: 'center', fontSize: '20px', paddingTop: '100px'}}>Set your design constraints to
            begin</Typography>
        </Container>
      </Box>
    </>
  );
})

export default withAuthGuard(Constraints);