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
import Button from '@mui/material/Button';
import { FormHelperText, TextField, Modal } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from "../../hooks/use-auth";

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
    "&.MuiButton-contained": {
      color: "#64B6F7",
      backgroundColor: 'rgba(0, 255, 255, 0.08)',
      borderRadius: '16px'
    },
  },
  image: {
    padding:  0,
    objectFit: "contain"
  },
  title: {
    paddingTop: '15px'
  },
  savebtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '8px 10px'
  },
  designAdded: {
    color: 'geen'
  },
  buttonadd: {
    '&:hover': {
      backgroundColor: 'rgba(107, 114, 128, 0.04)'
    }
  }
}));
const GenerateDesignCard = ({image, setNewDesign, setUpdate}) => {
  const [clicked, setClicked] = useState(false)
  const classes = useStyles();
  const router = useRouter();
  const time = dateFormat(new Date());
  const title = time.replaceAll(" ", "").replaceAll(",", "").replaceAll("pm", "").replaceAll("at", "").replaceAll("th", "");
  const [open, setOpen] = React.useState(false);
  const { user: loggedInUser } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => !clicked && setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    p: 4,
  };
  
  const formik = useFormik({
    initialValues: {
      designName: '',
      submit: null
    },
    validationSchema: Yup.object({
      designName: Yup
        .string()
        .max(255)
        .required('Design name is required'),
    }),
    onSubmit: async (values) => {
      saveDesign(values.designName)
      handleCloseModal();
    }})

    const saveDesign = async (designName) => {   
    loggedInUser.getIdToken().then(async token => {
    setClicked(true)
    setNewDesign((prev) => prev+1)
      const {data} = await axios.post(`/api/projects/${router.query.id}/design`, {
          title: designName,
          url: image
        },
        { headers: {'Authorization': `Bearer ${token}`} }
        ).catch(error => 
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
      },{ headers: {'Authorization': `Bearer ${token}`} })
    .catch(error => console.log(error));
    setUpdate((prev) => !prev)
    toast.success(`Design added!`)
    });
    }

    return (
    <>
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
              cursor: 'zoom-in'
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
            onClick={handleOpenModal}
            className={classes.savebtn}
            // style={{marginLeft: 'auto'}}
            >
              {!clicked ?
              <><AddIcon style={{color:'#111827'}}/>
              <Button className={classes.buttonadd}>
                Add to Design
              </Button > </>: 
              <Button style={{color: '#4CAF50'}}>
                <CheckIcon/>
              </Button> }
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>  
        <Typography variant="h6">Design Name</Typography>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              error={Boolean(formik.touched.designName && formik.errors.designName)}
              fullWidth
              helperText={formik.touched.designName && formik.errors.designName}
              label="name"
              margin="normal"
              name="designName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.designName}
              variant="standard"
            />
            {formik.errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>
                  {formik.errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box sx={{ display: 'flex' , justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseModal}>
                CANCEL
              </Button>
              <Button
                disabled={formik.isSubmitting}
                type="submit"
              >
                SAVE
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default GenerateDesignCard
