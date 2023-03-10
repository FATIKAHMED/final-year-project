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

    skeleton: {
        opacity: 0.7,
        animation: `$skeletonLoading 1s linear infinite alternate`,
    },


    root: {
        maxWidth: 525,
        padding: "0 1rem",

    },
    mainDiv: {
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        alignItems: "flex-start",
    },
    flex: {
        display: "flex",
        gap: "1rem",
        flexDirection: "row",
        alignItems: "center",
    },

    large: {
        width: "4.375rem",
        height: "4.375rem",
        borderRadius: "8px",
    },
    text: {
        width: "4.375rem",
        height: "0.625rem",
        borderRadius: "8px",
    },
    button: {
        width: "6.25rem",
        height: "2.75rem",
        borderRadius: "8px",
    },

}));
const MyCoursesCardSkeleton = () => {
    const classes = useStyles();

    return (
        <div className={classes.mainDiv}>
            <div className={classes.flex}>
                <span className={`${classes.large} ${classes.skeleton}`}></span>
                <span className={`${classes.large} ${classes.skeleton}`}></span>
                <span className={`${classes.large} ${classes.skeleton}`}></span>
                <span className={`${classes.large} ${classes.skeleton}`}></span>
                <span className={`${classes.button} ${classes.skeleton}`}></span>
            </div>
            <div className={classes.flex}>
                <span className={`${classes.text} ${classes.skeleton}`}></span>
                <span className={`${classes.text} ${classes.skeleton}`}></span>
                <span className={`${classes.text} ${classes.skeleton}`}></span>
            </div>
        </div>
    )
}

export default MyCoursesCardSkeleton
