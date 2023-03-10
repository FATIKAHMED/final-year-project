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
import BasicRating from "components/BasicRating";
import Toast from "redux/middlewares/toast";
// import SearchIcon from '@material-ui/icons/Search';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            width: "600px",
            borderRadius: "12px",
        },
        "& .MuiDialogTitle-root": {
            background: theme.palette.background.paperHead,
            "& .MuiTypography-h6": {
                fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"],
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "capitalize",
                color: "inherit",
            },
        },
        "& .MuiDialogActions-root": {
            padding: "10px 24px",
            marginTop: '10px',
            marginBottom: '10px',
            "& button": {
                fontSize: '12px'
            }
        },
        "& .MuiFormHelperText-root": {
            paddingLeft: "1.5rem",

        },
    },
    noteForm: {
        display: 'flex',
        marginBottom: '20px',
        "& .text-field": {
            width: "90%",
            marginRight: "15px",
            paddingLeft: '10px',
            borderRadius: '5px',
            border: '1px solid #d0d0d0',
            background: 'transparent',

            '& input': {
                paddingBottom: '12px',
                paddingTop: '20px',
                fontSize: '12px'
            },
            '&::before': {
                border: 'none'
            },
            '&::after': {
                border: 'none'
            }
        },

        "& .Mui-focused": {
            border: '1px solid #7b87cc !important',
        },
        "& .add-button": {
            width: "60px",
            "& .add-icon": {
                fontSize: "20px"
            }
        }
    },
    noteWrapper: {
        '& .note-list': {
            border: "1px solid #d0d0d0",
            borderRadius: '5px',
            padding: "8px",
            maxHeight: "200px",
            overflowY: "scroll",


            "& .note-item": {
                border: "1px solid #eeeeee",
                fontSize: "12px",
                padding: "15px 12px",
                marginBottom: "4px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px #dedede47",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                "& .item-text": {
                    overflowWrap: "break-word",
                    width: "75%",
                },
                "& .item-actions": {
                    width: "20%",
                },
            }
        }
    },
    editorClassName: {
        border: "1px solid #ededed",
        padding: "10px 5px",
        borderRadius: '3px',
        minHeight: '100px',
        fontSize: "12px",
    },
    toolbarClassName: {
        borderRadius: '3px !important',
        border: "1px solid #3f51b55c !important",

        "& > div": {
            borderRadius: "5px",
            marginRight: "8px",
        },
    }
}));

const CommmentModal = ({ noteState, open, setOpen, modalTitle, handleSubmit }) => {


    const classes = useStyles();
    const inputRef = useRef();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [editorState, setEditorState] = useState('')
    const [rating, setRating] = useState(0)
    const [isEditorVisible, setIsEditorVisible] = useState(false)
    const [error, setError] = useState(null)

    const handleClose = () => {
        setRating(0);
        setIsEditorVisible(false)
        setOpen(false);
        setError(null)
    };



    useEffect(() => {
        if (open) {

            const html = noteState;
            if (isEmpty(html))
                return

            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const updateEditorState = EditorState.createWithContent(contentState);
                setEditorState(updateEditorState)
            }
            const timeout = setTimeout(() => {
                inputRef.current?.focusEditor();
            }, 100);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [open])

    const handleRating = (val) => {
        setRating(val)
        setIsEditorVisible(true)
    }
    const handleClickSubmit = () => {
        if (editorState && rating > 0) {
            const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            const text = convertToRaw(editorState.getCurrentContent())
            let content = "";
            text.blocks.map(block => {
                content += block.text + " ";
            })

            if (isEmpty(content))
                return setError('Please add your comments on the course')

            if (content.length <= 5)
                return setError("Length must be greater than 5 charachters")

            handleSubmit({ contentHtml: html, content, rating })
            setEditorState("")
            setRating(0)
            setIsEditorVisible(false)
            setOpen(false)
            setError(null)

        }
        else
            setError("Please add your review on the course")

    }

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                className={classes.root}
                maxWidth="md"
            >
                {/* <DialogTitle>{modalTitle}</DialogTitle> */}
                <DialogContent>
                    <>
                        <BasicRating value={rating} setValue={(e) => handleRating(e)} />
                        {isEditorVisible && <Editor
                            placeholder="Thank you for this amazing course !"
                            ref={inputRef}
                            editorState={editorState}
                            toolbarClassName={classes.toolbarClassName}
                            wrapperClassName="wrapperClassName"
                            editorClassName={classes.editorClassName}
                            onEditorStateChange={(e) => setEditorState(e)}
                            toolbar={{
                                options: ['inline', 'list'],
                                inline: { inDropdown: false },
                                link: { inDropdown: true },
                            }}
                        />}
                    </>
                </DialogContent>
                {!isEmpty(error) &&
                    <FormHelperText error>{error}</FormHelperText>
                }
                {isEditorVisible && <DialogActions>
                    <Button secondary onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button variant="outlined" color="primary" loading={loading} onClick={() => handleClickSubmit()}>
                        Submit
                    </Button>
                </DialogActions>}
            </Dialog>
        </>
    );
};

export default CommmentModal;