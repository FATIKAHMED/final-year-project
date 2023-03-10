import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({

    CourseLearnCont: {
        // marginBottom: "1rem",
        // "gap": "0rem",
        // "display": "grid",
        // "columnGap": "0rem",
        // "gridTemplateColumns": "25fr 75fr",
        "minHeight": "40rem",
        "marginBottom": "-3rem",
        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },
        "& .sidebarWrapper": {
            width: "100%",
            height: "99.5%",
            borderRight: "2px solid lightgrey",
            "& .title": {
                display: "flex",
                flexDirection: "column",
                margin: "2rem 0",
                justifyContent: "space-around",
                padding: "1rem 1.4rem",
                "& h1": {
                    width: "15rem",
                    height: "1.5rem",
                    background: "lightgrey",
                    borderRadius: "2rem",
                    marginBottom: ".5rem",
                },
                "& p": {
                    width: "10rem",
                    height: "1.2rem",
                    background: "lightgrey",
                    borderRadius: "2rem",
                }

            },
            "& .box": {
                background: "lightgrey",
                height: "3rem",
                borderRadius: "6px",
                margin: "1rem 1.3rem",
                width: "18rem",
            },
            "& .text": {
                background: "lightgrey",
                height: "2rem",
                width: "10rem",
                borderRadius: "6px",
                margin: "1rem auto",
            },
        },
        "& .videoWrapper": {
            width: "100%",
            height: "100%",
            "& .header": {
                margin: "2rem 1.8rem 0.5rem 1.8rem",
                paddingTop: "1rem",
                display: "flex",
                // padding: "1rem 1.4rem 0 1rem",
                padding: "1rem 0.4rem 0 1rem",
                width: "92%",
                alignItems: "baseline",
                justifyContent: "space-between",
                "& div h1": {
                    width: "15rem",
                    height: "1.5rem",
                    borderRadius: "2rem",
                },
                "& div p": {
                    width: "10rem",
                    height: "1.2rem",
                    background: "lightgrey",
                    borderRadius: "2rem",
                    marginBottom: ".5rem",
                },
                "& .nextBtn": {
                    height: "2rem",
                    width: "7rem",
                    borderRadius: "1rem",
                },

            },
            "& .video": {
                width: "90%",
                borderRadius: "6px",
                margin: "1rem 3rem",
                minHeight: "25rem",
            }

        },
        "& .btnWrapper": {
            display: "flex",
            width: "90%",
            margin: "1rem 3rem",
            "& div": {
                height: "2rem",
                width: "7rem",
            },
            "& div:nth-child(1)": {
                marginRight: "1rem"
            }
        }
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
const CourseLearnSkeleton = () => {
    const classes = useStyles();
    return (
        <div className={classes.CourseLearnCont}>

            {/* <div className="sidebarWrapper">
                <div className="title">
                    <h1 className="skeleton"></h1>
                    <p className="skeleton"></p>
                </div>
                <div className="box skeleton"></div>
                <div className="text skeleton"></div>
                <div className="box skeleton"></div>
                <div className="box skeleton"></div>
                <div className="box skeleton"></div>
            </div> */}
            <div className="videoWrapper">
                <div className="header">
                    <div>
                        <p className="skeleton"></p>
                        <h1 className="skeleton"></h1>
                    </div>
                    <p className="nextBtn skeleton"></p>
                </div>
                <div className="video skeleton"></div>
            </div>
            <div className="btnWrapper">
                <div className="skeleton"></div>
                <div className="skeleton"></div>
            </div>
        </div>
    )
}

export default CourseLearnSkeleton
