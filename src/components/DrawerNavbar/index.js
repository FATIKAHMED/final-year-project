import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Tooltip } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { BsChevronLeft, BsChevronRight, BsChevronDown } from "react-icons/bs";
import chevronDown from "assets/chevronDown.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { FiClock } from "react-icons/fi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "utils/is-empty";
import { convertSecsToDuration } from "utils/convertTime";
import { changeCurrentLessonDetailsAction, setCurrentTopicDetailsAction, changeCurrentTopicDetailsAction, updateUserTopicProgressDetailsAction, setUserContentProgressAction } from 'redux/actions'
import { getPercentage } from "utils/misc";
import LessonBox from "components/LessonBox";
import circleCheck from "assets/circle-check-blue.svg";

// const drawerWidth = 300;
const drawerWidth = 390;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth - 50}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  margintTop: "64px",
  fontFamily: theme.typography.fontFamily,
}));

const useStyles = makeStyles((theme) => ({

  drawerRoot: {
    "& .MuiPaper-root": {
      fontFamily: theme.typography.fontFamily,
      // transform: "translateX(-250px) !important",
      transform: "translateX(-340px) !important",
      visibility: "visible !important",
    },

  },
  font: {
    fontFamily: theme.typography.fontFamily,
  },
  nextPrevBox: {
    border: "1px solid #0000001A",
    padding: "0 0 0.3rem 0rem",
    borderRadius: "8px",
    borderTop: 0,
    backgroundColor: "#0000000d",
  },
  circularProgress: {
    position: "absolute",
    left: "50%",
    top: "30%",
  },
  drawerHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",

    "& .drawerTitleContainer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      "& .drawerHeaderBtn": {
        padding: ".5rem",
        cursor: "pointer",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRight: "0",
        display: "flex",
        borderRadius: "8px 0px 0px 8px",
        alignItems: "center",
      },
      "& .headingCont": {
        display: "flex",
        flexDirection: "column",
        // padding: "1rem",
        // padding: "1.5rem 2rem",
        padding: "1rem 2rem",
        "& .courseHeading": {
          width: "260px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontWeight: "500",
          fontSize: "20px",
          fontFamily: theme.typography.fontFamily,
        },
        "& .courseSubHeading": {
          fontWeight: "500",
          fontSize: "11px",
          fontFamily: theme.typography.fontFamily,
          "display": "-webkit-box",
          "overflow": "hidden",
          "textOverflow": "ellipsis",
          "WebkitBoxOrient": "vertical",
          "WebkitLineClamp": "1",
        },
      },
    }
  },
  chapterContainer: {
    padding: ".2rem 2rem",
    width: "100%",
    // paddingBottom: "1.5rem",
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
    height: "100%",
    // boxShadow: "0px -15px 5px -15px rgb(49 54 62 / 15%) inset, 0px 15px 5px -15px rgb(49 54 62 / 15%) inset",
    boxShadow: "1px 15px 5px -15px rgb(49 54 62 / 15%) inset",

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
    },
    // padding: ".5rem 1rem",
    paddingLeft: "2rem !important",
    paddingRight: "1rem !important",
    paddingTop: '20px !important',

    overflowY: "auto",
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
        marginTop: ".5rem"
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
  nextChapterContainer: {
    // marginTop
    padding: ".5rem 2rem",
    width: "100%",
    paddingBottom: "1.5rem",
    position: "relative",
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
      },
      "& .flexContainer": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .MuiLinearProgress-root": {
          width: "130px",
          height: "6px !important",
          borderRadius: "100px",
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
    position: "absolute",
    top: "254px !important",
    left: "20px !important",

  }

}));

export default function DrawerNavbar({ bodyContent }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch()

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const ITEM_HEIGHT = 45;

  const user = useSelector((state) => state.auth.user);
  const courseDetails = useSelector((state) => state.courses.courseDetails);
  const currentCourseLessons = useSelector((state) => state.courses.courseDetails.lessons);
  const currentLessonSelected = useSelector((state) => state.lesson.currentLesson);
  const currentLessonsAll = useSelector((state) => state.lesson.allLessons);
  const currentTopicSelected = useSelector((state) => state.topic.currentTopic);
  const currentTopicsAll = useSelector((state) => state.topic.allTopics);
  const nextLesson = useSelector(state => state.lesson.nextLesson);
  const currentLessonAttachments = currentLessonSelected?.details?.attachments;


  const loading = useSelector(state => state.learnLoader.loading)
  const currentLessonCompletedDuration = useSelector((state) => state.lesson?.currentLesson?.progress?.complete);
  const currentLessonTotalDuration = useSelector((state) => state.lesson?.currentLesson?.progress?.duration);

  const nextLessonCompletedDuration = useSelector((state) => state.lesson?.nextLesson?.progress?.completedDuration);
  const nextLessonTotalDuration = useSelector((state) => state.lesson?.nextLesson?.progress?.totalDuration);

  const enrolLessonsAll = useSelector((state) => state.enrol?.current?.lessonsProgress);
  const enrolTopicsAll = useSelector((state) => state.enrol?.current?.topicsProgress);

  const customStyles = {
    mainBox: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column"
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,

      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        zIndex: "0",
        marginTop: "111px",
      },
      // display: { xs: "none", md: "block" },

      [theme.breakpoints.down("960")]: {
        display: 'none',
        transform: "none",
        transition: "none"
      },
    },
    drawerHeader: {
      // boxShadow: open ? "0px 4px 8px rgba(0, 0, 0, 0.04)" : 'none',
      flex: isEmpty(nextLesson) ? 'unset' : 1.2,
      paddingBottom: currentLessonAttachments?.length > 0 ? '35px' : "15px",
      // minHeight: currentLessonAttachments.length > 0 ? "220px" : "200px",
      maxHeight: "196px",
    },
    linearProgress: {
      width: "130px"
    },
    listContent: {
      ...(!open && { display: "none" }),
      // maxHeight: isEmpty(nextLesson) ? 'unset' : '280px'
      maxHeight: isEmpty(nextLesson) ? '313px' : "226px",
    }
  }

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePercentage = () => {
    return getPercentage(currentLessonCompletedDuration, currentLessonTotalDuration)
  }

  // console.log("currentTopicAll-->", currentTopicsAll)
  const handleClickChangeLesson = async (lesson) => {
    handleClose();
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

  const handleClickChangeTopic = async (topic) => {
    const allTopicsWithDetailsOnly = currentTopicsAll.map(item => item.details)

    await dispatch(
      changeCurrentTopicDetailsAction(topic, allTopicsWithDetailsOnly, user)
    );
  };

  const LessonDropdownContent = () => {
    if (isEmpty(currentLessonsAll))
      return null

    return (
      <div className={classes.chapterContainer}>
        <div className={`${open ? classes.nextPrevBox : "none"}`} onClick={e => handleClick(e)}>
          <div className={open ? "chapInner" : "none"} style={{ cursor: "pointer" }}>
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
                  style={customStyles.linearProgress}
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
                fontFamily: `${theme.typography.fontFamily} !important`,
              }}
            >
              {details.title}
            </MenuItem>
          ))}
        </Menu>
      </div>)
  }

  const NextLesson = () => {
    if (isEmpty(nextLesson?.details)) return null
    return (
      <div onClick={() => handleClickChangeLesson(nextLesson?.details)} className={classes.nextChapterContainer}>
        <div className={`${open ? classes.nextPrevBox : "none"} `}>
          <div className={open ? "chapInner" : "none"}>
            <Typography className="heading">Next lesson</Typography>
            <Typography className="title">{nextLesson?.details?.title || 'lesson'}</Typography>
            <div>
              <div className="flexContainer">
                <LinearProgress
                  value={getPercentage(nextLessonCompletedDuration, nextLessonTotalDuration)}
                  style={customStyles.linearProgress}
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

  const TopicProgressbar = ({ isCompleted, completed, total }) => {
    if (isCompleted) return null

    return (
      <LinearProgress value={getPercentage(completed, total)} style={customStyles.linearProgress} variant="determinate" />
    )
  }

  return (
    <Box sx={customStyles.mainBox}>

      <CssBaseline />
      <Drawer
        sx={customStyles.drawer}
        classes={!open ? { root: classes.drawerRoot } : {}}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {loading ? <CircularProgress className={classes.circularProgress} /> : <>
          <DrawerHeader
            style={customStyles.drawerHeader}
            className={classes.drawerHeader}>
            <div className="drawerTitleContainer">
              <div className="headingCont">
                {/* <Tooltip placement="right" arrow title="Hello World this is a new course"> */}
                <Typography className="courseHeading">
                  {courseDetails.title || 'course'}
                </Typography>
                {/* </Tooltip> */}
                <Typography className="courseSubHeading">{courseDetails.headline || 'headline'}</Typography>
              </div>
              <div onClick={handleDrawer} className="drawerHeaderBtn">
                {open ? <BsChevronLeft /> : <BsChevronRight />}
              </div>
            </div>

            <LessonDropdownContent />
            <div className={classes.downloadBtnWrapper}>

              {!isEmpty(currentLessonSelected?.details?.attachments) &&
                <span className="downloadBtn">
                  <HiOutlineDocumentDownload style={{ height: "24px", width: "24px" }} />
                  Downloadable
                </span>
              }
            </div>

          </DrawerHeader>

          <List classes={{ root: classes.listCont }} sx={customStyles.listContent}>
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
                  <Typography className='duration'>{convertSecsToDuration(details.duration)}</Typography>
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
          <NextLesson />
        </>
        }
      </Drawer>

      <Main open={open} sx={{
        [theme.breakpoints.down('960')]: {
          marginLeft: 0,
        },
      }}>
        <DrawerHeader />
        {bodyContent}
      </Main>
    </Box >
  );
}
