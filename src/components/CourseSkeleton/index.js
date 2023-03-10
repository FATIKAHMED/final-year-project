import React from 'react'
import { makeStyles } from "@material-ui/core/styles";




import {
    //  Box,
    Container
} from '@mui/material';
import { Card } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem 0",
    },
    courseLanding: {
        marginTop: "2rem",
        position: "realtive",
        padding: "2rem",
    },

    myImgDiv: {
        borderRadius: "10px",
        background: " linear-gradient(90deg, rgba(130, 193, 202, 0.55) 0%, rgba(80, 157, 213, 0.55) 100%)",
        height: "auto",
        maxWidth: "429px",
        position: "relative",
        "& .PlayBtn": {
            position: " absolute",
            zIndex: 40,
            margin: "auto",
            top: "25%",
            right: "5%",
            left: "5%",
            bottom: "25%",
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
    skeletonHeader: {
        /* display: flex, */
        marginBottom: "1rem",
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "60fr 40fr",
        columnGap: "5rem",

        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },

        "& .headerImg": {
            width: "10rem",
            height: "20rem",
            objectFit: "cover",
            marginRight: "1rem",
            flexShrink: 0,
            minWidth: "200px",
        },
        "& .skeletonTitle": {
            maxWidth: "800px",

            "& .skeletonText": {
                height: "0.6rem",
                marginBottom: "0.25rem",
                borderRadius: "6px",
                flex: 1,
            },
            "& .header": {
                maxWidth: "20rem",
                marginBottom: "1.5rem",
                "& .skeletonText:nth-child(1)": {
                    width: "16rem",
                    height: "1.3rem",
                    marginBottom: ".5rem"
                },
                "& .skeletonText:nth-child(2)": {
                    width: "6rem",
                    height: ".8rem",
                },

            },
            "& .about": {
                display: "flex",
                maxWidth: "24rem",
                marginBottom: "3rem",
                "& .skeletonText": {
                    marginRight: "1rem",
                    height: ".8rem",
                },
            },
            "& .content": {

                "& .skeletonText": {
                    height: "1rem",
                    marginBottom: ".5rem",
                    width: "100%"
                },
            },


        },
    },
}));
const CourseSkeleton = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.courseLanding}>
                <Container>

                    <div className={classes.skeletonHeader}>
                        <div className="skeletonTitle" >

                            <div className="header">
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                            </div>
                            <div className="about">
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                            </div>
                            <div className="content">
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText"></div>
                            </div>

                        </div>
                        <Card
                            style={{
                                padding: "1rem",
                                borderRadius: "6px",
                                height: "max-content",
                                // width: "max-content",
                                position: "sticky",
                                top: "8rem",
                                boxShadow: "none"
                            }}
                            className="skeleton"
                        >
                            <div className="headerImg"></div>
                        </Card>

                    </div>
                </Container>
            </div>
        </>
    )
}

export default CourseSkeleton
