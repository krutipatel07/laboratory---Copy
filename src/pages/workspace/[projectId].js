import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box,
  Button,TextField,Toolbar,Container,Popover ,Grid,Stack ,IconButton,MenuItem,ListItemText,Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { gtm } from '../../lib/gtm';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { withRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {DashboardSidebar} from '../../components/dashboard/dashboard-sidebar';
import {WorkspaceNavbar} from '../../components/workspace/workspace-navbar'

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& .MuiOutlinedInput-root':{
      input: {
        "&:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px black inset"
        },}
      }
    },
    text: {
        padding: '6px 19px',
    }, 
    p: {
        fontWeight: 600,
        fontSize: '1.1rem'
    },
    button: {
      '&:hover': {
        backgroundColor: '#D8AC6E',
        color: 'white',
      },
      cursor: 'pointer'
    },
    name: {
      [theme.breakpoints.down("xs")]: {
        display: 'block',
      },
    },
    versionList: {
      [theme.breakpoints.down("xs")]: {
        left: 0,
      },
    },
    icon: {
      display:'block', 
      marginTop:'-29px',
      [theme.breakpoints.down("xs")]: {
        marginTop: '-15px',
      },
    }
  }));


const ProductList = withRouter((props) => {
  const router = useRouter();
  
  const [variantData, setVariantData] = useState([]);  
  const [versions, setVersions] = useState();

  const [error, setError] = useState({
    status: false,
    message: undefined,
  });  
  const {designId, projectId, invite, isVersion} = props.router.query;
  const limnu_token = localStorage.getItem("limnu_token");
  const [email, setEmail] = useState('');
  const [designData, setDesignData] = useState();
  const [collaboratorData, setCollaboratorData] = useState();   

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(async () => {
    // get design information
    await axios.get(`/api/projects/${projectId}/design/${designId}`)
    .then(res => {
      setVariantData(res.data.data)
      setVersions(res.data.data.versions)
    })
    // if design is not available, set error message
    .catch(error => setError({
      status: true,
      message : "OOPS! This design is not available or deleted by owner of the project!"}));
    // get parent design versions if design itself is a version
    isVersion && getParentDesignVersions()

  },[designId]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    axios.get(`/api/projects/_/design/${designId}`)
    .then(res => {
      setCollaboratorData([...new Set(res.data.data.collaborators)]);
      setDesignData(res.data.data)})
    .catch(error => console.log(error));
  }, [email]);

const addVariantDesign = async () => {
  const {data} = await axios.get(`/api/projects/${projectId}/design/${designId}`);
  const versionLength = data.data.versionOf ? data.data.versionOf.versions.length : data.data.versions.length;
  const versionOf = data.data.versionOf ? data.data.versionOf.id : designId;

  // create the limnu board and update its board image
  const limnu_boardCreate = await axios.post("https://api.apix.limnu.com/v1/boardCreate", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardName: `Board-${data.data._id}`,
    whiteLabel: true
  })
  .catch(error => console.log(error));
  
  await axios.post("https://api.apix.limnu.com/v1/boardImageURLUpload", {
    apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
    boardId: limnu_boardCreate.data.boardId,
    imageURL: data.data.url
    })
    .catch(error => console.log(error));

  const addVariant = await axios.post(`/api/projects/${projectId}/design`, {
    title : `Variant ${versionLength+1}`,
    versionOf : versionOf,
    url: data.data.url,
    limnu_boardUrl : limnu_boardCreate.data.boardUrl,
  });

  addVariant ? toast.success('Variant design added!') : toast.error('Something went wrong!');
  const returnUrl = `/workspace/${addVariant.data.data.project}?designId=${addVariant.data.data.id}&isVersion=true`
  router.push(returnUrl);
}

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

const handleSubmit = async event => {
  event.preventDefault();
  const designId = router.query.designId;
  // send email invite to the collaborator and update it in design database
  axios.post("/api/emails/invite", {
   email,
   projectId,
   designId
 })
 .catch(error => console.log(error));

 await axios.put(`/api/projects/${projectId}/design/${designId}`, {
  collaborators : email,
})
.catch(error => console.log(error));

 toast.success('Collaborator invited!');
 setEmail('');
}

const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const classes = useStyles();
const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.down('xs'));

return ( 
    <>
    {/* <ThemeProvider theme={theme}> */}
      <Head>
        <title>
          Variant | Maket Colaboratory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'rgba(255, 255, 255)',
          m: 0,
          p: 0,
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="xl" 
        style={{width:'100%'}}>
          <WorkspaceNavbar/>
          <Box sx={{display: 'flex'}} 
          className={classes.name}>
            <Box sx={{px:2, display: 'flex', pt: '12px'}}>  
                <NextLink
                  href={`/workspace?id=${projectId}`}
                  passHref
                >
                  <Typography 
                  style={{color:'rgba(0, 0, 0, 0.6)', cursor:'pointer'}}>Designs</Typography>
                </NextLink>

                <IconButton 
                className={classes.icon}>
                  <ArrowForwardIosOutlinedIcon 
                  style={{ paddingTop:'12px'}}/>
                </IconButton>
                
                <Typography disabled 
                style={{color:'rgba(0, 0, 0, 0.87)'}}>{variantData && variantData.title}</Typography>
            </Box>
        
            <Box 
            style={{display: 'block', marginLeft: 'auto'}}>
              <Button onClick={handleClick}>
                <IconButton><PersonAddAltIcon/></IconButton>
                COLLABORATORS 
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    p: 2,
                    display: 'flex',
                    fontSize: '14px'
                  }}
                >
                  <form onSubmit={handleSubmit} 
                  method={'post'} 
                  style={{display:"inline-flex", justifyContent:'space-between', width:'100%'}}>
                      <TextField label="Collaborator email" 
                      type="email" 
                      required 
                      value={email} 
                      onInput={ e=>setEmail(e.target.value)}/>
                      <Stack spacing={2} 
                      direction="row">
                          <Button 
                          type="submit" 
                          variant="contained" 
                          className={classes.button}
                          >Invite</Button>
                      </Stack>

                  </form>
                </Box>
                <Box sx={{ my: 1 }} 
                className={classes.text}>
                  <Typography 
                  className={classes.p}>
                      COLLABORATORS
                  </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                {designData? collaboratorData.length? collaboratorData.map((collaborator, i) => 
                    <MenuItem key={i} 
                    component="a">
                      <ListItemText
                        primary={(
                          <Typography 
                          variant="body1">
                            {collaborator}
                          </Typography>
                        )}
                      />
                    </MenuItem> 
                    // <Divider />
                    ): <Typography 
                    style={{paddingLeft: '20px'}}>Add collaborator</Typography>  : <Typography 
                    style={{paddingLeft: '20px'}}>loading...</Typography>}
                </Box>
              </Popover>
            </Box>
          </Box>
          <Box xs={12}>  
            <Container maxWidth="xl"> 
              <Box fullWidth
              sx={{
                // maxWidth: 1260,
                maxWidth: '100%',
                mx: 'auto',
                height: '550px',
              }}
              >
                { error.status ? 
                <Grid container 
                style={{width:'100%', marginLeft:0}}
                spacing={3}
                >
                  {/* if there is any error occur while fetching design data, display the error message*/}
                  <Typography 
                  style={{fontSize:20, textAlign:"center", width:'100%', paddingTop:100}}>
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
                  {/* display limnu board if available, else image only*/}
                  {variantData.limnu_boardUrl ? 
                    <iframe src={`${variantData.limnu_boardUrl}t=${limnu_token}&video=0`} 
                    title="description" 
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
          </Box>

          <Paper 
            style={{ display: 'inline-flex', bottom: 0, width: '100%', paddingLeft:12}} 
            elevation={3}>
            <Box >
              <Toolbar
              className={classes.versionList}
                disableGutters
                sx={{
                  minHeight: 64,
                  // left: 280,
                  px: 2
                }}
              >
              {/* display default/parent version */}
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
              </NextLink> :                
              <NextLink
                href={ invite ? `/workspace/collaborator?invite=true&projectId=${projectId}&designId=${designId}` :`/workspace/${projectId}?designId=${designId}`}
                passHref
              >
                <Chip 
                  label="Default" 
                  color="primary" 
                  sx={{borderWidth: '2px', m: 1}}
                />
              </NextLink>
            }
            {/* display all versions */}
            {
              versions && variantData && versions.map(version =>
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: 2,
                cursor: 'pointer'
              }}
              onClick={addVariantDesign}
            >
              <Stack spacing={2} 
              direction="row">
                <Typography sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}>
                  <AddIcon></AddIcon> Add Variant
                </Typography>
              </Stack>
            </Box>
              </Toolbar>
            </Box>
          </Paper>
        </Container>     
      </Box>
      {/* </ThemeProvider> */}
    </>
  );
})

// export default withAuthGuard(ProductList);
export default withAuthGuard(ProductList);
