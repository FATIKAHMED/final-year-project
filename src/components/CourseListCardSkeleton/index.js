import { makeStyles } from '@material-ui/core'
import React from 'react'
// import "./skeleton.css"

const useStyles = makeStyles((theme) => ({
    "@keyframes skeletonLoading": {
        "0%": {
            backgroundColor: "hsl(200, 20%, 70%)"
        },
        "100%": {
            backgroundColor: "hsl(200, 20%, 95%)"
        }
    },
    skeletonHeader: {
        /* display: flex, */
        marginBottom: "1rem",
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "0.5fr 1.5fr",
        /* grid-template-columns: 1fr 2fr, */
        /* padding: 1rem, */

        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },

        "& .headerImg": {
            width: "280px",
            height: "196px",
            objectFit: "cover",
            marginRight: "1rem",
            flexShrink: 0,
            /* margin-left: auto, */
        },
        "& .skeletonTitle": {
            fontWeight: "bold",
            fontSize: "1.25rem",
            textTransform: "capitalize",
            wordWrap: "none",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            /* flex-grow: 1, */
            position: "relative",
            maxWidth: "800px",

            "& .skeletonText": {
                /* width: 100%, */
                height: "0.6rem",
                marginBottom: "0.25rem",
                /* borderRadius: .125rem, */
                borderRadius: "20px",
                position: "relative",
            },
            "& .skeletonText:nth-child(1)": {
                height: "1rem",
                width: "40%",
                maxWidth: "200px",
                flex: 1,
                position: "relative",
                top: "20%",
            },
            "& .skeletonText:nth-child(2)": {
                height: "0.8rem",
                width: "10%",
                maxWidth: "60px",
                flex: 1,
                position: "relative",
                top: "22%",
            },
            "& .skeletonText:nth-child(3)": {
                width: "100%",
                maxWidth: "650px",
                flex: 1,
                position: "relative",
                top: "32%",
            },
            "& .skeletonText:nth-child(4)": {
                width: "100%",
                maxWidth: "650px",
                flex: 1,
                position: "relative",
                top: "34%",
            },

            "& .skeletonText:nth-child(5)": {
                width: "100%",
                height: "0.7rem",
                maxWidth: "110px",
                flex: 1,
                position: "relative",
                top: "40%",
            },

            "& .skeletonText:nth-child(6)": {
                maxWidth: "100px",
                flex: 1,
                position: "relative",
                top: "30%",
                height: "0.7rem",
                left: "87%",
            },
        },
    },

}))


const CourseListCardSkeleton = () => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.skeletonHeader}>
                <div className="headerImg skeleton"></div>
                <div className="skeletonTitle" >
                    <div className="skeleton skeletonText"></div>
                    <div className="skeleton skeletonText"></div>
                    <div className="skeleton skeletonText"></div>
                    <div className="skeleton skeletonText"></div>
                    <div className="skeleton skeletonText"></div>
                    <div className="skeleton skeletonText"></div>
                </div>
            </div>
        </div>
    )
}

export default CourseListCardSkeleton
