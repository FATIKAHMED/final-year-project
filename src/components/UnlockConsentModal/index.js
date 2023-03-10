// *Libraries
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStore, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ReactHtmlParser from 'react-html-parser';

// *Components
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    FilledInput,
    FormControl,
    FormGroup,
    FormLabel,
    FormHelperText,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    Box,
    Button,
    IconButton,
    TextField,
    InputAdornment
} from "@material-ui/core";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            width: "600px",
            borderRadius: "6px",
        },
        "& .MuiDialogTitle-root": {
            background: theme.palette.background.paperHead,
            "& .MuiTypography-h6": {
                fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"],
                fontSize: "1.1rem",
                fontWeight: "600",
                textTransform: "capitalize",
                color: "inherit",
                position: 'relative',
                top: '2px'
            },
        },
        "& .MuiDialogActions-root": {
            padding: "10px 24px",
            marginTop: '10px',
            marginBottom: '10px',
            "& button": {
                fontSize: '12px',

            }
        },
    },
    content: {
        fontSize: '13px',
        padding: "0 24px",

    },
    checkbox: {

        "& .MuiTypography-root": {
            fontSize: '12px'
        }
    }
}));

const UnlockConsentModal = ({ open, setOpen, modalTitle, handleSubmit }) => {
    const classes = useStyles();
    const inputRef = useRef();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickSubmit = () => {
        handleSubmit(checked)
        setOpen(false)
    }

    const CustomCheckBox = ({ ...props }) => {
        return (<Checkbox
            className={classes.checkbox}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            {...props}
        />)
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            className={classes.root}
            maxWidth="sm"
        >
            <DialogTitle>Unlocks usage consent</DialogTitle>
            <DialogContent className={classes.content}>
                <p>Before you proceed, each video you watch will cost one unlock point. Page refresh will also reset the video unlock and will again cost unlock points.</p>
                <p>Do you want to continue?</p>
                <FormControlLabel style={{ marginTop: '15px' }} control={<CustomCheckBox />} label="Don't ask me again" />

            </DialogContent>

            <DialogActions>
                <Button color="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="outlined" color="primary" loading={loading} onClick={() => handleClickSubmit()}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UnlockConsentModal
