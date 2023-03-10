import React from 'react'
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    "@keyframes skeletonLoading": {
        "0%": {
            backgroundColor: "hsl(200, 20%, 70%)"
        },
        "100%": {
            backgroundColor: "hsl(200, 20%, 95%)"
        }
    },
    card: {
        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },
        // borderVeryLightGray
        border: `1px solid ${theme.palette.border.gray12}`,
        borderRadius: "6px",
        "& .img": {
            height: "140px",
            width: "100%",

        },
        "& .date": {
            "width": "5rem",
            "height": "1rem",
            "borderRadius": "6px",
            "marginBottom": "0.3rem"
        },
        "& .title": {
            "height": "1.4rem",
            "borderRadius": "6px",
            "marginBottom": "0.8rem"
        },
        "& .description": {
            "width": "240px",
            "height": ".8rem",
            "borderRadius": "6px",
            "marginBottom": "0.3rem"
        },
        "& .description:last-child": {
            "marginBottom": "0.8rem",
        },
        "& .courseProgressCont": {
            "height": "45px",
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "center",
            "borderRadius": "6px",
            "marginBottom": "0.3rem"
        },
        "& .courseRatingCont": {
            "height": ".7rem",
            "flexDirection": "column",
            "justifyContent": "center",
            "borderRadius": "6px",
            "width": "35%"
        },
    },
}));
const MyIndividualCourseCardSkeleton = () => {
    const classes = useStyles();
    return (
        <Card
            className={classes.card}
            elevation={0}
            sx={{ maxWidth: 300, maxHeight: 340 }}
        >
            <div className="img skeleton" />
            <CardContent>
                <div className="date skeleton" ></div>
                <div className="title skeleton"></div>
                <div className="description skeleton"></div>
                <div className="description skeleton"></div>
                <div className="courseProgressCont skeleton"></div>
                <div className="courseRatingCont skeleton"></div>
            </CardContent>
        </Card>
    )
}

export default MyIndividualCourseCardSkeleton
