import { makeStyles } from '@material-ui/core';
import React from 'react'
const useStyles = makeStyles((theme) => ({
    "@keyframes skeletonLoading": {
        "0%": {
            backgroundColor: "hsl(200, 20%, 70%)"
        },
        "100%": {
            backgroundColor: "hsl(200, 20%, 95%)"
        }
    },
    cont: {

        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },
        "& .title": {
            height: "1.5rem",
            width: "10rem",
            borderRadius: "6px",
            marginBottom: ".5rem"
        },
        "& .subTitle": {
            height: "1rem",
            width: "9rem",
            borderRadius: "6px",
            marginBottom: "1.2rem"
        },
        "& .progress": {
            height: "1.2rem",
            width: "6rem",
            borderRadius: "6px",
            marginBottom: "1.5rem"
        },
        "& .button": {
            height: "2.5rem",
            width: "12rem",
            borderRadius: "6px",
        }
    }


}));
const CourseProgressCardSkeleton = () => {
    const classes = useStyles()
    return (
        <div className={classes.cont}>
            <div className="title skeleton"></div>
            <div className="subTitle skeleton"></div>
            <div className="progress skeleton"></div>
            <div className="button skeleton"></div>

        </div>
    )
}

export default CourseProgressCardSkeleton
