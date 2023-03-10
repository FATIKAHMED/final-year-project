import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import { Rating, Box } from "@mui/material";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  colorPrimaryBar: {
    "&::before": {
      opacity: 0 + " !important",
    },
    // backgroundColor: "transparent",
    // backgroundColor: theme.palette.background.selected,
    color: theme.palette.text.pill,
    height: "12px !important",
    border: `2px solid ${theme.palette.text.pill}`,
    borderRadius: "6px",

    "& .MuiLinearProgress-bar ": {
      borderRadius: "6px"
    }
  },
  box: {
    "display": "flex",
    "gap": "0.5rem",
    "alignItems": "center"
  }
}))

export default function CourseRating(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: ".5rem", }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="inherit" classes={{ root: classes.colorPrimaryBar }} variant="determinate" value={+(props.value.percentage)} />
      </Box>
      <Box className={classes.box}>
        {/* <Box> */}
        <Rating
          name="text-feedback"
          value={props.value.star}
          readOnly
          precision={0.5}
          style={{ color: theme.palette.background.softOrange, }}
        />
        {/* </Box> */}
        <Typography variant="body2" color="text.secondary" style={{ display: "inline-block", minWidth: 35 }}>
          {props.value.percentage}%
        </Typography>
      </Box>
    </Box>
  );
}
