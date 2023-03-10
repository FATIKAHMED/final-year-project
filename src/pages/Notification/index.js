// * Libraries
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotificationsAction,
  markReadNotificationAction,
  markReadAllNotificationAction,
} from "redux/actions";
import { getDisplayDate } from "utils/convertTime";

// * Components
import {
  Button,
  Container,
  Box,
  MenuItem,
  Select,
  Grid,
  FormGroup,
  FormLabel,
  FormControl,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";

// * Assets
import EmptyResult from "assets/notification_not_found.svg";

// * Icons
import { BiSearch } from "react-icons/bi";
import { BsCaretDownFill } from "react-icons/bs";
import isEmpty from "utils/is-empty";
import NotificationSkeleton from "components/NotificationSkeleton";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "50vh",
  },
  info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px auto",
    "& .title": {
      // darkestGray
      color: theme.palette.text.header,
      fontWeight: "600",
      fontFamily: theme.typography.fontFamily,
    },
  },

  itemContainer: {
    "& .metadata": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 40px",
      marginBottom: "20px",
      [theme.breakpoints.down("960")]: {
        margin: "0",
      },
    },

    "& .result": {
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      // flexDirection: "column",
      // "& img": {
      //     maxWidth: '400px',
      //     marginBottom: '20px'
      // },

      "& .list": {
        margin: "50px",
        [theme.breakpoints.down("960")]: {
          margin: "20px 0px 50px 0px",
        },

        "& .list-item": {
          marginBottom: "20px",
          padding: "40px",
          background: theme.palette.background.paper,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.07)",
          borderRadius: "6px",
          color: theme.palette.text.primary,
          fontSize: "14px",
          // veryLightGray4
          border: `1px solid ${theme.palette.border.gray7}`,
          [theme.breakpoints.down("960")]: {
            padding: "40px 20px",
          },

          "& .status-wrapper": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            "& .date": {
              fontSize: "12px",
              // softPurple
              color: theme.palette.background.softPurple,
            },
            "& .status": {
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            },
            "& .status.unread": {
              background: theme.palette.background.yellow,
            },
          },
        },
      },
    },

    "& .no-result": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      "& img": {
        maxWidth: "400px",
        marginBottom: "20px",
      },
    },
  },
  ctaButton: {
    background: theme.palette.background.gradient,
    textTransform: "none",
    padding: "15px 40px",
    borderRadius: "6px",
    color: theme.palette.background.paper,

    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.12)",
    "&:hover": {
      boxShadow: "none",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.22)",
    },
    "& a": {
      color: theme.palette.common.white,
      // padding: "7px 15px",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "500",
    },
  },
}));

const NotificationPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const allNotifications = useSelector((state) => state.notification.all);
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      setLoading(true);
      await dispatch(getNotificationsAction(user._id));
      setLoading(false);
    };
    fetchUserNotifications();
  }, []);

  const handleClickRead = async (item) => {
    if (!item.isRead) {
      // TODO: Mark item as read
      setActionLoading(true);
      await dispatch(markReadNotificationAction(user._id, item._id));
      setActionLoading(false);
    }
  };

  const handleClickMarkAllRead = async () => {
    setActionLoading(true);
    await dispatch(markReadAllNotificationAction(user._id));
    setActionLoading(false);
  };

  return (
    <Container className={classes.pageContainer}>
      <div className={classes.info}>
        <h1 className="title">Notifications</h1>
      </div>
      {loading ? (
        // <CircularProgress
        //   size={24}
        //   style={{
        //     position: "absolute",
        //     top: "50%",
        //     left: "50%",
        //   }}
        // />
        <NotificationSkeleton />
      ) : (
        <div className={classes.itemContainer}>
          {allNotifications.length > 0 ? (
            <div className="result">
              {unreadCount > 0 && (
                <div className="metadata">
                  <Button
                    disabled={actionLoading}
                    onClick={() => handleClickMarkAllRead()}
                  >
                    Mark all as read
                  </Button>
                </div>
              )}
              <ul className="list">
                {allNotifications.map((item, i) => (
                  <li
                    key={i}
                    disabled={actionLoading}
                    onClick={() => handleClickRead(item)}
                    className="list-item"
                  >
                    <div className="status-wrapper">
                      <p className="date">
                        {getDisplayDate(item.createdAt.toString())}
                      </p>
                      <div
                        className={
                          item.isRead ? "status read" : "status unread"
                        }
                      />
                    </div>
                    <p className="message">{item.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="no-result">
              <img src={EmptyResult} />
              <h3>You don't have any notifications yet</h3>
              <p>All of your notifications will be shown here.</p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default NotificationPage;
