// * Libraries
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box, LinearProgress, CardActions, CardContent, Card } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";

// * Components
import CourseProgressCardSkeleton from "components/CourseProgressCardSkeleton";

// * Utils
import isEmpty from "utils/is-empty";
import { getTimeInMilliSeconds } from "utils/convertTime";
import { getCourseDetailsBySlugAction, setCurrentEnrol } from "redux/actions";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    boxShadow: theme.palette.boxShadow.card,
    borderRadius: "6px",
    "& .MuiCardActions-root": {
      padding: 0,
      paddingLeft: "2.1rem",
      marginBottom: "1.4rem",
    },
    "& .cardContent": {
      // padding: "1rem 2rem",
      // paddingTop: "1.25rem",
      padding: "1.25rem 2rem 1rem 2rem",
    },
    "& .mt-1": {
      marginTop: "1.25rem",
    },

  },
  title: {
    fontWeight: 500,
    fontSize: ".9rem",
  },
  subTitle: {
    fontSize: "0.75rem",
    marginBottom: "1.2rem",
  },
  titleSecondary: {
    fontSize: "1.125rem",
    fontWeight: 500,
  },
  text: {
    // marginBottom: "12px",
    fontSize: "0.875rem",
    marginBottom: "1.25rem",
    color: theme.palette.text.headere,
    fontWeight: 300,
  },
  progressCont: {
    marginBottom: "0.8rem"
  },
  cardActionCont: {
    [theme.breakpoints.down("xs")]: {
      padding: "0",
      "&.MuiCardActions-root": {
        padding: "0"
      }
    }
  },
  button: {
    height: "min-content",
    // padding: ".6rem 2.4rem",
    padding: ".7rem 3rem",
    textTransform: "capitalize",
    borderRadius: "6px",
    color: theme.palette.background.purple,
    border: `1px solid ${theme.palette.background.purple} `,
    width: "16.875rem",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      margin: "0 auto",
      marginBottom: "1rem"

    },
    "&:hover": {
      // darkPurple
      background: theme.palette.background.purple,
      color: theme.palette.common.white,
    },
  },

}));

export default function CourseProgressCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // const [isLoading, setIsLoading] = useState(true);
  const [latestProgress, setLatestProgress] = useState({});

  // const myProgress = useSelector((state) => {
  //   // const selectedCourse = state.auth.user.contentProgress?.courses[0];
  //   const selectedCourse = state.enrol.current;

  //   const courseDetails = selectedCourse?.course;

  //   if (!isEmpty(courseDetails)) {
  //     return {
  //       ...selectedCourse?.courseProgress,
  //       title: courseDetails.title,
  //       subTitle: courseDetails.headline,
  //       url: courseDetails.slug,
  //     };
  //   } else {
  //     return {
  //       ...selectedCourse?.courseProgress,
  //     };
  //   }
  // });
  const loading = useSelector((state) => state.courses?.loading);
  const enrolled = useSelector((state) => state.courses?.enrolled);
  let arr = [];
  const progress = enrolled.filter(item => {
    if (item.hasOwnProperty("courseProgress") && !(item?.courseProgress?.isCompleted)) {
      item.updatedAt = getTimeInMilliSeconds(item.updatedAt);
      arr.push(getTimeInMilliSeconds(item.updatedAt))
      return (item);
    }
  })

  const getClosedVal = (arr, number) => {

    var closest = arr.reduce(function (prev, curr) {
      return (Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev);
    });
    return closest;
  }
  const getLatestProgress = () => {
    if (arr.length > 0) {
      const closestVal = getClosedVal(arr, Date.now())
      // console.log("closestVal-->", closestVal)
      // console.log("progress-->", progress)
      let item = progress.filter(item => item.updatedAt === closestVal)[0]
      // console.log("item-->", item)
      setLatestProgress({
        ...item?.courseProgress,
        title: item.course.title,
        subTitle: item.course.headline,
        url: `/courses/${item.course.slug}/lessons`,
        slug: item.course.slug,
      })
    }

  }
  const getCourseDetails = async () => {
    if (isEmpty(latestProgress)) return

    // setLoading(true);
    const { res, error } = await dispatch(getCourseDetailsBySlugAction(latestProgress.slug));

    if (error) {
      // TODO: Course details were not found , go back , or say sorry
      history.goBack();
    }

  };

  const goToLessons = async (e) => {
    e.stopPropagation();
    await getCourseDetails();
    history.push(latestProgress?.url)
  }


  // useEffect(() => {
  //   getLatestProgress()

  //   console.log("latest==>", latestProgress)

  //   if (latestProgress["isCompleted"] && isLoading) {
  //     // isEmpty(latestProgress)
  //     setIsLoading(false)
  //   }
  //   else if (isEmpty(latestProgress)) {
  //     setIsLoading(false)
  //   }
  //   else {
  //     setIsLoading(true)
  //   }
  // }, [latestProgress["isCompleted"]])

  useEffect(() => {
    getLatestProgress()

    // console.log("latest==>", latestProgress)

    // if (latestProgress && isLoading) {
    //   // isEmpty(latestProgress)
    //   setIsLoading(false)
    // }

  }, [arr.length <= 0])

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className="cardContent">
        <Typography className={classes.title} variant="h6" component="h2">
          Course Progress
        </Typography>
        <Typography
          className={classes.subTitle}
          color="textSecondary"
          gutterBottom
        >
          Don't stop now, Continue learning and complete the course
        </Typography>
        {
          loading ?
            <CourseProgressCardSkeleton />
            :
            !isEmpty(latestProgress) && (<>
              <Typography variant="h5" component="h2" className={classes.titleSecondary}>
                {latestProgress.title}
              </Typography>
              <Typography className={classes.text} >
                {latestProgress.subTitle}
              </Typography>

              {latestProgress.isCompleted ? (
                <div
                  style={{
                    display: "flex",
                    gap: ".5rem",
                    alignItems: "center",
                  }}
                >
                  <IoCheckmarkDoneCircleOutline size={20} /> Completed
                </div>
              ) : (
                <div className={classes.progressCont}>
                  <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                    <Typography variant="body2" color="textSecondary">
                      {Math.round((latestProgress.completedDuration / latestProgress.totalDuration) * 100)}%
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      100%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={Math.round((latestProgress.completedDuration / latestProgress.totalDuration) * 100)} />
                </div>
              )}
            </>)
        }
      </CardContent>
      <CardActions className={classes.cardActionCont}>
        {/* <Link to={`/courses/${latestProgress?.url}/lessons`}> */}
        {!isEmpty(latestProgress) ?
          <Button className={classes.button} variant="outlined" onClick={goToLessons}>
            Continue Learning
          </Button>
          :
          <div>There is no course progress for any course. <Link style={{ fontWeight: "600" }}>Enrol Now!</Link></div>
        }
      </CardActions>
    </Card>
  );
}
