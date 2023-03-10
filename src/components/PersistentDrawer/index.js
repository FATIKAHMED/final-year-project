// * Libraries
import React, {
  // useEffect,
  useState
} from "react";
import clsx from "clsx";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrentTopicDetailsAction,
  changeCurrentLessonDetailsAction,
  setTopicCompletionStatusAction,
  setCurrentTopicDetailsAction,
  updateUserTopicProgressDetailsAction,
} from "redux/actions";

// * Utilities
import { convertSecsToDuration } from "utils/convertTime";

// * Components
import {
  Drawer,
  // AppBar,
  // Toolbar,
  List,
  // Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  // CssBaseline,
  Button,
  // Checkbox,
  Menu,
  LinearProgress,
  MenuItem,
} from "@material-ui/core";

// * Icons
// import { VscUnlock } from "react-icons/vsc";
import { BiCheckCircle } from "react-icons/bi";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const drawerWidth = 350;

const StyledMenu = withStyles({
  paper: {
    // lightGrey
    border: `1px solid ${theme.palette.border.gray1}`,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.background.hover,
      // '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      //   color: theme.palette.common.white,
      // },
    },
    "&.active": {
      backgroundColor: theme.palette.background.selected,
      color: theme.palette.text.active,
    },
    "&:focus.active": {
      backgroundColor: theme.palette.background.hover,
      color: theme.palette.text.active,
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: "68px",
    zIndex: 0,
    overflow: "hidden",
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  topicsListContainer: {
    overflowY: "auto",
    maxHeight: "430px",
    paddingBottom: "50px",
    "& .active": {
      backgroundColor: theme.palette.background.selected,
      color: theme.palette.text.active,
    },
    "& .checkmark-svg": {
      color: theme.palette.text.active,
    },
  },
}));

export default function PersistentDrawerLeft({ bodyContent }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const contentProgress = user.contentProgress;
  const courseDetails = useSelector((state) => state.courses.courseDetails);
  const currentLessonSelected = useSelector(
    (state) => state.lesson.currentLesson
  );

  const currentLessonsAll = useSelector((state) => state.lesson.allLessons);
  const currentTopicSelected = useSelector((state) => state.topic.currentTopic);
  const currentTopicsAll = useSelector((state) => state.topic.allTopics);
  const nextLesson = useSelector((state) => state.lesson.nextLesson);
  // const currentLessonSelectedProgress = user.contentProgress.topics.filter(topic => topic.id === currentTopicSelected.details._id)[0]

  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTopicComplete = (topicId) => (event) => {
    // console.log("handleChangeTopicComplete", topicId, event.target.checked);

    dispatch(
      setTopicCompletionStatusAction(topicId, true, currentLessonSelected, user)
    );

    // TODO: Dispatch topic isCompleted manual Check WITH THROTTLE
    setChecked(event.target.checked);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //? Changes current topic video playing
  const handleClickListItemTopic = async (topic) => {
    const allTopicsWithDetailsOnly = currentTopicsAll.map(item => item.details)

    await dispatch(
      changeCurrentTopicDetailsAction(topic, allTopicsWithDetailsOnly, user)
    );
  };

  //? Changes current lessons video playing
  const handleClickLessonList = async (lesson) => {
    const allLessonsWithDetailsOnly = currentLessonsAll?.map(item => item.details)

    dispatch(changeCurrentLessonDetailsAction(lesson, allLessonsWithDetailsOnly));


    const currentLessonFirstTopic = lesson.topics[0];

    const currentLessonAllTopics = lesson.topics;
    await dispatch(
      setCurrentTopicDetailsAction(
        currentLessonFirstTopic,
        currentLessonAllTopics,
        user
      )
    );


    handleClose();
  };

  const renderProgress = (id, progressArray) => {
    const content = progressArray?.find((item) => item.id === id);
    if (content?.isCompleted)
      return <BiCheckCircle className="checkmark-svg" />;
    else
      return (
        <div>
          <LinearProgress
            max={content?.totalDuration}
            style={{ width: "100px" }}
            variant="determinate"
            value={content?.completedDuration}
          />
        </div>
      );
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginLeft: "1rem",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <BsChevronRight />
        </IconButton>
      </div>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <BsChevronLeft /> : <BsChevronLeft />}
          </IconButton>
        </div>
        <div>
          <div>
            <h4>{courseDetails.title}</h4>
            <p>{courseDetails.headline}</p>
          </div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            disabled={loading}
            onClick={handleClick}
          >
            <h3>{currentLessonSelected.details.title}</h3>
            {renderProgress(
              currentLessonSelected.details._id,
              contentProgress.lessons
            )}
            <div>{convertSecsToDuration(currentLessonSelected.duration)}</div>
            {/* <div>Progressed:{currentLessonSelectedProgress.completed.toString()}</div>
            <div>Duration:{currentLessonSelectedProgress.total.toString()}</div> */}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {currentLessonsAll.map(
              ({ details }) => (
                // <Button>
                <StyledMenuItem
                  onClick={() => handleClickLessonList(lesson)}
                  className={
                    lesson._id === currentLessonSelected.details._id
                      ? "active"
                      : ""
                  }
                >
                  <ListItemText>
                    <h3>{lesson.title}</h3>
                    {renderProgress(lesson._id, contentProgress.lessons)}
                    <div>{convertSecsToDuration(lesson.duration)}</div>
                  </ListItemText>
                </StyledMenuItem>
              )
              // </Button>
            )}
          </StyledMenu>
          <div>
            <Button>Download a worksheet for this chapter</Button>
          </div>
        </div>
        <Divider />
        <div className={classes.topicsListContainer}>
          <List>
            {currentTopicsAll.map(({ details, progress }, i) => (
              <ListItem
                key={details._id}
                disabled={loading}
                onClick={() => handleClickListItemTopic(details)}
                className={
                  details._id === currentTopicSelected.details._id ? "active" : ""
                }
                button
              >
                {/* <ListItemIcon>{index && index % 2 === 0 ? <VscUnlock /> : <VscUnlock />}</ListItemIcon> */}
                <ListItemIcon>
                  {/* <VscUnlock /> */}
                  {renderProgress(details._id, contentProgress.topics)}
                  {/* {topic.isCompleted && (
                    <BiCheckCircle className="checkmark-svg" />
                  )} */}
                  {/* <Checkbox
                    // checked={checked}

                    checked={topic.isCompleted}
                    onChange={handleChangeTopicComplete(topic._id)}
                    onClick={(event) => event.stopPropagation()}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    disableRipple
                  /> */}
                </ListItemIcon>
                <ListItemText>
                  <h5>{details.title}</h5>
                  {/* {!topic.isCompleted && ( */}
                  <>
                    <p>{convertSecsToDuration(details.duration)}</p>
                    {/* <p>{topic.progressCompleted}</p> */}
                  </>
                  {/* )} */}
                </ListItemText>
              </ListItem>
            ))}
          </List>

          <Divider />
          {nextLesson && (
            <Button
              disabled={loading}
              onClick={() => handleClickLessonList(nextLesson)}
            >
              <h3>Next Lesson</h3>
              <div>
                <div>{nextLesson.title}</div>
                {renderProgress(nextLesson._id, contentProgress.lessons)}
                <div>{convertSecsToDuration(nextLesson.duration)}</div>
              </div>
            </Button>
          )}
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {bodyContent}
      </main>
    </div>
  );
}
