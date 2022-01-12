import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import DeleteIcon from '@mui/icons-material/Delete';


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

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#10B981',
  // color: theme.palette.getContrastText('#10B981'),
  backgroundColor: 'rgba(16, 185, 129, 0.08)',
  '&:hover': {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  borderRadius: '16px',
}));


const VariantCard = (props) => {
    const {
        designId,
        title,
        members,
        comments,
        link,
        image
    } = props;

    const classes = useStyles();
    const deleteDesign = async () => {
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
        <CardContent 
          className={classes.CardContent}
        >
          <Typography gutterBottom 
          variant="subtitle1" 
          component="div" 
          color="text.primary"
          className={classes.title}
          >
            {title}
          </Typography>
          <CardActions 
            className={classes.cardActions}
            >
                <IconButton aria-label="share">
                <DesignServicesIcon />
                </IconButton>
                <Typography>
                {members}
                </Typography>
                <IconButton aria-label="share" 
                sx={{marginLeft: 50}}>
                <CommentIcon/>
                </IconButton>
                <Typography>
                {comments}
                </Typography>
          </CardActions>
        </CardContent>
      </NextLink>

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
          <Stack direction="row" width='100%'
          spacing={2}>
            
            <NextLink
              href={link}
              passHref
            >
              <ColorButton variant="contained" className={classes.btnStyle}>New Comments</ColorButton>
            </NextLink>             
            <NextLink
              href={link}
              passHref
            >
              <Button variant="contained" className={[classes.Button, classes.btnStyle]}>New Version</Button>
            </NextLink>
            <IconButton aria-label="delete" onClick={deleteDesign}  className={classes.deletebtn} style={{marginLeft: 'auto'}}>
              <DeleteIcon style={{color:'#D14343'}} />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
  );
};

export default VariantCard
