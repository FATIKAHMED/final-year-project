// * Libraries
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";

import { Link } from "react-router-dom";

// * Components
import {
  IconButton,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

import Success from "pages/Cart/Success"

// * Assets
import BannerImage from "assets/banner2.jpg";
import CourseImage from "assets/course.jpg";
import CategoryImage from "assets/category.jpg";

import TestimonialImage1 from "assets/testimonial1.png";
import Testimonial1_200 from "assets/testimonial1_200.png";
import Testimonial1_274 from "assets/testimonial1_274.png";
import Testimonial1_300 from "assets/testimonial1_300.png";

import TestimonialImage2 from "assets/testimonial2.png";
import Testimonial2_200 from "assets/testimonial2_200.png";
import Testimonial2_233 from "assets/testimonial2_233.png";
import Testimonial2_261 from "assets/testimonial2_261.png";
import Testimonial2_288 from "assets/testimonial2_288.png";
import Testimonial2_300 from "assets/testimonial2_300.png";

import TestimonialImage3 from "assets/testimonial3.png";
import Testimonial3_200 from "assets/testimonial3_200.png";
import Testimonial3_267 from "assets/testimonial3_267.png";
import Testimonial3_300 from "assets/testimonial3_300.png";


import TestimonialGraphic from "assets/testimonialsGraphic.png";
import TestimonialGraphic1 from "assets/testimonialsGraphic1.png";

import landingBanner from "assets/Landing Page intro banner.png";
import banner200 from "assets/banner200.png";
import banner326 from "assets/banner326.png";
import banner423 from "assets/banner423.png";
import banner498 from "assets/banner498.png";

import BookSvg from "assets/book.png";
import GradeSvg from "assets/grades.svg";
import PersonSvg from "assets/person.svg";
import QuotesSvg from "assets/quotes.svg";
import Blob1 from "assets/Vectorblob1.png";
import Blob2 from "assets/VectorBlob2.png";
import onlineLearn from "assets/onlineLearn.svg";
import studying from "assets/study.svg";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    height: "400px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "25px",
    //// 890
    //// [theme.breakpoints.down("960")]: {
    //// justifyContent: "space-between",
    //// flexDirection: "column",
    //// alignItems: "flex-start",
    //// gap: "3rem",
    //// marginBottom: "23rem",
    //// },

    //// [theme.breakpoints.down("800")]: {
    ////   marginBottom: "20rem",
    //// },
    //// [theme.breakpoints.between("600", "675")]: {
    ////   marginBottom: "22rem",
    //// },
  },
  ctaButton: {
    background: theme.palette.background.gradient,
    textTransform: "none",
    padding: "20px 24px",
    borderRadius: "6px",

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
  ctaSecondary: {
    background: theme.palette.background.gradient,
    textTransform: "none",
    padding: "18px 35px",
    borderRadius: "6px",

    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.12)",
    "&:hover": {
      boxShadow: "none",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.22)",
    },
    "& a": {
      color: theme.palette.common.white,
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "500",
    },
  },
  bannerInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "50%",
    color: theme.palette.text.primary,
    marginTop: "15px",
    //// [theme.breakpoints.down("890")]: {
    ////   width: "100%"
    //// },
    [theme.breakpoints.down("960")]: {
      width: "100%"
    },
    "& .title": {
      //// marginBottom: "10px",
      //// marginTop: "10px",
      fontWeight: 600,
      fontSize: "2.5rem",
      [theme.breakpoints.down("660")]: {
        lineHeight: "3rem",
        marginBottom: "0.75rem",
        fontSize: "2.1rem",
      },


    },
    "& .para": {
      marginBottom: "25px",
      fontWeight: 300,
      fontSize: "18px",
      [theme.breakpoints.down("660")]: {
        fontSize: ".9rem",
      },
    },
    "& .sub-para": {
      fontWeight: 300,
      fontSize: "15px",
      marginTop: "15px",
      "& a": {
        color: theme.palette.text.link_sec,
      },
    },
  },
  bannerIntro: {

    [theme.breakpoints.down("960")]: {
      display: "none"
    }
    // [theme.breakpoints.down("890")]: {
    //   width: "80%",
    //   margin: "0 auto",
    //   marginBottom: "10rem",
    //   "& .bannerImg": {
    //     width: "100%",
    //     maxWidth: "100%"
    //   }
    // },
    // [theme.breakpoints.down("750")]: {
    //   width: "90%",
    // }
  },
  countAnalyticsContainer: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: "7px",
    // lightGray3
    border: `1px solid ${theme.palette.border.gray3}`,
    padding: "30px 54px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "150px",
    [theme.breakpoints.down("800")]: {
      padding: "30px 14px",
    },
    [theme.breakpoints.down("900")]: {
      flexDirection: "column",
      gap: "2rem",
      maxWidth: "320px",
      margin: "0 auto",
      padding: "2rem 0",
    },

    "& .analytics-item": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("900")]: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      "& .analytics-item-icon": {
        marginRight: "20px",
        [theme.breakpoints.down("960")]: {
          marginRight: "10px",
        },
        [theme.breakpoints.down("900")]: {
          marginRight: "0px",
        }
      },
      "& .analytics-item-info": {
        "& .title": {
          fontWeight: 700,
          fontSize: "18px",
        },
        "& .para": {
          fontWeight: 400,
          fontSize: "12px",
        },
      },
    },
  },

  videoLessonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    [theme.breakpoints.down("900")]: {
      justifyContent: "flex-end",
    },



    marginBottom: "200px",
    "& .section-info": {
      position: "relative",
      width: "calc(100vw - 50%)",
      [theme.breakpoints.down("900")]: {
        // height: "35rem",
        width: "100%",
      },

      "& .content": {
        marginTop: "100px",
        position: "relative",
        top: "50px",
      },

      "& .highlight-bar, & .title, & .para": {
        zIndex: 1,
        opacity: ".9999",
      },
      "& .highlight-bar": {
        background: theme.palette.text.link_sec,
        borderRadius: "8px",
        width: "50px",
        height: "12px",
      },
      "& .title": {
        fontWeight: 600,
        fontSize: "35px",
        marginBottom: "5px",
        [theme.breakpoints.down("600")]: {
          fontSize: "2.1rem",
          lineHeight: "2.5rem",
          marginBottom: "1rem",
          marginTop: "0.5rem",

        },
      },
      "& .para": {
        fontWeight: 300,
        fontSize: "18px",
        marginBottom: "29px",
        [theme.breakpoints.down("600")]: {
          fontSize: ".9rem"
        }
      },
      "& .blob": {
        position: "absolute",
        top: "-150px",
        left: "-150px",
        // width: '95%',
        [theme.breakpoints.down("600")]: {
          top: "-50px",
          left: "-20px",
          width: '100%',
          // minHeight: "40rem"
        },

      },
      "& .blob2": {
        position: "absolute",
        width: '100%',
        top: "-100px",
        left: "0px",

        [theme.breakpoints.up("1280")]: {
          left: "-20px",
          width: "auto"
        },
        [theme.breakpoints.down("1000")]: {
          top: "0px",
          left: "-100px",
          height: "35rem",
          width: "auto",
        },
        [theme.breakpoints.down("600")]: {

          width: '100%',
          height: "auto",
        },

      },
    },
    "& .section-image": {
      width: "50%",
      [theme.breakpoints.down("900")]: {
        display: "none"
      },

      "& img": {
        position: "relative",
        // left: "60px",
        top: "40px",
        width: "95%",
        left: "40px",
        // 1024
        // marginRight: "0px",
        // left: "5%",
      },
      "& .image-studying": {
        width: "90%",
        position: "relative",
        left: "-50px",
        top: "50px",
      },
    },
  },

  // coursesContainer: {
  //     padding: "2rem 0",
  //     "& .containerPara": {
  //         marginTop: "10px",
  //         marginBottom: "30px",
  //     },

  // },
  // courses: {
  //     display: "flex",
  //     gap: '40px',
  //     flexWrap: 'wrap'
  // },
  // course: {
  //     // border: "1px solid",
  //     width: '250px',
  //     borderRadius: "5px",
  //     boxShadow: "0px 8px 16px #e4e4e4",
  //     "& a": {
  //         textDecoration: "none"
  //     },
  //     "& .image": {
  //         width: '100%',
  //         borderRadius: "5px 5px 0px 0"
  //     },
  //     "& .info": {
  //         padding: '10px'
  //     }
  // },

  // categoriesContainer: {
  //     padding: "2rem 0",
  //     "& .containerPara": {
  //         marginTop: "10px",
  //         marginBottom: "30px",
  //     },

  // },
  // categories: {
  //     display: "flex",
  //     gap: '40px',
  //     flexWrap: 'wrap'
  // },
  // category: {
  //     // border: "1px solid",
  //     width: '250px',
  //     borderRadius: "5px",
  //     boxShadow: "0px 8px 16px #e4e4e4",
  //     "& a": {
  //         textDecoration: "none"
  //     },
  //     "& img": {
  //         width: '100%',
  //         height: "200px",
  //         borderRadius: "5px 5px 0px 0"
  //     },
  //     "& .info": {
  //         padding: '10px'
  //     }
  // },
  testimonialsContainer: {
    marginTop: "300px",
    marginBottom: "100px",
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
      [theme.breakpoints.down("600")]: {

        width: '100%',

      },
    },

    "& .testimonials": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "4rem",
      marginBottom: "76px",
      [theme.breakpoints.down("1100")]: {
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "space-around",


      },

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
          minHeight: "277px",
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

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();





  return (
    <>
      <Container>
        <div className={classes.bannerContainer}>
          <div className={classes.bannerInfo}>
            <h1 className="title">The best way to actually learn</h1>
            <p className="para">
              It’s time to start learning and moving toward where you want to
              be, at your own pace, time and effort.{" "}
            </p>
            <Button variant="contained" classes={{ root: classes.ctaButton }}>
              <Link to="/login">Start learning for free</Link>
            </Button>
            <p className="sub-para">
              Are you an educator? <Link to="/courses">Learn more</Link>
            </p>
          </div>
          <div className={classes.bannerIntro}>
            {/* <img src={landingBanner} alt="banner Image" className="bannerImg" /> */}
            <picture className="bannerImg">
              <img
                sizes="(max-width: 498px) 100vw, 498px"
                srcSet={`${banner200} 200w,
                ${banner326} 326w,
                ${banner423} 423w,
                ${banner498} 498w`}
                src={banner498}
                alt="banner image"
                width={"auto"} height={"auto"}
              />
            </picture>
          </div>
        </div>

        <div className={classes.countAnalyticsContainer}>
          <div className="analytics-item">
            <img src={PersonSvg} className="analytics-item-icon" width={"40px"} height={"40px"} />
            <div className="analytics-item-info">
              <h5 className="title">Over 38,000</h5>
              <p className="para">Students got helped and counting</p>
            </div>
          </div>
          <div className="analytics-item">
            <img src={GradeSvg} className="analytics-item-icon" width={"40px"} height={"40px"} />
            <div className="analytics-item-info">
              <h5 className="title">90%+ and more</h5>
              <p className="para">Better chances for sucessful grades</p>
            </div>
          </div>
          <div className="analytics-item">
            <img src={BookSvg} className="analytics-item-icon" width={"40px"} height={"40px"} />
            <div className="analytics-item-info">
              <h5 className="title">Counting 14,500+</h5>
              <p className="para">Up-to date practice problems available</p>
            </div>
          </div>
        </div>

        <div className={classes.videoLessonsContainer}>
          <div className="section-info">
            <img src={Blob1} className="blob" width={"auto"} height={"auto"} />
            <div className="content">
              <div className="highlight-bar" />
              <h3 className="title">Actually understand the topics</h3>
              <p className="para">
                Watch step-by-step video tutorials that guide you through every
                chapter in your textbook. Learn the toughest concepts with ease
                as our tutors thoroughly explain everything you need to know.
              </p>
              <Button className={classes.ctaSecondary}>
                <Link to="/login">Get started</Link>
              </Button>
            </div>
          </div>
          <div className="section-image">
            <img src={onlineLearn} width={"auto"} height={"auto"} />
          </div>
        </div>

        <div className={classes.videoLessonsContainer}>
          <div className="section-image">
            <img className="image-studying" src={studying} width={"auto"} height={"auto"} />
          </div>
          <div className="section-info">
            <img src={Blob2} className="blob2" width={"auto"} height={"auto"} />
            <div className="content">
              <div className="highlight-bar" />
              <h3 className="title">Be prepared for your exams</h3>
              <p className="para">
                Prepare for exam-day with confidence by studying with our
                thousands of practice problems and our custom-crafted exam
                reviews. Hone your skills and never be caught off guard by an
                exam question again.
              </p>
              <Button className={classes.ctaSecondary}>
                <Link to="/login">Get started</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className={classes.testimonialsContainer}>
          <h2 className="container-title">What are the students saying?</h2>
          <div className="highlight-bar" />
          <p className="container-para">
            Over 4,000 students and learners are inspired by DA Prep which helps
            them become successful.
          </p>

          <div className="testimonials">
            <div className="testimonials-item">
              {/* <img src={TestimonialImage1} className="avatar" alt="Person" /> */}
              <picture>
                <img
                  className="avatar loading"
                  alt="Person"
                  sizes="(max-width: 300px) 100vw, 300px"
                  srcSet={`${Testimonial1_200} 200w,
                          ${Testimonial1_274} 274w,
                          ${Testimonial1_300} 300w`}
                  src={Testimonial1_300}
                  width={80}
                  height={"auto"}
                />
              </picture>
              <div className="testimonials-item-info">
                <h3 className="name">Maya Mooro</h3>
                <img className="quotes-svg" src={QuotesSvg} width={32} height={"auto"} />
                <p className="comment">
                  DA-Prep is very helpful when it comes to breaking down the
                  chapters in the book. Anything I may have missed in lecture
                  becomes clear with the tutor.
                </p>
              </div>
            </div>
            <div className="testimonials-item">
              {/* <img src={TestimonialImage2} className="avatar" alt="Person" /> */}
              <picture>
                <img
                  className="avatar loading"
                  alt="Person"
                  sizes="(max-width: 300px) 100vw, 300px"
                  srcSet={`${Testimonial2_200} 200w,
                          ${Testimonial2_233} 233w,
                          ${Testimonial2_261} 261w,
                          ${Testimonial2_288} 288w,
                          ${Testimonial2_300} 300w`
                  }
                  src={Testimonial2_300}
                  width={80}
                  height={"auto"}
                />
              </picture>
              <div className="testimonials-item-info">
                <h3 className="name">Jacob Jog</h3>
                <img className="quotes-svg" src={QuotesSvg} width={32} height={"auto"} />
                <p className="comment">
                  The tutors at DA-Prep explain the little things that get
                  skipped over in class and teach you easy-to-remember tricks to
                  help the hardest concepts stick for the exams.
                </p>
              </div>
            </div>
            <div className="testimonials-item">
              {/* <img src={TestimonialImage3} className="avatar" alt="Person" /> */}
              <picture>
                <img
                  className="avatar loading"
                  alt="Person"
                  sizes="(max-width: 300px) 100vw, 300px"
                  srcSet={`${Testimonial3_200} 200w,
                          ${Testimonial3_267} 267w,
                          ${Testimonial3_300} 300w`
                  }
                  src={Testimonial3_300}
                  width={80}
                  height={"auto"}
                />
              </picture>
              <div className="testimonials-item-info">
                <h3 className="name">Amna Latif</h3>
                <img className="quotes-svg" src={QuotesSvg} width={32} height={"auto"} />
                <p className="comment">
                  It is an academic lifesaver! It explains everything I need to
                  know in detail and in a way I can actually understand. I aced
                  my class and I definitely owe it to DA-Prep.
                </p>
              </div>
            </div>
          </div>

          <Button className={classes.ctaSecondary}>
            <Link to="/login">Get started</Link>
          </Button>
        </div>





        {/* <div className={classes.coursesContainer}>
          <h2 className="containerTitle">A broad selection of courses</h2>
          <p className="containerPara">Choose from 155,000 online video courses with new additions published every month</p>
          <div className={classes.courses}>
            <div className={classes.course}>
              <Link to='/courses/the-complete-surgeon-basics'>
                <img className="image" alt='Image' src={CourseImage} />
                <div className='info'>
                  <h3>The complete surgeon basics</h3>
                  <p>Dr. Angela Yu</p>
                  <p>Rating 4/5 <span>(124,320)</span></p>
                  <p>$14.99</p>
                  <p>Best seller</p>
                </div>
              </Link>
            </div>
            <div className={classes.course}>
              <Link to='/courses/the-complete-surgeon-basics'>
                <img className="image" alt='Image' src={CourseImage} />
                <div className='info'>
                  <h3>The complete surgeon basics</h3>
                  <p>Dr. Angela Yu</p>
                  <p>Rating 4/5 <span>(124,320)</span></p>
                  <p>$14.99</p>
                  <p>Best seller</p>
                </div>
              </Link>
            </div>
            <div className={classes.course}>
              <Link to='/courses/the-complete-surgeon-basics'>
                <img className="image" alt='Image' src={CourseImage} />
                <div className='info'>
                  <h3>The complete surgeon basics</h3>
                  <p>Dr. Angela Yu</p>
                  <p>Rating 4/5 <span>(124,320)</span></p>
                  <p>$14.99</p>
                  <p>Best seller</p>
                </div>
              </Link>
            </div>
            <div className={classes.course}>
              <Link to='/courses/the-complete-surgeon-basics'>
                <img className="image" alt='Image' src={CourseImage} />
                <div className='info'>
                  <h3>The complete surgeon basics</h3>
                  <p>Dr. Angela Yu</p>
                  <p>Rating 4/5 <span>(124,320)</span></p>
                  <p>$14.99</p>
                  <p>Best seller</p>
                </div>
              </Link>
            </div>
            <div className={classes.course}>
              <Link to='/courses/the-complete-surgeon-basics'>
                <img className="image" alt='Image' src={CourseImage} />
                <div className='info'>
                  <h3>The complete surgeon basics</h3>
                  <p>Dr. Angela Yu</p>
                  <p>Rating 4/5 <span>(124,320)</span></p>
                  <p>$14.99</p>
                  <p>Best seller</p>
                </div>
              </Link>
            </div>
          </div>
        </div>


        <div className={classes.categoriesContainer}>
          <h2 className="containerTitle">Top categories</h2>
          <p className="containerPara">Various topics to choose and get started from</p>
          <div className={classes.categories}>
            <div className={classes.category}>
              <Link to='/categories/surgery'>
                <img alt='Image' src={CategoryImage} />
                <div className="info">
                  <h3>Surgery</h3></div>
              </Link>
            </div>
            <div className={classes.category}>
              <Link to='/categories/surgery'>
                <img alt='Image' src={CategoryImage} />
                <div className="info">
                  <h3>Surgery</h3></div>
              </Link>
            </div>
            <div className={classes.category}>
              <Link to='/categories/surgery'>
                <img alt='Image' src={CategoryImage} />
                <div className="info">
                  <h3>Surgery</h3></div>
              </Link>
            </div>

            <div className={classes.category}>
              <Link to='/categories/surgery'>
                <img alt='Image' src={CategoryImage} />
                <div className="info">
                  <h3>Surgery</h3></div>
              </Link>
            </div>

          </div>
        </div> */}


      </Container>
    </>
  );
};

export default Home;
