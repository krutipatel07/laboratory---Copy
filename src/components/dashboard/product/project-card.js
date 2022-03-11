import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import NextLink from 'next/link';
import axios from 'axios'
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/styles';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
        image,
        designsLength
    } = props; 

    const classes = useStyles();
    
    const deleteProject = async () => {
      const deleted = await axios.delete(`/api/projects/${id}`);
      deleted && toast.success("Project deleted");
      location.reload();
    }

  return (
    <Card 
      sx={{ maxWidth: 345,
            cursor :"pointer"}}>
      <CardHeader
        sx={{ padding: 1, }}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
        title={title}
      />
      <NextLink
          href={link}
          passHref
        >
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Project cover image"
        />
      </NextLink>
      <CardActions sx={{
        px:"0",
        display: 'flex', 
        justifyContent:'space-between'
      }}>
        <Chip label={`${designsLength} Designs`} variant="outlined" sx={{borderWidth: '2px'}}/>
        <Chip label={`0 Comments`} variant="outlined" sx={{borderWidth: '2px'}}/>
        <Chip label={`${members} Collaborators`} variant="outlined" sx={{borderWidth: '2px'}} />
      </CardActions>
    </Card>
  );
};

export default ProductCard