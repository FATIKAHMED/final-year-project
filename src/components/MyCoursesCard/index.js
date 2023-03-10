import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Avatar,
  // Grid, Icon
} from "@material-ui/core";
import { BsArrowRightShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyCoursesCardSkeleton from "components/MyCoursesCardSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 525,
    padding: ".2rem 1rem",
    boxShadow: theme.palette.boxShadow.card,
    borderRadius: "6px",
    "& .cardBorder": {
      border: `1px solid ${theme.palette.text}`,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "2rem"
    },
  },
  title: {
    fontWeight: 500,
    fontSize: ".9rem",
    marginBottom: "1.4rem",
  },
  font: {
    fontSize: 10,
  },
  button: {
    height: "min-content",
    padding: ".6rem .8rem",
    textTransform: "capitalize",
    border: `1px solid ${theme.palette.border.gray3}`,
    fontSize: ".725rem",
    "&:hover": {
      // darkPurple
      border: `1px solid ${theme.palette.background.purple}`,
      background: theme.palette.background.purple,
      color: "white",
    },
  },
  large: {
    width: "76px",
    height: "76px",
    borderRadius: "8px",
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    alignItems: "flex-start",

    [theme.breakpoints.down("xs")]: {
      "& .flex1": {
        flexWrap: "wrap",
        margin: "auto",
        gap: "2rem",
        justifyContent: "space-around"
      },
      "& .flex2": {
        display: "none"
      }
    }
  },
  flex: {
    display: "flex",
    gap: ".8rem",
    flexDirection: "row",
    alignItems: "center",
  },
  truncateText: {
    width: "70px",
    whiteSpace: "nowrap",
    overflow: " hidden",
    textOverflow: "ellipsis",
  },
  viewMore: {
    // gray11/
    background: theme.palette.border.gray11,
    border: `1px solid ${theme.palette.border.gray3}`,
    borderRadius: "8px",
    color: theme.palette.text.placeholder,
    fontSize: ".6rem"
  },
}));

export default function MyCoursesCard() {
  const classes = useStyles();
  const courses = useSelector((state) => state.courses.store?.docs);
  const coursesEnrolled = useSelector((state) => state.courses?.enrolled);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000);
  }, []);


  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          gutterBottom
          className={classes.title}
          variant="h6"
          component="h2"
        >
          My courses
        </Typography>
        <div className={classes.mainDiv}>
          <div className={`${classes.flex} flex1`}>
            {/* {(isLoading && coursesEnrolled?.length <= 0) && <MyCoursesCardSkeleton />} */}
            {/* {(coursesEnrolled?.length <= 0) && <MyCoursesCardSkeleton />} */}
            {coursesEnrolled?.length === 0 &&
              <>
                {isLoading ?
                  <MyCoursesCardSkeleton /> :
                  <div>You have no courses <Link to="/courses" style={{ fontWeight: "600" }}> Enroll Now!</Link></div>}
              </>
            }
            {coursesEnrolled.length > 0 &&
              coursesEnrolled?.slice(0, 3).map((item, i) => {
                return (
                  <Avatar
                    className={classes.large}
                    alt="avatar here"
                    variant="square"
                    src={item.course.coverPhoto}
                    aria-label="recipe"
                    key={item?.course?.coverPhoto}
                  />
                );
              })}
            {coursesEnrolled?.length > 3 && (
              <Avatar
                variant="square"
                className={`${classes.font} ${classes.large}  ${classes.viewMore}`}
              >
                +{coursesEnrolled?.length - 3} more
              </Avatar>
            )}
            {coursesEnrolled?.length > 0 &&
              <Link to="/my-courses">
                <Button
                  endIcon={<BsArrowRightShort />}
                  size="small"
                  className={classes.button}
                  variant="outlined"
                >
                  View all
                </Button>
              </Link>
            }
          </div>
          <div className={`${classes.flex} flex2`} style={{ gap: "1.2rem" }}>
            {coursesEnrolled &&
              coursesEnrolled?.slice(0, 3).map((item, i) => {
                return (
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="h2"
                    className={`${classes.font} ${classes.truncateText}`}
                    key={item?.course?.title}
                  >
                    {item.course.title}
                  </Typography>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
