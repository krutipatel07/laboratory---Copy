import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import { Box, Button, TextField, Container, Typography, IconButton } from '@mui/material';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { withWorkspaceLayout } from '../../hocs/with-workspace-layout';
import { useMounted } from '../../hooks/use-mounted';
import { gtm } from '../../lib/gtm';
import DesignGrid from './design-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { withRouter, useRouter } from 'next/router'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import axios from 'axios'
import toast from 'react-hot-toast';
import { style } from '@mui/system';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { createTheme } from "@material-ui/core/styles";
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


  function BasicSelect() {
    const [age, setAge] = React.useState("");
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Room type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>bedroom</MenuItem>
          <MenuItem value={2}>bathroom</MenuItem>
          <MenuItem value={3}>garage</MenuItem>
          <MenuItem value={4}>kitchen</MenuItem>
          <MenuItem value={5}>living room</MenuItem>
        </Select>
      </FormControl>
    );
  }
  
  function createData(type, x, y) {
    return { type, x, y };
  }
  
  const rows = [
    createData("Bedroom", 15, 15),
    createData("Kitchen", 12, 10),
  ];
  

const GenerateDesignTab = withRouter((props) => {
  const [state, setState] = useState({
    select: "",
    Xvalue: "",
    Yvalue: "",
  });
  const [data, setData] = useState([])
  const classes = useStyles();

  const isMounted = useMounted();
  const [products, setProducts] = useState([]);
  const [generatedData, setGeneratedData] = useState([]);

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
  };

  const save = () =>{
    console.log("data", data)
  }

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
          <Typography>Rooms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2} direction="row">
            {/* <BasicSelect /> */}
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
            >
              Add
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
                    // style={{backgroundColor:'red'}}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        inputProps={{
                           // 'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    
                    <TableCell component="th" scope="row"><Typography style={{color:(row.select) === 'Bathroom' && 'green',}}>{row.select}</Typography></TableCell> 
                    <TableCell align="right">{row.Xvalue}</TableCell>
                    <TableCell align="right">{row.Yvalue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
      
          <Button variant="text" onClick={save}>save</Button>
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
      <Button variant="contained">generate designs</Button>
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
