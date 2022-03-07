import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
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
import { withWorkspaceLayout } from '../../../hocs/with-workspace-layout';
import { useMounted } from '../../../hooks/use-mounted';
import { gtm } from '../../../lib/gtm';
import Paper from '@mui/material/Paper';
import BottomNav from "../../../components/workspace/variant/variant-bottomNav";
import axios from 'axios';
import { withRouter } from 'next/router';
import CommentList from '../../../components/commentList/commentList';
import {InvitedUserModal} from "../../../components/workspace/invitedUserModal/invitedUserModal"
import Legends from "../../../components/workspace/variant/variant-legends";
import AssetsGrid from '../../../components/workspace/assets-grid';


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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }  

const InvitedUSerPage = withRouter((props) => {
  const isMounted = useMounted();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const designId = props.router.query.designId;
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });
  const [variantData, setVariantData] = useState();  
  const [error, setError] = useState({
    status: false,
    message: undefined,
  });  
  const limnu_token = localStorage.getItem("limnu_token");

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    axios.get(`/api/projects/_/design/${designId}`)
    .then(res => setVariantData(res.data.data))
    .catch(error => setError({
      status: true,
      message : "OOPS! This design is not available or deleted by owner of the project!"}));
  }, [designId]);


  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

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
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          // m: -1.5,
          p: 3
        }}
      >
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          width: '100%'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '30px' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="Design" {...a11yProps(0)} style={{fontSize: '1.5rem'}} />
            <Tab label="Assets" {...a11yProps(1)} style={{fontSize: '1.5rem'}} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        { error.status ? 
          <Grid container style={{width:'100%', marginLeft:0}}
          spacing={3}
          >
            <Typography style={{fontSize:20, textAlign:"center", width:'100%', paddingTop:100}}>
              {error.message}
            </Typography> 
          </Grid>:
          <Grid container 
          spacing={2}
          style={{width: "100%"}}>
            <Grid item 
            xs={12}>
              <Container maxWidth="xl"> 
                <Box fullWidth
                sx={{
                  // maxWidth: 1260,
                  maxWidth: '100%',
                  mx: 'auto',
                  height: '600px'
                }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: '100%',
                      '& img': {
                        height: 'auto',
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%'
                      }
                    }}
                  >
                    {variantData && variantData.limnu_boardUrl ? 
                      <iframe src={`${variantData.limnu_boardUrl}t=${limnu_token}&video=0`} title="description" 
                        style={{width: '100%', height: '100%'}}
                      ></iframe>
                      :  
                      <img
                        alt=""
                        src={variantData && variantData.url}
                    />}
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
            </Grid>

            {/* <Grid item 
            xs={4}
            style={{maxHeight: '600px', overflow: 'auto', display:'inline-flex', flexFlow:'column-reverse'}}
            >
              <Box>
                {
                  variantData.comments && variantData.comments.map(comment => <CommentList key={comment.id} comment={comment}/> )
                }
              </Box>
            </Grid> */}
          </Grid>}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AssetsGrid projectId= {props.router.query.projectId}/>
        </TabPanel>

        <Paper 
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
        style={{display: 'flex'}} 
        elevation={3}>
          <BottomNav/>
          {/* <Legends/> */}
        </Paper>
        <InvitedUserModal variantData={variantData}/>
      </Box>
    </>
  );
})

export default withWorkspaceLayout(InvitedUSerPage);
