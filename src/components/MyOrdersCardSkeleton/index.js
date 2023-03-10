import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    "@keyframes skeletonLoading": {
        "0%": {
            backgroundColor: "hsl(200, 20%, 70%)"
        },
        "100%": {
            backgroundColor: "hsl(200, 20%, 95%)"
        }
    },
    innerCard: {
        padding: "1rem .5rem",
        "& .cont": {
            border: "1px solid hsl(200, 20%, 70%)",
            padding: ".6rem .5rem",
            marginBottom: "1.5rem",
            borderRadius: "6px",

            "& .box": {
                height: "0.5rem",
                borderRadius: "6px"
            },
        },
        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },
        "& .button": {
            height: "2rem",
            width: "6rem",
            padding: ".5rem .6rem",
            borderRadius: "6px",
            margin: "0 auto"
        }
    }


}));
const MyOrdersCardSkeleton = () => {
    const classes = useStyles()
    return (
        <div className={classes.innerCard}>
            <Grid container spacing={3} className="cont">
                <Grid item xs={6} sm={4}>
                    <div className="box skeleton"></div>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <div className="box skeleton"></div>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <div className="box skeleton"></div>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <div className="box skeleton"></div>
                </Grid>
            </Grid>
            <Grid container spacing={3} className="cont">
                <Grid item xs={6} sm={4}>
                    <div className="box skeleton"></div>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <div className="box skeleton"></div>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <div className="box skeleton"></div>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <div className="box skeleton"></div>
                </Grid>
            </Grid>
            <div className="button skeleton"></div>
        </div>
    )
}

export default MyOrdersCardSkeleton
