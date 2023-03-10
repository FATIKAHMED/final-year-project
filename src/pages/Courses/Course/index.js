// * Libraries
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourseDetailsBySlugAction,
  addCartItemAction,
  enrollUserInCourse,
  getEnrolledCoursesList,
  setCurrentEnrol,
} from "redux/actions";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import ReactPlayer from "react-player";
import ReactHtmlParser from 'react-html-parser';

import zIndex from "@material-ui/core/styles/zIndex";
import {
  Button,
  Container,
  Card,
  CardMedia,
  CardActions,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Divider,
  Chip,
  Grid,
} from "@material-ui/core";
import { Rating } from "@mui/material";

// * Assets
import img1 from "assets/testimonial1.png";
import img2 from "assets/testimonial2.png";
import img3 from "assets/testimonial3.png";
import PlayBtn from "assets/PlayBtn.png";
import isPlayingBtn from "assets/playing.png";

// * Components
import CourseLessonAccordion from "components/CourseLessonAccordion";
import CoursePreviewModal from "components/CoursePreviewModal";
import CourseRating from "components/CourseRating";
import Reviews from "components/Reviews";
import CourseSkeleton from "components/CourseSkeleton";
import CourseDetailsButton from "components/CourseDetailsButton";

// * Utitlities
import isEmpty from "utils/is-empty";
import { dateFormat, convertSecsToDuration } from "utils/convertTime";

// * Icons
import { GoDash } from "react-icons/go";
import { MdLanguage } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem 0",
  },
  courseLanding: {
    marginTop: "2rem",
    position: "relative",
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem",
      "& .container": {
        padding: "0",
      }
    },
  },
  info: {
    display: "grid",
    gridTemplateColumns: "60fr 40fr",
    columnGap: "5rem",
    gridArea: "details video",
    [theme.breakpoints.between(1000, 1080)]: {
      columnGap: "2rem",
    },
    [theme.breakpoints.down(1000)]: {
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      gap: "9rem"
    },
    "& .infoDescription": {
      display: "flex",
      padding: "1.7rem 0",
      gap: "3rem",
      [theme.breakpoints.down(480)]: {
        gap: "1rem",
        flexWrap: "wrap"
      }
    },

    //// [theme.breakpoints.between(960, 1100)]: {
    ////   columnGap: "3.5rem",
    //// },
    // "& .title": {
    //   fontWeight: "500",
    //   fontSize: "2.1875rem",
    // },
    // "& .headline": {
    //   fontWeight: "normal",
    //   fontSize: "0.8125rem",
    // },
    "& .title": {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "2.5rem",
    },
    "& .subTitle": { fontWeight: "500", fontSize: "1.25rem" },
    "& .headline": {
      // fontSize: "1.188rem",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.688rem",
      [theme.breakpoints.down(1100)]: {
        fontSize: ".75rem"
      },
    },
    "& .accordionTableHead": {
      display: "flex",
      gap: ".5rem",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down(500)]: {
        gap: "0rem "
      },
    },
    "& .ratingText": {
      // softOrange
      color: theme.palette.background.softOrange,
      fontWeight: "600",
    },
    "& .chip": {
      borderRadius: "6px",
      padding: "1.3rem .8rem",
      color: theme.palette.background.seaGreen,
      background: theme.palette.background.lightBlue,
      fontSize: ".938rem",
      "&:hover": {
        // gradientBlue
        border: `1px solid ${theme.palette.text.link_sec}`,
        color: theme.palette.text.link_sec,
        cursor: "pointer",
      },
    },
    "& .link": {
      // gradientBlue
      color: theme.palette.text.link_sec,
      fontWeight: "500",
      minWidth: "max-content",
      cursor: "pointer"
    },

    "& .dashIcon": {
      // babyPink
      color: theme.palette.background.babyPink,
      borderRadius: "8px",
      fontSize: "25px",
    },
    "& .marginTopBottom": {
      margin: "1rem 0",
    },
  },
  cardBox: {
    position: "sticky",
    top: "5rem",
    height: "max-content",
    [theme.breakpoints.down(1000)]: {
      position: "relative",
      top: "0rem",
      display: "flex",
      gap: "1rem",
      alignItems: "flex-start",
      flexDirection: "column"

    },
    // [theme.breakpoints.down(760)]: {
    //   flexDirection: "column"
    // },
    "& .card": {
      padding: "1.6rem 1.8rem",
      borderRadius: "10px",
      height: "max-content",
      boxShadow: "0px 4px 8px 0px #0000000A",
      border: "1px solid #0000001A",
      minWidth: "280px",
      [theme.breakpoints.up(1000)]: {
        minWidth: "400px",
      },
      [theme.breakpoints.down(500)]: {
        padding: "0",
        paddingBottom: "1.5rem",
        maxWidth: "360px",
      },
      [theme.breakpoints.down(420)]: {
        maxWidth: "300px",
      },
      [theme.breakpoints.down(320)]: {
        maxWidth: "280px",
      },

    }
  },
  cardDetailPrice: {
    padding: "18px 25px",
    borderRadius: "12px",
    height: "max-content",
    boxShadow: "0px 4px 8px 0px #0000000A",
    border: "1px solid #0000001A",
    borderRadius: "6px",
    marginTop: "15px",
    [theme.breakpoints.down(1000)]: {
      marginTop: 0,
      width: "100%",
    },
    // [theme.breakpoints.down(760)]: {
    //   width: "100%"
    // },

  },
  feedbackCont: {
    paddingTop: "1rem",
    "& .marginBottom": {
      marginBottom: "1rem",
    },
    "& .marginTop": {
      marginTop: "1rem",
    },
    "& .courseRatingNum": {
      fontSize: "5rem",
      fontWeight: "600",
      [theme.breakpoints.between(1000, 1080)]: {
        fontSize: "3rem",
      },
      // softOrange
      color: theme.palette.background.softOrange,
    },
    "& .courseRatingText": {
      fontSize: "1.125rem",
      fontWeight: "bold",
      minWidth: "max-content",
      [theme.breakpoints.between(1000, 1080)]: {
        fontSize: "1rem",
      },
      // softOrange
      color: theme.palette.background.softOrange,
    },
  },
  reviewsCont: {
    paddingTop: "1rem",
    "& .marginTopBottom": {
      margin: "1.5rem 0",
    },
    "& .hide": { display: "none" },
  },
  myImgDiv: {
    borderRadius: "10px",
    // background: "linear-gradient(90deg, rgba(130, 193, 202, 0.55) 0%, rgba(80, 157, 213, 0.55) 100%)",
    // height: "200px",
    height: "100%",
    maxWidth: "420px",
    minHeight: "12rem",
    position: "relative",
    minWidth: "280px",

    "& .PlayBtn": {
      position: " absolute",
      zIndex: 40,
      margin: "auto",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      cursor: "pointer",
    },
  },
  PlayBtnSM: {
    width: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
  },
  previewImgDiv: {
    position: "relative",
    borderRadius: "6px",
    // maxWidth: "80px",
    // height: "50px !important",
    "& .isPlaying": {
      top: "56%",
      height: "33px",
      width: "33px",
    },
  },
  cardLg: {
    // width: "10rem !important"
    width: "6rem !important"
  },
  imgOverlay: {
    borderRadius: "6px",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    color: "#FFF",
    background: `linear-gradient(90deg, rgba(130, 193, 202, 0.55) 0%, rgba(80, 157, 213, 0.55) 100%) !important`,
  },
  splideTrack: {
    "& .splide__track": {
      width: "84% !important",
      margin: "0 auto !important",
      [theme.breakpoints.down(420)]: {
        width: "80% !important",
      },
    },
  },
  splideList: {
    "& .splide__list": {
      transform: "translateX(0) !important",
      margin: "0 auto !important"
    },
  },
  arrows: {
    color: "blue",
  },
  arrowPrev: {
    left: "0rem !important",
    [theme.breakpoints.down(760)]: {
      left: "0.2rem !important",
    },
    [theme.breakpoints.down(500)]: {
      // left: "0.5rem !important",
      left: "0.1rem !important",
    },
    "&.active": {
      background: theme.palette.text.link_sec,
    },
    "&.disabled": {
      background: theme.palette.background.selected,
    },
    "& svg": {
      fill: theme.palette.common.white,
    },
    "&.hidden": {
      display: "none",
    },
  },
  arrowNext: {
    right: "0rem !important",
    [theme.breakpoints.down(760)]: {
      right: "0.2rem !important",
    },
    [theme.breakpoints.down(500)]: {
      // right: "0.5rem !important",
      right: "0.1rem !important",
    },
    "&.active": {
      background: theme.palette.text.link_sec,
    },
    "&.disabled": {
      background: theme.palette.background.selected,
    },
    "& svg": {
      fill: theme.palette.common.white,
    },
    "&.hidden": {
      display: "none",
    },
  },
  splideDiv: {

    // maxWidth: "100%",
    // marginBottom: "12px",
    maxWidth: "400px",
    "&.hidden": {
      display: "none",
    },

  },
  LoadBtn: {
    padding: ".8rem 1.8rem",
    color: theme.palette.text.header,
    fontWeight: theme.typography.fontWeightBold,
  },
  videoFrame: {
    maxWidth: "400px !important",
    height: "100% !important",
    minHeight: "10rem",
    "& video": {
      borderRadius: "6px",
      // maxHeight: "230px",
      height: "225px !important",
    },
    "& .react-player__preview": {
      borderRadius: "10px",
      minHeight: "12rem",
      [theme.breakpoints.down(420)]: {
        borderBottomRightRadius: "0 !important",
        borderBottomLeftRadius: "0 !important",
      },
    },
    "& .react-player__play-icon": {
      border: "0 !important",
    },
    "& .react-player__shadow": {
      // background: `url(${PlayBtn})!important`,
      // width: "86px !important",
      // height: "86px !important",
      // borderRadius: "0px !important",
      background: `url(${PlayBtn}),linear-gradient(90deg, rgba(130, 193, 202, 0.55) 0%, rgba(80, 157, 213, 0.55) 100%) !important`,
      // zIndex: "10",
      zIndex: 1,
      width: "100% !important",
      height: "230px !important",
      borderRadius: "10px !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
      [theme.breakpoints.down(420)]: {
        borderBottomRightRadius: "0 !important",
        borderBottomLeftRadius: "0 !important",
      },
    },
  },
  price: {
    fontWeight: "600",
    fontSize: "1.3rem",
    textAlign: "left",
    // "&::before": {
    //   content: '',
    //   border: '1px dashed black'
    // },
    // "&::after": {
    //   content: '',
    //   border: '1px dashed black'
    // }
  },
  language: {
    fontWeight: "500",
    fontSize: ".9rem",
    textAlign: "right",
    color: theme.palette.text.language,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    "& svg": {
      width: "20px",
      height: "20px",
    },
  },
  priceAndLanguageContainer: {
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const IndividualCoursePage = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const { id: slug } = params;
  const { pathname } = location;

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  // const currentCourse = useSelector((state) =>
  //   state.courses.store.docs.find((course) => course.slug === slug)
  // );
  const courseDetails = useSelector((state) => state.courses.courseDetails);
  const {
    _id: courseId,
    reviews: courseReviews,
    allRatings: courseRatings,
    averageRating: averageRating,
    enrolledCount: enrolledCount,
  } = courseDetails;

  const isInCart = useSelector((state) =>
    state.cart.lists.cart.find((item) => item.id === courseId) ? true : false
  );

  const isBought = useSelector((state) =>
    state.courses.bought.find((course) => course._id === courseId)
      ? true
      : false
  );

  const isSubscribed = useSelector((state) => {
    // if (state.subscription?.subscription?.subscriptionStatus === "active")
    const periodStart = state.subscription?.subscription?.periodStart;
    const periodEnd = state.subscription?.subscription?.periodEnd;

    if (periodStart < periodEnd) return true;
    else return false;
  });

  const courseDetailsTrailers = useSelector(
    (state) => state.courses.courseDetailsTrailers
  );
  const coursesEnrolled = useSelector((state) => state.courses.enrolled);
  const courseEnrollDetails = coursesEnrolled.find(
    (x) => x.course._id == courseId
  );
  // const isEnrolled = isAuthenticated && !!coursesEnrolled.find(x => x.course._id == courseId);
  const isEnrolled = courseEnrollDetails?.isEnrolled;
  const isEnrolledForUnlockUse = courseEnrollDetails?.hasUnlockUsed;
  const enrolledCourse = useSelector((state) => {
    let id;
    state.courses.enrolled.find((item) =>
      item.course._id === courseId ? (id = item._id) : null
    );
    return state.courses.enrolled.filter((item) => item._id === id)[0];
  });

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [reviewCount, setReviewCount] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    const getCourseDetails = async () => {
      if (isEmpty(slug)) return

      setLoading(true);
      setIsPlaying(false);
      const { res, error } = await dispatch(getCourseDetailsBySlugAction(slug)
      );

      if (res) {
        setCourse(res);
        setLoading(false);

        // if (courseDetailsTrailers.length > 0) {
        //   setImgUrl(courseDetailsTrailers[0].thumbnail)
        //   setVideoUrl(courseDetailsTrailers[0].video)
        //   setVideoId(courseDetailsTrailers[0].topic)
        // }
      } else {
        // console.log("ERROR IN GETTING COURSE DETAILS", res, error);
        // TODO: Course details were not found , go back , or say sorry
        history.goBack();
      }

    };

    getCourseDetails();
  }, [slug]);
  // useEffect(() => {
  //   const getCourseDetails = async () => {
  //     if (currentCourse) {
  //       setLoading(true);
  //       setIsPlaying(false);
  //       const { res, error } = await dispatch(
  //         getCourseDetailsAction(currentCourse._id)
  //       );
  //       if (res) {
  //         setCourse(res);
  //         setLoading(false);

  //         // if (courseDetailsTrailers.length > 0) {
  //         //   setImgUrl(courseDetailsTrailers[0].thumbnail)
  //         //   setVideoUrl(courseDetailsTrailers[0].video)
  //         //   setVideoId(courseDetailsTrailers[0].topic)
  //         // }
  //       } else {
  //         // console.log("ERROR IN GETTING COURSE DETAILS", res, error);
  //         // TODO: Course details were not found , go back , or say sorry
  //         history.goBack();
  //       }
  //     }
  //   };

  //   getCourseDetails();
  // }, [currentCourse]);

  useEffect(() => {
    if (courseDetailsTrailers.length > 0) {
      setImgUrl(courseDetailsTrailers[0].thumbnail);
      setVideoUrl(courseDetailsTrailers[0].video);
      setVideoId(courseDetailsTrailers[0].topic);
    }
  }, [courseDetailsTrailers]);

  const previewVideo = (data) => {
    setImgUrl(data.image);
    setVideoUrl(data.video);
    setVideoId(data.id);
  };
  const videoPlaying = (url) => {
    setVideoUrl(url);
    setIsPlaying(true);
  };

  const dispatchCourseEnrol = () => {
    dispatch(setCurrentEnrol(enrolledCourse));
  };
  const handleClickAddToCart = () => {
    if (!checkAuthentication()) return;

    const { _id: itemId, title, price, slug, coverPhoto, description } = course;

    const buyable = {
      id: itemId,
      title,
      price,
      slug,
      coverPhoto,
      description,
    };

    dispatch(addCartItemAction(itemId, buyable));
  };

  const checkAuthentication = () => {
    if (isAuthenticated === false) {
      history.push("/login");
      return false;
    }
    return true;
  };

  const handleEnrollment = async () => {
    if (!checkAuthentication()) return;

    const res = await dispatch(
      enrollUserInCourse({ userId: user._id, courseId })
    );
    if (!isEmpty(res.res)) {
      const response = await dispatch(getEnrolledCoursesList(user._id));
    }
    dispatch({
      type: "TOAST",
      payload: {
        message: "Enrolled Successfully",
        type: "success",
      },
    });
  };

  const handleClickBuyCourse = () => {
    if (isAuthenticated === false) {
      history.push("/login");
      return;
    }
  };

  const handleClickWatchForFree = async () => {
    if (!checkAuthentication()) return;
    if (auth?.user?.unlocksLeft <= 0) return
    const { res, error } = await dispatch(
      enrollUserInCourse({
        userId: user._id,
        courseId: courseDetails._id,
        hasUnlockUsed: true,
      })
    );
    await dispatch(getEnrolledCoursesList(user._id));

    dispatch({
      type: "TOAST",
      payload: {
        type: "success",
        message: "Enrolled successfully",
      },
    });
  };

  const getTopicsLength = () => {
    let totalTopicCount = 0;
    for (const lesson of course.lessons) {
      totalTopicCount += lesson.topics.length;
    }
    return totalTopicCount;
  };
  const increaseReviewCount = () => {
    // setReviewCount(reviewCount + 2);
    setReviewCount(courseReviews.length);
    setIsBtnVisible(false);
  };

  const expandAllAccordions = () => {
    setExpandAll(!expandAll)
  }

  const CardDetailsPriceInfo = () => {
    return (
      <div
        style={
          {
            // display: "grid",
            // columnGap: "1.5rem",
            // gridTemplateColumns: "30fr 70fr",
            // alignItems: "center",
          }
        }
      >
        <div className={classes.priceAndLanguageContainer}>
          <Typography className={classes.price} variant="h5" component="div">
            {course.price === 0 ? `Free` : `$${course.price}`}
          </Typography>
          <Typography className={classes.language} variant="h5" component="div">
            <MdLanguage />
            English
          </Typography>
        </div>
        <CourseDetailsButton
          dispatchCourseEnrol={dispatchCourseEnrol}
          pathname={pathname}
          handleEnrollment={handleEnrollment}
          handleClickAddToCart={handleClickAddToCart}
          handleClickWatchForFree={handleClickWatchForFree}
          isInCart={isInCart}
          isEnrolled={isEnrolled}
          isEnrolledForUnlockUse={isEnrolledForUnlockUse}
          courseDetails={courseDetails}
          isAuthenticated={isAuthenticated}
          isSubscribed={isSubscribed}
        />
      </div>
    );

    return (
      <div
        style={{
          display: "grid",
          columnGap: "1.5rem",
          gridTemplateColumns: "30fr 70fr",
          alignItems: "center",
        }}
      >
        <Typography
          style={{ fontWeight: "600", fontSize: "2rem" }}
          variant="h5"
          component="div"
        >
          {course.price === 0 ? `Free` : `$${course.price}`}
        </Typography>
        <CourseDetailsButton
          dispatchCourseEnrol={dispatchCourseEnrol}
          pathname={pathname}
          handleEnrollment={handleEnrollment}
          handleClickAddToCart={handleClickAddToCart}
          isInCart={isInCart}
          isEnrolled={isEnrolled}
          courseDetails={courseDetails}
          isAuthenticated={isAuthenticated}
          isSubscribed={isSubscribed}
        />
      </div>
    );
  };

  if (course === null || loading) {
    return <CourseSkeleton />;
  }
  return (
    <>
      <div className={classes.courseLanding}>
        <Container className="container">
          <div className={classes.info}>
            <span>
              <h1 className="title">{course.title}</h1>
              <Typography className="headline">{course.headline}</Typography>
              <Box
                sx={{
                  // display: "flex",
                  // padding: "1.7rem 0",
                  // gap: "3rem",                  
                }}
                className={"infoDescription"}
              >
                <span style={{ display: "flex", gap: ".5rem" }}>
                  <Typography variant="caption" className="ratingText">
                    {averageRating.toString()}
                  </Typography>
                  <Rating
                    size="small"
                    name="half-rating"
                    defaultValue={+(averageRating)}
                    precision={0.5}
                    readOnly
                    style={{ color: theme.palette.background.softOrange }}
                  />
                </span>
                <Typography variant="caption">
                  {enrolledCount != 0 && enrolledCount}{" "}
                  {enrolledCount === 1
                    ? "student"
                    : enrolledCount === 0
                      ? "No students"
                      : "students"}
                </Typography>
                {/* <Typography variant="caption">
                  {courseReviews.length === 0
                    ? `No reviews` :
                    courseReviews.length === 1 ? `${courseReviews.length} review` : `${courseReviews.length} reviews`

                  }

                </Typography> */}
                <Typography variant="caption">
                  Last updated: {dateFormat(course.updatedAt)}
                </Typography>
              </Box>
              <Divider />
              <div style={{ margin: "2rem 0rem" }} />

              <Typography
                style={{
                  fontWeight: "400",
                  fontSize: "15px",
                  // padding: "2rem 0",
                }}
                component="div"
              >
                {!isEmpty(course.description)
                  ? ReactHtmlParser(course.description.contentHtml)
                  : "Description Not Available"}
              </Typography>
              <div style={{ margin: "2rem 0rem" }} />

              <h1 className="subTitle">Course categories</h1>
              <span
                style={{
                  margin: "1rem 0",
                  display: "flex",
                  gap: ".5rem",
                  flexWrap: "wrap",
                }}
              >
                {courseDetails.categories.map((cat) => {
                  return (
                    <React.Fragment key={cat._id}>
                      <Link to={`/categories/${cat.slug}`}>
                        <Chip
                          className="chip"
                          label={cat.title}
                          variant="outlined"
                        />
                      </Link>
                      {/* <Chip label={cat.title} className="chip" variant="outlined" /> */}
                    </React.Fragment>
                  );
                })}
              </span>
              {/* <Divider style={{ margin: "2rem 0rem" }} /> */}
              <div style={{ margin: "2.5rem 0rem" }} />
              <h1 className="subTitle marginTopBottom">Course content</h1>
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span
                  className="accordionTableHead"
                //// style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <Typography className="headline">
                    {course.lessons.length != 0 && course.lessons.length}{" "}
                    {course.lessons.length === 1
                      ? "section"
                      : course.lessons.length === 0
                        ? "No sections"
                        : "sections"}
                  </Typography>
                  <GoDash className="dashIcon" />
                  <Typography className="headline">
                    {getTopicsLength()} topics
                  </Typography>
                  <GoDash className="dashIcon" />
                  <Typography className="headline">
                    {convertSecsToDuration(course.duration)} total length
                  </Typography>
                </span>
                <Typography className="headline link" onClick={() => expandAllAccordions()}>
                  Expand all sections
                </Typography>
              </span>
              <CourseLessonAccordion
                lessons={course.lessons}
                onVideoPreview={previewVideo}
                expandAll={expandAll}
              />
              {/* setShowModal={setShowModal} */}
              {courseReviews.length > 0 && (
                <div className={classes.feedbackCont}>
                  <h1 className="marginBottom subTitle marginTop">
                    Student feedback
                  </h1>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography className="courseRatingNum">
                          {averageRating.toString()}
                        </Typography>
                        <Typography className="courseRatingText">
                          Course Rating
                        </Typography>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      {courseRatings.map((count) => {
                        return <CourseRating value={count} key={Math.random() * 1999999} />;
                      })}
                    </Grid>
                  </Grid>
                </div>
              )}
              <div className={classes.reviewsCont}>
                <h1 className="marginTopBottom subTitle">Reviews</h1>

                <Reviews count={reviewCount} reviews={courseReviews} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {courseReviews.length >= 4 && (
                    <Button
                      className={`${classes.LoadBtn} ${!isBtnVisible ? "hide" : ""
                        }`}
                      onClick={increaseReviewCount}
                      variant="outlined"
                    >
                      Load More
                    </Button>
                  )}
                  {courseReviews.length <= 0 && (
                    <Typography>There are no reviews</Typography>
                  )}
                </div>
              </div>
            </span>

            <div
              // style={{
              //   position: "sticky",
              //   top: "5rem",
              //   height: "max-content",
              // }}
              className={classes.cardBox}
            >
              <Card
                style={{
                  // padding: "1.6rem 1.8rem",
                  // borderRadius: "12px",
                  // height: "max-content",
                  // boxShadow: "0px 4px 8px 0px #0000000A",
                  // border: "1px solid #0000001A",
                  // borderRadius: "6px",
                  //// width: "max-content",
                  //// position: "sticky",
                  //// top: "5rem",
                }}
                className="card"
                elevation={0}
              >
                <div className={classes.myImgDiv}>
                  {/* <img className="PlayBtn" src={PlayBtn} alt="play" onClick={() => { setShowModal(true) }} /> */}
                  {/* <div className={classes.imgOverlay} ></div> */}

                  <ReactPlayer
                    className={classes.videoFrame}
                    url={videoUrl}
                    style={{ borderRadius: "10px !important" }}
                    playing
                    light={imgUrl}
                    controls
                    width="100%"
                    height="230px"
                    onPlay={() => {
                      videoPlaying(videoUrl);
                    }}
                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                  />
                </div>
                <CardContent
                  style={{
                    padding: courseDetailsTrailers.length > 1 ? "24px 0px 2px 0px" : "0px 0px 2px 0px",
                  }}
                >
                  <div
                    className={`${classes.splideDiv} ${courseDetailsTrailers.length < 2 ? "hidden" : ""
                      }`}
                  >
                    <Splide
                      options={{
                        type: "slide",
                        rewind: false,
                        gap: ".8rem",
                        pagination: false,
                        fixedWidth: 102.677,
                        fixedHeight: 60,
                        cover: true,
                        focus: "center",
                        perPage: 3,
                        isNavigation: true,
                        updateOnMove: true,
                        heightRatio: 0.5,
                        // width: "86%",
                        classes: {
                          prev: `splide__arrow--prev ${classes.arrowPrev} ${courseDetailsTrailers.length <= 3 ? "hidden" : ""
                            } disabled`,
                          next: `splide__arrow--next ${classes.arrowNext} ${courseDetailsTrailers.length <= 3 ? "hidden" : ""
                            } active`,
                        },
                      }}
                      className={`${classes.splideTrack} ${courseDetailsTrailers.length <= 2 ? classes.splideList : ""}`}
                      hasSliderWrapper
                      onArrowsUpdated={(parentEl, left, right, prev, next) => {
                        if (prev === -1 || prev < 1) {
                          left.style.background =
                            theme.palette.background.selected;
                        } else {
                          left.style.background = theme.palette.text.link_sec;
                        }

                        if (next >= 4 || next === -1) {
                          right.style.background =
                            theme.palette.background.selected;
                        } else {
                          right.style.background = theme.palette.text.link_sec;
                        }
                      }}
                    >
                      {courseDetailsTrailers.map((trailer) => (
                        <SplideSlide
                          key={`${trailer?.topic} ${Math.random() * 1230}`}
                          className={`${classes.previewImgDiv} ${courseDetailsTrailers.length <= 2 ? classes.cardLg : ""} `}
                        >
                          <img src={trailer.thumbnail} alt="slide" />
                          <div
                            className={classes.imgOverlay}
                            onClick={() => {
                              previewVideo({
                                image: trailer.thumbnail,
                                video: trailer.video,
                                id: trailer.topic,
                              });
                            }}
                          >
                            <img
                              className={`${classes.PlayBtnSM} ${isPlaying && trailer.topic === videoId
                                ? "isPlaying"
                                : ""
                                }`}
                              src={
                                isPlaying && trailer.topic === videoId
                                  ? isPlayingBtn
                                  : PlayBtn
                              }
                              alt="play"
                            />
                            {/* <img className={classes.PlayBtnSM} src={PlayBtn} alt="play" onClick={() => { setShowModal(true) }} /> */}
                          </div>
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>
                </CardContent>
              </Card>
              <Card
                className={classes.cardDetailPrice}
                // style={{
                //   padding: "18px 25px",
                //   borderRadius: "12px",
                //   height: "max-content",
                //   boxShadow: "0px 4px 8px 0px #0000000A",
                //   border: "1px solid #0000001A",
                //   borderRadius: "6px",
                //   marginTop: "15px",
                // }}
                elevation={0}
              >
                <CardContent style={{ padding: 0 }}>
                  <CardDetailsPriceInfo />
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
      {/* {showModal && <CoursePreviewModal open={showModal} onClose={() => setShowModal(false)} video="https://www.youtube.com/watch?v=mnmYwRoSisg" id="5" />} */}
    </>
  );
};

export default IndividualCoursePage;
