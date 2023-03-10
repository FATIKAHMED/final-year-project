// * Libraries
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { redirectToCustomerPortal, createNewUserAction } from 'redux/actions'

// * Utilities
import isEmpty from "utils/is-empty";
import { toDateTime, getDisplayDate } from "utils/convertTime";
import { ROLE, USER_STATUS, getStatusByValue } from 'utils/constants'

// * Components
import {
    IconButton,
    Grid,
    Typography,
    TableBody,
    TableHead,
    Menu,
    MenuItem,
    Button,
    Container,
    Card,
    CardHeader,
    CardContent,
    TableContainer,
    Box,
    Table,
    TableRow,
    TableCell,
    Select,
    FormGroup,
    FormLabel,
    FormControl,
    FilledInput,
    CircularProgress,
} from "@material-ui/core";
import SubscriptionCard from 'components/SubscriptionCard'
import TextInputField from "components/TextField";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem 0"
    },
    card: {
        marginBottom: '40px',
        "& .MuiCardHeader-root": {
            // veryLightGray6
            borderBottom: `1px solid ${theme.palette.border.gray9}`
        },
        "& .courses": {
            display: "flex",
            flexDirection: "column",

            "& .course": {
                display: "inline-block",
                margin: "10px 12px 10px",
                "& p": {
                    fontSize: '12px'
                }
            }

        }
    },
    info: {
        "& .profile-picture": {
            width: "50px",
            borderRadius: '50%',
        }
    },
    ordersHistory: {
        "& .orders": {
            display: "flex",
            flexDirection: "column",

            "& .order": {
                borderLeft: '5px solid rgba(178, 81, 223,.3)',
                paddingLeft: '20px',
                "& div": {
                    display: "flex",
                    marginBottom: '8px'
                },
                margin: "10px 12px 10px",
                "& p": {
                    fontSize: '12px'
                }
            }

        }
    },
    statusButton: {
        fontSize: 'revert',
        fontWeight: 'revert',
        padding: '5px 12px',
    },
    // card: {
    //     // boxShadow: boxShadows.boxShadow + "!important",
    // },
    cardRootDark: {
        backgroundColor: theme.palette.text.primary,
        "& *": {
            color: theme.palette.background.paper,
        },
        "& $tableCellRoot, & $tableRoot": {
            color: theme.palette.background.paper,
            borderColor: theme.palette.text.primary,
        },
        "& $tableCellRootHead": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.text.primary,
        },
    },
    cardHeader: {
        backgroundColor: "initial",
    },
    cardActionsRoot: {
        paddingBottom: "1.5rem!important",
        paddingTop: "1.5rem!important",
        borderTop: "0!important",
    },
    containerRoot: {
        [theme.breakpoints.up("md")]: {
            paddingLeft: "39px",
            paddingRight: "39px",
        },
    },
    tableRoot: {
        marginBottom: "0!important",
    },
    tableCellRoot: {
        verticalAlign: "middle",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        borderTop: "0",
    },
    tableCellRootHead: {
        // bgVeryLightGrey
        backgroundColor: theme.palette.background.veryLightGray,
        // slatGray
        color: theme.palette.background.slatGray,
    },

    tableCellRootBodyHead: {
        textTransform: "unset!important",
        fontSize: ".8125rem",
    },
    linearProgressRoot: {
        height: "3px!important",
        width: "120px!important",
        margin: "0!important",
    },

    verticalAlignMiddle: {
        verticalAlign: "middle",
    },
    avatarRoot: {
        width: "36px",
        height: "36px",
        fontSize: ".875rem",
    },
    tableCellLoading: {
        height: "36px",
    },
    rowLoading: {
        animation: `$loading 1000ms ${theme.transitions.easing.easeInOut} infinite alternate`,
    },
    "@keyframes loading": {
        "0%": {
            opacity: 0,
            background: "hsl(204deg 38% 97%)",
        },
        "100%": {
            opacity: 1,
            background: "hsl(204deg 38% 95%)",
        }
    },
    cardRoot: {
        border: "0!important",
    },
    cardRootSecondary: {
        // backgroundColor: theme.palette.secondary.main,
    },
    cardHeaderRoot: {
        backgroundColor: theme.palette.background.paper,
    },
    containerRoot: {
        [theme.breakpoints.up("md")]: {
            paddingLeft: "39px",
            paddingRight: "39px",
        },
    },
    gridItemRoot: {
        [theme.breakpoints.up("xl")]: {
            marginBottom: "0!important",
        },
    },
    typographyRootH6: {
        textTransform: "uppercase",
    },
    plLg4: {
        [theme.breakpoints.up("md")]: {
            paddingLeft: "1.5rem",
        },
    },
    ptMd4: {
        [theme.breakpoints.up("sm")]: {
            paddingTop: "1.5rem!important",
        },
    },
    mtMd5: {
        [theme.breakpoints.up("sm")]: {
            paddingTop: "3rem!important",
        },
    },
    cardHeaderRootProfile: {
        [theme.breakpoints.up("sm")]: {
            paddingBottom: "1.5rem!important",
            paddingTop: "1.5rem!important",
        },
    },
    buttonRootInfo: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.info.main,
        "&:hover": {
            backgroundColor: theme.palette.background.hover,
        },
    },
    buttonRootDark: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.text.primary,
        "&:hover": {
            backgroundColor: theme.palette.text.primary,
        },
    },
    profileImage: {
        verticalAlign: "middle",
        borderStyle: "none",
        transform: "translate(-50%,-30%)",
        transition: "all .15s ease",
    },
    cardProfileLink: {
        color: theme.palette.primary.main,
        backgroundColor: "initial",
        textDecoration: "none",
        fontSize: "1rem",
        "&:hover": {
            color: theme.palette.primary.dark,
        },
    },
    order1: {
        [theme.breakpoints.down("lg")]: {
            order: "1!important",
        },
    },
    order2: {
        [theme.breakpoints.down("lg")]: {
            order: "2!important",
        },
    },
    marginBottomXl0: {
        [theme.breakpoints.up("lg")]: {
            marginBottom: "0!important",
        },
    },
    selectInput: {
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        "& .MuiSelect-select:focus": {
            background: 'none',
        },
        "& .MuiSelect-select:hover": {
            background: 'none',
        },
        "&:hover, &:focus": {
            background: 'none',
        },
        "& .MuiSelect-icon": {
            top: 'auto'
        }

    },
    multiSelectMenuItemRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        "&:hover,&.Mui-selected:hover": {
            background: "rgba(0,0,0, 0.1)",
        },
        "&.Mui-selected": {
            background: "none",
        },

        "& svg": {
            fontSize: "25px",
            marginLeft: "auto",
            color: `${theme.palette.common.blue}`,
        },
    },
    snackbarRoot: {
        "& .MuiPaper-root": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
        }
    }
}));

const CreateNewUsersPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateInputFields = () => {
        let error = {}
        if (isEmpty(firstName)) {
            error.firstName = "Firstname is required"
        }
        if (isEmpty(lastName)) {
            error.lastName = "Lastname is required"
        }
        if (isEmpty(email)) {
            error.email = "Email is required"
        }
        if (isEmpty(password)) {
            error.password = "Password is required"
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
            return false
        }
        return true
    }

    const resetInputFields = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    const handleClickSubmit = async () => {
        if (validateInputFields()) {
            setLoading(true)
            const payload = { firstName, lastName, email, password, role: ROLE.BusinessStudent, businessId: user.business }
            const { res } = await dispatch(createNewUserAction(user._id, payload))
            if (res) {
                dispatch({
                    type: "TOAST",
                    payload: {
                        message: "Successfully created",
                        type: "succes"
                    },
                });
                resetInputFields()
                history.goBack()
            }
            setLoading(false)
        }

    }
    return (
        <>
            <Container>
                <div className={classes.container}>
                    <Button onClick={() => history.goBack()}>Back</Button>
                </div>



                <Card
                    classes={{
                        root: classes.cardRoot + " " + classes.cardRootSecondary,
                    }}
                >
                    <CardHeader
                        subheader={
                            <Grid
                                container
                                component={Box}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid item xs="auto">
                                    <Box
                                        component={Typography}
                                        variant="h5"
                                        marginBottom="0!important"
                                    >
                                        Create new users
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        classes={{ root: classes.cardHeaderRoot }}
                    ></CardHeader>
                    <CardContent>
                        <div className={classes.plLg4}>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <TextInputField
                                        label="First name"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(text) => setFirstName(text)}
                                        disabled={loading}
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Lucky"
                                        error={!isEmpty(errors.firstName)}
                                        errorText={errors.firstName}
                                        formContainer

                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInputField
                                        label="Last name"
                                        name="lasttName"
                                        value={lastName}
                                        disabled={loading}
                                        onChange={(text) => setLastName(text)}
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Jesse"
                                        error={!isEmpty(errors.lastName)}
                                        errorText={errors.lastName}
                                        formContainer

                                    />

                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <TextInputField
                                        label="Email"
                                        name="email"
                                        value={email}
                                        disabled={loading}
                                        onChange={(text) => setEmail(text)}
                                        autoComplete="on"
                                        type="email"
                                        placeholder="jesse@example.com"
                                        error={!isEmpty(errors.email)}
                                        errorText={errors.email}
                                        formContainer
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInputField
                                        label="Password"
                                        name="password"
                                        disabled={loading}
                                        value={password}
                                        onChange={(text) => setPassword(text)}
                                        autoComplete="off"
                                        type="password"
                                        placeholder=""
                                        error={!isEmpty(errors.password)}
                                        errorText={errors.password}
                                        formContainer

                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                classes={{ root: classes.buttonRoot }}
                                onClick={() => handleClickSubmit()}
                            >
                                Save
                                {loading && <CircularProgress size={24} style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: -12,
                                    marginLeft: -12,
                                }} />}
                            </Button>
                        </div>
                        <Box
                            marginBottom="1.5rem!important"
                            marginTop="1.5rem!important"
                        />
                    </CardContent>
                </Card>


            </Container>
        </>
    )
}

export default CreateNewUsersPage
