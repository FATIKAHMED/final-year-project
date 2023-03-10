// * Libraries
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { redirectToCustomerPortal, getBusinessUsersAction } from 'redux/actions'

// * Hooks
import useToggle from 'hooks/toggle'

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
    Button, Container, Card, CardHeader, CardActions,
    TableContainer, Box, Table, TableRow, TableCell
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import EditUser from 'components/FormModals/EditUser'

// * Icons
import { MdMoreVert } from 'react-icons/md'

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
    bgPrimary: {
        backgroundColor: theme.palette.primary.main,
    },
    bgPrimaryLight: {
        backgroundColor: theme.palette.primary.light,
    },
    bgError: {
        backgroundColor: theme.palette.error.main,
    },
    bgErrorLight: {
        backgroundColor: theme.palette.error.light,
    },
    bgWarning: {
        backgroundColor: theme.palette.warning.main,
    },
    bgWarningLight: {
        backgroundColor: theme.palette.warning.light,
    },
    bgInfo: {
        backgroundColor: theme.palette.info.main,
    },
    bgInfoLight: {
        backgroundColor: theme.palette.info.light,
    },
    bgSuccess: {
        backgroundColor: theme.palette.success.main,
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
}));

const EmployeesPage = (props) => {
    const theme = useTheme()
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector((state) => state.auth.user)
    const coursesBought = useSelector((state) => state.courses.bought)
    const myOrdersHistory = useSelector((state) => state.order.history)
    const userSubscription = useSelector((state) => state.subscription.subscription)
    const allbusinessUsers = useSelector((state) => state.user.all)
    const allbusinessStudents = useSelector((state) => state.user.users)

    const [dataLoading, setDataLoading] = useState(false)
    const [menuOpen, toggleMenuOpen] = useToggle()
    const [editOpen, toggleEditOpen] = useToggle()
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [menuUser, setMenuUser] = useState(null)
    const [editModalFields, setEditModalFields] = useState({});

    useEffect(async () => {
        //     await dispatch(getBusinessUsersAction(user._id, ROLE.BusinessManager, typeof user.business === 'string' ? user.business : user.business._id))
        await dispatch(getBusinessUsersAction(user._id, ROLE.BusinessStudent, typeof user.business === 'string' ? user.business : user.business._id))
        //     await dispatch(getBusinessUsersAction(user._id, null, typeof user.business === 'string' ? user.business : user.business._id))
    }, [])



    const handleClickMenu = (e, user) => {
        setMenuAnchor(e.currentTarget);
        toggleMenuOpen();
        setMenuUser(user);
    };
    const handleClickCloseMenu = () => {
        toggleMenuOpen();
        setMenuAnchor(false);
        setMenuUser(null);
    };

    const handleDetailsMenuItemClick = () => {
        history.goBack()
        handleClickCloseMenu()
    }
    const handleEditMenuItemClick = () => {
        toggleEditOpen()
        setEditModalFields(menuUser)
        handleClickCloseMenu()
    }

    const onPageChange = async (e, page) => {
        setDataLoading(true)
        await dispatch(getBusinessUsersAction(user._id, ROLE.BusinessStudent, typeof user.business === 'string' ? user.business : user.business._id, page))
        setDataLoading(false)
    }

    const getBusinessUserCourseCount = (courseObj) => {
        let totalCourseAccessable = 0;

        Object.entries(courseObj).forEach(([key, value]) => {
            if (value.hasAccess === true) {
                totalCourseAccessable += 1
            }
        });

        return totalCourseAccessable;
    }
    return (
        <>
            <Container>
                <div className={classes.container}>
                    <div className={classes.info}>
                        <h1 className="title">Users</h1>
                    </div>
                </div>


                <Card classes={{ root: classes.card }}>
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
                                        Users
                                    </Box>
                                </Grid>
                                <Grid item xs="auto">
                                    <Box
                                        justifyContent="flex-end"
                                        display="flex"
                                        flexWrap="wrap"
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            component={Link}
                                            to="/dashboard/users/new"
                                        >
                                            Create new
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        classes={{ root: classes.cardHeaderRoot }}
                    ></CardHeader>
                    <TableContainer>
                        <Box
                            component={Table}
                            alignItems="center"
                            marginBottom="0!important"
                        >
                            <TableHead>

                                <TableRow>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    >
                                        Email
                                    </TableCell>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    >
                                        # Courses
                                    </TableCell>
                                    <TableCell
                                        classes={{
                                            root:
                                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                                        }}
                                    ></TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>
                                {allbusinessStudents?.docs?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            classes={{
                                                root:
                                                    classes.tableCellRoot +
                                                    " " +
                                                    classes.tableCellRootBodyHead,
                                            }}
                                            component="th"
                                            variant="head"
                                            scope="row"
                                        >
                                            <Box alignItems="center" display="flex">
                                                <Box display="flex" alignItems="flex-start">
                                                    <Box fontSize=".875rem" component="span">
                                                        {item.firstName
                                                            ? item.firstName + " " + item.lastName
                                                            : "User"}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                            {item.email}
                                        </TableCell>
                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                            <Box
                                                paddingTop=".35rem"
                                                size="small"
                                                className={classes.statusButton}
                                                component={Button}
                                                // disabled={loadingStatus}
                                                // onClick={(e) => handleClickStatusMenu(e, item)}
                                                paddingBottom=".35rem">
                                                <Box
                                                    marginRight="10px"
                                                    component="i"
                                                    width=".375rem"
                                                    height=".375rem"
                                                    borderRadius="50%"
                                                    display="inline-block"
                                                    className={
                                                        classes.verticalAlignMiddle +
                                                        " " +
                                                        (item.status === 1
                                                            ? classes.bgSuccess
                                                            : item.status === 2
                                                                ? classes.bgWarning
                                                                : item.status === 3
                                                                    ? classes.bgInfo
                                                                    : item.status === 4
                                                                        ? classes.bgError
                                                                        : null)
                                                    }
                                                ></Box>
                                                {getStatusByValue(item.status)}
                                            </Box>
                                        </TableCell>
                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                            {item.businessCourse?.courses ? getBusinessUserCourseCount(item.businessCourse?.courses) : 0}
                                        </TableCell>
                                        <TableCell TableCell
                                            classes={{ root: classes.tableCellRoot }}
                                            align="right"
                                        >
                                            <Box
                                                aria-controls="action-menu"
                                                aria-haspopup="true"
                                                onClick={(e) => handleClickMenu(e, item)}
                                                size="small"
                                                component={Button}
                                                width="2rem!important"
                                                height="2rem!important"
                                                minWidth="2rem!important"
                                                minHeight="2rem!important"
                                            >
                                                <Box
                                                    component={MdMoreVert}
                                                    width="1.25rem!important"
                                                    height="1.25rem!important"
                                                    position="relative"
                                                    top="2px"
                                                    // color={theme.palette.gray[500]}
                                                    color='gray'
                                                />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <Menu
                                    id="action-menu"
                                    anchorEl={menuAnchor}
                                    keepMounted
                                    open={menuOpen}
                                    onClose={handleClickCloseMenu}

                                >
                                    {/* <MenuItem onClick={() => handleDetailsMenuItemClick()}>Details</MenuItem> */}
                                    <MenuItem onClick={() => handleEditMenuItemClick()}>Edit</MenuItem>
                                    {/* {user.role === ROLE.SuperAdmin &&
                                        <MenuItem onClick={() => handleDeleteMenuItemClick()}>Delete</MenuItem>
                                    } */}
                                </Menu>
                                <Menu
                                    id="status-menu"
                                    // anchorEl={statusMenuAnchor}
                                    keepMounted
                                // open={statusMenuOpen}
                                // onClose={handleClickCloseStatusMenu}

                                >
                                    {/* <MenuItem onClick={() => handleClickChangeStatus(USER_STATUS.active)}>Active</MenuItem>
                                    <MenuItem onClick={() => handleClickChangeStatus(USER_STATUS.inactive)}>In active</MenuItem> */}
                                    {/* //// <MenuItem onClick={() => handleClickChangeStatus(USER_STATUS.blocked)}>Blocked</MenuItem> */}
                                </Menu>
                            </TableBody>
                            <EditUser
                                open={editOpen}
                                setOpen={toggleEditOpen}
                                modalTitle="Edit User"
                                formFields={editModalFields}
                            />
                            {/* <EditUserModal
                                open={openEdit}
                                setOpen={setOpenEdit}
                                modalTitle="Edit User"
                                formFields={editModalFields}
                            />
                            <DeleteModal
                                open={openDelete}
                                setOpen={setOpenDelete}
                                modalTitle="Delete User"
                                formFields={deleteModalFields}
                                deleteDispatchAction={deleteUserAction}
                            /> */}
                        </Box>
                    </TableContainer>
                    <Box
                        classes={{ root: classes.cardActionsRoot }}
                        component={CardActions}
                        justifyContent="flex-end"
                    >
                        <Pagination
                            disabled={dataLoading}
                            onChange={onPageChange}
                            count={allbusinessStudents.totalPages}
                            color="primary" variant="outlined"
                        />
                    </Box>
                </Card>


            </Container>
        </>
    )
}

export default EmployeesPage
