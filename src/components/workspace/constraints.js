import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Tab, Typography } from '@mui/material';
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
import { TabContext, TabList, TabPanel } from "@mui/lab";

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

  const [data, setData] = useState({})
  const router = useRouter();
  const projectId = router.query.id || router.query.projectId;
  const [update, setUpdate] = useState(true);
  const [mapUpdate, setMapUpdate] = useState(true)
  const [changed, setChanged] = useState(false);
  const [selectedrows, setSelectedRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [buttonText, setButtonText] = useState(true)
  const userId = localStorage.getItem("lab-user")
  const setValue = props.setValue
  const [envelope_parameters, set_envelope_parameters] = useState();
  const [land_parameters, set_land_parameters] = useState();
  const [landTab, setLandTab] = useState(0);
  const [roomsExpanded, setRoomsExpanded] = useState(true);

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

  const surprisePopulateOptions = [
    [
      {
        "select":"Bedroom",
        "Rname":"Bedroom 1",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Bedroom 1","Bedroom 2"],["Bedroom 1","Bathroom 1"]],
        "id":1663367893016
      },
      {
        "select":"Bedroom",
        "Rname":"Bedroom 2",
        "selectFloor":1,
        "Xvalue":"10",
        "Yvalue":"10",
        "adjacencies":[["Bedroom 2","Bedroom 1"]],
        "id":1663367893017
      },
      {
        "select":"Bathroom",
        "Rname":"Bathroom 1",
        "selectFloor":1,
        "Xvalue":"8",
        "Yvalue":"8",
        "adjacencies":[["Bathroom 1","Bedroom 1"]],
        "id":1663367893015
      },
      {
        "select":"Bathroom",
        "Rname":"Bathroom 2",
        "selectFloor":1,
        "Xvalue":"10",
        "Yvalue":"10",
        "adjacencies":[],
        "id":1663367893018
      },
      {
        "select":"Kitchen",
        "Rname":"Kitchen",
        "selectFloor":1,
        "Xvalue":"13",
        "Yvalue":"15",
        "adjacencies":[["Kitchen","Dining Room"]],
        "id":1663367912966
      },
      {
        "select":"Dining",
        "Rname":"Dining Room",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Dining Room","Kitchen"], ["Dining Room", "Living Room"]],
        "id":1663369449891
      },
      {
        "select":"Living",
        "Rname":"Living Room",
        "selectFloor":1,
        "Xvalue":"14",
        "Yvalue":"14",
        "adjacencies":[["Living Room","Dining Room"]],
        "id":1663367936672
      },
      {
        "select":"Garage",
        "Rname":"Garage",
        "selectFloor":1,
        "Xvalue":"15",
        "Yvalue":"20",
        "adjacencies":[],
        "id":1663368135457
      }
    ],
    [
      {
        "select":"Bedroom",
        "Rname":"Bedroom 1",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Bedroom 1", "Bathroom 1"]],
        "id":1663367893019
      },
      {
        "select":"Bedroom",
        "Rname":"Office",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Office","Living Room"]],
        "id":1663367893020
      },
      {
        "select":"Bathroom",
        "Rname":"Bathroom 1",
        "selectFloor":1,
        "Xvalue":"10",
        "Yvalue":"10",
        "adjacencies":[["Bathroom 1","Bedroom 1"]],
        "id":1663367893021
      },
      {
        "select":"Kitchen",
        "Rname":"Kitchen",
        "selectFloor":1,
        "Xvalue":"14",
        "Yvalue":"14",
        "adjacencies":[["Kitchen","Dining Room"]],
        "id":1663367912923
      },
      {
        "select":"Dining",
        "Rname":"Dining Room",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Dining Room","Kitchen"], ["Dining Room", "Living Room"]],
        "id":1663369449821
      },
      {
        "select":"Living",
        "Rname":"Living Room",
        "selectFloor":1,
        "Xvalue":"14",
        "Yvalue":"14",
        "adjacencies":[["Living Room","Dining Room"], ["Living Room", "Office"]],
        "id":1663367936634
      }
    ],
    [
      {
        "select":"Bedroom",
        "Rname":"Bedroom 1",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Bedroom 1","Bedroom 2"],["Bedroom 1","Bedroom 3"],["Bedroom 1", "Bathroom 1"]],
        "id":1663367893016
      },
      {
        "select":"Bedroom",
        "Rname":"Bedroom 2",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Bedroom 2","Bedroom 1"]],
        "id":1663367893017
      },
      {
        "select":"Bedroom",
        "Rname":"Bedroom 3",
        "selectFloor":1,
        "Xvalue":"10",
        "Yvalue":"10",
        "adjacencies":[["Bedroom 3","Bedroom 1"]],
        "id":1663367893117
      },
      {
        "select":"Bathroom",
        "Rname":"Bathroom 1",
        "selectFloor":1,
        "Xvalue":"10",
        "Yvalue":"10",
        "adjacencies":[["Bathroom 1","Bedroom 1"]],
        "id":1663367893015
      },
      {
        "select":"Kitchen",
        "Rname":"Kitchen",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"15",
        "adjacencies":[["Kitchen","Living Room"], ["Kitchen","Dining Room"]],
        "id":1663367912966
      },
      {
        "select":"Dining",
        "Rname":"Dining Room",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"14",
        "adjacencies":[["Dining Room","Kitchen"]],
        "id":1663369449891
      },
      {
        "select":"Living",
        "Rname":"Living Room",
        "selectFloor":1,
        "Xvalue":"14",
        "Yvalue":"12",
        "adjacencies":[["Living Room","Kitchen"]],
        "id":1663367936672
      },
      {
        "select":"Garage",
        "Rname":"Garage",
        "selectFloor":1,
        "Xvalue":"20",
        "Yvalue":"20",
        "adjacencies":[],
        "id":1663368135457
      }
    ],
    [
      {
        "select":"Bedroom",
        "Rname":"Bedroom 1",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Bedroom 1","Bedroom 2"],["Bedroom 1","Office"],["Bedroom 1", "Bathroom 1"]],
        "id":1663367893016
      },
      {
        "select":"Bedroom",
        "Rname":"Bedroom 2",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"12",
        "adjacencies":[["Bedroom 2","Bedroom 1"]],
        "id":1663367893017
      },
      {
        "select":"Bedroom",
        "Rname":"Office",
        "selectFloor":1,
        "Xvalue":"10",
        "Yvalue":"10",
        "adjacencies":[["Office", "Bedroom 1"], ["Office", "Living Room"]],
        "id":1663364893017
      },
      {
        "select":"Bathroom",
        "Rname":"Bathroom 1",
        "selectFloor":1,
        "Xvalue":"10",
        "Yvalue":"10",
        "adjacencies":[["Bathroom 1","Bedroom 1"]],
        "id":1663367893015
      },
      {
        "select":"Bathroom",
        "Rname":"Half Bathroom",
        "selectFloor":1,
        "Xvalue":"6",
        "Yvalue":"8",
        "adjacencies":[["Half Bathroom","Living Room"]],
        "id":1663367893018
      },
      {
        "select":"Kitchen",
        "Rname":"Kitchen",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"15",
        "adjacencies":[["Kitchen","Dining Room"], ["Kitchen","Living Room"]],
        "id":1663367912966
      },
      {
        "select":"Dining",
        "Rname":"Dining Room",
        "selectFloor":1,
        "Xvalue":"12",
        "Yvalue":"14",
        "adjacencies":[["Dining Room","Kitchen"]],
        "id":1663369449891
      },
      {
        "select":"Living",
        "Rname":"Living Room",
        "selectFloor":1,
        "Xvalue":"14",
        "Yvalue":"12",
        "adjacencies":[["Living Room","Office"], ["Living Room", "Kitchen"], ["Living Room", "Half Bathroom"]],
        "id":1663367936672
      },
      {
        "select":"Garage",
        "Rname":"Garage",
        "selectFloor":1,
        "Xvalue":"20",
        "Yvalue":"20",
        "adjacencies":[],
        "id":1663368135457
      }
    ],
  ]

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

  const save = async (display) =>{
    const search_parameters_added = await axios.put(`/api/projects/${projectId}`, {
      search_parameters: data
    }).catch(error => console.log(error));

    setSelectedRows([]);
    if (display === false) {
      return;
    }
    search_parameters_added ? toast.success('Parameters saved successfully') : toast.error('Something went wrong!');
    search_parameters_added && setUpdate((prev) => !prev);
    setData([])
    setChanged(false);
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

  const surprisePopulate = () => {
    // choose random predefined room contraints
    setData(surprisePopulateOptions[Math.floor(Math.random() * surprisePopulateOptions.length)])    
    setChanged(true);
  }

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
          <Accordion expanded={roomsExpanded}>
            <AccordionSummary
              sx={{p: 0, padding: "0px 10px 0px"}}
              expandIcon={<ExpandMoreIcon onClick={() => setRoomsExpanded(!roomsExpanded)}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{fontWeight: 'bold', whiteSpace: "nowrap", paddingTop: "6px", mr: "30px"}}>Add rooms</Typography>
                              
              <Button 
                sx={{
                  minWidth: "105px",

                  alignItems: 'center',
                  backgroundColor: 'rgba(225,225,225,255)',
                }}
              >
                <Typography 
                  sx={{
                    fontWeight: 'bold', 
                    fontSize : "14px", 
                    whiteSpace: "nowrap"
                  }}
                  onClick={surprisePopulate} 
                  variant="body1"
                >
                  Surprise me
                </Typography>
              </Button>

              {changed && <>
                <IconButton sx={{pt: '2px', ml: '20px'}}>
                  <InfoOutlinedIcon fontSize="small"/>
                </IconButton>
                <Typography color='#E57373' sx={{whiteSpace: "nowrap", paddingTop: "6px"}}>
                  Unsaved Changes
                </Typography>
              </>}
              <Box
                sx={{width: '100%'}}>
                {changed && <Button align="right"
                                    variant="text"
                                    onClick={save}>SAVE</Button>}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{p: 0}}>
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
              <TabContext sx={{ width: '100%' }} value={landTab.toString()}>
                <Box
                  sx={{ pl:1.1,
                    marginBottom: '10px' }}>
                  <TabList onChange={(event, tab) => setLandTab(tab)} aria-label="basic tabs example">
                    <Tab label="Land" value="0"/>
                    <Tab label="Envelope" value="1"/>
                  </TabList>
                </Box>
                <TabPanel value="0">
                  <MapLandWithNoSSR
                    mapUpdate={mapUpdate}
                    setMapUpdate={setMapUpdate}
                    projectId={projectId}/>
                </TabPanel>
                <TabPanel value="1">
                  <MapEnvelopeWithNoSSR
                    mapUpdate={mapUpdate}
                    setMapUpdate={setMapUpdate}
                    projectId={projectId}/>
                </TabPanel>
              </TabContext>
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
    </>
  );
})

export default withAuthGuard(Constraints);