import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Box, Container } from "@mui/material";
import { Card, CardContent } from "@material-ui/core";

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
    margin: "50px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.07)",
    "& .skeleton": {
      opacity: 0.7,
      animation: `$skeletonLoading 1s linear infinite alternate`,
    },
    "& .cardContent": {
      height: "120px",
      width: "100%",
      // veryLightGray4
      border: `1px solid ${theme.palette.border.gray7}`,

      "& .date": {
        color: "white",
        width: "10rem",
        height: "1.5rem",
        marginBottom: "10px",
        borderRadius: "6px",
      },
      "& .text": {
        color: "white",
        width: "100%",
        height: "3rem",
        borderRadius: "6px",
      },
    },
  },
}));

const NotificationSkeleton = () => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.card}>
      <CardContent className="cardContent">
        <p className="date skeleton"></p>
        <p className="text skeleton"></p>
      </CardContent>
    </Card>
  );
};

export default NotificationSkeleton;
