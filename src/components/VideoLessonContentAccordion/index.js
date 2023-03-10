import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  //  Link,
  useHistory, useParams
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  // addCartItemAction,
  setCurrentTopicDetailsAction,
  setCurrentLessonDetailsAction,
  // getCourseDetailsAction,
  updateUserTopicProgressDetailsAction,
} from "redux/actions";

// * Components
import {
  LinearProgress,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

// * Utilities
import { convertSecsToDuration } from "utils/convertTime";

// * Icons
import { BiChevronDown } from "react-icons/bi";
import { GoPlay } from "react-icons/go";
// import { FiFile } from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { BsPlay } from "react-icons/bs";
import isEmpty from "utils/is-empty";

const Accordion = withStyles((theme) => ({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: theme.palette.border.gray7,
      height: "6px",
      borderRadius: "6px",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: theme.palette.text.link_sec,
      }
    }
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    padding: 0
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  accordionTitle: {
    // marginTop:"-2rem",
    padding: ".5rem 1rem",
    background: theme.palette.common.white,
    // border: "1px solid #E1E1E7",
    // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.04)",

    "& .accordion-title-content": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      marginLeft: "40px",
      marginRight: "30px",
      gap: "1rem",
      [theme.breakpoints.down("1100")]: {
        marginLeft: "30px",
        marginRight: "20px",
      },
      [theme.breakpoints.down("600")]: {
        "marginLeft": "1rem",
        "marginRight": "0px",
        "gap": ".5rem",
      },
      [theme.breakpoints.down("400")]: {
        "marginLeft": "0",
      },

      "& .title": {
        fontWeight: "500",
        fontSize: "18px",
        // overflow: "hidden",
        // textOverflow: "ellipsis",
        // whiteSpace: "pre-line",
        "width": "auto",
        "display": "-webkit-box !important",
        "overflow": "hidden !important",
        "fontWeight": "500",
        "whiteSpace": "pre-wrap",
        "textOverflow": "ellipsis",
        "WebkitLineClamp": "2",
        "WebkitBoxOrient": "vertical",
        maxWidth: "500px",

        [theme.breakpoints.between("960", "1200")]: {
          maxWidth: "430px",
          fontSize: "1rem"
        },
        [theme.breakpoints.down("960")]: {
          maxWidth: "470px",
          fontSize: "14px"
        },
        [theme.breakpoints.down("600")]: {
          // "maxWidth": "240px",          
          "maxWidth": "320px",
          fontSize: "12px",
          fontWeight: "600"
        },
        // flex: 1,
        // width: "30%",
      },
      "& .accordion-title-content-info": {

        color: theme.palette.text.cardTitle,
        display: "flex",
        // gap: "3.3rem",
        gap: "2.5rem",
        alignItems: "center",
        justifyContent: "flex-start",
        [theme.breakpoints.down("1100")]: {
          "gap": "1.5rem",
        },
        [theme.breakpoints.between("300", "600")]: {
          "gap": ".5rem",
        },

        "& .progressBarCont": {
          width: "25%"
        },
      },
      // lightSkyBlue
      "& .downloadBtn": {
        color: theme.palette.text.cardTitle,
        textTransform: "capitalize",
        fontWeight: "400",
        // fontSize: ".8rem",
        "& svg": {
          height: "20px",
          width: "20px",
        },

      },
      "& .startBtn": {
        // lightSkyBlue
        color: theme.palette.text.cardTitle,
        // lightSkyBlue
        border: `1px solid ${theme.palette.text.cardTitle}`,
        textTransform: "capitalize",
        padding: ".5rem 1.5rem",
        fontWeight: "400",
        [theme.breakpoints.between("300", "600")]: {
          padding: ".25rem 1rem",
          fontSize: "10px"
        },
      },
      "& .lesson-duration": {
        // flex: 1,
        // minWidth: "50px",
        fontSize: "12px",
        fontWeight: "300",
        minWidth: "max-content",
        marginRigth: "5px",
        [theme.breakpoints.between("300", "600")]: {
          fontSize: "10px"
        },
      },
    },
    "& .MuiAccordionSummary-expandIcon ": {
      position: "absolute",
      left: 0,
      padding: "1rem",
      color: theme.palette.text.header,
      [theme.breakpoints.between("300", "600")]: {
        padding: "0",
        margin: "0 5px",
        "& .svg": {
          height: "1rem",
          width: "1rem"
        }
      },
    },
  },
  accordionSummary: {
    background: theme.palette.background.veryLightGray2,
    "& .accordion-summary-content": {
      width: "100%",
      "& li": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "15px",
        fontWeight: "300",
        padding: "1rem 2rem",
        borderBottom: `1px solid ${theme.palette.border.gray7}`,
        width: "100%",
        gap: "1rem",
        [theme.breakpoints.between("400", "600")]: {
          padding: "1rem 1.5rem"
        },
        [theme.breakpoints.down("400")]: {
          padding: "1rem .5rem"
        },
        "&:last-child": {
          border: 0,
        },
        "& .info": {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flex: 1,
          // width: "52.4%",
          // width: "47.4%",
          // gradientBlue
          color: theme.palette.text.link_sec,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          marginLeft: "14px",
          [theme.breakpoints.up("1100")]: {
            marginLeft: "1.5rem"
          },
          [theme.breakpoints.down("600")]: {
            marginLeft: "7px"
          },

          "& .title": {
            fontWeight: "500",
            // paddingLeft: "25px",
            "display": "-webkit-box",
            "overflow": "hidden",
            "fontSize": "1rem",
            "fontWeight": "500",
            "textOverflow": "ellipsis",
            "whiteSpace": "pre-wrap",
            "WebkitBoxOrient": "vertical",
            "WebkitLineClamp": "2",

            [theme.breakpoints.down("960")]: {
              paddingLeft: "0px",
              fontSize: "14px",
              maxWidth: "100%"
            },
            // [theme.breakpoints.up("600")]: {
            //   paddingLeft: "0px",
            //   fontSize: "15px",
            //   maxWidth: "100%"
            // },
            [theme.breakpoints.down("700")]: {
              "maxWidth": "260px",

            },
            [theme.breakpoints.down("600")]: {
              paddingLeft: "0px",
              fontSize: "12px",
            },

          },
        },
        "& .deatails": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          // gap: "0rem",
          // flex: 1,
          maxWidth: "586px",
          gap: "3rem",
          flex: 0,
          [theme.breakpoints.up("960")]: {
            marginRight: "12px",
          },
          [theme.breakpoints.between("600", "960")]: {
            gap: "1rem"
          },
          [theme.breakpoints.between("300", "600")]: {
            flex: 0,
            gap: "0rem"
          },
          "& .status": {
            // width: "34.5%",
            color: theme.palette.text.cardTitle,
            fontSize: "12px",
            fontWeight: "300",
            minWidth: "max-content",
            [theme.breakpoints.between("300", "600")]: {
              minWidth: "max-content",
              margin: "0 7px",
              width: "auto",
              fontSize: "10px",
            },
          }
        },
        "& .learnBtn": {
          // lightSkyBlue
          color: theme.palette.text.cardTitle,
          textTransform: "capitalize",

          display: "flex",
          // flex: 1,
          justifyContent: "flex-start",
          paddingLeft: 0,
          fontWeight: 400,
          "& svg": {
            height: "20px",
            width: "20px",
          },
          [theme.breakpoints.between("300", "600")]: {
            minWidth: "auto",
            padding: 0,
            "& svg": {
              height: "32px",
              width: "32px",
            },
          }
        },
        "& .checkmark-svg": {
          color: theme.palette.text.active,
        },
        "& .duration": {
          // lightSkyBlue
          color: theme.palette.text.cardTitle,
          fontSize: "12px",
          display: "flex",
          // width: "17%",
          minWidth: "max-content",

          [theme.breakpoints.between("300", "600")]: {
            width: "auto",
            minWidth: "max-content",
            margin: "0 7px",
            fontSize: "10px",
          },
        },
      },
    },
  },
}));



export default function CustomizedAccordions({ lessons }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.between("300", "599.95"));
  const tablet = useMediaQuery(theme.breakpoints.between("600", "959.95"));
  const desktop = useMediaQuery(theme.breakpoints.between("960", "1200"));
  const desktopLG = useMediaQuery(theme.breakpoints.up("1200"));
  const mobileMD = useMediaQuery(theme.breakpoints.down("400"));


  const user = useSelector((state) => state.auth.user);
  const contentProgress = user.contentProgress;
  const courseDetails = useSelector((state) => state.courses.courseDetails);
  const enrollDetails = useSelector(state => state.courses.enrollDetails)
  // const currentCourseLessons = useSelector(
  //   (state) => state.courses.courseDetails.lessons
  // );
  // const currentLessonSelected = useSelector(
  //   (state) => state.lesson.currentLesson
  // );
  // const currentLessonsAll = useSelector((state) => state.lesson.allLessons);
  // const currentTopicSelected = useSelector((state) => state.topic.currentTopic);
  // const currentTopicsAll = useSelector((state) => state.topic.allTopics);

  const [expanded, setExpanded] = useState(0);
  // const [lessonProgress, setLessonProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const { id: courseSlug } = params;

  // useEffect(() => {
  // const numberOfTopicsCompleted = currentTopicsAll.reduce((total, topic) => (topic.isCompleted ? total + 1 : total), 0)
  // const totalTopics = currentTopicsAll.length
  // const progressPercentage = Math.floor(((numberOfTopicsCompleted / totalTopics) * 100))
  // if (progressPercentage >= 99)
  //     setLessonProgress(100)
  // else
  //     setLessonProgress(progressPercentage)
  // console.log("currentTopicsAll MAP::", "CompletedTopics", numberOfTopicsCompleted, "All Topics", totalTopics, "Percentage", progressPercentage)
  // }, []);

  // useEffect(() => {
  //   console.log("tablet-->", tablet)
  // }, [tablet]);
  // useEffect(() => {
  //   console.log("mobile-->", mobile)
  // }, [mobile]);
  // useEffect(() => {
  //   console.log("desktop-->", desktop)
  // }, [desktop]);
  // useEffect(() => {
  //   console.log("desktopLG-->", desktopLG)
  // }, [desktopLG]);

  const handleClickLessonStart = (lessonSelectedId) => async (event) => {
    event.stopPropagation();
    setLoading(true);

    const currentLesson = lessons.find(
      (lesson) => lesson._id === lessonSelectedId
    );
    dispatch(setCurrentLessonDetailsAction(currentLesson, lessons));

    const currentLessonFirstTopic = currentLesson.topics[0];
    const currentLessonAllTopics = currentLesson.topics;
    // console.log("currentLessonAllTopics", currentLessonAllTopics)

    await dispatch(
      setCurrentTopicDetailsAction(
        currentLessonFirstTopic,
        currentLessonAllTopics,
        user
      )
    );
    history.push(`/courses/${courseSlug}/learn`);

    setLoading(false);
  };
  const handleClickTopicStart = async (topicSelectedId, lessonSelectedId) => {
    setLoading(true);

    // console.log(
    //   "topicSelectedId",
    //   topicSelectedId,
    //   "lessonSelectedId",
    //   lessonSelectedId
    // );

    const currentLesson = lessons.find(
      (lesson) => lesson._id === lessonSelectedId
    );
    dispatch(setCurrentLessonDetailsAction(currentLesson, lessons));

    const currentTopic = currentLesson.topics.find(
      (topic) => topic._id === topicSelectedId
    );
    const currentLessonAllTopics = currentLesson.topics;

    await dispatch(
      setCurrentTopicDetailsAction(currentTopic, currentLessonAllTopics, user)
    );
    history.push(`/courses/${courseSlug}/learn`);

    setLoading(false);
  };

  const ZeroCompletionProgressbar = () => {

    return (<div>
      <p style={{
        fontSize: "12px",
        // lightSkyBlue
        color: "theme.palette.text.cardTitle", fontWeight: "300"
      }}>
        0% Complete
      </p>
      <LinearProgress
        max={100}
        style={{ width: "140px" }}
        variant="determinate"
        value={0}
        className={classes.root}
      />
    </div>)
  }

  const renderContentTopicProgress = (id) => {
    const currentContentProgress = enrollDetails?.topicsProgress?.filter(item => item.id === id)[0]

    if (!currentContentProgress?.isCompleted)
      return (
        <p className={"status"}>
          Not completed
        </p>
      )

    return (
      <p className={"status"}>
        Completed
      </p>
    )
  }
  const renderContentLessonProgress = (id) => {
    const currentContentProgress = enrollDetails?.lessonsProgress?.filter(item => item.id === id)[0]

    if (isEmpty(currentContentProgress))
      return <ZeroCompletionProgressbar />

    // if (currentContentProgress.isCompleted)
    //   return <BiCheckCircle className="checkmark-svg" />;

    const percentageString = ((currentContentProgress?.completedDuration / currentContentProgress?.totalDuration) * 100).toFixed().toString()

    return (
      <div className="progressBarCont">
        <p style={{ fontSize: "12px", color: "theme.palette.text.cardTitle", fontWeight: "300" }}>
          {percentageString}% Complete
        </p>
        <LinearProgress
          style={{ width: "140px" }}
          variant="determinate"
          value={+(percentageString)}
        />
      </div>
    )
  }

  const renderProgress = (id, progressArray) => {
    const content = progressArray?.find((item) => item.id === id);
    if (content?.isCompleted)
      return <BiCheckCircle className="checkmark-svg" />;
    else
      return (
        <div>
          <p style={{
            fontSize: "12px",
            // lightSkyBlue
            color: "theme.palette.text.cardTitle", fontWeight: "300"
          }}>
            10% Complete
          </p>
          <LinearProgress
            max={content?.totalDuration}
            style={{ width: "120px" }}
            variant="determinate"
            value={content?.completedDuration}
          />
        </div>
      );
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {lessons.map((lesson, i) => (
        //  expanded={expanded === i} 
        <Accordion key={i} defaultExpanded={i == 0} onChange={handleChange(i)}>
          <AccordionSummary
            classes={{ root: classes.accordionTitle }}
            expandIcon={!mobileMD ? <BiChevronDown /> : null}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className="accordion-title-content">
              <p className="title">{lesson.title}</p>
              <div className="accordion-title-content-info">
                <p className="lesson-duration GLOBAL_TIME">
                  {convertSecsToDuration(lesson.duration)}
                </p>
                {
                  // TODO: Only render of its own topics progress
                  // lesson._id === currentLessonSelected &&
                  //     lessonProgress >= 99 ? <BiCheckCircle className="checkmark-svg" /> :
                  // <div>
                  //     <LinearProgress style={{ width: '100px' }} variant="determinate" value={lessonProgress} />
                  // </div>
                  (desktop || desktopLG) && renderContentLessonProgress(lesson._id)
                }
                {(desktop || desktopLG) && <Button
                  className="downloadBtn"
                  onClick={(event) => event.stopPropagation()}
                >
                  <BsFileEarmarkArrowDown />
                  <span style={{ marginLeft: "4px" }}>Downloadable</span>
                </Button>}
                <Button
                  className="startBtn"
                  disabled={loading}
                  onClick={handleClickLessonStart(lesson._id)}
                // color="primary"
                >
                  Start
                </Button>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.accordionSummary }}>
            <div className="accordion-summary-content">
              <ul>
                {lesson.topics.map((topic) => (
                  <li key={topic._id}>
                    <div className="info">
                      {/* <GoPlay /> */}
                      <p className="title">{topic.title}</p>
                    </div>
                    <div className="deatails">
                      <p className="duration GLOBAL_TIME">
                        {convertSecsToDuration(topic.duration)}
                      </p>
                      {renderContentTopicProgress(topic._id)}

                      {/* {topic.isCompleted ? <BiCheckCircle className="checkmark-svg" />
                        : <p>Is not Completed</p>} */}
                      <Button
                        disabled={loading}
                        onClick={() =>
                          handleClickTopicStart(topic._id, lesson._id)
                        }
                        className="learnBtn"
                      >
                        <BsPlay />
                        {(!mobile) && <span className="text" style={{ marginLeft: "4px" }}>Learn</span>}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
      ))
      }
    </div >
  );
}
