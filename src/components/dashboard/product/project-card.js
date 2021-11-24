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



const ProductCard = (props) => {
    const {
        title,
        description,
        members,
        link,
        image
    } = props;
    
  return (
    <NextLink
        href={link}
        passHref
      >
      <Card sx={{
            maxWidth: 300, 
            minWidth: 400,
            margin: "auto",
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.hover',
            } }}
            variant="elevation">
        <CardMedia
        component="img"
        alt="green iguana"
        height="160"
        src={image}
      />
        <CardContent>
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
        <CardActions disableSpacing>
              <IconButton aria-label="share">
              <PeopleIcon />
              </IconButton>
              <Typography>
              {members}
              </Typography>
        </CardActions>
      </Card>
      </NextLink>
  );
};

export default ProductCard