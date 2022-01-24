import NextLink from 'next/link';
import React, { useState, useRef } from "react";
import { useRouter, withRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  coordinates,
  Typography,
  ButtonBase
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/use-auth';
import axios from 'axios'
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const CommentPopover = withRouter((props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  // To get the user from the authContext, you can use
  const { user } = useAuth();

  const {designId, projectId} = props.router.query;
  const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      form: {
          backgroundColor: 'white',
          borderRadius: 8,
          maxHeight: 'ingerit'
      },
      writeComment: {
          textAlign: 'left',
          display: 'block',
          padding: 12
      },
      commentField: {
          fontSize: 14,
          padding: 8,
          display: 'block',
          width: '100%',
          cursor: 'text',
          textAlign: 'start',
          wordWrap: 'break-word',
          border: 'none'
      },
      btnGroup: {
          textAlign: 'right',
          display: 'block',
          padding: 12,
          fontWeight: 500,
          fontSize: 14
      },
      cancel: {
          color: '#BDBDBD',
          backgroundColor: 'white',
          boxShadow: 'none',
          border: '1px solid #BDBDBD',
          padding: '3px 12px 5px',
          margin: '0 0 0 8px',
          minWidth: 24,
          verticalAlign: 'middle',
          borderRadius: 8,
          lineHeight: '16px'
      },
      post: {
          color: 'white',
          backgroundColor: '#BDBDBD',
          boxShadow: 'none',
          border: '1px solid #BDBDBD',
          margin: '0 0 0 8px',
          minWidth: 24,
          verticalAlign: 'middle',
          borderRadius: 8,
          lineHeight:' 16px',
          padding: '7px 11px',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: '#007FFF',
      }
    
    }));

const [commentValue, setCommentValue] = React.useState();

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
      const data = await axios.put(`/api/projects/${projectId}/design/${designId}`, {
        comments : {
            creator: localStorage.getItem("lab-user"),
            version: designId,
            text: commentValue,
            x_location: "2",
            y_location: "2"
        }
      })
      .catch(error => console.log(error));

      setCommentValue("");
      location.reload();
      toast.success('Comment added!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
};
const textRef = useRef(null);
const classes = useStyles();

const handleChange = (event) => {
  setCommentValue(event.target.value)
}


  return (
    <Popover
      anchorEl={anchorEl}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
      <Box
        sx={{
          alignItems: 'center',
          p: 0,
        }}
      >
        <form 
        className={classes.form}
        onSubmit={handleSubmit}
        >
            <div 
            className={classes.writeComment}>
                <textarea
                ref={textRef}
                onChange={handleChange}
                className={classes.commentField}
                placeholder="Add a comment"
                value={commentValue}
                name="comment"
                id="comment"
                />
            </div>
            <div 
            className={classes.btnGroup}
            component={ButtonBase}>
                {/* <button type="button" className={classes.cancel}>
                    Cancel
                </button> */}
                <button type="submit" variant="contained" 
                className={classes.post}
                >
                    Post 
                </button>
            </div>
        </form>

      </Box>

    </Popover>
  );
});

CommentPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
