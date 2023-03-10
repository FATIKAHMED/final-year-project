// *Libraries
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    // useStore,
    useSelector
} from "react-redux";
import { useDispatch } from "react-redux";
import { getBusinessUsersAction, updateUserAction, updateUserBusinessCourseAccessAction } from 'redux/actions'

// * Utitlities
import isEmpty from "utils/is-empty";
import { ROLE } from "utils/constants";

// *Components
import {
    Dialog,
    DialogActions,
    DialogContent,
    // DialogContentText,
    DialogTitle,
    Slide,
    FilledInput,
    FormControl,
    FormGroup,
    FormLabel,
    FormHelperText,
    // FormControlLabel,
    // Checkbox,
    Select,
    MenuItem,
    Box
} from "@material-ui/core";
import Button from "components/Button";

// * Icons
import { MdDone } from 'react-icons/md'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": { width: "500px" },
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
            padding: "10px 15px",
        },
    },
}));

const Modal = ({ open, setOpen, modalTitle, formFields }) => {


    const classes = useStyles();
    const inputRef = useRef();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user)
    const allCourses = useSelector((state) => state.courses.store.docs.filter(item => item.price > 0))

    const [firstName, setFirstName] = useState('')
    const [courses, setCourses] = useState([])
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [courseArray, setCourseArray] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            // console.log("FORMFIELDS", formFields)

            setFirstName(formFields.firstName);
            setLastName(formFields.lastName);
            setEmail(formFields.email);
            if (!isEmpty(formFields.businessCourse?.courses))
                setCourses(getBusinessUserCourse(formFields.businessCourse?.courses))
            setErrors({});

            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [open]);

    const getBusinessUserCourse = (courseObj) => {

        let courses = [];
        let coursesName = []

        Object.entries(courseObj).forEach(([key, value]) => {
            if (value.hasAccess === true) {
                courses.push(key)
                coursesName.push(allCourses.filter(item => item._id === key)[0].title)
            }
        });
        // return courses;
        return coursesName;
    }

    const resetInputFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setCourses([])
    }

    const SubmitButton = () => {
        return <Button label="Submit" loading={loading} onClick={handleSubmit}>Submit</Button>;
    };

    const handleClose = () => {
        resetInputFields()
        setOpen(false);
    };

    const handleSubmit = async () => {
        let error = {}

        if (isEmpty(firstName)) {
            error.firstName = "Firstname is required"
        }
        if (isEmpty(lastName)) {
            error.lastName = "Lastname is required"
        }

        if (!isEmpty(error)) {
            // console.log("ERRORS IN FIELD", error)
            setErrors(error)
            dispatch({
                type: "TOAST",
                payload: {
                    message: "Error in fields",
                    type: "error"
                },
            });
            return
        }
        setLoading(true);


        const courseAccessPayload = { userId: formFields._id, courseArray }
        const userUpdatePayload = { firstName, lastName };

        // if (formFields.firstName !== firstName || formFields.lastName !== lastName)
        //     submitUser(userUpdatePayload)

        submitUserCourseAccess(courseAccessPayload)

        setLoading(false);
        handleClose()

    };

    const submitUserCourseAccess = async (payload) => {


        const { res, error } = await dispatch(updateUserBusinessCourseAccessAction(payload))

        if (!isEmpty(res)) {

            await dispatch(getBusinessUsersAction(user._id, ROLE.BusinessStudent, typeof user.business === 'string' ? user.business : user.business._id))

            dispatch({
                type: "TOAST",
                payload: {
                    message: "User courses access updated",
                    type: 'success'
                }
            })


        }
        else {
            dispatch({
                type: "TOAST",
                payload: {
                    message: "Error in updating user course access",
                    type: 'error'
                }
            })
            console.error("user updating error ", error.message)
        }
        setErrors(null)

    }

    const submitUser = async payload => {
        const { res, error } = await dispatch(updateUserAction(payload, formFields._id))
        if (!isEmpty(res)) {
            dispatch({
                type: "TOAST",
                payload: {
                    message: "User updated",
                    type: 'success'
                }
            })
            handleClose()

        }
        else {
            dispatch({
                type: "TOAST",
                payload: {
                    message: "Error in updating user",
                    type: 'error'
                }
            })
            console.error("user updating error ", error.message)
        }
        setErrors(null)

    }

    const handleChangeCourseAccess = e => {
        const coursesChange = e.target.value

        let newCourseArray = []

        //? Macke access true for selected courses
        coursesChange.forEach(courseName => {
            const id = allCourses.filter(item => item.title === courseName)[0]._id
            if (!isEmpty(id)) {
                newCourseArray.push({ id, access: true })
            }
        });

        //? Make access false for unselected courses
        if (formFields.businessCourse?.courses) {
            Object.entries(formFields.businessCourse?.courses).forEach(([key, value]) => {
                const isCourse = newCourseArray.find(item => item.id === key)
                if (value.hasAccess === true && isEmpty(isCourse)) {
                    newCourseArray.push({ id: key, access: false })
                }
            });
        }

        // console.log("New course", newCourseArray)

        setCourseArray(newCourseArray)
        setCourses(e.target.value)

    }

    const handleEnterSubmit = (e) => {
        if (e.keyCode == 13) {
            handleSubmit();
            return;
        }
        return;
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            className={classes.root}
        >
            <DialogTitle id="alert-dialog-slide-title">{modalTitle}</DialogTitle>
            <DialogContent>
                <>
                    <FormGroup>
                        <FormLabel>First name</FormLabel>
                        <FormControl
                            variant="outlined"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                        >
                            <Box
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                paddingLeft="0.75rem"
                                paddingRight="0.75rem"
                                component={FilledInput}
                                autoComplete="off"
                                type="text"
                                inputRef={inputRef}
                                placeholder="Lucky"
                                disabled={user.role === ROLE.SuperAdmin ? loading : true}
                                onKeyDown={handleEnterSubmit}
                            />
                            {!isEmpty(errors) &&
                                <FormHelperText error>{errors.firstName}</FormHelperText>
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Last name</FormLabel>
                        <FormControl
                            variant="outlined"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                        >
                            <Box
                                disabled={user.role === ROLE.SuperAdmin ? loading : true}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                paddingLeft="0.75rem"
                                paddingRight="0.75rem"
                                component={FilledInput}
                                autoComplete="off"
                                type="text"
                                placeholder="Jesse"
                            />
                            {!isEmpty(errors) &&
                                <FormHelperText error>{errors.lastName}</FormHelperText>
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            variant="outlined"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                        >
                            <Box
                                disabled={user.role === ROLE.SuperAdmin ? loading : true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                paddingLeft="0.75rem"
                                paddingRight="0.75rem"
                                component={FilledInput}
                                autoComplete="on"
                                type="email"
                                placeholder="jesse@example.com"
                            />
                            {!isEmpty(errors) &&
                                <FormHelperText error>{errors.email}</FormHelperText>
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Course access</FormLabel>
                        <FormControl
                            variant="outlined"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"

                        >
                            <Select
                                className={classes.selectInput}
                                value={courses}
                                multiple
                                disabled={loading}
                                onChange={e => handleChangeCourseAccess(e)}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <span>None</span>;
                                    }

                                    return selected.join(", ");
                                }}
                            >
                                {allCourses?.map(item =>
                                    <MenuItem
                                        classes={{ root: classes.multiSelectMenuItemRoot }}
                                        key={item._id}
                                        value={item.title}
                                    >
                                        {item.title}
                                        {courses?.indexOf(item.title) !== -1 ? <MdDone /> : null}
                                    </MenuItem>
                                )}
                            </Select>

                        </FormControl>
                    </FormGroup>
                </>
            </DialogContent>
            <DialogActions>
                <Button secondary onClick={handleClose}>
                    Cancel
                </Button>
                <SubmitButton />
            </DialogActions>
        </Dialog>
    );
};

export default Modal;



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';

// import { Paper, Slide, ClickAwayListener } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         height: 180,
//     },
//     wrapper: {
//         width: 100 + theme.spacing(2),
//     },


// }));

// export default function EditUser({ open, setOpen }) {
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <ClickAwayListener onClickAway={(e) => { console.log("CLICKWED AWAY", e) }}>
//                 <div className={classes.wrapper}>
//                     <Slide direction="left" in={open} mountOnEnter unmountOnExit>
//                         <Paper elevation={4} className={classes.paper}>
//                             <button onClick={() => setOpen(false)}>Close me</button>
//                             MY EDIT MODAL
//                         </Paper>
//                     </Slide>
//                 </div>
//             </ClickAwayListener>
//         </div>
//     );
// }