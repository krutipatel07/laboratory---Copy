import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import NextLink from 'next/link';
import axios from 'axios'
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/styles';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
    
    const deleteProject = async () => {
      const deleted = await axios.delete(`/api/projects/${id}`);
      deleted && toast.success("Project deleted");
      location.reload();
    }

  return (
    <>
    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteProject}>
              Delete
            </Button>
          </Paper>
        </Fade>
      )}
    </Popper>
    <Card 
      sx={{ maxWidth: 345,
            cursor :"pointer"}}>
      <CardHeader
        sx={{ padding: 1, }}
              action={
                <Button onClick={handleClick('bottom-end')}>
                  <MoreVertIcon />
                </Button>
                }
        title={<Typography style={{fontSize: '15px' }}>{title}</Typography>}
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
    </>
  );
};

export default ProductCard