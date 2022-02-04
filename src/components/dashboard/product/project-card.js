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
import axios from 'axios'
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  projectListContent: {
    minHeight: '115px',
    maxHeight: '115px',
    overflow: 'auto',
    padding: '13px 24px'
  }
}));

const ProductCard = (props) => {
    const {
        id,
        title,
        description,
        members,
        link,
        image
    } = props;

    const classes = useStyles();
    
    const deleteProject = async () => {
      const deleted = await axios.delete(`/api/projects/${id}`);
      deleted && toast.success("Project deleted");
      location.reload();
    }

  return (
      <Card sx={{
            maxWidth: 300, 
            minWidth: 400,
            margin: "auto",
            cursor :"pointer",
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.hover',
            } }}
            variant="elevation">
        <NextLink
          href={link}
          passHref
        ><CardMedia
          component="img"
          alt="green iguana"
          height="160"
          src={image}
        />
        </NextLink>
        <NextLink
          href={link}
          passHref
        ><CardContent className={classes.projectListContent}>
            <Typography gutterBottom 
            variant="subtitle1" 
            component="div" 
            color="text.primary">
              {title}
            </Typography>
            <Typography 
            variant="body2" 
            color="text.secondary">
                {description}
            </Typography>
          </CardContent>
        </NextLink>
        <CardActions disableSpacing>
              <IconButton aria-label="share">
              <PeopleIcon />
              </IconButton>
              <Typography>
              {members}
              </Typography>
              <IconButton aria-label="delete" 
                onClick={deleteProject}  
                style={{marginLeft: 'auto'}}>
                  <DeleteIcon 
                    style={{color:'#D14343'}} />
              </IconButton>
        </CardActions>
      </Card>
  );
};

export default ProductCard