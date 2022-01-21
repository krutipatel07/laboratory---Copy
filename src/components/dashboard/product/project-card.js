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

const ProductCard = (props) => {
    const {
        id,
        title,
        description,
        members,
        link,
        image
    } = props;
    
    const deleteProject = async () => {
      const deleted = await axios.delete(`/api/projects/${id}`);
      deleted && toast.success("Design deleted");
      location.reload();
    }

  return (
      <Card sx={{
            maxWidth: 300, 
            minWidth: 400,
            margin: "auto",
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
        ><CardContent>
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
        </CardActions>
      </Card>
  );
};

export default ProductCard