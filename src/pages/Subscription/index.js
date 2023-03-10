import React, { useEffect, useState } from "react";
import { axiosJWT } from "utils/axios";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStripeConfigAction,
  createCheckoutSessionAction,
} from "redux/actions";
import isEmpty from "utils/is-empty";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

// import { GrUserExpert, GrDocumentVerified } from "react-icons/gr";
// import { HiOutlineBookOpen } from "react-icons/hi";
import { GoDash } from "react-icons/go";
// import BookOpen from "assets/bookOpen.png";
import BookOpen from "assets/bookOpen.svg";
import BookSvg from "assets/book.png";
import Students from "assets/students.svg";
import FileCheck from "assets/fileCheck.svg";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ReviewCard from "components/ReviewCard";

import { BiChevronDown } from "react-icons/bi";

// * Assests
import dashIcon from "assets/dashIcon.png";

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: "center",
    justifyContent: "center",
    // padding: "3rem 0",
    paddingTop: "5.2rem",
    paddingBottom: "1rem",

    "& .heading": {
      color: theme.palette.text.header,
      fontSize: "3rem",
      fontWeight: "600",
      marginBottom: "3.5rem",
      padding: "0 .5rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.5rem",
        lineHeight: "3rem",
        marginBottom: "1rem",
      },
      // [theme.breakpoints.down("525")]: {
      //   fontSize: "2rem"
      // }
    },
    "& .subHeading": {
      color: theme.palette.text.header,
      fontSize: "1.8rem",
      fontWeight: "600",
      marginTop: "1.5rem",
      padding: "0 .5rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.5rem"

      },
      // [theme.breakpoints.down("525")]: {
      //   fontSize: ".9rem"
      // }
    },
    "& .mb-2": {
      marginBottom: "2.2rem",
    },
    "& .mb-6": {
      marginBottom: "6rem",
    },
    "& .pb-1": {
      paddingBottom: "1rem",
    },
    "& .pb-2": {
      paddingBottom: "2rem",
    },
  },
  paperContainer: {
    maxWidth: "1280px",
    // margin: "1.5rem 0",
    marginTop: "1.5rem",
    marginBottom: "3rem",
    padding: "0 4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0"
    },
    "& .paper": {
      padding: "1.5rem .5rem",
      boxShadow: "0px 8px 16px rgb(0 0 0 / 10%)",
      padding: "39px 54px",
      borderRadius: "7px",
      // lightGray3
      border: `1px solid ${theme.palette.border.gray3}`,
      [theme.breakpoints.down("sm")]: {
        maxWidth: "320px",
        margin: "0 auto",
        padding: "1.5rem 1rem",
        "& .MuiGrid-root.MuiGrid-container": {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "1.5rem",
        },
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "280px",
      },
    },
    "& .gridContainer": {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .spanContainer": {
      display: "flex",
      gap: "1rem",
      textAlign: "start",
      alignItems: "center",
      [theme.breakpoints.down("1040")]: {
        "flexDirection": "column",
        "textAlign": "center",
        "gap": "0.5rem"
      },

    },
    "& .title": { fontWeight: "700", color: theme.palette.text.header },
    "& .subtitle": {
      fontSize: "12px",
      color: theme.palette.text.header,
    },
    "& .icon": {
      fontSize: "35px",
      color: theme.palette.text.header
    },
  },
  button: {
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
    borderRadius: "6px",
    background: theme.palette.background.gradient,
    // width: "154px",
    width: "180px",
    height: "67px",
    margin: "0 auto",
    marginBottom: "30px",
    marginTop: "15px",
    "& span": {
      fontSize: "18px",
      color: theme.palette.background.paper,
      textTransform: "capitalize",
    },
  },
  subsContent: {
    // lightPink
    background: theme.palette.background.lightPink,
    padding: "4rem",


    "& .headingTwo": {
      color: theme.palette.text.header,
      fontSize: "2rem",
      fontWeight: "600",
    },
    "& .gridCont": {
      display: "flex",
      justifyContent: "center",
    },
    "& .card": {
      // gradientBlue
      // borderTop: `10px solid ${theme.palette.text.link_sec}`,
      borderRadius: "10px",
      boxShadow: " 0px 8px 16px 0px #0000000F",
      // padding: ".5rem 2.3rem",
      padding: "2.2rem 2rem",

    },
    "& .cardContent": { paddingTop: "0" },
    "& .cardHeader": { fontWeight: "400", paddingTop: ".5rem", fontSize: "1.875rem", },
    "& .cardSubHeader": { marginBottom: "2rem", fontSize: "0.938rem" },
    "& .cardText": { marginBottom: "1rem", fontSize: "0.938rem" },
    "& .price": { fontWeight: "500", fontSize: "2.813rem", },
    "& .divider": {
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    "& .btn": {
      // darkestGray
      border: `1px solid ${theme.palette.text.header}`,
      borderRadius: "6px",
      fontSize: "18px",
      textTransform: "capitalize",
      // padding: ".5rem 2.2rem",
      padding: "0.5rem 2.5rem",
      "&:hover": {
        // gradientBlue
        border: `1px solid ${theme.palette.text.link_sec}`,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
        background: theme.palette.background.gradient,
        color: theme.palette.background.paper,
      },
    },
  },
  reviewsCont: {
    maxWidth: "100%",
    margin: "4rem auto",
    // padding: "0 4rem",
    "& .reviewsBox": {
      display: "flex",
      justifyContent: "center",
      gap: "5rem",
      [theme.breakpoints.down("md")]: {
        "gap": "2rem",
        "flexWrap": "wrap",
        "justifyContent": "space-around"
      },
    },
  },
  accordionCont: {
    maxWidth: "800px",
    margin: "4rem auto",
    // padding: "0 4rem",
    // margin: "4rem 0",
    padding: "10px",
    "& .accordianBox": {
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.04) !important",
      // veryLightGray3
      border: `1px solid ${theme.palette.border.gray6}`,
      padding: "10px",
      borderRadius: "8px",
      margin: "20px 0",
      "&.MuiAccordion-root:before": {
        display: "none",
      },
      [theme.breakpoints.down("350")]: {
        "& .MuiButtonBase-root.MuiIconButton-root.MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd": {
          display: "none"
        },
      },
    },
    "& .accordionSummary": {
      textTransform: "uppercase",
      fontWeight: "500",
      fontSize: "18px",
      [theme.breakpoints.down("420")]: {
        fontSize: ".9rem",
      }
    },
    "& .accordionDetails": {
      fontWeight: "300",
      fontSize: "15px",
      textAlign: "start",
    },
    "& > p": {
      [theme.breakpoints.down("xs")]: {
        fontSize: ".9rem"
      }
    },
  },
}));

const Subscription = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const subscriptionPrices = useSelector((state) => state.subscription.prices);
  const customerId = useSelector((state) => state.auth.user.stripe_customerId);
  const userSubscription = useSelector((state) => state.subscription.subscription);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const scroll = () => {
    let el = document.querySelector(".pricingSection");
    let pos = el.offsetTop;
    el.scrollIntoView(pos);
  }

  const createSubscription = async (priceId) => {
    if (!isAuthenticated)
      history.push('/login')

    if (isEmpty(userSubscription))
      await dispatch(createCheckoutSessionAction(customerId, priceId));
    else history.push("/dashboard");
  };

  const dummyReviewArr = [
    {
      name: "Raaju",
      review:
        "Over 4,000 students and learners are inspired by DA Prep which helps them become successful.",
      image:
        "https://memetemplatehouse.com/wp-content/uploads/2020/05/main-toh-sirf-pati-banna-chahta-hun-shyam-hera-pheri.jpg",
    },
    {
      name: "Shaam",
      review:
        "Over 4,000 students and learners are inspired by DA Prep which helps them become successful.",
      image:
        "https://www.mirchiplay.com/wp-content/uploads/2020/06/akshay-kumar-scheme-pose.jpg",
    },
    {
      name: "Babu Rao",
      review:
        "Over 4,000 students and learners are inspired by DA Prep which helps them become successful.",
      image: "https://i.ytimg.com/vi/SXqn2QorsE0/hqdefault.jpg",
    },
  ];
  const dummyAccordionArr = [
    {
      summary: "Can i use DA Prep for free?",
      details:
        "You can cancel your subscription at any time. If you cancel, you'll still have access to our videos for the remainder of the plan's length. For example, if you selected the annual plan (12 months of access) and cancel a month after, you'll still have access for 11 months.",
    },
    {
      summary: "How does cancellation work?",
      details:
        "You can cancel your subscription at any time. If you cancel, you'll still have access to our videos for the remainder of the plan's length. For example, if you selected the annual plan (12 months of access) and cancel a month after, you'll still have access for 11 months.",
    },
    {
      summary: "Other important questions.",
      details:
        "You can cancel your subscription at any time. If you cancel, you'll still have access to our videos for the remainder of the plan's length. For example, if you selected the annual plan (12 months of access) and cancel a month after, you'll still have access for 11 months.",
    },
  ];

  return (
    <div className={classes.main}>
      <h1 className="heading">Get access to everything</h1>
      <h3 className="subHeading mb-2">Subscribe now and get access to</h3>
      <Container className={classes.paperContainer}>
        <Paper className="paper" elevation={0}>
          <Grid
            container
            spacing={{ xs: 2 }}
            columns={{ xs: 12 }}
          >
            <Grid item xs={12} md={4} >
              <div className="gridContainer">
                <span className="spanContainer">
                  {/* <GrUserExpert className="icon" /> */}
                  <img src={Students} alt="tutors icon" height={40} width={40} />
                  <Typography variant="h6" className="title" component="div">
                    Expert tutors
                    <Typography className="subtitle">
                      Students got helped and counting
                    </Typography>
                  </Typography>
                </span>
              </div>
            </Grid>
            <Grid item xs={12} md={4} >
              <div className="gridContainer">
                <span className="spanContainer">
                  {/* <GrDocumentVerified className="icon" /> */}
                  <img src={FileCheck} alt="Worksheets icon" height={40} width={40} />
                  <Typography variant="h6" className="title" component="div">
                    Worksheets
                    <Typography className="subtitle">
                      Better chances for sucessful grades
                    </Typography>
                  </Typography>
                </span>
              </div>
            </Grid>
            <Grid item xs={12} md={4} >
              <div className="gridContainer">
                <span className="spanContainer">
                  {/* <HiOutlineBookOpen className="icon" /> */}
                  <img src={BookSvg} alt="video lesson icon" height={40} width={40} />
                  <Typography variant="h6" className="title" component="div">
                    Video lessons
                    <Typography className="subtitle">
                      Up-to date practice problems available
                    </Typography>
                  </Typography>
                </span>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Button className={`${classes.button} mb-6`} variant="contained" onClick={scroll}>
        Choose Plan
      </Button>
      <div className={classes.subsContent}>
        <h3 className="headingTwo" id="pricingSection">Subscribe to all courses</h3>
        <img src={dashIcon} alt="Icon" style={{ marginTop: "1.2rem", marginBottom: "2rem" }} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{
            margin: "2rem auto",
            maxWidth: "1280px",
            "justifyContent": "space-evenly",
            "flexWrap": "wrap",
            "gap": "2rem"
          }}
        >
          {subscriptionPrices?.map((price, i) => {
            return (
              // <Grid key={i} item xs={2} sm={4} md={4}>
              <div className="gridCont" key={price.product.name}>
                <Box sx={{ minWidth: 275, maxWidth: 350, width: "100%" }}>
                  <Card className="card pricingSection">
                    <CardContent className="cardContent">
                      <Typography
                        className="cardHeader"
                        variant="h4"
                        component="div"
                      >
                        {price.product.name}
                        {console.log(price.product)}
                      </Typography>
                      <Typography className="cardSubHeader mb-2">
                        {price.product.name === "Annually"
                          ? "12 months of access"
                          : price.product.name === "Monthly"
                            ? "1 month of access"
                            : price.product.name === "Quarterly"
                              ? "3 months of access"
                              : `${price?.product?.metadata?.validity} of access`}
                      </Typography>
                      <Typography variant="h4" className="price">
                        ${price.unit_amount / 100}
                      </Typography>
                      <Divider className="divider" />
                      <Typography className="cardText">
                        Billed $179 every 12 months
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        onClick={() => createSubscription(price.id)}
                        className="btn"
                      >
                        Select
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </div>
              // </Grid>
            );
          })}
        </Grid>
      </div>
      <Container className={classes.reviewsCont}>
        <h3 className="subHeading">What are the students saying?</h3>
        <img src={dashIcon} alt="Icon" style={{ marginTop: "1.2rem", marginBottom: "2rem" }} />
        <Typography style={{ marginBottom: "2rem" }}>
          Over 4,000 students and learners are inspired by DA Prep <br /> which
          helps them become successful.
        </Typography>
        <div className="reviewsBox" >
          {dummyReviewArr.map((review) => {
            return (
              <ReviewCard
                name={review.name}
                img={review.image}
                text={review.review}
              />
            );
          })}
        </div>
      </Container>
      <Container className={classes.accordionCont}>
        <h3 className="subHeading">Frequently Asked Questions</h3>
        <img src={dashIcon} alt="Icon" style={{ marginTop: "1.2rem", marginBottom: "2rem" }} />
        <Typography style={{ marginBottom: "2rem" }}>
          Over 4,000 students and learners are inspired by DA Prep <br /> which
          helps them become successful.
        </Typography>
        <div>
          {dummyAccordionArr.map((accordion) => {
            return (
              <Accordion elevation={0} className="accordianBox">
                <AccordionSummary
                  expandIcon={<BiChevronDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="accordionSummary">
                    {accordion.summary}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="accordionDetails">
                    {accordion.details}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
          <Button className={classes.button} variant="contained" onClick={scroll}>
            Select Plan
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Subscription;
