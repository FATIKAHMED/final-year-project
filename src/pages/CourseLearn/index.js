// * Libraries
import React, { useState, useEffect, useRef } from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DrawerMobileNav from "components/DrawerMobileNav";


// import ReactPlayer from "react-player/lazy";
import {
  changeCurrentTopicDetailsAction,
  setTopicCompletionStatusAction,
  checkCourseAccessAction,
  getTopicQuestionsAction,
  getTopicTotalQuestionsAction,
  createQuestionAction,
  createQuestionReplyAction,
  updateUserTopicProgressDetailsAction,
  resetLearnLoading,
  setLearnLoading,
  changeCurrentLessonDetailsAction,
  setCurrentTopicDetailsAction
} from "redux/actions";

// * Assets
// import CourseImage from "assets/course.jpg";
import CircleCheckGreen from "assets/circle-check-green.svg";
import CircleCheckWhite from "assets/circle-check-white.svg";
import { FiClock, FiChevronRight, FiChevronDown } from "react-icons/fi";

// * Utilities
import { convertSecsToDuration, getDisplayDate, getDisplayTime } from "utils/convertTime";
import isEmpty from "utils/is-empty";

// * Components
// import LessonAccordion from "components/CourseLessonContentAccordion";
import TextInputEditor from 'components/TextInputEditor'

import {
  // IconButton,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  Typography,
  // CircularProgress,
  Avatar,
} from "@material-ui/core";
// import PersistentDrawerLeft from "components/PersistentDrawer";
// import Navbar from "components/Navbar";
import VideoPlayer from "components/LessonVideoPlayer";
import TextField from "components/TextField";
import _Button from "components/Button";
import CourseLearnSkeleton from "components/CourseLearnSkeleton";
// import { FaDivide } from "react-icons/fa";
import UnlockConsentModal from "components/UnlockConsentModal";

// * Hooks
import useLocalStorage from 'hooks/localstorage'
import useToggle from 'hooks/toggle'

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: "2rem 0",
    paddingTop: "5rem",
    maxWidth: "1100px",
    [theme.breakpoints.down("sm")]: {
      padding: "5rem 0 0 0"
    },
    "& .heading": {
      // lightPink
      background: theme.palette.background.lightPink,
      width: "100%",
      paddingTop: "3rem",
      padding: "0 3rem",
      // paddingBottom: "7rem",

    },
    "& .lessonHeading": {
      fontWeight: "500",
      fontSize: "15px",
      [theme.breakpoints.down("xs")]: {
        // fontSize: "1rem",
        fontSize: ".7rem",
        marginTop: "2rem",
      },

    },
    "& .subHeaderCont": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
      [theme.breakpoints.down("xs")]: {
        "display": "flex",
        "marginBottom": "1rem",
        "flexDirection": "column",
        "alignItems": "flex-start"
      },
      "& .lessonCont": {
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          gap: "1rem",
        },
        [theme.breakpoints.down("xs")]: {
          "gap": ".5rem",
          "display": "flex",
          "alignItems": "center",
          "width": "100%",
          "justifyContent": "space-between",
        },

        "& .titleHeading": {
          fontWeight: "500",
          fontSize: "25px",
          // marginRight: "1rem",

          [theme.breakpoints.down("sm")]: {
            fontSize: "1.2rem",
          },
          [theme.breakpoints.down("xs")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.down("400")]: {
            fontSize: ".85rem",
          },
        },
        "& .duration": {
          display: "flex",
          gap: ".5rem",
          alignItems: "center",
          fontWeight: "500",
          fontSize: "15px",
          [theme.breakpoints.down("xs")]: {
            fontSize: ".65rem",
            "& svg": {
              height: "14px !important",
              width: "14px !important"
            },
          },
        },
      },
      "& .button": {
        height: "min-content",
        minWidth: "max-content",
        // gradientBlue
        color: theme.palette.text.link_sec,
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        [theme.breakpoints.down("xs")]: {
          paddingLeft: "0",
          fontSize: ".75rem",
        },
      },
    },
    "& .buttonCont": {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      margin: "1rem 0",
      marginTop: "2rem",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },

      "& .blueBg": {
        // darkPurple
        background: theme.palette.background.purple,
        color: theme.palette.common.white,
      },
      "& .whiteBg": {
        background: theme.palette.common.white,
      },
      "& .greenBg": {
        // primaryGreen
        background: theme.palette.background.primaryGreen,
        color: theme.palette.common.white,
      },
      "& .btns": {
        padding: "0 2.5rem",
        textTransform: "capitalize",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px 0px #32325D1C",
        height: "4rem",
        maxHeight: "4rem",
        fontWeight: "600",
        "& .MuiButton-label": {},
        [theme.breakpoints.down("xs")]: {
          height: "3rem",
          padding: "0 1.5rem",
          fontSize: ".8rem",
          width: "100%"
        },

        "& .element": {
          marginRight: ".5rem",
        },
        "& .number": {
          // gradientBlue
          color: `${theme.palette.text.link_sec}!important`,
          fontWeight: "600",
          fontSize: "30px",
        },
      },
    },
    "& .mobileNavBtn": {
      verticalAlign: "middle",
      cursor: "pointer",
      [theme.breakpoints.up(960)]: {
        display: "none",
      },
    },
  },
  askQuestionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    "& .askQuestionBtn": {
      color: theme.palette.common.white,
      // gradientBlue
      background: theme.palette.text.link_sec,
      textTransform: "capitalize",
      borderRadius: "6px",
      padding: "1rem 2.5rem",
      [theme.breakpoints.down("xs")]: {
        height: "3rem",
        padding: "0 1.5rem",
        fontSize: ".8rem",
        width: "100%"
      },
    },
  },
  questionWrapper: {
    margin: "20px",
    "& .questionInfo": {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    "& .avatar": {
      height: "60px",
      width: "60px",
    },
    "&.reply": {
      margin: "10px 10px 10px 40px",
    },
    "& .title": {
      fontWeight: "600",
    },
    "& .date": {
      fontWeight: "400",
      fontSize: "14px",
      color: "gray",
    },
    "& .content": {
      marginTop: "10px",
      padding: "20px",
      // veryLightGray7
      background: theme.palette.border.gray10,
      borderRadius: "0 15px 15px 14px",
      fontSize: "14px",
      // darkSoftGray
      color: theme.palette.background.darkSoftGray,
    },
    "& .mb2": {
      marginBottom: "2rem"
    },
    "& .formFooterBox": {
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "space-between",
      "marginTop": "0.5rem",
      [theme.breakpoints.down(400)]: {
        flexDirection: "column",
      },
      "& .replyBox": {
        [theme.breakpoints.down(400)]: {
          display: "flex",
          flexDirection: "column-reverse",
          width: "100%"
        },
      },
    }
  },
  replyQuestionWrapper: {
    marginLeft: "40px",
  },
  error: {
    border: "1px solid red",
    borderRadius: "6px"
  }
}));

const CourseLearn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const formBoxRef = useRef(null);
  const { id: slug } = params;
  const { pathname } = location;

  const user = useSelector((state) => state.auth.user);
  const contentProgress = user.contentProgress;

  // const courseDetails = useSelector((state) => state.courses.store.docs.find((course) => course.slug === slug));
  const courseDetails = useSelector((state) => state.courses.courseDetails);
  const isInCart = useSelector((state) =>
    state.cart.lists.cart.find((item) => item.id === courseDetails._id)
      ? true
      : false
  );

  const isBought = useSelector((state) =>
    state.courses.bought.find((course) => course._id === courseDetails._id)
      ? true
      : false
  );
  const enrolledDetails = useSelector(state => state.courses.enrollDetails)
  const currentLessonSelected = useSelector((state) => state.lesson.currentLesson);
  const currentLessonsAll = useSelector((state) => state.lesson.allLessons);
  const currentTopicsAll = useSelector((state) => state.topic.allTopics);
  const currentTopicSelected = useSelector((state) => state.topic.currentTopic);
  const nextTopic = useSelector((state) => state.topic.nextTopic);
  const questionsAll = useSelector((state) => state.question.questions);
  const isCourseUnlockable = useSelector(state => state.enrol.current.hasUnlockUsed)
  const learnloading = useSelector(state => state.learnLoader.loading);
  const questions = useSelector(state => state.question.questions);
  const questionLength = useSelector(state => state.question?.totalQuestions);

  const [loading, setLoading] = useState({
    content: false,
    questionSubmit: false,
    replySubmit: false,
    question: false,
  });
  const [course, setCourse] = useState(null);
  const [onClickMarkCompleteTopic, setOnClickMarkCompleteTopic] = useState(false);
  const [openQuestionBox, setOpenQuestionBox] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [openReplyBox, setOpenReplyBox] = useState(false);
  const [reply, setReply] = useState({});
  const [replyId, setReplyId] = useState("")
  const [errors, setErrors] = useState({});
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [consentUnlockUsage, setConsentUnlockUsage] = useLocalStorage("consentUnlockUsage", false);
  const [unlockConsentModalOpen, toggleUnlockConsentModalOpen] = useToggle(false)
  const [editorQuestion, setEditorQuestion] = useState(null);

  useEffect(() => {
    const checkUserCourseAccess = async () => {
      dispatch(setLearnLoading(true))
      const { res, error } = await dispatch(
        checkCourseAccessAction(user._id, courseDetails?._id)
      );

      if (!res || error) history.push(`/courses/${slug}`);
      else {
        //   Call other api's here
      }
      dispatch(resetLearnLoading())
    };

    const ensureUserUnlockUsage = () => {
      if ((isEmpty(consentUnlockUsage) || !consentUnlockUsage) && isCourseUnlockable)
        toggleUnlockConsentModalOpen(true)
    }

    const setTopicQuestionsLenght = async () => {
      await dispatch(getTopicTotalQuestionsAction(currentTopicSelected.details._id))
    }

    checkUserCourseAccess();
    ensureUserUnlockUsage();
    setTopicQuestionsLenght();
  }, []);





  // useEffect(() => {
  //   const allTopicsWithDetailsOnly = currentTopicsAll?.map(item => item.details)
  //   const myTopicCompletionStatus = allTopicsWithDetailsOnly.filter(
  //     (topic) => currentTopicSelected.details._id === topic._id
  //   )[0]?.isCompleted;
  //   // if (onClickMarkCompleteTopic) {

  //   const numberOfTopicsCompleted = allTopicsWithDetailsOnly.reduce(
  //     (total, topic) => (topic.isCompleted ? total + 1 : total),
  //     0
  //   );
  //   const totalTopics = allTopicsWithDetailsOnly.length;
  //   const lessonId = currentLessonSelected?.details?._id;
  //   const progressPercentage = Math.floor(
  //     (numberOfTopicsCompleted / totalTopics) * 100
  //   );

  //   if (progressPercentage >= 99)
  //     dispatch(
  //       setLessonStatusCompletionAction(lessonId, true, currentLessonsAll)
  //     );
  //   else
  //     dispatch(
  //       setLessonProgressCompletionAction(
  //         lessonId,
  //         progressPercentage,
  //         currentLessonsAll
  //       )
  //     );

  // }, [currentTopicSelected]);

  const handleClickNextTopic = async (nextTopic) => {
    const allTopicsWithDetailsOnly = currentTopicsAll.map(item => item.details)
    await dispatch(changeCurrentTopicDetailsAction(nextTopic.details, allTopicsWithDetailsOnly, user));
  };

  const handleClickMarkComplete = async (topic, status) => {
    setOnClickMarkCompleteTopic(true);
    const response = await dispatch(
      setTopicCompletionStatusAction(
        topic._id,
        status,
        currentLessonSelected.details,
        user,
        enrolledDetails._id
      )
    );
    if (!isEmpty(response)) setOnClickMarkCompleteTopic(false)
  };
  const getContentProgress = (id, progressArray) => {
    const content = progressArray?.find((item) => item.id === id);
    return content;
    // if (content.isCompleted)
    // else
    //     return <BiCheckCircle className="checkmark-svg" />
    //     return (
    //         <div>
    //             <LinearProgress max={content.totalDuration} style={{ width: '100px' }} variant="determinate" value={content.completedDuration} />
    //         </div>)
  };
  const handleClickQuestions = async () => {
    setLoading({ ...loading, question: true });

    if (!openQuestionBox)
      await dispatch(getTopicQuestionsAction(currentTopicSelected.details._id));

    setOpenQuestionBox(!openQuestionBox);

    setLoading({ ...loading, question: false });
  };

  const handleClickQuestionAsked = async () => {
    if (isEmpty(editorQuestion)) return setErrors({ question: "Field is required" });

    setLoading({ ...loading, questionSubmit: true });

    const payload = {
      // name: question,
      ...editorQuestion,
      anonymous,
      attachments: null,
      userId: user._id,
    };
    await dispatch(createQuestionAction(currentTopicSelected.details._id, payload));

    setEditorQuestion(null)
    setLoading({ ...loading, questionSubmit: false });

    // setQuestion("");
  };

  const handleClickReplyOpen = (id) => {
    setReplyId(id)
    setOpenReplyBox(!openReplyBox)
    if (!openReplyBox) {
      setTimeout(() => {
        scroll(`replyBox${id}`)
      }, 1000);
    }

  }

  const scroll = (element) => {
    var myElement = document.getElementById(element);
    var topPos = myElement.offsetTop;
    myElement.scrollIntoViewIfNeeded(topPos)

  }



  const handleClickReply = async (questionId) => {
    if (isEmpty(reply.content)) return setErrors({ reply: "Field is required" });
    setLoading({ ...loading, replySubmit: true });

    const payload = {
      ...reply,
      anonymous,
      attachments: null,
      userId: user._id,
    };

    // TODO: Dispatch Reply submit
    await dispatch(createQuestionReplyAction(currentTopicSelected.details._id, questionId, payload));

    setReply({})
    setErrors({})
    setLoading({ ...loading, replySubmit: false });
    setOpenReplyBox(!openReplyBox)
    // setOpenQuestionBox(!openQuestionBox);
    // setEditorQuestion(null)
  };
  const handleClickUnlockConsentProceed = (value) => {
    if (value === true)
      setConsentUnlockUsage(true)
  }


  const toggleMobileNav = (val) => {
    setDrawerType(val)
    setMobileDrawer(!mobileDrawer);
  };



  return (
    <div>
      {learnloading ? (
        <CourseLearnSkeleton />
      ) : (

        <Container className={classes.container}>
          <Typography className="lessonHeading">
            {currentLessonSelected.details?.title}
            <FiChevronRight onClick={() => toggleMobileNav("lesson")} className="mobileNavBtn" />
          </Typography>
          <div className="subHeaderCont">
            <div className="lessonCont">
              <Typography className="titleHeading">
                {currentTopicSelected.details?.title}
                <FiChevronRight onClick={() => toggleMobileNav("topic")} className="mobileNavBtn" />
              </Typography>
              <Typography className="duration">
                <FiClock style={{ height: "20px", width: "20px" }} />
                {convertSecsToDuration(currentTopicSelected.details?.duration)}
              </Typography>
              <Button
                style={{ display: !isEmpty(nextTopic?.details) ? 'flex' : 'none' }}
                onClick={() => handleClickNextTopic(nextTopic)}
                className="button"
              >
                Next Topic <FiChevronRight />
              </Button>
            </div>
          </div>

          <div>
            <div style={{ position: "relative" }}>
              {console.log("courseLearn")}
              <VideoPlayer
                src={currentTopicSelected.details?.video}
                img={currentTopicSelected.details?.thumbnail}

              />
            </div>

            <div className="buttonCont">
              {/* {getContentProgress(
                currentTopicSelected.details?._id,
                contentProgress.topics
              )?.isCompleted ? ( */}
              {currentTopicSelected?.progress?.isCompleted ? (
                <_Button
                  onClick={() =>
                    handleClickMarkComplete(currentTopicSelected.details, false)
                  }
                  className="btns greenBg"
                  disabled={onClickMarkCompleteTopic}
                >
                  <img src={CircleCheckWhite} alt="icon here" className="element" />
                  Completed
                </_Button>
              ) : (
                <>

                  <_Button
                    className="btns whiteBg"
                    // loading={loading}
                    disabled={onClickMarkCompleteTopic}
                    onClick={() =>
                      handleClickMarkComplete(currentTopicSelected.details, true)
                    }
                  >
                    <img
                      src={CircleCheckGreen}
                      alt="icon here"
                      className="element"
                    />
                    Mark Complete
                  </_Button>

                </>
              )}
              <Button
                disabled={loading.editorQuestion}
                onClick={() => handleClickQuestions()}
                className={

                  openQuestionBox
                    ? `btns blueBg`
                    : `btns`
                  // currentTopicSelected.details?.questions.length > 0
                  //   ? `btns blueBg`
                  //   : `btns`
                }
              >
                <span className="element number">
                  {/* {currentTopicSelected.details?.questions.length} */}
                  {questionLength}
                </span>
                Questions
              </Button>
            </div>
            {openQuestionBox && (
              <div>
                <TextInputEditor
                  onChangeHandle={setEditorQuestion}
                  placeholder="Ask a question about this topic"
                />
                {/* <TextField
                  value={question}
                  onChange={(e) => setQuestion(e)}
                  multiline
                  minRows="3"
                  placeholder="Ask a question about this topic"
                  required
                  autoFocus
                  error={errors.question}
                  errorText={errors.question}
                  disabled={loading.questionSubmit}
                /> */}
                <div className={classes.askQuestionWrapper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        name="anonymous"
                      />
                    }
                    label="Anonymous"
                  />
                  <Button
                    className="askQuestionBtn"
                    onClick={(e) => handleClickQuestionAsked()}
                  >
                    Ask question
                  </Button>
                </div>
                {/* <p>---- Earlier replies ----</p> */}
                {questionsAll.length > 0 ? (
                  questionsAll.map((item, i) => (
                    <div key={i} className={classes.questionWrapper}>
                      <div className="questionInfo">
                        {!item.isAnonymous &&
                          <Avatar
                            className="avatar"
                            alt="User Img"
                            src={item.sender?.picture}
                          />}
                        <Typography className="title">
                          {item.isAnonymous
                            ? "Anonymous"
                            : item.sender?.firstName}
                          <Typography className="date">
                            {getDisplayDate(item.createdAt)}
                            {/* -{getDisplayTime(item.createdAt)} */}
                          </Typography>
                        </Typography>
                      </div>
                      {/* <div className="content">{item.name}</div> */}
                      <Typography className={`content ${openReplyBox ? "mb2" : ""}`}>{item.content || "That was amazing"}</Typography>
                      {!openReplyBox && <Button onClick={() => { handleClickReplyOpen(item._id) }}>{openReplyBox && item._id == replyId ? 'Cancel' : 'Reply'}</Button>}
                      {item.replies.length > 0 ? (
                        item.replies.map(reply => {
                          return (
                            <div key={reply.createdAt} className={`${classes.questionWrapper} reply`}>
                              <div className={`questionInfo`}>
                                {!reply.isAnonymous &&
                                  <Avatar
                                    className="avatar"
                                    alt="User Img"
                                    src={reply.sender?.picture}
                                  />}
                                <Typography className="title">
                                  {reply.isAnonymous
                                    ? "Anonymous"
                                    : reply.sender?.firstName}
                                  <Typography className="date"> {getDisplayDate(reply.createdAt)}</Typography>
                                </Typography>
                              </div>
                              <Typography className="content">{reply.content}</Typography>
                            </div>)
                        })

                      ) : null}
                      <div>
                        {openReplyBox && (item._id == replyId) && (
                          <>

                            {/* <TextField
                            value={reply}
                            onChange={(e) => setReply(e)}
                            multiline
                            minRows="3"
                            placeholder="Leave a reply"
                            required
                            autoFocus
                            disabled={false}
                            /> */}
                            <TextInputEditor
                              onChangeHandle={setReply}
                              placeholder="Ask a question about this topic"
                              className={errors?.reply ? classes.error : ""}
                            />
                            {errors.reply && <div style={{ color: "red", fontSize: ".75rem" }}>Form field should not be empty</div>}
                            <div className="formFooterBox">

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={anonymous}
                                    onChange={(e) =>
                                      setAnonymous(e.target.checked)
                                    }
                                    name="anonymous"
                                  />
                                }
                                label="Anonymous"
                              />
                              <span className={`replyBox`} id={`replyBox${item._id}`}>
                                {openReplyBox && <Button onClick={() => handleClickReplyOpen(item._id)}>{openReplyBox && item._id == replyId ? 'Cancel' : 'Reply'}</Button>}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={(e) => handleClickReply(item._id)}
                                  disabled={loading?.replySubmit}
                                >
                                  Reply
                                </Button>
                              </span>
                            </div>
                          </>
                        )}
                      </div>


                      {/* <Button onClick={() => setOpenReplyBox(!openReplyBox)}>{openReplyBox ? 'Cancel' : 'Reply'}</Button> */}
                    </div>
                  ))
                ) : (
                  <div>❓ No questions yet. Ask away</div>
                )}
              </div>
            )}
          </div>
          <DrawerMobileNav
            mobileDrawer={mobileDrawer}
            setMobileDrawer={setMobileDrawer}
            drawerType={drawerType}
          />
          <UnlockConsentModal open={unlockConsentModalOpen} modalTitle={"Add a Review"} setOpen={toggleUnlockConsentModalOpen} handleSubmit={handleClickUnlockConsentProceed} />
        </Container>
      )}
    </div>
  );
};

export default CourseLearn;
