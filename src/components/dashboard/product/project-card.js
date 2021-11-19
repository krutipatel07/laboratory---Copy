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
        link
    } = props;
    
  return (
    <NextLink
        href={link}
        passHref
      >
      <Card sx={{
            maxWidth: 300, 
            minWidth: 400,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.hover',
            } }}
            variant="elevation">
        <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        //image="/static/images/cards/contemplative-reptile.jpg"
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3270&q=80"
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