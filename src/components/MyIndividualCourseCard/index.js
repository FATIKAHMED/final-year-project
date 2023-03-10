import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import { Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "utils/is-empty";
import { Link, useHistory } from "react-router-dom";
import CommmentModal from "components/CommentModal";
import { setUserReviewAction, setCurrentEnrol, getCourseDetailsBySlugAction } from "redux/actions";
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
  card: {
    // lightGray
    minHeight: "333px",
    "& .MuiTypography-root": {
      fontFamily: theme.typography.fontFamily,
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "16px"
    },
    border: `1px solid ${theme.palette.border.gray3}`,
    height: "100%",
    "& .date": {
      // lightGray
      color: theme.palette.border.gray3,
      fontWeight: "300",
      fontSize: "11px",
    },
    "& .title": {
      fontWeight: "500",
      fontSize: "15px",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .description": {
      fontWeight: "400",
      fontSize: "12px",
      // darkestGray
      color: theme.palette.text.header,
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "1rem",
      marginBottom: ".5rem",
      minHeight: "32px"
    },
    "& .courseProgressCont": {
      // height: "45px",
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "center",
      marginBottom: "0.5rem",
      "& .completedText": {
        // lightSkyBlue
        color: theme.palette.text.cardTitle,
        marginTop: ".3rem",
        fontWeight: "400",
        fontSize: "10px",
      },
      "& .button": {
        // darkPurple
        border: `1px solid ${theme.palette.background.purple}`,
        borderRadius: "5px",
        // darkPurple
        color: theme.palette.background.purple,
        textTransform: "capitalize",
        marginBottom: ".3rem",
      },
    },
    "& .courseRatingCont": {
      // height: "30px",
      display: "flex",
      alignItems: "center",
      gap: "0.2rem",
      "& .color": {
        // gradientBlue
        color: theme.palette.text.link_sec,
        textDecoration: "underline",
        textTransform: "capitalize"
      },
      "& .text": {
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    "& .progressBox": {
      // marginTop: "0.6rem",
      marginBottom: "1rem",
    },
    "& .progressBar": {
      "& .MuiLinearProgress-colorPrimary": {
        backgroundColor: theme.palette.border.gray7,
      },
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: theme.palette.text.link_sec,
      }
    },
  },
}));

export default function MyIndividualCourseCard({
  image,
  title,
  description,
  rating,
  complete,
  date,
  courseLink,
  courseId,
  slug,
  slugOnly,
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false)
  //// const [courseDetails, setCourseDetails] = React.useState(null);

  const enrolledCourse = useSelector(state => {
    let id
    state.courses.enrolled.find(item => item.course._id === courseId ? id = item._id : null)
    return state.courses.enrolled.filter(item => item._id === id)[0]
  })


  const getCourseDetails = async () => {
    if (isEmpty(slugOnly)) return

    // setLoading(true);
    const { res, error } = await dispatch(getCourseDetailsBySlugAction(slugOnly)
    );

    if (error) {
      // TODO: Course details were not found , go back , or say sorry
      history.goBack();
    }

  };

  const getCourseCompletionPercentage = (course) => {
    let percentage;
    if (course.isCompleted)
      percentage = '100'
    else
      percentage = ((course?.completedDuration / course?.totalDuration) * 100).toFixed().toString()


    return percentage.toString()
  }
  const handleSubmit = async (obj) => {
    obj.courseId = courseId
    const res = await dispatch(setUserReviewAction(obj))
    if (!isEmpty(res)) {
      dispatch({
        type: "TOAST",
        payload: {
          message: "Rated course successfully",
          type: 'success'
        }
      })
    } else {
      dispatch({
        type: "TOAST",
        payload: {
          message: "Failed rating course",
          type: 'error'
        }
      })
    }

  }

  const handleClick = (e) => {
    e.stopPropagation();

    setShowModal(true)
  }
  const goToLessons = async (e) => {
    e.stopPropagation();
    // console.log("courseId-->", courseId)
    // console.log("enrolledCourse-->", enrolledCourse)
    // console.log("slug-->", slug)
    dispatch(setCurrentEnrol(enrolledCourse))
    await getCourseDetails();
    history.push(courseLink)
  }


  return (
    <>
      {<CommmentModal open={showModal} modalTitle={"Add a Review"} setOpen={setShowModal} handleSubmit={handleSubmit} />}
      <Card
        className={classes.card}
        elevation={0}
        sx={{
          //  maxWidth: 200,
          maxWidth: 280,
          cursor: "pointer",
          width: "100%",
          borderRadius: "6px"
        }}
        onClick={() => history.push(slug)}
      >
        <CardMedia component="img" height="140" src={image} alt="course img" />
        {/* <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: ".5rem" }}> */}
        <CardContent>
          {/* <div style={{ minHeight: "93px" }}> */}
          <div>
            <Typography className="date" gutterBottom>
              {date}
            </Typography>
            <Typography gutterBottom className="title">
              {title}
            </Typography>
            {isEmpty(complete) &&
              <Typography gutterBottom className="description">
                {ReactHtmlParser(description.contentHtml)}
              </Typography>
              // || complete?.completedDuration === 0
            }
          </div>
          <div>
            <div className="courseProgressCont">
              {/* {isEmpty(complete) ? (
                // || complete?.completedDuration === 0
                <Button onClick={goToLessons}
                  fullWidth className="button">
                  Start Course
                </Button>
              ) : ( */}
              {isEmpty(complete) && <Button onClick={goToLessons}
                fullWidth className="button">
                Start Course
              </Button>}
              {!isEmpty(complete) &&
                <>
                  <div className="progressBox">
                    <Typography gutterBottom className="completedText">
                      {getCourseCompletionPercentage(complete)}% completed
                    </Typography>
                    <LinearProgress
                      style={{ width: "100%", height: "6px", borderRadius: "6px" }}
                      variant="determinate"
                      value={+(getCourseCompletionPercentage(complete))}
                      className="progressBar"
                    />
                  </div>
                  <Button onClick={goToLessons}
                    fullWidth className="button">
                    Continue Course
                  </Button>
                </>
              }
              {/* )} */}
            </div>
            <div className="courseRatingCont">
              {isEmpty(rating) ? (
                <Button style={{ padding: 0 }} onClick={handleClick}>
                  <Typography className="color text">Leave a rating</Typography>
                </Button>
              ) : (
                <>
                  <Typography className="text">Your rating:</Typography>
                  <Rating value={rating} precision={0.5} readOnly style={{ fontSize: "1.2rem" }} />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
