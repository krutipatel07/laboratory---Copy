import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/styles';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import toast from 'react-hot-toast';
import dateFormat from "../../utils/dateFormat"
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';

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
const GenerateDesignCard = ({image}) => {
  const [clicked, setClicked] = useState(false)
  const classes = useStyles();
  const router = useRouter();
  const time = dateFormat(new Date());
  const title = time.replaceAll(" ", "").replaceAll(",", "").replaceAll("pm", "").replaceAll("at", "").replaceAll("th", "");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

    const saveDesign = async () => {   
      
    setClicked(true)
      const {data} = await axios.post(`/api/projects/${router.query.id}/design`, {
        title: `Design-${title}`,
        url: image
      }).catch(error => 
        setClicked(false))

      const limnu_boardCreate = await axios.post("https://api.apix.limnu.com/v1/boardCreate", {
              apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
              boardName: `Board-${title}`,
              whiteLabel: true,
            })
            .catch(error => console.log(error));
            
      await axios.post("https://api.apix.limnu.com/v1/boardImageURLUpload", {
        apiKey: 'K_zZbXKpBQT6dp4DvHcClqQxq2sDkiRO',
        boardId: limnu_boardCreate.data.boardId,
        imageURL: image
      })
      .catch(error => console.log(error));
      
     await axios.put(`/api/projects/_/design/${data.data._id}`, {
      limnu_boardUrl : limnu_boardCreate.data.boardUrl,
    })
    .catch(error => console.log(error));

    toast.success(`Design added!`)
    }

    return (
      <Card
      sx={{
            maxWidth: 300,
            minWidth: 350,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.hover',
            } }}
            variant="elevation">
        <CardMedia
          className={classes.image}
          sx={{
              objectFit:"fill",
              cursor : "pointer"
              }}
          component="img"
          alt="green iguana"
          height="200"
          padding="0 24px"
          src={image}
          onClick={handleToggle}
        /> 
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '60%',
              width: '60%',
            }}
          >
            <img
              alt=""
              src={image}
            />
          </Box>
        </Backdrop>
        <CardActions>
          <Stack direction="row"
          width='100%'
          spacing={2}>
            <IconButton aria-label="save"
            onClick={saveDesign}  
            className={classes.savebtn}
            // style={{marginLeft: 'auto'}}
            >
              {!clicked ?
              <><AddIcon style={{color:'#111827'}}/>
              <Typography>
                Add to project
              </Typography> </>: <Typography>
                Added to project
              </Typography> }
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
  );
};
export default GenerateDesignCard
