import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography } from '@mui/material';
import { productApi } from '../../__fake-api__/product-api';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { withWorkspaceLayout } from '../../hocs/with-workspace-layout';
import { useMounted } from '../../hooks/use-mounted';
import { Plus as PlusIcon } from '../../icons/plus';
import { gtm } from '../../lib/gtm';
import DesignGrid from '../../components/workspace/design-grid.js';
import { OverviewBanner } from '../../components/dashboard/overview/overview-banner';
import { Search as SearchIcon } from '../../icons/search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SettingsSystemDaydreamRounded } from '@mui/icons-material';
import { withRouter, useRouter } from 'next/router'

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
    floor: " ",
    budget: " ",
    bed: " ",
    bath: " "
  });

  const isMounted = useMounted();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });

  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProducts = useCallback(async () => {
    try {
      const data = await productApi.getProducts();

      if (isMounted()) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getProducts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    window.localStorage.setItem("saved_data", JSON.stringify(state))
    let  savedItem = JSON.parse(localStorage.getItem("saved_data"));
    const { floor, budget, bed, bath } = state
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Workspace | Maket Colaboratory
        </title>
      </Head>
      <Box component="form"
        method="POST"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1.5,
          p: 3
        }}
      >
        <Box
          component="form"
          //onSubmit={handleQueryChange}
          sx={{
            flexGrow: 1,
            m: 1.5
          }}
        >
          <NextLink
            href="/dashboard/projects"
            passHref
          >
            <Button
              sx={{ m: 1.5 }}
              component="a"
              variant="text"
            >
              back
            </Button>
          </NextLink>
          <TextField
            defaultValue=""
            width="50%"
            //inputProps={{ ref: queryRef }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            placeholder="Search designs by name"
          />
        </Box>
        <Box
          component="form"
          sx={{
            flexGrow: 1,
            m: 1.5
          }}
        >
          <TextField
            defaultValue="$500,000"
            width="50%"
            placeholder="Budget"
            type="number"
            name="budget"
            value={state.budget}
            onChange={handleChange}
          />
        </Box>

        <Box 
        component="form"
          sx={{flexGrow: 1, m: 1.5 }}>
          <FormControl fullWidth>
            <InputLabel id="floor_select_label">Floor</InputLabel>
            <Select
              labelId="floor_select_label"
              id="floor_select"
              name='floor'
              value={state.floor}
              label="Floor"
              onChange={handleChange}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
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
            <InputLabel id="bed_select_label">Bed</InputLabel>
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
            <InputLabel id="bath_select_label">Bath</InputLabel>
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
          <TextField
            width="50%"
            placeholder="Adjacencies"
          />
        </Box>
        <Box
        >
          <Button
            component="a"
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            // value={state}
          >
            Generate
          </Button>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              {displayBanner && (
              <Grid
                item
                xs={12}
              >
                <OverviewBanner
                onDismiss={handleDismissBanner}
                title="Welcome to your Workspace!"
                blurb="This is where you will work together with your collaborators to bring your designs to life."
                />
              </Grid>
              )}
              <Grid item>
                <Typography variant="h4">
                  Designs
                </Typography>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
          <DesignGrid projectId= {props.router.query.id} />
        </Container>
      </Box>
    </>
  );
})

export default withAuthGuard(withWorkspaceLayout(ProductList));
