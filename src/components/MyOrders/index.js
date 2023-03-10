// * Libraries
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// * Icons
import { BsArrowRightShort } from "react-icons/bs";

// * Utilities
import { dateFormat } from "utils/convertTime";

// * Components
import MyOrdersCardSkeleton from "components/MyOrdersCardSkeleton";
import isEmpty from "utils/is-empty";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    padding: "0 1rem",
    boxShadow: theme.palette.boxShadow.card,
    borderRadius: "6px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "2rem"
    },
    "& .MuiGrid-grid-xs-6": {
      [theme.breakpoints.down(420)]: {
        maxWidth: "100% !important",
      },
    },
    "& .MuiTypography-subtitle2 ": {
      minWidth: "max-content",
    },
    "& .cardContent": {
      paddingTop: "1.25rem",
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "1rem",
    },
  },
  innerCard: {
    padding: "0 .5rem",
    border: `1px solid ${theme.palette.border.gray3}`,
    "&:not(:last-child)": {
      marginBottom: "1rem",
    },
    "& .gridCont": {
      [theme.breakpoints.down(420)]: {
        flexDirection: "column",
        alignItems: "center"
      }
    },

  },
  title: {
    fontWeight: 500,
    fontSize: ".9rem",
    marginBottom: "1.4rem",
  },
  font: {
    fontSize: 13,
  },
  button: {
    height: "min-content",
    padding: ".5rem .6rem",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.border.gray3}`,
    marginBottom: ".5rem",
    textTransform: "capitalize",
    "&:hover": {
      // darkPurple
      border: `1px solid ${theme.palette.background.purple}`,
      background: theme.palette.background.purple,
      color: theme.palette.common.white,
    },
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function MyOrdersCard() {
  const classes = useStyles();
  const myOrders = useSelector((state) => state.order);
  const loading = useSelector((state) => state.order.loading);
  // const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   // myOrders.totalCount <= 0 || myOrders.totalCount > 0
  //   // !myOrders.totalCount
  //   if (!isEmpty(myOrders) && isLoading) {
  //     setIsLoading(false)
  //   } else {
  //     setIsLoading(true)
  //   }

  // }, [myOrders["totalCount"]])

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className="cardContent">
        <Typography
          gutterBottom
          className={classes.title}
          variant="h6"
          component="h2"
        >
          My Orders
        </Typography>
        {loading ?
          <MyOrdersCardSkeleton /> :
          (
            myOrders.totalCount > 0 ? (
              myOrders.history.docs.slice(0, 2).map((order, i) => {
                return (
                  <Card className={classes.innerCard} variant="outlined" key={order?.orderHash}>
                    <CardContent>
                      <Grid container spacing={3} className="gridCont">
                        <Grid item xs={6} sm={4}>
                          <Typography variant="subtitle2">
                            {order.orderHash}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="subtitle2">
                            {dateFormat(order.createdAt)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="subtitle2">{order.type}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <Typography variant="subtitle2">
                            ${order.amount}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Typography>You Don't Have Any Orders Right Now!</Typography>
            ))
        }
      </CardContent>
      {
        !loading &&
        (myOrders.totalCount > 0 && (
          <CardActions className={classes.justifyCenter}>
            <Link to="my-orders">
              <Button
                endIcon={<BsArrowRightShort />}
                size="small"
                className={classes.button}
                variant="outlined"
              >
                View all
              </Button>
            </Link>
          </CardActions>
        ))
      }
    </Card >
  );
}
