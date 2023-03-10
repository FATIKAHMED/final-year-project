// * Libraries
import React, {
  // useContext,
  useEffect, useState
} from "react";
import {
  // IconButton,
  Button,
  // Container,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "utils/is-empty";
import {
  redirectToCustomerPortal,
  getSubscriptionOfUserAction,
} from "redux/actions";
import { toDateTime } from "utils/convertTime";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem 0",
  },
  card: {
    marginBottom: "40px",
    "& .MuiCardHeader-root": {
      // veryLightGray6
      borderBottom: `1px solid ${theme.palette.border.gray9}`,
    },
    "& .courses": {
      display: "flex",
      flexDirection: "column",

      "& .course": {
        display: "inline-block",
        margin: "10px 12px 10px",
        "& p": {
          fontSize: "12px",
        },
      },
    },
  },
}));

const SubscriptionCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // const coursesBought = useSelector((state) => state.courses.bought);
  // const myOrdersHistory = useSelector((state) => state.order.history);
  const userSubscription = useSelector(
    (state) => state.subscription.subscription
  );
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClickCustomerPortal = (sessionId) => {
    dispatch(redirectToCustomerPortal(sessionId));
  };

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

  if (loading)
    return (
      <Card className={classes.card}>
        <CardHeader title="Subscription" />
        <CardContent>
          <CircularProgress size={24} />
        </CardContent>
      </Card>
    );

  if (!isSubscribed)
    return (
      <Card className={classes.card}>
        <CardHeader title="Subscription" />
        <CardContent>
          <div>
            <h3>You are not subscribed to a plan</h3>
            <Link to={`/subscription`}>
              <p>Subscribe now</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  return (
    <Card className={classes.card}>
      <CardHeader title="Subscription" />
      <CardContent>
        {userSubscription.subscriptionStatus !== "active" ? (
          <div>
            <p>You are currently on the {userSubscription.title} plan</p>
            <p>Status: {userSubscription.subscriptionStatus}</p>
            <h3>
              ${userSubscription.price / 100} /{" "}
              {userSubscription.intervalCount > 1
                ? userSubscription.intervalCount
                : ""}{" "}
              {userSubscription.interval}
            </h3>
            {/* <p>Valid till: {userSubscription.validity}</p> */}
            <p>
              Your plan will be canceled on{" "}
              {toDateTime(userSubscription.periodEnd)}
            </p>
            <Button
              onClick={() =>
                handleClickCustomerPortal(userSubscription.sessionId)
              }
            >
              Manage Billing
            </Button>
          </div>
        ) : (
          <div>
            <p>You are currently on the {userSubscription.title} plan</p>

            <h3>
              ${userSubscription.price / 100} /{" "}
              {userSubscription.intervalCount > 1
                ? userSubscription.intervalCount
                : ""}{" "}
              {userSubscription.interval}
            </h3>
            {/* <p>Valid till: {userSubscription.validity}</p> */}
            <p>{toDateTime(userSubscription.periodEnd)}</p>
            <Button
              onClick={() =>
                handleClickCustomerPortal(userSubscription.sessionId)
              }
            >
              Manage Billing
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
