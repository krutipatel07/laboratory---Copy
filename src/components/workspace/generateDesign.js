import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Container, Typography, IconButton, Modal } from '@mui/material';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { useMounted } from '../../hooks/use-mounted';
import DesignGrid from './design-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { withRouter, useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/styles';
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
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import dynamic from "next/dynamic";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdjacencyModal from '../modal/roomAdjacency-modal'
import CheckIcon from '@mui/icons-material/Check';

const useStyles = makeStyles({
  MuiInputBase: {
    styleOverrides: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: '#EA0707DE'
        }
      }
    }
  },
  generatebutton: {
    '&:hover': {
      backgroundColor: '#D8AC6E',
      color: 'white',
    },
  },
});
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

const GenerateDesignTab = withRouter((props) => {

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
    adjacencies:[]
  });
  const a = {Bedroom: 'red', Bathroom : 'green'}
  const [data, setData] = useState([])
  const classes = useStyles();
  const router = useRouter();
  const [selected, setSelected] = React.useState([]);

  const isMounted = useMounted();
  const [generatedData, setGeneratedData] = useState([]);
  const projectId = router.query.id || router.query.projectId;
  const [update, setUpdate] = useState(true);
  const [mapUpdate, setMapUpdate] = useState(true)
  const [changed, setChanged] = useState(false);
  const [selectedrows, setSelectedRows] = useState([]);
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [roomId, setRoomId] = useState()
  const [open, setOpen] = React.useState(false);
  const setValue= props.setValue
  
  const row_color_scheme ={
    Bedroom: {
      color: '#2E7D32',
      backgroundColor: '#bff2c2'},
    Bathroom : {
      color: '#0288D1',
      backgroundColor: '#abe0fd'},
    Kitchen: {
      color: '#AB47BC',
      backgroundColor: '#e7bbef'},
    Garage: {
      color: '#000000DE',
      backgroundColor: 'rgb(157 154 154 / 87%)'},
    Living_Room: {
      color: '#F57C00',
      backgroundColor: '#ffddba'},
    Dining_Room :{
      color: '#D32F2F',
      backgroundColor: '#ffb5b5'},
    "Living Room": {
          color: '#F57C00',
          backgroundColor: '#ffddba'},
    "Dining Room" :{
        color: '#D32F2F',
        backgroundColor: '#ffb5b5'}
  }

  const handleClose = () => {
    setOpen(false);
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
  //   const layers = JSON.parse(localStorage.getItem('layers'))
  //   const layersEnvelope = JSON.parse(localStorage.getItem('layersEnvelope'))

  //   let lat_lngs_array_land = []
  //   layers.lat_lngs.forEach(coordinate => {
  //     lat_lngs_array_land.push([coordinate.lat, coordinate.lng])
  //   })

  //   let lat_lngs_array_envelope = []
  //   layersEnvelope.lat_lngs.forEach(coordinate => {
  //     lat_lngs_array_envelope.push([coordinate.lat, coordinate.lng])
  //   })

  //   let rooms = {}
  //   data.forEach((room, i) => {
  //     rooms[`room${i+1}`] = {
  //         "type": room.select,
  //         "type_floor": room.selectFloor,
  //         "x_feet": room.Xvalue,
  //         "y_feet": room.Yvalue,
  //         "coordinates": null
  //       }
  //   })

    const designs = await axios.post(`/api/generate-design`, 
                    {
                      "userData": {
                          "userID": userId,
                          "constraints": {
                              "1": constraints_floor_1,
                              "2":{}
                            }
                          }
                      }
                  )
                  .catch(error => console.log(error));
                  
    if(!designs.data.data.designs || !designs.data.data.designs.length) {
      toast.error("Designs not found! Try using different values.")
      setButtonText(true)
      return
    }
    localStorage.setItem("parameter", JSON.stringify(designs.data.data.designs))
    setButtonText(true)
    setValue(1)
    // console.log(layers, layersEnvelope, data );
    // const { squarefeet, bed, bath, garages } = state
    // const {data} = await axios.get(`/api/parameters?baths=${bath}&beds=${bed}&garages=${garages}&sqft=${squarefeet}`)
    // .catch(error => console.log(error));
    // if(!data.data.length) {
    //   toast.error("Designs not found! Try using different values.")
    //   return
    // }
    // setGeneratedData(data.data);
    // setState({
    //   squarefeet: "",
    //   bed: "",
    //   bath: "",
    //   garages: ""
    // })
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDeleteCheckbox = (event, id) => {
    // filter rooms to delete from database according to checkbox state
    if (event.target.checked) {
      const ifIncluded = selectedrows.includes(id)
      if (!ifIncluded) {
        setSelectedRows(prev=> [...prev, id])
      }
      setCheckboxClicked(true)
      return;
    }
    const ifIncluded = selectedrows.includes(id)
    if (ifIncluded) {
      const filteredRows = selectedrows.filter(row => row !== id)
      setSelectedRows(filteredRows)
    }
    // setCheckboxClicked(false)
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

  const handleClick = async (e) => {

    //check repetative room name
    const repeatName = data.filter(rooms=>rooms.Rname === state.Rname)
    if(repeatName.length){
      toast.error("Room name must be unique")
      return
    }
    console.log(data)

    // add new room details
    setData(prev => [...prev, {
      select: state.select,
      Rname: state.Rname,
      selectFloor: state.selectFloor,
      Xvalue: state.Xvalue,
      Yvalue: state.Yvalue,
      adjacencies: [],
      id: Date.now(),
    }]) 
    // reset input textfields
    setState({
      select: "",
      Rname: "",
      selectFloor: "",
      Xvalue: "",
      Yvalue: "",
    })
    setChanged(true)
  };

  const save = async () =>{
    // update project database with new search parameter using project id
    const search_parameters_added = await axios.put(`/api/projects/${projectId}`, {
      search_parameters: data
    })
    .catch(error => console.log(error));
    
    setData([])
    setSelectedRows([])
    
    search_parameters_added ? toast.success('Parameters saved successfully') : toast.error('Something went wrong!');
    search_parameters_added && setUpdate((prev) => !prev) 
    setChanged(false)
    
  }

  const handleEdit = async () => {
    setOpen(true)
  }
  useEffect(() => {
    // remove parameters from localStorage
    localStorage.removeItem('parameter');
  },[])
  
  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
    .then(res =>   {
      const search_parameters = res.data.data.search_parameters;
      // fetch existing parameters form a project
      search_parameters.forEach((item) => 
        setData(prev => [...prev, {
          select: item.select,
          Rname: item.Rname,
          selectFloor: item.selectFloor,
          Xvalue: item.Xvalue,
          Yvalue: item.Yvalue,
          adjacencies: item.adjacencies,
          id: item.id
        }]))
      }
     )
    .catch(error => console.log(error));
  },[projectId, update]);

  return (
    <>
      <Box component="form"
        method="POST"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          // p: 3,
          // px:2,
          mt: '-30px'
        }}
        // style={{marginTop:'-64px'}}
      >

    <div align="right" 
    style={{width:'100%'}}>
      <Accordion>
        <AccordionSummary
          sx={{p:0}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography 
        sx={{  marginRight : 1}}>Rooms</Typography>

        {/* display warning of unsaved changes*/}
        {changed && <><IconButton 
        sx={{pt:'2px'}}><InfoOutlinedIcon fontSize="small" /></IconButton>  <Typography color='#E57373'>Unsaved Changes</Typography></>   }

        </AccordionSummary>
        <AccordionDetails 
        sx={{p:0}}>
          
          <Stack spacing={2} 
          direction="row" 
          sx={{mb:1.5}}>
            {/* <form 
            onSubmit={handleClick}
            > */}
              <FormControl 
              fullWidth
              sx={{width:'50% '}}>
                <InputLabel id="demo-simple-select-label">Room type</InputLabel>
                <Select
                  // required
                  labelId="demo-simple-select-label"
                  id="select"
                  name="select"
                  value={state.select}
                  label="room"
                  onChange={handleChange}
                >
                  <MenuItem value="Bedroom">Bedroom</MenuItem>
                  <MenuItem value="Bathroom">Bathroom</MenuItem>
                  <MenuItem value="Garage">Garage</MenuItem>
                  <MenuItem value="Kitchen">Kitchen</MenuItem>
                  <MenuItem value="Living_Room">Living Room</MenuItem>
                  <MenuItem value="Dining_Room">Dining Room</MenuItem>
                </Select>
              </FormControl>
              <Box component="form"
                sx={{
                  // '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField 
                  id="Rname" 
                  name="Rname" 
                  value={state.Rname} 
                  label="Name" 
                  variant="outlined" 
                  onChange={handleChange}
                />
              </Box>
              <FormControl 
              sx={{width:'30%'}}>
                <InputLabel id="demo-simple-select-label">Floor</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="select"
                  name="selectFloor"
                  value={state.selectFloor}
                  label="floor"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </Select>
              </FormControl>
              <TextField id="Xvalue" 
              name="Xvalue" value={state.Xvalue}  label="X" variant="outlined" onChange={handleChange}/>
              <TextField id="Yvalue" 
              name="Yvalue"  value={state.Yvalue} label="Y" variant="outlined" onChange={handleChange}/>
              
              <Button 
              variant="text"
              onClick={handleClick}
              sx={{color:'#1976D2'}}
              // type='submit'
              disabled={checkboxClicked && selectedrows.length}
              >
                ADD
              </Button> 
            {/* </form> */}
          </Stack>

          <TableContainer component={Paper}>
            <Table 
            sx={{ minWidth: 650 }} 
            size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell ></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">X&nbsp;(feet)</TableCell>
                  <TableCell align="right">Y&nbsp;(feet)</TableCell>
                  <TableCell align="right">Floor</TableCell>
                  <TableCell align="right">Adjacencies</TableCell>
                </TableRow>
              </TableHead>
              {/* List of data table entered by user */}
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:`{data.select === 'Bathroom' && 'green'}`,
                    }}
                    options= {{selection:true}}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleDeleteCheckbox(event, row.id)}
                        color="primary"
                        inputProps={{
                           'aria-labelledby': row.id,
                        }}
                      />
                    </TableCell>

                    <TableCell component="th" 
                    scope="row">
                        <Typography 
                        style={{
                          color: row_color_scheme[row.select].color
                        }}>
                          {row.Rname}
                          </Typography> 
                    </TableCell> 
                    <TableCell align="right"><Chip label={row.Xvalue} 
                    size="small" variant="filled" 
                    style={{color:row_color_scheme[row.select].color, backgroundColor:row_color_scheme[row.select].backgroundColor}}></Chip></TableCell>
                    <TableCell align="right"><Chip label={row.Yvalue} 
                    size="small" variant="filled" 
                    style={{color:row_color_scheme[row.select].color, backgroundColor:row_color_scheme[row.select].backgroundColor}}></Chip></TableCell>
                    <TableCell align="right"><Typography>{row.selectFloor}</Typography></TableCell>
                    <TableCell align="right">
                      <Chip label="edit/set" 
                      onClick={() => {
                        setRoomId(row.id)
                        setOpen(true);
                      }} />
                      {/* <CheckIcon fontSize="small" sx={{pt:'2px', ml:"7px"}}/> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box 
            sx={style}>
              <AdjacencyModal setOpen={setOpen} 
              roomId={roomId} data={data} setData={setData} setChanged={setChanged}/>
            </Box>
          </Modal>

          <Box 
          sx={{display:'flex', justifyContent:'space-between'}}>

            {/* {saved ? <Button variant="text" sx={{color:'#C62828'}} 
            onClick={deleteBulkSelection} 
            >DELETE SELECTED ROOMS</Button> :<Typography></Typography> } */}

            {checkboxClicked && selectedrows.length && !changed ? <Button variant="text" 
            sx={{color:'#C62828'}} 
              onClick={deleteBulkSelection} 
              >DELETE SELECTED ROOMS</Button>: <Typography></Typography> }

            {changed && <Button variant="text" 
            onClick={save}>SAVE</Button>}
          </Box>
          
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{p:0}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Land</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MapLandWithNoSSR mapUpdate={mapUpdate} 
          setMapUpdate={setMapUpdate} projectId={projectId}/>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{p:0}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Envelope</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MapEnvelopeWithNoSSR mapUpdate={mapUpdate} 
          setMapUpdate={setMapUpdate} projectId={projectId}/>
        </AccordionDetails>
      </Accordion>
      <Button variant="contained" 
      sx={{mt:3}} 
      onClick={handleSubmit}>{buttonText ? "GENERATE DESIGNS" : "Generating..."}</Button>
    </div>

      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mb: 8, mt:4
        }}
      >
        <Container maxWidth="xl">  
            {generatedData.length ? 
            <DesignGrid data={generatedData} 
            setNewDesign={props.setNewDesign}/> 
            : 
            <Typography 
            sx={{textAlign:'center', fontSize:'20px', paddingTop:'100px'}}>Set your design constraints to begin</Typography> }
        </Container>
      </Box>
    </>
  );
})

export default withAuthGuard(GenerateDesignTab);