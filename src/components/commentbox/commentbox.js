

import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/styles';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { styled } from '@mui/material/styles';

export default function CommentBox() {

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
            padding: '3px 12px 5px',
            margin: '0 0 0 8px',
            minWidth: 24,
            verticalAlign: 'middle',
            borderRadius: 8,
            lineHeight:' 16px'
        }
      
      }));

const [state, setState] = React.useState({
    id: null
});

// const onSubmit = (data) => alert(JSON.stringify(data, null, 4));
const textRef = useRef(null);
const classes = useStyles();

// const handleChange = (event) => {
//     this.setState({id: event.target.value});
//  }

  return (
    <div style={{ padding: 14, borderRadius: 8, minWidth: 282, width: "calc(100% - 50px)", maxWidth: "calc(40ch + 14px)" }}>
        <form 
        className={classes.form}
        // onSubmit={handleSubmit(onSubmit)}
        >
            <div className={classes.writeComment}>
                <textarea
                ref={textRef}
                // onChange={this.handleChange}
                className={classes.commentField}
                placeholder="Add a comment"
                // value={commentValue}
                name="comment"
                id="comment"
                />
            </div>
            <div className={classes.btnGroup}>
                <button type="button" className={classes.cancel}>
                    Cancel
                </button>
                <button type="submit" className={classes.post}>
                    Post 
                </button>
            </div>

        </form>
    </div>
  );
}
