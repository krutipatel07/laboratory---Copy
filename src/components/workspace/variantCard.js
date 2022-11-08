import * as React from 'react';
import NextLink from 'next/link';
import axios from 'axios'
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useAuth } from "../../hooks/use-auth";
import EditIcon from '@mui/icons-material/Edit';
import { ListItemButton, ListItemIcon, ListItemText, Typography, Backdrop, Box, Paper, Popper, Fade, Chip, Card, CardHeader, CardActions, CardMedia, Button} from '@mui/material';

const VariantCard = (props) => {
  const {
      designId,
      title,
      link,
      image,
      file_name,
      setUpdate,
      versions
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const { user: loggedInUser } = useAuth();

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const handleToggle = () => {
    setOpenBackdrop(!openBackdrop);
  };


  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const deleteDesign = async () => {
    loggedInUser.getIdToken().then(async token => {
      const deleted = await axios.delete(`/api/projects/_/design/${designId}` , { headers: {'Authorization': `Bearer ${token}`} });
      deleted && toast.success("Design deleted");
      setUpdate((prev) => !prev);
    });
  }

  const exportDesign = async file => {
    axios.get(`${file}?timestamp=${new Date().getTime()}`, {
      responseType: "blob"
    }).then(function (response) {
      const link = document.createElement("a");
      const blob = new Blob([response.data], {type: response.headers["content-type"]});
      link.download = "maket-design.jpg";
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);

      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
      );

      document.body.removeChild(link);
      toast.success("Design downloaded!");
    }).catch(function (e) {
      toast.error("Something went wrong!");
      console.log("Error:", e);
    });
  }
  
    
  return (
    <>
      <Popper open={open} 
      anchorEl={anchorEl} 
      placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} 
          timeout={350}>
            <Paper>
              <ListItemButton onClick={deleteDesign}>
                <ListItemIcon><DeleteIcon /></ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItemButton>
              <ListItemButton onClick={() => exportDesign(image)}>
                <ListItemIcon><SaveAltIcon /></ListItemIcon>
                <ListItemText primary="Export" />
              </ListItemButton>
              <NextLink
                href={link}
                passHref
              >
                <ListItemButton>
                  <ListItemIcon><EditIcon /></ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItemButton>
              </NextLink>
            </Paper>
          </Fade>
        )}
      </Popper>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '60%',
            width: '60%',
          }}
        >
          <img
            alt=""
            src={image}
          />
        </Box>
      </Backdrop>
      <Card 
        sx={{ maxWidth: 345,
              cursor :"pointer",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              px:2 
            }}>
        <CardHeader
          
          action={
            <Button onClick={handleClick('bottom-end')}>
              <MoreVertIcon />
            </Button>
          }
          style={{ padding: 1}}
          title={<Typography style={{fontSize: '15px' }}>{title}</Typography>}
        />
        {image.slice(-3) === "pdf" ? 
          <CardMedia 
          sx={{minHeight:"194px"}}>
            <Typography 
            variant="body2" 
            align="center" 
            sx={{pt:'80px'}}>
              {file_name ? file_name : "PDF"}
            </Typography>
          </CardMedia>:
          <CardMedia
            onClick={handleToggle}
            component="img"
            height="194"
            image={image}
            alt="Design image"
          />
        }
        <CardActions 
          sx={{
            px:"0",
            display: 'flex', 
            justifyContent:'center'
          }}>
          <Chip 
          label={`${versions} Versions`} 
          variant="outlined" 
          sx={{borderWidth: '2px'}}/>
          <Chip 
          label={`0 Comments`} 
          variant="outlined" 
          sx={{borderWidth: '2px'}}/>
        </CardActions>
      </Card>
    </>
  );
};

export default VariantCard;
