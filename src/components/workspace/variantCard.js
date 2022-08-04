import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { Typography, 
  ListItemButton,
  ListItemIcon,
  ListItemText, } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  CardContent: {
    display: 'flex',
    padding: '7px 24px'
  },
  cardActions: {
    marginLeft: 'auto',
    order: '2',
    padding: '12px 5px 12px 24px'
  },
  Button: {
    // padding: '8px 10px',
    "&.MuiButton-contained": {
      color: "#64B6F7",
      backgroundColor: 'rgba(0, 255, 255, 0.08)',
      borderRadius: '16px'
    },
  },
  image: {
    padding: '0 24px'
  },
  title: {
    paddingTop: '15px'
  },
  deletebtn: {
    marginLeft: 'auto',
    padding: '8px 10px'
  },
  btnStyle: {
    padding: '8px 10px',
  }

}));

const VariantCard = (props) => {
    const {
        designId,
        title,
        members,
        link,
        image,
        file_name,
        setUpdate,
        versions
    } = props;

    const classes = useStyles();    

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

export default VariantCard
