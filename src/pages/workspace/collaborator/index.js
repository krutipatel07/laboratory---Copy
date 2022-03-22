import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Chip,
  Typography } from '@mui/material';
import { withWorkspaceLayout } from '../../../hocs/with-workspace-layout';
import { useMounted } from '../../../hooks/use-mounted';
import { gtm } from '../../../lib/gtm';
import Paper from '@mui/material/Paper';
import BottomNav from "../../../components/workspace/variant/variant-bottomNav";
import axios from 'axios';
import { withRouter } from 'next/router';
import { Logo } from '../../../components/logo';
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
  const {designId, projectId, invite, isVersion} = props.router.query;
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
  const [versions, setVersions] = useState();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(async () => {
    await axios.get(`/api/projects/${projectId}/design/${designId}`)
    .then(res => {
      setVariantData(res.data.data)
      setVersions(res.data.data.versions)
    })
    .catch(error => setError({
      status: true,
      message : "OOPS! This design is not available or deleted by owner of the project!"}));

    isVersion && getParentDesignVersions()

  },[designId]);


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

  const getParentDesignVersions = () =>{
    axios.get(`/api/projects/${projectId}/design/${designId}`)
    .then(res => {
      const designId = res.data.data.versionOf._id;
      axios.get(`/api/projects/${projectId}/design/${designId}`)
      .then(res => setVersions(res.data.data.versions))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  return (
    <>
      <Head>
        <title>
          Variant | Maket Colaboratory
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1
        }}
      > 
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: 'rgba(255, 255, 255)',
            // m: -1.5,
            m: 0,
            p: 0
          }}
        >
          <Box sx={{px:2, pt: 1}}> 
            <Tabs> 
              <Tab label={variantData && variantData.title} disabled />
            </Tabs> 
          </Box>
        </Box>
        <Grid container 
        spacing={2} 
        style={{width: "100%", marginLeft: 0}}>
          <Grid item 
          xs={12} style={{display: 'inline-flex', paddingLeft: 0}}>
            <Container maxWidth="xl"> 
              <Box fullWidth
              sx={{
                // maxWidth: 1260,
                maxWidth: '100%',
                mx: 'auto',
                height: '550px'
              }}>
                { error.status ? 
                <Grid container style={{width:'100%', marginLeft:0}}
                spacing={3}
                >
                  <Typography style={{fontSize:20, textAlign:"center", width:'100%', paddingTop:100}}>
                    {error.message}
                  </Typography> 
                </Grid> :
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
                  />
                  }
                </Box>}
              </Box>
            </Container>
          </Grid>

          <Paper 
            style={{ display: 'inline-flex', bottom: 0, width: '100%', paddingLeft:12}} 
            elevation={3}>
            <Box >
            { variantData && variantData.versionOf ?
              <NextLink
                href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${variantData.versionOf._id}` :`/workspace/${projectId}?designId=${variantData.versionOf._id}`}
                passHref
              >
                <Chip 
                  label="Default" 
                  variant="outlined" 
                  sx={{borderWidth: '2px', m: 1}}
                />
              </NextLink> : <Chip 
                  label="Default" 
                  color="primary" 
                  sx={{borderWidth: '2px', m: 1}}
                />
            }
            {
              versions && variantData &&  versions.map(version =>
                version.title === variantData.title ? 
                <Chip 
                  label={`${version.title}`} 
                  color = "primary"
                  sx={{borderWidth: '2px', m: 1}}
                /> : 
                <NextLink 
                href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${version._id}&isVersion=true` :`/workspace/${projectId}?designId=${version._id}&isVersion=true`}    
                passHref
                key = { version._id}
                >
                  <Chip 
                    label={`${version.title}`} 
                    variant="outlined" 
                    sx={{borderWidth: '2px', m: 1}}
                  />
                </NextLink>
                )
            }
          </Box>
          </Paper>
        </Grid>        
        <InvitedUserModal variantData={variantData}/>
      </Box>
    </>
  );
})

export default withWorkspaceLayout(InvitedUSerPage);
