import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';

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
        image,
        setUpdate,
        versions
    } = props;

    const classes = useStyles();
    const deleteDesign = async () => {
      const deleted = await axios.delete(`/api/projects/_/design/${designId}`);
      deleted && toast.success("Design deleted");
      setUpdate((prev) => !prev)
    }
    
  return (
      <Card 
        sx={{ maxWidth: 345,
              cursor :"pointer",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              px:2 
            }}>
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
        <CardActions 
          sx={{
            px:"0",
            display: 'flex', 
            justifyContent:'center'
          }}>
          <Chip label={`${versions} Versions`} variant="outlined" sx={{borderWidth: '2px'}}/>
          <Chip label={`0 Comments`} variant="outlined" sx={{borderWidth: '2px'}}/>
        </CardActions>
      </Card>
  );
};

export default VariantCard
