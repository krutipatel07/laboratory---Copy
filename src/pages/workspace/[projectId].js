import { useState, useEffect, useCallback } from 'react';
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
import Paper from '@mui/material/Paper';
import BottomNav from "../../components/workspace/variant/variant-bottomNav";
import axios from 'axios';
import { withRouter } from 'next/router'

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
  const [variantData, setVariantData] = useState([]);  

  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    const designId = props.router.query.designId;
    axios.get(`/api/projects/_/design/${designId}`)
    .then(res => setVariantData(res.data.data))
    .catch(error => console.log(error));
  }, []);

  variantData && console.log(variantData);

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

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Variant | Maket Colaboratory
        </title>
      </Head>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1.5,
          p: 3
        }}
      >
      <Box
        >
        <NextLink
        href="/workspace"
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
                title="Welcome to your design variant!"
                blurb="This is where you and your collaborators can comment on and discuss the specifics of each design option you create."
                />
              </Grid>
              )}
            </Grid>
          </Box>
          <Box
        sx={{
          maxWidth: 980,
          width: '100%',
          mx: 'auto'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(600 / 980 * 100%)',
            '& img': {
              height: 'auto',
              position: 'absolute',
              top: 0,
              width: '100%'
            }
          }}
        >
          <img
            alt=""
            src={"https://drummondhouseplans.com/assets/_entemp_/plan-house-3290-1st-level-500px-71387195.jpg"}
          />
        </Box>
      </Box>
          <Box
        sx={{
          maxWidth: 980,
          width: '100%',
          mx: 'auto'
        }}
      >
      </Box>
        </Container>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
        elevation={3}>
        <BottomNav/>
      </Paper>
      </Box>
    </>
  );
})

export default withAuthGuard(withWorkspaceLayout(ProductList));
