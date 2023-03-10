import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 325,
    border: theme.palette.border.basic,
    boxShadow: theme.palette.boxShadow.card,
    borderRadius: "6px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "0rem"
    },
    "& .MuiCardContent-root:last-child": {
      // minHeight: "7rem",
      // paddingBottom: "1rem",
      // paddingTop: "2rem",
      minHeight: "5rem",
      padding: "1.6rem 1.5rem 1.5rem 1.7rem",

    },
    "&:hover": {
      background: theme.palette.background.gradient,
      color: theme.palette.common.white,
      border: `1px solid ${theme.palette.background.gradient}`,
      // transition: ".3s",
      "& .title,& .subTitle,& .count": {
        color: theme.palette.common.white,
      },

    },
    "& .divStyle": {
      display: "flex",
      // gap: "1.5rem",
      gap: "0.5rem",
      alignItems: "center",
      "& .title": {
        color: theme.palette.text.cardTitle,
        fontSize: "1.125rem",
        fontWeight: "500",
      },
      "& .subTitle": {
        // color: theme.palette.text.cardSubTitle,
        fontWeight: 300,
        color: "#9F9F9F",
        fontSize: "0.75rem",
      },
      "& .count": {
        color: theme.palette.background.purple,
        fontSize: "2.2rem",
        textAlign: "right"
      },

    },
  },
}));

export default function NumbersCard(props) {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <div className="divStyle">
          <Grid item xs={12} sm={10}>
            <Typography variant="h5" component="h2" className="title">
              {props.title}
              <Typography variant="body2" component="p" className="subTitle">
                {props.subTitle}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h3" component="h2" className="count">
              {props.count > 0 ? props.count : 0}
            </Typography>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
