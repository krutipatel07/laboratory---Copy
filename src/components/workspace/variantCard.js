import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import axios from 'axios'
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { ListItemButton, ListItemIcon, ListItemText, Typography, } from '@mui/material';

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

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const deleteDesign = async () => {
    const deleted = await axios.delete(`/api/projects/_/design/${designId}`);
    deleted && toast.success("Design deleted");
    setUpdate((prev) => !prev)
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
            </Paper>
          </Fade>
        )}
      </Popper>
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
        <NextLink
            href={link}
            passHref
          >
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
                component="img"
                height="194"
                image={image}
                alt="Design image"
              />
            }
        </NextLink>
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
