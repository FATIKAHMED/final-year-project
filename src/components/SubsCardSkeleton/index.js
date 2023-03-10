import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@keyframes skeletonLoading": {
    "0%": {
      backgroundColor: "hsl(200, 20%, 70%)",
    },
    "100%": {
      backgroundColor: "hsl(200, 20%, 95%)",
    },
  },
  card: {
    maxWidth: 680,
    padding: ".5rem 1rem",
    "& .skeleton": {
      opacity: 0.7,
      animation: `$skeletonLoading 1s linear infinite alternate`,
    },
    "& .cardContent": {
      "& .text": {
        color: "white",
        width: "50%",
        height: "1.5rem",
      },
      "& .title": {
        fontWeight: "400",
      },
    },
    "& .button": {
      color: "white",
      width: "25%",
      height: "2rem",
      borderRadius: "5px",
    },
  },
}));

const SubsCardSkeleton = () => {
  const classes = useStyles();

  return (
    <Card elevation={0} variant="outlined" className={classes.card}>
      <CardContent className="cardContent">
        <Typography gutterBottom className="title" variant="h6" component="h2">
          My Subscription
        </Typography>
        <p className="text skeleton"></p>
      </CardContent>
      <CardActions>
        <p className="button skeleton"></p>
      </CardActions>
    </Card>
  );
};

export default SubsCardSkeleton;
