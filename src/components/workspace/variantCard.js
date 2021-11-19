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



const VariantCard = (props) => {
    const {
        title,
        members,
        comments,
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
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.hover',
            } }}
            variant="elevation">
        <CardMedia
        sx={{
            objectFit:"fill",
            }}
        component="img"
        alt="green iguana"
        height="200"
        src={image}
      />
        <CardContent>
          <Typography gutterBottom 
          variant="subtitle1" 
          component="div" 
          color="text.primary">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
              <IconButton aria-label="share">
              <DesignServicesIcon />
              </IconButton>
              <Typography>
              {members}
              </Typography>
              <IconButton aria-label="share" sx={{marginLeft: 50}}>
              <CommentIcon/>
              </IconButton>
              <Typography>
              {comments}
              </Typography>
        </CardActions>
      </Card>
      </NextLink>
  );
};

export default VariantCard