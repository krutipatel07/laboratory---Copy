import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Container, Typography, IconButton } from '@mui/material';
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
  const [state, setState] = useState({
    select: "",
    Xvalue: "",
    Yvalue: "",
  });
  const a = {Bedroom: 'red', Bathroom : 'green'}
  const [data, setData] = useState([])
  const classes = useStyles();
  const router = useRouter();

  const isMounted = useMounted();
  const [generatedData, setGeneratedData] = useState([]);
  const projectId = router.query.id || router.query.projectId;
  const [update, setUpdate] = useState(true);
  const [changed, setChanged] = useState(false);
  const [selectedrows, setSelectedRows] = useState([]);

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
  
  const bulkSelection = (event) => {
    const ischecked = event.target.checked
    // const UpdatedData = state.data.filter(data=>selectedrows.includes(data))
    // setData(UpdatedData)
    // console.log("selected")

    let _data = [...data];
    rowData.forEach(rd => {
      _data = _data.filter(t => t.tableData.id !== rd.tableData.id);
    });
    setData(_data);
  }

  const handleClick = async (e) => {
    setData(prev => [...prev, {
      select: state.select,
      Xvalue: state.Xvalue,
      Yvalue: state.Yvalue,
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
          px:2,
          mt: '-30px'
        }}
        // style={{marginTop:'-64px'}}
      >

    <div align="right" style={{width:'100%'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography sx={{  marginRight : 1}}>Rooms</Typography>

        {changed && <><IconButton sx={{pt:'2px'}}><InfoOutlinedIcon fontSize="small" /></IconButton>  <Typography color='#E57373'>Unsaved Changes</Typography></>   }

        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2} direction="row">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Room type</InputLabel>
              <Select
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
              </Select>
            </FormControl>
            <TextField id="Xvalue" name="Xvalue" value={state.Xvalue}  label="X" variant="outlined" onChange={handleChange}/>
            <TextField id="Yvalue" name="Yvalue"  value={state.Yvalue} label="Y" variant="outlined" onChange={handleChange}/>
            <Button 
            variant="text"
            onClick={handleClick}
            sx={{color:'#1976D2'}}
            >
              ADD
            </Button>
          </Stack>
          {/* <UserInputTable /> */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      // checked={isItemSelected}
                      inputProps={{
                        // 'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">X&nbsp;(feet)</TableCell>
                  <TableCell align="right">Y&nbsp;(feet)</TableCell>
                </TableRow>
              </TableHead>
              {/* List of data table entered by user */}
              <TableBody>
                  {data.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:`{data.select === 'Bathroom' && 'green'}`,
                    }}
                    options= {{selection:true}}
                    onSelectionChange={(data)=>setSelectedRows(data)}
                    // style={{backgroundColor:'red'}}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        onChange={handleChange}
                        inputProps={{
                           // 'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    
                    <TableCell component="th" scope="row">
                      {row.select === 'Bedroom' && 
                        <Typography 
                        style={{
                          color: '#2E7D32'
                          // color:(row.select) === 'Bedroom' && 'green' 
                        }}>{row.select}</Typography>}

                      {row.select === 'Bathroom' && 
                        <Typography 
                        style={{
                          color: '#0288D1'
                        }}>{row.select}</Typography>}

                      {row.select === 'Kitchen' && 
                        <Typography 
                        style={{
                          color: '#AB47BC'
                        }}>{row.select}</Typography>}

                      {row.select === 'Living Room' && 
                        <Typography 
                        style={{
                          color: '#F57C00'
                        }}>{row.select}</Typography>}

                      {row.select === 'Dining Room' && 
                        <Typography 
                        style={{
                          color: '#D32F2F'
                        }}>{row.select}</Typography>}

                      {row.select === 'Garage' && 
                        <Typography 
                        style={{
                          color: '#000000DE'
                          // color:(row.select) === 'Bathroom' && 'green' 
                        }}>{row.select}</Typography>}
                    </TableCell> 
                    <TableCell align="right">{row.Xvalue}</TableCell>
                    <TableCell align="right">{row.Yvalue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Button variant="text" sx={{color:'#C62828'}} 
            onClick={bulkSelection} 
            >DELETE SELECTED ROOMS</Button>
            {changed && <Button variant="text" onClick={save}>SAVE</Button>}
          </Box>
          
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Land &amp; Envelope</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <iframe
            width="600"
            height="450"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCu3VUmZx4sLQINjDU4oMdN0cZqdnQewIo
    &q=Space+Needle,Seattle+WA"
          ></iframe>
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
