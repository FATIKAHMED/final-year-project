// * Libraries
import React, { useContext } from "react";
import {
  IconButton,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "utils/is-empty";
import { redirectToCustomerPortal } from "redux/actions";
import { toDateTime, getDisplayDate } from "utils/convertTime";

// * Components
import SubscriptionCard from "components/SubscriptionCard";
import ProfileCard from "components/ProfileCard";
import NumbersCard from "components/NumbersCard";
import SubsCard from "components/SubsCard";
import MyCoursesCard from "components/MyCoursesCard";
import MyOrdersCard from "components/MyOrders";
import CourseProgressCard from "components/CourseProgress";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: "2rem",
    marginTop: "5rem",
    "& .heading": {
      fontWeight: 500,
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "45fr 55fr",
    marginBottom: "2rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridGap: "1fr",
    }
  },
  gridTwo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    marginBottom: "1rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridGap: "1fr",
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    marginBottom: "40px",
    "& .MuiCardHeader-root": {
      borderBottom: `1px solid ${theme.palette.text.muted}`,
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
  info: {
    "& .profile-picture": {
      width: "50px",
      borderRadius: "50%",
    },
  },
  ordersHistory: {
    "& .orders": {
      display: "flex",
      flexDirection: "column",

      "& .order": {
        borderLeft: "5px solid rgba(178, 81, 223,.3)",
        paddingLeft: "20px",
        "& div": {
          display: "flex",
          marginBottom: "8px",
        },
        margin: "10px 12px 10px",
        "& p": {
          fontSize: "12px",
        },
      },
    },
  },
}));

const Index = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // const myCoursesCount = useSelector((state) => state.courses?.bought?.length);
  const myCoursesCount = useSelector((state) => state.courses.enrolled?.length);
  const myOrdersCount = useSelector((state) => state.order.totalCount);
  const myNotificationsCount = useSelector(
    (state) => state.notification.totalCount
  );
  const myUnlocksCount = useSelector((state) => state.auth.user.unlocksLeft);
  const userSubscription = useSelector(
    (state) => state.subscription.subscription
  );

  return (
    <>
      <Container>
        <div className={classes.header}>
          <h2 className="heading">Dashboard</h2>
        </div>
        <div className={classes.grid}>
          <ProfileCard />
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <NumbersCard
                  title="Courses"
                  subTitle="Total no. of course you're enrolled in"
                  count={myCoursesCount}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NumbersCard
                  title="Unlocks"
                  subTitle="Total no. of your unlocks credits"
                  count={myUnlocksCount}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <NumbersCard
                  title="Notifications"
                  subTitle="Total notifications uptil now"
                  count={myNotificationsCount}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NumbersCard
                  title="Orders"
                  subTitle="Total no. of orders uptil now"
                  count={myOrdersCount}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.grid}>
          <MyCoursesCard />
          <SubsCard />
        </div>
        <div className={classes.gridTwo}>
          <MyOrdersCard />
          <CourseProgressCard />
        </div>
        {/* <div className={classes.container}>
          <div className={classes.info}>
            <img
              className="profile-picture"
              src={user.picture}
              alt="profile pic"
            />
            <h1 className="title">
              Welcome, {user ? user.firstName : "User"}!
            </h1>
            <p className="para">You will be learning alot today.</p>
          </div>
        </div>
        <Card className={classes.card}>
          <CardHeader title="My courses" />
          <CardContent>
            <ul className="courses">
              {coursesBought.map((course) => (
                <li className="course">
                  <Link to={`/courses/${course.slug}`}>
                    <div>
                      <h3>{course.title}</h3>
                                            <p>{ReactHtmlParser(course.description.contentHtml)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <SubscriptionCard />
        <Card className={classes.card}>
          <CardHeader title="My Orders" />
          <CardContent>
            {isEmpty(myOrdersHistory) ? (
              <>
                <h3 className="title">
                  You have no orders in your order history.
                </h3>
                <p className="para">
                  Buy courses to see your order purchase information here.
                </p>
              </>
            ) : (
              <div className={classes.ordersHistory}>
                <ul className="orders">
                  {myOrdersHistory.map((order) => (
                    <li key={order._id} className="order">
                      <div>
                        <p>Invoice - {order.orderHash}</p>
                      </div>
                      <div>
                        {order.type === "subscription" ? (
                          <p>Subscription: {order.subscription?.title}</p>
                        ) : (
                          <ul>
                            <p>Course List - </p>
                            {order.course.map((course) => (
                              <Link to={`/courses/${course.slug}`}>
                                <li>{course.title}</li>
                              </Link>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div>
                        <p>{getDisplayDate(order.createdAt.toString())}</p>
                      </div>
                      <div>
                        <p>Total Price - ${order.amount}</p>
                      </div>
                      <div>
                        <p>Payment Type - {order.paymentMethod}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader title="My Unlocks" />
          <CardContent>
            <div className={classes.info}>
              {user.unlocks === 0 || isEmpty(user.unlocks) ? (
                <>
                  <h3 className="title">
                    You don't have any unlocks history yet.
                  </h3>
                  <p className="para">Learn more about unlocks</p>
                </>
              ) : (
                <>
                  <h3 className="title">
                    You have {user.unlocks.toString()} unlocks
                  </h3>
                  <p className="para">Learn more about unlocks</p>
                </>
              )}
            </div>
          </CardContent>
        </Card> */}
      </Container>
    </>
  );
};

export default Index;
