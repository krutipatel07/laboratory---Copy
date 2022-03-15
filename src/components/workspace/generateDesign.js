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
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/styles';


const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "pink"
        },
        "& .MuiSelect-root ~ $notchedOutline": {
          borderColor: "green"
        },
      }
    },
    'input': {
      '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: '#EA0707DE'
      }
    },
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
  }
});

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

const applyFilters = (products, filters) => products.filter((product) => {
  if (filters.name) {
    const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase());

    if (!nameMatched) {
      return false;
    }
  }

  // It is possible to select multiple category options
  if (filters.category?.length > 0) {
    const categoryMatched = filters.category.includes(product.category);

    if (!categoryMatched) {
      return false;
    }
  }

  // It is possible to select multiple status options
  if (filters.status?.length > 0) {
    const statusMatched = filters.status.includes(product.status);

    if (!statusMatched) {
      return false;
    }
  }

  // Present only if filter required
  if (typeof filters.inStock !== 'undefined') {
    const stockMatched = product.inStock === filters.inStock;

    if (!stockMatched) {
      return false;
    }
  }

  return true;
});

const applyPagination = (products, page, rowsPerPage) => products.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const ProductList = withRouter((props) => {
  const [state, setState] = React.useState({
    squarefeet: "",
    bed: "",
    bath: "",
    garages: ""
  });
  const classes = useStyles();

  const isMounted = useMounted();
  const [products, setProducts] = useState([]);
  const [generatedData, setGeneratedData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

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

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);

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
        style={{marginTop:'-64px'}}
      >
      <ThemeProvider  theme={theme}>

        <Box
          component="form"
          sx={{
            flexGrow: 1,
            m:1.2
            // m: 1.5,
          }}
          style={{width: 55}}
        >
          <TextField
            defaultValue="$500,000"
            // placeholder="Square feet"
            label="Square feet"
            type="number"
            name="squarefeet"
            value={state.squarefeet}
            onChange={handleChange}
            style={{color: '#EA0707DE'}}
            inputProps={{ className: classes.input }}
            // InputProps={{ classes: {input: props.classes['input']} }} 
          />
        </Box>

        <Box
          component="form"
          sx={{
            flexGrow: 1,
            m: 1.5
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="bed_select_label" style={{color: '#2CA02C'}}>Bed</InputLabel>
            <Select
              labelId="bed_select_label"
              id="bed_select"
              name='bed'
              value={state.bed}
              label="Bed"
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          component="form"
          sx={{
            flexGrow: 1,
            m: 1.5
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="bath_select_label" style={{color: '#1F77B4', width: '300px'}}>            
            {/* <BathtubIcon/> */}
            Bath</InputLabel>
            <Select
              labelId="bath_select_label"
              id="bath_select"
              name='bath'
              value={state.bath}
              label="Bath"
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={1.5}>1.5</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={2.5}>2.5</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={3.5}>3.5</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={4.5}>4.5</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          component="form"
          sx={{
            flexGrow: 1,
            m: 1.5
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="garages_select_label" style={{color: '#8C564B'}}>Garages</InputLabel>
            <Select
              labelId="garages_select_label"
              id="garages_select"
              name='garages'
              value={state.garages}
              label="Garages"
              onChange={handleChange}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
        >
          <Button
            component="a"
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            className={classes.generatebutton}
          >
            GENERATE
          </Button>
        </Box>
        
      </ThemeProvider >
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
            <DesignGrid data={generatedData}/> 
            : 
            <Typography sx={{textAlign:'center', fontSize:'20px', paddingTop:'100px'}}>Set your design constraints to begin</Typography> }
        </Container>
      </Box>
    </>
  );
})

export default withAuthGuard(withWorkspaceLayout(ProductList));
