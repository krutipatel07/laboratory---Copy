import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Container, Typography, IconButton, form } from '@mui/material';
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
  }
});

const GenerateDesignTab = withRouter((props) => {

  const MapLandWithNoSSR = dynamic(() => import("../mapLand"), {
    ssr: false
  });

  const MapEnvelopeWithNoSSR = dynamic(() => import("../mapEnvelope"), {
    ssr: false
  });

  const [state, setState] = useState({
    select: "",
    Xvalue: "",
    Yvalue: "",
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

  const handleChange = (event) => {
    const value = event.target.value;
    setState({ 
      ...state,
      [event.target.name]: value
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { squarefeet, bed, bath, garages } = state
    const {data} = await axios.get(`/api/parameters?baths=${bath}&beds=${bed}&garages=${garages}&sqft=${squarefeet}`)
    .catch(error => console.log(error));
    if(!data.data.length) {
      toast.error("Designs not found! Try using different values.")
      return
    }
    setGeneratedData(data.data);
    setState({
      squarefeet: "",
      bed: "",
      bath: "",
      garages: ""
    })
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
    if (event.target.checked.count < 0){
      setCheckboxClicked(false)
    }
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
    search_parameters_updated ? toast.success('Parameters deleted successfully') : toast.error('Something went wrong!');
    search_parameters_updated && setUpdate((prev) => !prev) 
  }

  const handleClick = async (e) => {

    setData(prev => [...prev, {
      select: state.select,
      Xvalue: state.Xvalue,
      Yvalue: state.Yvalue,
      id: Date.now(),
    }]) 
    setState({
      select: "",
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
  
  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
    .then(res =>   {
      const search_parameters = res.data.data.search_parameters;
      // fetch existing parameters form a project
      search_parameters.forEach((item) => 
        setData(prev => [...prev, {
          select: item.select,
          Xvalue: item.Xvalue,
          Yvalue: item.Yvalue,
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

    <div align="right" style={{width:'100%'}}>
      <Accordion>
        <AccordionSummary
          sx={{p:0}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography sx={{  marginRight : 1}}>Rooms</Typography>

        {/* display warning of unsaved changes*/}
        {changed && <><IconButton sx={{pt:'2px'}}><InfoOutlinedIcon fontSize="small" /></IconButton>  <Typography color='#E57373'>Unsaved Changes</Typography></>   }

        </AccordionSummary>
        <AccordionDetails sx={{p:0}}>
          
          <Stack spacing={2} direction="row" sx={{mb:1.5}}>
            {/* <form 
            onSubmit={handleClick}
            > */}
              <FormControl fullWidth>
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
                  <MenuItem value="Living Room">Living Room</MenuItem>
                  <MenuItem value="Dining Room">Dining Room</MenuItem>
                </Select>
              </FormControl>
              <TextField id="Xvalue" name="Xvalue" value={state.Xvalue}  label="X" variant="outlined" onChange={handleChange}/>
              <TextField id="Yvalue" name="Yvalue"  value={state.Yvalue} label="Y" variant="outlined" onChange={handleChange}/>
              
              <Button 
              variant="text"
              onClick={handleClick}
              sx={{color:'#1976D2'}}
              // type='submit'
              >
                ADD
              </Button> 
            {/* </form> */}
          </Stack>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell ></TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">X&nbsp;(feet)</TableCell>
                  <TableCell align="right">Y&nbsp;(feet)</TableCell>
                </TableRow>
              </TableHead>
              {/* List of data table entered by user */}
              <TableBody>
                {data.map((row) => (
                  
                  <TableRow
                    hover
                    onClick={(event) => handleDeleteCheckbox(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:`{data.select === 'Bathroom' && 'green'}`,
                    }}
                    options= {{selection:true}}
                    // onSelectionChange={(data)=>setSelectedRows(data)}
                    // style={{backgroundColor:'red'}}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        inputProps={{
                           'aria-labelledby': row.id,
                        }}
                      />
                    </TableCell>

                    {row.select === 'Bedroom' && 
                    <>
                      <TableCell component="th" scope="row">
                          <Typography 
                          style={{
                            color: '#2E7D32'
                            // color:(row.select) === 'Bedroom' && 'green' 
                          }}>{row.select}</Typography> 
                      </TableCell> 
                      <TableCell align="right"><Chip label={row.Xvalue} size="small" variant="filled" style={{color:'#2E7D32', backgroundColor:'#bff2c2'}}></Chip></TableCell>
                      <TableCell align="right"><Chip label={row.Yvalue} size="small" variant="filled" style={{color:'#2E7D32', backgroundColor:'#bff2c2'}}></Chip></TableCell>
                    </>
                    }

                    {row.select === 'Bathroom' && 
                    <>
                      <TableCell component="th" scope="row">
                          <Typography 
                          style={{
                            color: '#0288D1'
                          }}>{row.select}</Typography> 
                      </TableCell> 
                      <TableCell align="right"><Chip label={row.Xvalue} size="small" variant="filled" style={{color:'#0288D1', backgroundColor:'#abe0fd'}}></Chip></TableCell>
                      <TableCell align="right"><Chip label={row.Yvalue} size="small" variant="filled" style={{color:'#0288D1', backgroundColor:'#abe0fd'}}></Chip></TableCell>
                    </>
                    }       

                    {row.select === 'Kitchen' && 
                    <>
                      <TableCell component="th" scope="row">
                          <Typography 
                          style={{
                            color: '#AB47BC'
                          }}>{row.select}</Typography> 
                      </TableCell> 
                      <TableCell align="right"><Chip label={row.Xvalue} size="small" variant="filled" style={{color:'#AB47BC', backgroundColor:'#e7bbef'}}></Chip></TableCell>
                      <TableCell align="right"><Chip label={row.Yvalue} size="small" variant="filled" style={{color:'#AB47BC', backgroundColor:'#e7bbef'}}></Chip></TableCell>
                    </>
                    }     

                    {row.select === 'Living Room' && 
                    <>
                      <TableCell component="th" scope="row">
                          <Typography 
                          style={{
                            color: '#F57C00'
                          }}>{row.select}</Typography> 
                      </TableCell> 
                      <TableCell align="right"><Chip label={row.Xvalue} size="small" variant="filled" style={{color:'#F57C00', backgroundColor:'#ffddba'}}></Chip></TableCell>
                      <TableCell align="right"><Chip label={row.Yvalue} size="small" variant="filled" style={{color:'#F57C00', backgroundColor:'#ffddba'}}></Chip></TableCell>
                    </>
                    }      

                    {row.select === 'Dining Room' && 
                    <>
                      <TableCell component="th" scope="row">
                          <Typography 
                          style={{
                            color: '#D32F2F'
                          }}>{row.select}</Typography> 
                      </TableCell> 
                      <TableCell align="right"><Chip label={row.Xvalue} size="small" variant="filled" style={{color:'#D32F2F', backgroundColor:'#ffb5b5'}}></Chip></TableCell>
                      <TableCell align="right"><Chip label={row.Yvalue} size="small" variant="filled" style={{color:'#D32F2F', backgroundColor:'#ffb5b5'}}></Chip></TableCell>
                    </>
                    }      

                    {row.select === 'Garage' && 
                    <>
                      <TableCell component="th" scope="row">
                          <Typography 
                          style={{
                            color: '#000000DE'
                          }}>{row.select}</Typography> 
                      </TableCell> 
                      <TableCell align="right"><Chip label={row.Xvalue} size="small" variant="filled" style={{color:'#000000DE', backgroundColor:'rgb(157 154 154 / 87%)'}}></Chip></TableCell>
                      <TableCell align="right"><Chip label={row.Yvalue} size="small" variant="filled" style={{color:'#000000DE', backgroundColor:'rgb(157 154 154 / 87%)'}}></Chip></TableCell>
                    </>
                    }  
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

          <Box sx={{display:'flex', justifyContent:'space-between'}}>

            {/* {saved ? <Button variant="text" sx={{color:'#C62828'}} 
            onClick={deleteBulkSelection} 
            >DELETE SELECTED ROOMS</Button> :<Typography></Typography> } */}

            {checkboxClicked ? <Button variant="text" sx={{color:'#C62828'}} 
            onClick={deleteBulkSelection} 
            >DELETE SELECTED ROOMS</Button>: null }

            {changed && <Button variant="text" onClick={save}>SAVE</Button>}
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
          <MapLandWithNoSSR setMapUpdate={setMapUpdate}/>
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
          <MapEnvelopeWithNoSSR mapUpdate={mapUpdate}/>
        </AccordionDetails>
      </Accordion>
      <Button variant="contained" sx={{mt:3}}>GENERATE DESIGNS</Button>
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
            <DesignGrid data={generatedData} setNewDesign={props.setNewDesign}/> 
            : 
            <Typography sx={{textAlign:'center', fontSize:'20px', paddingTop:'100px'}}>Set your design constraints to begin</Typography> }
        </Container>
      </Box>
    </>
  );
})

export default withAuthGuard(GenerateDesignTab);
