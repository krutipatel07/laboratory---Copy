import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack ,
  Tab,
  Tabs,
  IconButton,
  Typography } from '@mui/material';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { withWorkspaceLayout } from '../../hocs/with-workspace-layout';
import { useMounted } from '../../hooks/use-mounted';
import { gtm } from '../../lib/gtm';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { withRouter } from 'next/router';
import { withDashboardLayout } from '../../hocs/with-dashboard-layout';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useDropzone } from 'react-dropzone';
import dateFormat from "../../utils/dateFormat"
import toast from 'react-hot-toast';



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
  const [versions, setVersions] = useState();

  const [error, setError] = useState({
    status: false,
    message: undefined,
  });  
  const {designId, projectId, invite, isVersion} = props.router.query;
  const limnu_token = localStorage.getItem("limnu_token");

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

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);
    
  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0])
    formData.append('upload_preset', 'maket_design');

    const url = "https://api.cloudinary.com/v1_1/maket/image/upload";
    fetch(url, {
      method: "POST",
      body: formData
    }).then(res => res.json())
    .then(res =>{
      if(res.error) {
        toast.error(res.error.message)
        return
      }
      importDesign(res.secure_url);
    }).catch(err => console.log(err))
}, [])
const {getRootProps, getInputProps} = useDropzone({onDrop})

const importDesign = async (secure_url) => {
  const time = dateFormat(new Date());
  const title = time.replaceAll(" ", "").replaceAll(",", "").replaceAll("pm", "").replaceAll("at", "").replaceAll("th", "");
  const {data} = await axios.get(`/api/projects/${projectId}/design/${designId}`);
  const versionLength = data.data.versionOf ? data.data.versionOf.versions.length : data.data.versions.length;
  const versionOf = data.data.versionOf ? data.data.versionOf.id : designId;

  const limnu_boardCreate = await axios.post("https://api.apix.limnu.com/v1/boardCreate?whiteLable=true", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardName: `Board-${title}`
  })
  .catch(error => console.log(error));
  
  await axios.post("https://api.apix.limnu.com/v1/boardImageURLUpload", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardId: limnu_boardCreate.data.boardId,
    imageURL: secure_url
    })
    .catch(error => console.log(error));

  const addVariant = await axios.post(`/api/projects/${projectId}/design`, {
    title : `Variant ${versionLength+1}`,
    versionOf : versionOf,
    url: secure_url,
    limnu_boardUrl : limnu_boardCreate.data.boardUrl,
  });

  addVariant ? toast.success('Variant design added!') : toast.error('Something went wrong!');
  location.reload();
};

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
        <Box sx={{px:2}}>  
          <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            <NextLink
                href={`/workspace?id=${projectId}`}
                passHref
              ><Tab label="Generate" style={{marginRight: '10px'}}/>
            </NextLink>
            <NextLink
              href={`/workspace?id=${projectId}`}
              passHref
            >
              <Tab label="Designs" style={{marginRight: '10px'}} />
            </NextLink>
            <IconButton style={{margingTop: '10px', display:'block'}}>
              <ArrowForwardIosOutlinedIcon style={{ paddingTop:'12px'}}/>
            </IconButton>
            
            <Tab label={variantData && variantData.title} disabled />
          </Tabs>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: 'rgba(255, 255, 255)',
          // pb: 8
        }}
      >
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
                height: '500px'
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
                  {variantData.limnu_boardUrl ? 
                    <iframe src={`${variantData.limnu_boardUrl}t=${limnu_token}&video=0`} title="description" 
                      style={{width: '100%', height: '100%'}}
                    ></iframe>
                    :  
                    <img
                      alt=""
                      src={variantData.url}
                  />}
                </Box>}
              </Box>
            </Container>
          </Grid>

          <Paper 
            sx={{ width: '100%', height: '100%', padding: 3}} 
            style={{display: 'flex'}} 
            elevation={3}>
            { isVersion && variantData && variantData.versionOf &&
              <NextLink
                href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${variantData.versionOf._id}` :`/workspace/${projectId}?designId=${variantData.versionOf._id}`}
                passHref
              >
                <Chip 
                  label="Default" 
                  variant="outlined" 
                  sx={{borderWidth: '2px', m: 1}}
                />
              </NextLink>
            }
            {
              versions && versions.map(version =>
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: 2,
                cursor: 'pointer'
              }}
            >
              <Stack spacing={2} 
              direction="row">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <AddIcon></AddIcon>
                </div>
              </Stack>
            </Box>
          </Paper>
        </Grid>        
      </Box>
    </>
  );
})

export default withAuthGuard(withDashboardLayout(withWorkspaceLayout(ProductList)));
