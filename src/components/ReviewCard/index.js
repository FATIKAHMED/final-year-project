// import Avatar from "@material-ui/core/Avatar";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
// import { FaQuoteLeft } from "react-icons/fa";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import QuotesSvg from "assets/quotes.svg";


const useStyles = makeStyles((theme) => ({
  // card: {
  //   maxWidth: 300,
  //   overflow: "visible",
  //   margin: "2rem auto",
  //   position: "relative",
  //   transition: "0.3s",
  //   boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  //   borderRadius: "8px",
  //   // "&:hover": {
  //   //   boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  //   // },
  //   "& .content": {
  //     textAlign: "center",
  //     padding: "1rem",
  //   },
  //   "& .avatar": {
  //     display: "inline-block",
  //     border: "2px solid white",
  //     position: "absolute",
  //     top: "-20px",
  //     left: "120px",
  //     width: 56,
  //     height: 56,
  //   },
  //   "& .reviewHeader": {
  //     margin: "2rem 0",
  //     fontWeight: "500",
  //     fontSize: "15px",
  //     letterSpacing: "3px",
  //   },

  //   "& .reviewSubHeader": {
  //     fontWeight: "300",
  //     lineHeight: "18px",
  //     fontSize: "12px",
  //     margin: "1rem",
  //   },
  //   "& .ellipse": {
  //     padding: ".7rem",
  //     // veryLightSkyBlue
  //     background: theme.palette.background.veryLightSkyBlue,
  //     backgroundImage: "linear-gradient(#EAF5FB,#EAF5FB)",
  //     borderRadius: "50%",
  //   },
  //   "& .icon": {
  //     // primaryBlue
  //     color: theme.palette.background.iconBlue,
  //     // veryLightSkyBlue
  //     bacground: theme.palette.background.veryLightSkyBlue,
  //   },
  // },

  testimonialsContainer: {

    marginTop: "2rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& .highlight-bar": {
      background: theme.palette.text.link_sec,
      borderRadius: "8px",
      width: "50px",
      height: "12px",
      marginBottom: "23px",
    },
    "& .container-title": {
      textAlign: "center",
      fontWeight: 600,
      fontSize: "35px",
      marginBottom: "23px",
    },
    "& .container-para": {
      textAlign: "center",
      width: "50%",
      fontWeight: 300,
      fontSize: "18px",
      marginBottom: "70px",
    },

    "& .testimonials": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "80px",
      marginBottom: "76px",

      "& .testimonials-item": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",

        "& .avatar": {
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          boxShadow: "0px 3px 16px rgba(62, 62, 62, 0.15)",
          border: `3px solid ${theme.palette.background.home}`,
          position: "relative",
          top: "30px",
          zIndex: 1
        },
        "& .testimonials-item-info": {
          padding: "40px 28px",
          background: theme.palette.background.paper,
          borderRadius: "5px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.06)",
          width: "292px",
          // minHeight: "277px",
          minHeight: "260px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          // gap: "25px",

          "& .quotes-svg": {
            width: "32px",
            marginBottom: "18px",
          },
          "& .comment": {
            fontWeight: 300,
            fontSize: "12px",
            // marginBottom: "10px",
            textAlign: "center",
          },
          "& .name": {
            fontWeight: 500,
            fontSize: "15px",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "17px",
          },
        },
      },
    },
  },
}));

export default function ReviewCard(props) {
  const classes = useStyles();

  return (
    // <Card className={classes.card}>
    //   <CardContent className="content">
    //     <Avatar className="avatar" src={props.img} />
    //     <Typography className="reviewHeader" variant={"h6"} gutterBottom>
    //       {props.name}
    //     </Typography>
    //     <span className="ellipse">
    //       <FaQuoteLeft className="icon" />
    //     </span>
    //     <Typography className="reviewSubHeader">{props.text}</Typography>
    //   </CardContent>
    // </Card>
    <div className={classes.testimonialsContainer}>
      {/* <h2 className="container-title">What are the students saying?</h2>
      <div className="highlight-bar" />
      <p className="container-para">
        Over 4,000 students and learners are inspired by DA Prep which helps
        them become successful.
      </p> */}

      <div className="testimonials">
        <div className="testimonials-item">
          <img src={props.img} className="avatar" alt="Person" width={"auto"} height={"auto"} />
          <div className="testimonials-item-info">
            <h3 className="name">{props.name}</h3>
            <img className="quotes-svg" src={QuotesSvg} width={"auto"} height={"auto"} />
            <p className="comment">
              {props.text}
            </p>
          </div>
        </div>
        {/* <div className="testimonials-item">
          <img src={TestimonialImage2} className="avatar" alt="Person" />
          <div className="testimonials-item-info">
            <h3 className="name">Jacob Jog</h3>
            <img className="quotes-svg" src={QuotesSvg} />
            <p className="comment">
              The tutors at DA-Prep explain the little things that get
              skipped over in class and teach you easy-to-remember tricks to
              help the hardest concepts stick for the exams.
            </p>
          </div>
        </div>
        <div className="testimonials-item">
          <img src={TestimonialImage3} className="avatar" alt="Person" />
          <div className="testimonials-item-info">
            <h3 className="name">Amna Latif</h3>
            <img className="quotes-svg" src={QuotesSvg} />
            <p className="comment">
              It is an academic lifesaver! It explains everything I need to
              know in detail and in a way I can actually understand. I aced
              my class and I definitely owe it to DA-Prep.
            </p>
          </div>
        </div> */}
      </div>

      {/* <Button className={classes.ctaSecondary}>
        <Link to="/login">Get started</Link>
      </Button> */}
    </div>
  );
}

