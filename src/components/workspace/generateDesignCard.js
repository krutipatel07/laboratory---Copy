import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CommentIcon from '@mui/icons-material/Comment';
import { makeStyles } from '@material-ui/styles';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import toast from 'react-hot-toast';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    padding: '24px 24px 0'
  },
  title: {
    paddingTop: '15px'
  },
  savebtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '8px 10px'
  }

}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#10B981',
  // color: theme.palette.getContrastText('#10B981'),
  backgroundColor: 'rgba(16, 185, 129, 0.08)',
  '&:hover': {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  borderRadius: '16px',
}));


const GenerateDesignCard = (props) => {
    const {
        designId,
        link,
        image
    } = props;

    const classes = useStyles();
    const saveDesign = async () => {
      const deleted = await axios.delete(`/api/projects/_/design/${designId}`);
      deleted && toast.success("Design deleted");
      location.reload();
    }
    
  return (
      <Card 
      sx={{
            maxWidth: 300, 
            minWidth: 400,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.hover',
            } }}
            variant="elevation">

      <NextLink
        href={link}
        passHref
      >
        <CardMedia
          className={classes.image}
          sx={{
              objectFit:"fill",
              }}
          component="img"
          alt="green iguana"
          height="200"
          padding="0 24px"
          src={image}
        />
      </NextLink>
        <CardActions>
          <Stack direction="row" 
          width='100%'
          spacing={2}>
            <IconButton aria-label="save" 
            onClick={saveDesign}  
            className={classes.savebtn} 
            // style={{marginLeft: 'auto'}}
            >
              <FavoriteBorderIcon style={{color:'#D14343', marginRight: '5px'}}/>
              <Typography>
                Save
              </Typography>
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
  );
};

export default GenerateDesignCard
