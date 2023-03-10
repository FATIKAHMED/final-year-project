import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader, CircularProgress, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { dateFormat, getDisplayDate, toDateTime } from "utils/convertTime";
import {
  redirectToCustomerPortal,
  getSubscriptionOfUserAction,
} from "redux/actions";
import isEmpty from "utils/is-empty";
import { Link } from "react-router-dom";
import SubsCardSkeleton from "components/SubsCardSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 680,
    padding: ".5rem 1rem",
    boxShadow: theme.palette.boxShadow.card,
    borderRadius: "6px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "0rem"
    },
    "& .cardBorder": {
      border: `1px solid ${theme.palette.border.gray3}`,
    },
    "& .MuiCardContent-root": {
      // padding: "2rem",
      // paddingBottom: "2.3rem",

    },
    "& .cardContentBox": {
      // padding: "2rem",
      // paddingBottom: "2.3rem",
      // paddingBottom: "0",
      display: "flex",
      "&:last-child": {
        paddingBottom: "0",
      }
    },
    "& .MuiCardActions-root": {
      display: "inline-flex",
      padding: "1rem 0rem",
    },
    "& .buttonCardAction": {
      paddingLeft: "1.2rem",
    },


  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      marginBottom: "1rem",
      "& .MuiPaper-root.MuiCard-root.cardBorder.MuiPaper-outlined.MuiPaper-rounded > div.MuiCardContent-root": {
        padding: ".5rem 0rem"
      }
    },
  },
  title: {
    fontWeight: 500,
    fontSize: ".9rem",
    marginBottom: "1.15rem",
    // marginTop: ".45rem",
    // paddingTop: ".25rem"
  },
  date: {
    fontSize: 12,
  },
  button: {
    // padding: ".6rem 1.6rem",
    padding: ".7rem 3rem",
    textTransform: "capitalize",
    "&:hover": {
      // darkPurple
      background: theme.palette.background.purple,
      color: "white",
    },
  },
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subscriptionBox: {
    padding: "1.3rem 2rem 2.2rem 2rem",
    textAlign: "center",
  },
}));

export default function SubscriptionCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userSubscription = useSelector(
    (state) => state.subscription.subscription
  );
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (isEmpty(userSubscription)) {
        const { res, error } = await dispatch(
          getSubscriptionOfUserAction(user._id)
        );
        if (!isEmpty(res)) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } else setIsSubscribed(true);

      setLoading(false);
    };
    checkSubscriptionStatus();
  }, []);

  const handleClickCustomerPortal = (sessionId) => {
    dispatch(redirectToCustomerPortal(sessionId));
  };

  //when loading the subscribed state in redux
  if (loading)
    return (
      // <Card variant="outlined" className={classes.root}>
      //   <CardContent>
      //     <Typography
      //       gutterBottom
      //       className={classes.title}
      //       variant="h6"
      //       component="h2"
      //     >
      //       My Subscription
      //     </Typography>
      //     <div className={classes.alignCenter}>
      //       <CircularProgress />
      //     </div>
      //   </CardContent>
      // </Card>
      <SubsCardSkeleton />
    );

  //when user is not subscribed to any subscription
  if (!isSubscribed)
    return (
      <Card elevation={0} variant="outlined" className={classes.root}>
        {/* <CardHeader title="Subscription" /> */}
        <CardContent>
          <Typography
            gutterBottom
            className={classes.title}
            variant="h6"
            component="h2"
          >
            My Subscription
          </Typography>
          <Typography>You are not subscribed to any plan!</Typography>
        </CardContent>
        <CardActions className="buttonCardAction">
          <Link to={`/subscription`}>
            <Button className={classes.button} variant="outlined">
              Subcribe Now!
            </Button>
          </Link>
        </CardActions>
      </Card>
    );

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className="cardContentBox" >
        <Grid container spacing={1}>
          <Grid xs={12} sm={7} >
            <Typography
              gutterBottom
              className={classes.title}
              variant="h6"
              component="h2"
            >
              My Subscription
            </Typography>
            <Typography className={classes.date}>
              {userSubscription.subscriptionStatus === 'canceled' ?
                "Canceled " : "Started "
              }
              {userSubscription.updatedAt
                ? getDisplayDate(userSubscription.updatedAt)
                : "Not Defined"}
            </Typography>
            <Typography variant="body2" component="p">
              Your plan will expire on{" "}
              {dateFormat(toDateTime(userSubscription.periodEnd))}
            </Typography>
            <CardActions>
              <Button
                onClick={() => handleClickCustomerPortal(userSubscription.sessionId)}
                className={classes.button}
                variant="outlined"
              >
                Manage Billing
              </Button>
            </CardActions>
          </Grid>
          <Grid className={classes.gridItem} xs={12} sm={5}>
            <Card variant="outlined" className="cardBorder">
              <CardContent className={classes.subscriptionBox}>
                <Typography variant="h6" component="h2" gutterBottm>
                  {`${userSubscription.title} Plan`}
                </Typography>
                <Typography variant="body2" component="p">
                  ${userSubscription.price / 100} /{" "}
                  {userSubscription.intervalCount > 1
                    ? userSubscription.intervalCount
                    : ""}{" "}
                  {userSubscription.interval}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      {/* <CardActions>
        <Button
          onClick={() => handleClickCustomerPortal(userSubscription.sessionId)}
          className={classes.button}
          variant="outlined"
        >
          Manage Billing
        </Button>
      </CardActions> */}
    </Card >
  );
}
