import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import LinearProgress from "@mui/material/LinearProgress";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { CircularProgress, makeStyles, Menu, MenuItem, Typography } from "@material-ui/core";
import { FiClock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentLessonDetailsAction, changeCurrentTopicDetailsAction, setCurrentTopicDetailsAction } from "redux/actions";


// Assets
import chevronDown from "assets/chevronDown.svg";
import circleCheck from "assets/circle-check-blue.svg";
import { convertSecsToDuration } from "utils/convertTime";
import { getPercentage } from "utils/misc";
import { useTheme } from "@emotion/react";
import isEmpty from "utils/is-empty";


const useStyles = makeStyles((theme) => ({
    listRoot: {
        "& .MuiListItemText-primary": {
            fontFamily: theme.typography.fontFamily + "!important",
            fontSize: "0.8rem",
            [theme.breakpoints.down("md")]: {
                "maxWidth": "160px",
                "whiteSpace": "nowrap",
                "overflow": "hidden",
                "textOverflow": "ellipsis"
            },
        },
        "& .MuiPaper-root": {
            minWidth: "78%",
        },

    },
    progressRoot: {
        // veryLightGray4
        backgroundColor: `${theme.palette.border.gray7} !important`,
        borderRadius: "5px !important",
        width: "140px !important",
        height: "10px !important",
    },
    mobileDrawer: {

        "& .MuiPaper-root": {
            // minWidth: "78%",
            minWidth: "72%",
            [theme.breakpoints.down("md")]: {
                maxWidth: "80%",
            },
            "& .MuiBox-root": {
                width: "100%"
            },
        }
    },
    list: {
        fontFamily: theme.typography.fontFamily,
        "& .time": {
            fontSize: "0.8rem",
        }
    },
    // linearProgress: {
    //     width: "130px"
    // },
    nextChapterContainer: {
        // marginTop
        padding: "1.5rem 2rem",
        width: "100%",
        paddingBottom: "1.5rem",
        position: "relative",
        [theme.breakpoints.down("500")]: {
            padding: ".5rem 1rem",
        },
        // flex: 1.2,
        "& .chapInner": {
            border: "1px solid #0000001A",
            padding: ".6rem 1rem",
            borderRadius: "8px",
            transition: "all .3s ease",
            background: "#fff",

            "&:hover": {
                cursor: 'pointer',
                boxShadow: "0px 2px 8px rgb(49 54 62 / 15%)",
            },
            "& .heading": {
                // gradientBlue
                // color: theme.palette.text.link_sec,
                color: "#4D9BD5",
                fontSize: "10px",
                fontWeight: "500",
            },
            "& .title": {
                fontSize: "15px",
                fontWeight: "400",
                [theme.breakpoints.down("600")]: {
                    "display": "-webkit-box",
                    "overflow": "hidden",
                    "textOverflow": "ellipsis",
                    "WebkitBoxOrient": "vertical",
                    "WebkitLineClamp": "1",
                    "maxWidth": "200px",
                },
            },
            "& .flexContainer": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& .MuiLinearProgress-root": {
                    width: "130px",
                    height: "6px !important",
                    borderRadius: "100px",
                    [theme.breakpoints.down("500")]: {
                        width: "100px",
                    },
                },
                "& .MuiLinearProgress-colorPrimary": {
                    backgroundColor: `${theme.palette.border.gray7}!important`,
                    marginTop: ".5rem",
                },
                "& .MuiLinearProgress-barColorPrimary": {
                    backgroundColor: `${theme.palette.text.link_sec} !important`,
                },
                "& .duration": {
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                    fontSize: "12px",
                    fontWeight: "500",
                    "& .icon": {
                        height: "14px",
                        width: "14px"
                    }
                },
            },
        },

        "& .none": {
            display: "none",
        },
    },
    chapterContainer: {
        padding: "1.2rem 2rem",
        [theme.breakpoints.down("500")]: {
            padding: "1.2rem 1rem",
        },
        width: "100%",
        position: "relative",


        "& .MuiTypography-root": {
            fontFamily: `${theme.typography.fontFamily} !important`,
            "display": "-webkit-box",
            "overflow": "hidden",
            "textOverflow": "ellipsis",
            "WebkitBoxOrient": "vertical",
            "WebkitLineClamp": "1",
            "maxWidth": "200px",
        },

        "& .chapInner": {
            backgroundColor: "#fff",
            border: "1px solid #0000001A",
            padding: ".9rem 1rem",
            borderRadius: "8px",
            transition: "all .3s ease",
            fontFamily: theme.typography.fontFamily,
            "&:hover": {
                cursor: 'pointer',
                boxShadow: "0px 2px 8px rgb(49 54 62 / 15%)",
            },
            "& .flexContainer": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 .5rem",
                position: "relative",
                "& .MuiLinearProgress-root": {
                    width: "130px",
                    height: "5px !important",
                    borderRadius: "100px",
                    [theme.breakpoints.down("500")]: {
                        width: "100px",
                    },
                },
                "& .MuiLinearProgress-colorPrimary": {
                    backgroundColor: `${theme.palette.border.gray7} !important`,
                    marginTop: ".5rem",
                },
                "& .MuiLinearProgress-barColorPrimary": {
                    backgroundColor: `${theme.palette.text.link_sec} !important`,
                    borderRadius: "100px",
                },
                "& .duration": {
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: theme.typography.fontFamily,
                },
            },
        },


        "& .none": {
            display: "none",
        },
    },
    listCont: {
        // flex: 1.6,
        // boxShadow: "0px -15px 5px -15px rgb(49 54 62 / 15%) inset, 0px 15px 5px -15px rgb(49 54 62 / 15%) inset",
        height: "100%",
        boxShadow: "1px 15px 5px -15px rgb(49 54 62 / 15%) inset",
        padding: '2rem !important',
        paddingTop: '1.5rem !important',
        overflowY: "auto",
        [theme.breakpoints.down("500")]: {
            padding: "1rem !important",
        },

        "&::-webkit-scrollbar": {
            "width": "8px"
        },
        "&::-webkit-scrollbar-track": {
            "background": "#fff"
        },
        "&::-webkit-scrollbar-thumb": {
            "background": "#F9ECEC",
            "borderRadius": "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            "background": "#f1d2d2"
        },

        "& .MuiTypography-root": {
            fontFamily: `${theme.typography.fontFamily} !important`,
            fontSize: "14px",
            "display": "-webkit-box",
            "overflow": "hidden",
            "textOverflow": "ellipsis",
            "WebkitBoxOrient": "vertical",
            "WebkitLineClamp": "1",
            "maxWidth": "200px"
        },

        "& .item": {
            border: `1px solid ${theme.palette.background.selected}`,
            background: 'transparent',
            borderRadius: "6px",
            padding: "1rem",
            "& .item-details": {
                // marginBottom: ".5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& .item-details-title": {
                    display: "flex",
                    gap: ".5rem"
                }

            },
            "& .MuiLinearProgress-root": {
                width: "130px",
                height: "5px !important",
                borderRadius: "100px",
            },
            "& .MuiLinearProgress-colorPrimary": {
                backgroundColor: `${theme.palette.border.gray7} !important`,
                marginTop: ".5rem",
            },
            "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: `${theme.palette.text.link_sec} !important`,
            },
            "&:not(:last-child)": {
                marginBottom: ".5rem",
            },
            "&.active": {
                background: theme.palette.background.lightBlue,
            },
            "&:hover": {
                cursor: 'pointer',
                background: theme.palette.background.hoverTopic
            },
            "& .duration": {
                fontSize: '10px',
                color: theme.palette.text.primary
            }
        },
    },
    downloadBtnWrapper: {
        "& .downloadBtn": {
            // gradientBlue
            color: theme.palette.text.link_sec,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".1rem",
            fontSize: '13px',
            cursor: "pointer",
            // marginBottom: '10px',
            // marginTop: '8px',
            margin: '5px 0',
            "& svg": {
                width: "16px",
                height: "16px",
            }
        },
    },
    Menu: {
        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded": {

            "top": "90px !important",
            "left": "35px !important",
            "position": "relative",
            // "maxWidth": "50% !important",
            // "width": "100% !IMPORTANT"
        }

    }


}));

const drawerWidth = 390;


export default function DrawerMobileNav({ mobileDrawer, setMobileDrawer, drawerType }) {
    // const [mobileDrawer, setMobileDrawer] = React.useState(false);
    // const [open, setOpen] = React.useState(true);

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const ITEM_HEIGHT = 45;


    const user = useSelector((state) => state.auth.user);
    const currentTopicsAll = useSelector((state) => state.topic.allTopics);
    const currentTopicSelected = useSelector((state) => state.topic.currentTopic);
    const currentLessonsAll = useSelector((state) => state.lesson.allLessons);
    const nextLesson = useSelector(state => state.lesson.nextLesson);
    const currentLessonSelected = useSelector((state) => state.lesson.currentLesson);
    const currentLessonTotalDuration = useSelector((state) => state.lesson?.currentLesson?.progress?.duration);
    const currentLessonCompletedDuration = useSelector((state) => state.lesson?.currentLesson?.progress?.complete);
    const currentLessonAttachments = currentLessonSelected?.details?.attachments;
    const nextLessonCompletedDuration = useSelector((state) => state.lesson?.nextLesson?.progress?.completedDuration);
    const nextLessonTotalDuration = useSelector((state) => state.lesson?.nextLesson?.progress?.totalDuration);
    const loading = useSelector(state => state.learnLoader.loading)

    const handleClickChangeTopic = async (topic) => {
        const allTopicsWithDetailsOnly = currentTopicsAll.map(item => item.details)

        await dispatch(
            changeCurrentTopicDetailsAction(topic, allTopicsWithDetailsOnly, user)
        );
    };
    const handleClickChangeLesson = async (lesson) => {
        // handleClose();
        // console.log("handleClickChangeLesson")
        const allLessonsWithDetailsOnly = currentLessonsAll?.map(item => item.details)
        dispatch(changeCurrentLessonDetailsAction(lesson, allLessonsWithDetailsOnly));


        const changedLessonTopic = lesson.topics[0];
        const currentLessonAllTopics = lesson.topics;

        await dispatch(
            setCurrentTopicDetailsAction(
                changedLessonTopic,
                currentLessonAllTopics,
                user
            )
        );


    };


    const TopicProgressbar = ({ isCompleted, completed, total }) => {
        if (isCompleted) return null

        return (
            <LinearProgress value={getPercentage(completed, total)} variant="determinate" style={{ marginTop: ".5rem" }} />
            // style={classes.linearProgress}
        )
    }

    // const customStyles = {
    //     mainBox: {
    //         display: "flex",
    //         [theme.breakpoints.down("md")]: {
    //             flexDirection: "column"
    //         },
    //     },
    //     drawer: {
    //         width: drawerWidth,
    //         flexShrink: 0,

    //         "& .MuiDrawer-paper": {
    //             width: drawerWidth,
    //             boxSizing: "border-box",
    //             zIndex: "0",
    //             marginTop: "111px",
    //         },
    //         // display: { xs: "none", md: "block" },

    //         [theme.breakpoints.down("md")]: {
    //             display: 'none',
    //             transform: "none",
    //             transition: "none"
    //         },
    //     },
    //     drawerHeader: {
    //         // boxShadow: open ? "0px 4px 8px rgba(0, 0, 0, 0.04)" : 'none',
    //         flex: isEmpty(nextLesson) ? 'unset' : 1.2,
    //         paddingBottom: currentLessonAttachments?.length > 0 ? '35px' : "15px",
    //         // minHeight: currentLessonAttachments.length > 0 ? "220px" : "200px",
    //         maxHeight: "196px",
    //     },
    //     linearProgress: {
    //         width: "130px"
    //     },
    //     listContent: {
    //         ...(!open && { display: "none" }),
    //         // maxHeight: isEmpty(nextLesson) ? 'unset' : '280px'
    //         maxHeight: isEmpty(nextLesson) ? '313px' : "226px",
    //     }
    // }



    const NextLesson = () => {
        if (isEmpty(nextLesson?.details)) return null
        return (
            <div onClick={() => handleClickChangeLesson(nextLesson?.details)} className={classes.nextChapterContainer}>
                <div className={`${mobileDrawer ? classes.nextPrevBox : "none"} `}>
                    <div className={mobileDrawer ? "chapInner" : "none"}>
                        <Typography className="heading">Next lesson</Typography>
                        <Typography className="title">{nextLesson?.details?.title || 'lesson'}</Typography>
                        <div>
                            <div className="flexContainer">
                                <LinearProgress
                                    value={getPercentage(nextLessonCompletedDuration, nextLessonTotalDuration)}
                                    // style={classes.linearProgress}
                                    variant="determinate"
                                />
                                <Typography className="duration">
                                    <FiClock className="icon" />
                                    {convertSecsToDuration(nextLesson?.details?.duration)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const LessonDropdownContent = () => {
        if (isEmpty(currentLessonsAll))
            return null

        return (
            <div className={classes.chapterContainer}>
                <div className={`${mobileDrawer ? classes.nextPrevBox : "none"}`} onClick={e => handleClick(e)}>
                    <div className={mobileDrawer ? "chapInner" : "none"} style={{ cursor: "pointer" }}>
                        <div className="flexContainer">
                            <Typography
                                style={{ fontSize: "14px", fontWeight: "500", }}>
                                {currentLessonSelected?.details?.title || "lesson"}
                            </Typography>
                            <img src={chevronDown} />
                        </div>
                        <div>
                            <div className="flexContainer">
                                <LinearProgress
                                    value={getPercentage(currentLessonCompletedDuration, currentLessonTotalDuration)}
                                    // style={customStyles.linearProgress}
                                    variant="determinate"
                                />
                                <Typography className="duration">
                                    <FiClock style={{ height: "14px", width: "14px" }} />
                                    {convertSecsToDuration(currentLessonSelected?.details?.duration)}
                                </Typography>
                            </div>
                        </div>
                    </div>

                </div>

                <Menu
                    id="long-menu"
                    MenuListProps={{ "aria-labelledby": "long-button" }}
                    anchorEl={anchorEl}
                    open={openMenu}
                    anchorOrigin={{ vertical: "center", horizontal: "center" }}
                    transformOrigin={{ vertical: "center", horizontal: "center" }}
                    onClose={handleClose}
                    onClick={handleClose}
                    className={classes.Menu}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "320px",
                        },
                    }}

                >
                    {currentLessonsAll && currentLessonsAll.map(({ details, progress }) => (
                        <MenuItem
                            key={details._id}
                            selected={details.title === currentLessonSelected?.details?.title}
                            onClick={() => handleClickChangeLesson(details)}
                            style={{
                                // fontFamily: `${theme.typography.fontFamily} !important`,
                                fontFamily: `poppins !important`,
                            }}
                        >
                            {details.title}
                        </MenuItem>
                    ))}
                </Menu>
            </div>)
    }


    const list = (anchor) => (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={() => setMobileDrawer(false)}
            onKeyDown={() => setMobileDrawer(false)}
        >

            {loading ? <CircularProgress className={classes.circularProgress} /> :
                <List classes={{ root: classes.listCont }} >
                    {/* sx={customStyles.listContent} */}
                    {currentTopicsAll && currentTopicsAll.map(({ details, progress }, i) => (
                        <div
                            onClick={() => handleClickChangeTopic(details)}
                            disabled={loading}
                            className={details?._id === currentTopicSelected?.details?._id ? "item active" : "item"}
                            key={details?._id}>
                            <div className="item-details">
                                <div className="item-details-title">
                                    {progress.isCompleted && <img src={circleCheck} height={20} width={20} />}
                                    <Typography>{details.title}</Typography>
                                </div>

                                <Typography className='duration' style={{
                                    display: "flex",
                                    "alignItems": "center",
                                    "gap": "0.2rem",
                                    "justifyContent": "center"
                                }}>
                                    <FiClock style={{ height: "14px", width: "14px" }} />
                                    {convertSecsToDuration(details.duration)}
                                </Typography>
                            </div>
                            {
                                details?._id === currentTopicSelected?.details?._id ?
                                    <TopicProgressbar
                                        isCompleted={currentTopicSelected?.progress.isCompleted}
                                        completed={currentTopicSelected?.progress.complete}
                                        total={currentTopicSelected?.progress.duration}
                                    /> :
                                    <TopicProgressbar
                                        isCompleted={progress.isCompleted}
                                        completed={progress.completedDuration}
                                        total={progress.totalDuration}
                                    />
                            }
                        </div>
                    ))}
                </List>
            }
        </Box>
    );

    const Lessons = () => {


        return (
            <List
                classes={{ root: classes.listCont }}
                onClick={() => setMobileDrawer(false)}
                onKeyDown={() => setMobileDrawer(false)}
            >
                {currentLessonsAll && currentLessonsAll.map(({ details, progress }) => (
                    <div
                        onClick={() => handleClickChangeLesson(details)}
                        disabled={loading}
                        className={details.title === currentLessonSelected?.details?.title ? "item active" : "item"}
                        key={details?._id}>
                        <div className="item-details">
                            <div className="item-details-title">
                                {progress.isCompleted && <img src={circleCheck} height={20} width={20} />}
                                <Typography>{details.title}</Typography>
                            </div>

                            <Typography className='duration' style={{
                                display: "flex",
                                "alignItems": "center",
                                "gap": "0.2rem",
                                "justifyContent": "center"
                            }}>
                                <FiClock style={{ height: "14px", width: "14px" }} />
                                {convertSecsToDuration(details.duration)}
                            </Typography>
                        </div>
                        {
                            details?._id === currentTopicSelected?.details?._id ?
                                <TopicProgressbar
                                    isCompleted={currentTopicSelected?.progress.isCompleted}
                                    completed={currentTopicSelected?.progress.complete}
                                    total={currentTopicSelected?.progress.duration}
                                /> :
                                <TopicProgressbar
                                    isCompleted={progress.isCompleted}
                                    completed={progress.completedDuration}
                                    total={progress.totalDuration}
                                />
                        }
                    </div>

                ))}
            </List>)

    }

    return (
        <div>
            {/* <Button onClick={() => setMobileDrawer(true)}>left</Button> */}

            <Drawer
                anchor={"left"}
                open={mobileDrawer}
                onClose={() => setMobileDrawer(false)}
                classes={{ root: classes.mobileDrawer }}
            >
                {/* <LessonDropdownContent /> */}
                {drawerType === "lesson" ?
                    <Lessons /> :

                    list("left")
                }

                {/* <NextLesson /> */}

            </Drawer>
        </div>
    );
}
