import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Box, Button, ListItem, List, Typography, IconButton, ListItemIcon, CardContent, CardActions, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export const PricingPlan = (props) =>{

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>

      <Dialog
        // fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        // sx={{ borderRadius:0, minWidth:"800px", height:"100%"}}
      >
        <DialogTitle id="alert-dialog-title" sx={{padding:0}}>
            <Typography
            sx={{background:"#212121", color: "white", fontSize:60, pl:2}}>Pricing Plans</Typography>
        </DialogTitle>

        <DialogContent sx={{px:2, py:2, marginTop:"10px"}}>
          <DialogContentText style={{color:'#000', fontWeight:500, fontSize:12}}>
          Please select your plan to continue.
          </DialogContentText>
        </DialogContent>

        <DialogContent sx={{display:"flex", justifyContent: "space-evenly", padding: "70px 90px"}}>
            <Card 
            sx={{ minWidth: '250px', padding:"10px", 
                boxShadow: "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
                borderRadius:"4px"}}>
                <CardContent sx={{display: 'flex', justifyContent:"space-between", padding:0}}>
                    <Box >
                        <Typography level="h5" fontSize="md" sx={{ alignSelf: 'flex-start' }}> Professional </Typography>
                        <Typography level="body2">PERFECT FOR SMALL <br></br> FIRMS (1-5 EMPLOYEES)</Typography>
                    </Box>
                    <Box >
                        <Typography level="h4">$30USD</Typography>
                        <Typography level="body2">per user per month</Typography>
                    </Box>
                </CardContent>
                <Box>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="14-day free trial"></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Unlimited access to 2D generation"></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Access to 3D renderings (14-21 Day delay)"></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Download any design content"></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="PDF & PNG Export "></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Real-Time Collaboration"></ListItemText>
                        </ListItem>
                    </List>
                </Box>
                <CardActions>
                    <Button sx={{width:"100%", background:"#FFB800", color:"#ffffff", padding:"10px"}}>START NOW</Button>
                </CardActions>
            </Card>
            <Card 
            sx={{ minWidth: '250px', padding:"10px",
                boxShadow: "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
                borderRadius:"4px"}}>
                <CardContent sx={{display: 'flex', justifyContent:"space-between", padding:0}}>
                    <Box >
                        <Typography level="h2" fontSize="md" sx={{ alignSelf: 'flex-start' }}> Premium </Typography>
                        <Typography level="body2">RIGHT FOR MEDIUM-LARGE <br></br> FIRMS (5+ EMPLOYEES)</Typography>
                    </Box>
                    <Box >
                        <Typography level="body2">$75USD</Typography>
                        <Typography level="body2">per user per month</Typography>
                    </Box>
                </CardContent>
                <Box>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="All Professional features + "></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Premium access to 3D renderings (5 Days or Less)"></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Text-to-plan generation "></ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon><CheckCircleRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Voice-to-plan generation"></ListItemText>
                        </ListItem>
                    </List>
                </Box>
                <CardActions>
                    <Button sx={{width:"100%", background:"#FFB800", color:"#ffffff", padding:"10px"}}>START NOW</Button>
                </CardActions>
            </Card>
        </DialogContent>


      </Dialog>
    </div>
  );
}
