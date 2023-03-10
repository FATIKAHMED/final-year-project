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
import { setUserReviewAction, setCurrentEnrol } from "redux/actions";
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
    card: {
        // lightGray
        // minHeight: "333px",
        [theme.breakpoints.down("650")]: {
            margin: "0 auto"
        },
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
            "& .price": {
                fontSize: "1rem",
                fontWeight: 600,
                color: "#343434",
            },
        },
        "& .courseRatingCont": {
            // height: "30px",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            marginBottom: ".4rem",
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
            "& .ratingText": {
                color: theme.palette.background.softOrange,
                fontWeight: "600",
                fontSize: ".8rem"
            },
            "& .rating": { fontSize: "1.2rem", color: theme.palette.background.softOrange, }

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

export default function MyIndividualCategoryCard({
    image,
    title,
    description,
    rating,
    price,
    date,
    courseLink,
    courseId,
    slug,
    categoryCard
}) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    // const [showModal, setShowModal] = React.useState(false)
    // const enrolledCourse = useSelector(state => {
    //     let id
    //     state.courses.enrolled.find(item => item.course._id === courseId ? id = item._id : null)
    //     return state.courses.enrolled.filter(item => item._id === id)[0]
    // })

    // const getCourseCompletionPercentage = (course) => {
    //     let percentage;
    //     if (course.isCompleted)
    //         percentage = '100'
    //     else
    //         percentage = ((course?.completedDuration / course?.totalDuration) * 100).toFixed().toString()


    //     return percentage.toString()
    // }
    // const handleSubmit = async (obj) => {
    //     obj.courseId = courseId
    //     const res = await dispatch(setUserReviewAction(obj))
    //     if (!isEmpty(res)) {
    //         dispatch({
    //             type: "TOAST",
    //             payload: {
    //                 message: "Rated course successfully",
    //                 type: 'success'
    //             }
    //         })
    //     } else {
    //         dispatch({
    //             type: "TOAST",
    //             payload: {
    //                 message: "Failed rating course",
    //                 type: 'error'
    //             }
    //         })
    //     }

    // }

    // const handleClick = (e) => {
    //     e.stopPropagation();

    //     setShowModal(true)
    // }
    // const goToLessons = (e) => {
    //     e.stopPropagation();
    //     dispatch(setCurrentEnrol(enrolledCourse))
    //     history.push(courseLink)
    // }

    return (
        <>
            {/* {<CommmentModal open={showModal} modalTitle={"Add a Review"} setOpen={setShowModal} handleSubmit={handleSubmit} />} */}
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
                onClick={() => history.push(courseLink)}
            >
                <CardMedia component="img" height="140" src={image} alt="course img" />
                <CardContent>
                    <div>
                        <Typography className="date" gutterBottom>
                            {date}
                        </Typography>
                        <Typography gutterBottom className="title">
                            {title}
                        </Typography>
                        <Typography gutterBottom className="description">
                            {/* {ReactHtmlParser(description.contentHtml)} */}
                            {description?.content}
                        </Typography>
                    </div>
                    <div>
                        <div className="courseRatingCont">
                            <Typography variant="caption" className="ratingText">{rating}</Typography>
                            <Rating value={rating} precision={0.5} readOnly className={"rating"} />
                        </div>
                        <div className="courseProgressCont">
                            <Typography className="price">{price}$</Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
