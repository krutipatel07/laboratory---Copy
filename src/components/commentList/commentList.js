
import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/styles';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function CommentList() {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        form: {
            backgroundColor: 'white',
            borderRadius: 8,
            maxHeight: 'ingerit'
        },
        userComment: {
            textAlign: 'left',
            display: 'block',
            padding: 12
        },
        comment: {
            fontSize: 14,
            padding: 8,
            display: 'block',
            width: '100%',
            textAlign: 'start',
            wordWrap: 'break-word',
            color: 'black'
        },
        btnGroup: {
            textAlign: 'right',
            display: 'block',
            padding: 12,
            fontWeight: 500,
            fontSize: 14
        },
        close: {
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
        reply: {
            color: 'white',
            backgroundColor: '#424242',
            boxShadow: 'none',
            border: '1px solid #424242',
            padding: '3px 12px 5px',
            margin: '0 0 0 8px',
            minWidth: 24,
            verticalAlign: 'middle',
            borderRadius: 8,
            lineHeight:' 16px'
        },
        header: {
            padding: '12px',
            minHeight: 36,
            display: 'flex',
            justifyContent: 'space-between'
        },
        userContent: {
            display: 'flex'
        },
        userAvatar: {
            height: 38,
            marginTop: 2,
            maxWidth: 36,
            width: 36
        },
        img: {
            margin: '2px 0 0 2px',
            borderRadius: '50%',
            position: 'relative',
            display:'block',
            objectFit: "cover",
            width: '100%',
            height:'100%',
            textAlign:'center'
        },
        userName: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 10,
            overflow: 'hidden',
            color: "black",
            fontWeight: 500,
            fontSize: 14,
        },
        userAction: {
            color: 'black',
            display: 'flex',
            fontSize: 14,
            paddingTop: 8
        },
        edit: {
            marginLeft: 18,
            cursor: "pointer"
        },
        delete: {
            cursor: "pointer",
            marginLeft: 18,
            color: "#D14343"
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        timeStamp: {
            color: '#6B7280',
            padding: 12,
            fontSize: 12
        }
      
      }));

// const onSubmit = (data) => alert(JSON.stringify(data, null, 4));
const textRef = useRef(null);
const classes = useStyles();


  return (
    <div style={{ padding: 14, borderRadius: 8, minWidth: 282, width: "calc(100% - 50px)", maxWidth: "calc(40ch + 14px)", marginLeft: "auto" }}>
        <form 
        className={classes.form}
        // onSubmit={handleSubmit(onSubmit)}
        >
            <div className={classes.header}>
                <div className={classes.userContent}>
                    <div className={classes.userAvatar}>
                        <img alt="user icon"
                        src="/static/mock-images/avatars/avatar-anika_visser.png" 
                        className={`MuiAvatar-img css-1pqm26d-MuiAvatar-img ${classes.img}`}>
                        </img>
                    </div>
                    <div className={classes.userName}>
                        Fran Perez
                    </div>
                </div>
                <div className={classes.userAction}>
                    <Typography className={classes.edit}>
                        Edit
                    </Typography>
                    <Typography className={classes.delete}>
                        Delete
                    </Typography>
                </div>
            </div>
            <div className={classes.userComment}>
                <Typography className={classes.comment}>
                    Done some wireframing this weekend. How was yours? 
                    Did you get the chance to look over the new project brief?
                </Typography>
            </div>
            <div className={classes.footer}>
                <div className={classes.timeStamp}>
                    <span>1 day ago</span>
                </div>
                <div className={classes.btnGroup}>
                    <button type="button" className={classes.close}>
                        Close
                    </button>
                    <button type="submit" className={classes.reply}>
                        Reply 
                    </button>
                </div>
            </div>
        </form>
    </div>
  );
}
