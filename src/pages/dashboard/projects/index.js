import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import ProjectGrid from '../../../components/dashboard/product/product-grid.js';
import DashboardModal from '../../../components/modal/dashboard-modal';
import CreateProjectModal from '../../../components/modal/createProject-modal'
import { useAuth } from '../../../hooks/use-auth';
import AddIcon from '@mui/icons-material/Add';
import {DashboardSidebar} from '../../../components/dashboard/dashboard-sidebar'

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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });
  const [userData, setUserData] = useState();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  // Added a new column in the User Model 
  // Called the User Model 
  // useEffect should update when true to be false only once > PUT 
  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    axios.get(`/api/user/${owner}`)
    .then(res => setUserData(res.data.data))
    .catch(error => console.log(error));
  },[]);

  useEffect(() => {
    const owner = localStorage.getItem("lab-user");
    if (owner && userData && userData.isFirstTime === true) {

      axios.put(`/api/user/${owner}`, {
        isFirstTime:false
      })
      .catch(error => console.log(error));
    } 
  }, [userData]);


  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);

  const handleClick = (e) =>{
    e.preventDefault();
    setModalShown(true);
    setOpen(true);
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Project List | Maket Colaboratory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
          height: '100%',
          display: 'flex'
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="xl" sx={{backgroundColor: "white"}}>
          <Box sx={{ mb: 4 , backgroundColor: "white"}}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4" style={{fontSize: '24px'}}>
                  Projects
                </Typography>
              </Grid>
              <Grid item>
                <NextLink href="/dashboard/projects/new" passHref>
                  <Button
                    component="a"
                    startIcon={<PlusIcon 
                    fontSize="small" />}
                  >
                    CREATE NEW PROJECT
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <ProjectGrid/>
          </Card>
        </Container>
      </Box>
      {
        userData && userData.isFirstTime ? 
        <DashboardModal/> : ''
      }
    </>
  );
};

export default withAuthGuard(ProductList);
