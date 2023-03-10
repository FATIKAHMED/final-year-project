// * Libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getCourseDetailsAction, checkCourseAccessAction, getCourseEnrollDetailsAction, getCourseDetailsBySlugAction } from "redux/actions";
import { makeStyles } from "@material-ui/core/styles";

// * Components
import {
  useTheme,
  useMediaQuery,
  CircularProgress,
  Container,
  LinearProgress,
} from "@material-ui/core";
import VideoLessonAccordion from "components/VideoLessonContentAccordion";
import isEmpty from "utils/is-empty";
import VideoLessonAccordionSkeleton from "components/VideoLessonAccordionSkeleton";

const useStyles = makeStyles((theme) => ({
  bg: {
    background: theme.palette.background.lightPink,
    position: "absolute",
    top: 0,
    left: 0,
    height: "20rem",
    width: "100%",
    zIndex: 0
  },
  videoLessonCont: {
    width: "100%",
    marginBottom: '2rem',
    "& .titleCont": {
      maxWidth: "1280px",
      margin: '0 auto',
      // lightPink
      // background: theme.palette.background.lightPink,
      width: "100%",
      padding: "0 3rem",
      paddingTop: "3rem",
      paddingBottom: "7rem",
      marginTop: '-5px',
      [theme.breakpoints.between("300", "600")]: {
        paddingLeft: "1rem",
        paddingRight: "1rem",
      },
      "& h2,p": {
        zIndex: 1
      }
    },
    "& .subTitleCont": {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "500",
    },
    "& .videoAccordionCont": {
      maxWidth: "1280px",
      margin: '0 auto',
      padding: "0 3rem",
      marginTop: "-5rem",
      [theme.breakpoints.between("300", "600")]: {
        padding: "0 1rem",
      },
    },
  },
}));

const VideoLessonsPage = () => {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: slug } = params;


  const user = useSelector((state) => state.auth.user);
  // const courseDetails = useSelector((state) =>
  //   state.courses.store.docs.find((course) => course.slug === slug)
  // );
  const courseDetails = useSelector((state) => state.courses.courseDetails);

  const currentCourseLessons = useSelector(
    (state) => state.courses.courseDetails.lessons
  );
  // const currentLessonSelected = useSelector(
  //   (state) => state.lesson.currentLesson
  // );
  // const currentLessonsAll = useSelector((state) => state.lesson.allLessons);
  // const currentTopicSelected = useSelector((state) => state.topic.currentTopic);
  // const currentTopicsAll = useSelector((state) => state.topic.allTopics);
  const enrolledCourse = useSelector((state) => state.courses.enrolled?.filter(item => item.course.slug === slug)[0])

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const checkUserCourseAccess = async () => {
      // console.log("slug-->", slug)
      // console.log("courseDetails?._id-->", courseDetails?._id)
      // return
      const { res, error } = await dispatch(
        checkCourseAccessAction(user?._id, courseDetails?._id)
      );
      if (!res || !isEmpty(error)) {
        history.push(`/courses/${slug}`);
        return
      }

      setLoading(true);
      // await dispatch(getCourseDetailsAction(courseDetails?._id));
      await dispatch(getCourseEnrollDetailsAction(enrolledCourse?._id));
      setLoading(false);
    };

    checkUserCourseAccess();
  }, []);




  return (
    <>
      <div className={classes.bg}></div>
      <div className={classes.videoLessonCont}>
        <div className="titleCont">
          <h2>Video Lessons</h2>
          <div className="subTitleCont">
            <p>Video explanations for each topic in your course lesson</p>
            {/* <p>{courseDetails?.title}</p> */}
          </div>
        </div>

        {loading ? (
          <VideoLessonAccordionSkeleton />
        ) : (
          <div className="videoAccordionCont">
            <VideoLessonAccordion lessons={currentCourseLessons} />
          </div>
        )}
      </div>
    </>
  );
};

export default VideoLessonsPage;
