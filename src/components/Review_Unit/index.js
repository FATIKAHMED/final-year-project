import { Avatar, Chip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTheme } from "@material-ui/styles";
import { dateFormat } from "utils/convertTime";

const useStyles = makeStyles((theme) => ({
  topCont: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    "& .large": {
      width: "60px",
      height: "60px",
      border: '1px solid rgba(0,0,0,.1)'
    },
    "& .name": {
      fontSize: "15px",
      fontWeight: "600",
    },
    "& .time": {
      color: theme.palette.background.seaGreen,
      fontSize: '12px'
    },
  },

  messageCont: {
    margin: "1rem 0",
    padding: "1.2rem",
    // veryLightGray5
    background: theme.palette.border.gray8,
    borderRadius: "0px 12px 12px 12px ",
    "& .message": {
      // darkShadeGray
      color: theme.palette.border.darkShadeGray,
      fontSize: "15px",
      fontWeight: "400",
    },
  },
}));


const ReviewUnit = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.topCont}>
        <span>
          <Avatar
            className="large"
            alt="avatar here"
            src={props.data?.user?.picture}
            aria-label="avatar"
          />
        </span>
        <span>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" className="name">
              {`${props.data?.user?.firstName || "Anonymous"} ${props.data?.user?.lastName || ""}`}
            </Typography>
          </Box>
          <Box display="flex" gap=".5rem" alignItems="center" >
            {props.data?.rating ? (
              <Rating
                name="text-feedback"
                size="small"
                value={props.data?.rating}
                readOnly
                precision={0.5}
                style={{ color: theme.palette.background.softOrange }}
              />
            ) : (
              // <Chip size="small" variant="outlined" label="response" />
              null
            )}
            <Typography variant="body2" className="time">
              {dateFormat(props.data?.createdAt)}
            </Typography>
          </Box>
        </span>
      </div>
      <div className={classes.messageCont}>
        <Typography variant="body2" className="message">
          {props.data?.content}
        </Typography>
      </div>
    </>
  );
};

export default ReviewUnit;
