import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({

    videoAccordionCont: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 3rem",
        marginTop: "-5rem",
        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },
        "& .accordionCont": {
            width: "100%",
        },
        "& .accordBar": {
            width: "100%",
            height: "4rem",
            border: "1px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            "& .accordText": {
                width: "7rem",
                background: theme.palette.background.lightPink,
                height: "1.4rem",
                borderRadius: "2px",
                marginLeft: "2rem"
            },
            "& .accordBox": {
                display: "flex",
                width: "32rem",
                justifyContent: "space-around",
                marginRight: "2rem",
                alignItems: "center",
                "& span": {
                    height: ".7rem",
                    width: "6rem",
                    backgroundColor: theme.palette.background.lightPink,
                    borderRadius: "2px",
                },

                "& span:nth-child(4)": {
                    height: "2rem",
                    width: "6rem",
                    backgroundColor: theme.palette.background.lightPink,
                    borderRadius: "5px"
                },
            },
        },

    },

    "@keyframes skeletonLoading": {
        "0%": {
            backgroundColor: "hsl(200, 20%, 70%)"
        },
        "100%": {
            backgroundColor: "hsl(200, 20%, 95%)"
        }
    },



}));
const VideoLessonAccordionSkeleton = () => {
    const classes = useStyles();
    return (
        <div className={classes.videoAccordionCont}>
            <div className="accordionCont">
                <div className="accordBar skeleton">
                    <div className="accordText"></div>
                    <div className="accordBox">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="accordionCont">
                <div className="accordBar skeleton">
                    <div className="accordText"></div>
                    <div className="accordBox">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="accordionCont">
                <div className="accordBar skeleton">
                    <div className="accordText"></div>
                    <div className="accordBox">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoLessonAccordionSkeleton
