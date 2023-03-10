// * Libraries
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import clsx from "clsx";

// * Icons
import { FiUnlock } from "react-icons/fi";
import { GrCart } from "react-icons/gr";
import { BsPlayFill } from "react-icons/bs";
import { IoRocketSharp } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  multiButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.down(1000)]: {
      flexDirection: "column",
    },
  },
  addToCart: {
    color: theme.palette.common.black,
    background: theme.palette.background.cartButton,
    "&:hover": {
      background: theme.palette.background.cartButtonHover,
    },
  },
  watchForFree: {
    color: theme.palette.common.white,
    background: theme.palette.background.watchFreeButton,
    "&:hover": {
      background: theme.palette.background.watchFreeButtonHover,
    },
  },
  enroll: {
    color: theme.palette.common.white,
    background: theme.palette.background.enrollButton,
    "&:hover": {
      background: theme.palette.background.enrollButtonHover,
    },
  },
  startCourse: {
    color: theme.palette.common.white,
    background: theme.palette.background.startButton,
    "&:hover": {
      background: theme.palette.background.startButtonHover,
    },
  },

  button: {
    fontSize: "15px",
    padding: "1rem 0",
    textTransform: "initial",
    fontWeight: "500",
    marginBottom: "13px",
    boxShadow: "0 8px 8px rgba(0,0,0,0.04)",
    [theme.breakpoints.down(1000)]: {
      padding: "1rem"
    },
    "& .MuiButton-label": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
    },
    "&:hover": {
      boxShadow: "0 8px 8px rgba(0,0,0,0.1)",
    },
  },
  unlockIcon: {
    width: "20px",
    height: "20px",
    color: "inherit",
  },
  cartIcon: {
    width: "20px",
    height: "20px",
    color: "inherit",
  },
  startIcon: {
    width: "25px",
    height: "25px",
    color: "inherit",
  },
  enrollIcon: {
    width: "25px",
    height: "25px",
    color: "inherit",
  },
}));

const CourseDetailsButton = ({
  isSubscribed,
  courseDetails,
  isEnrolled,
  isAuthenticated,
  isInCart,
  handleClickAddToCart,
  handleEnrollment,
  pathname,
  isEnrolledForUnlockUse,
  dispatchCourseEnrol,
  handleClickWatchForFree,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const isPaid = courseDetails.price > 0;
  const isFree = courseDetails.price <= 0;
  //   const boughtBtnStyle = {
  //     padding: "1rem 0",
  //     color: theme.palette.common.white,
  //     //darkPurple
  //     background: theme.palette.background.purple,
  //     textTransform: "initial",
  //     fontWeight: "500",
  //   };
  //   const cartBtnStyle = {
  //     fontSize: "12px",
  //     padding: "1rem 0",
  //     color: theme.palette.common.white,
  //     // gradientBlue
  //     background: theme.palette.text.link_sec,
  //     textTransform: "initial",
  //     fontWeight: "500",
  //     marginBottom: "13px",
  //   };

  //   const AuthenticatedEnrolledBtn = (
  //     isAuthenticated,
  //     isEnrolled,
  //     handleEnrollment
  //   ) => {
  //     return isAuthenticated && isEnrolled ? (
  //       <Link to={`${pathname}/lessons`}>
  //         <Button
  //           fullWidth
  //           variant="contained"
  //           style={boughtBtnStyle}
  //           onClick={() => dispatchCourseEnrol()}
  //         >
  //           {/* {isAuthenticated ? "Start Course" : "Enroll now"} */}
  //           Start Course
  //         </Button>
  //       </Link>
  //     ) : (
  //       // <Link to={`${pathname}/lessons`}>
  //       <Button
  //         fullWidth
  //         variant="contained"
  //         style={enrollBtnStyle}
  //         onClick={handleEnrollment}
  //       >
  //         Enroll Now
  //       </Button>
  //     );
  //     // </Link>
  //   };

  //   const AddToCartBtn = (isInCart, handleClickAddToCart) => {
  //     return (
  //       <>
  //         {/* {isInCart ? (
  //                     <Link to="/my-cart">
  //                         <Button
  //                             fullWidth
  //                             variant="contained"
  //                             style={boughtBtnStyle}
  //                         >
  //                             Go to cart
  //                         </Button>
  //                     </Link>
  //                 ) : ( */}
  //         <>
  //           <Button
  //             fullWidth
  //             variant="contained"
  //             style={cartBtnStyle}
  //             onClick={handleClickAddToCart}
  //             disabled={isInCart}
  //           >
  //             {isInCart ? "Added to cart" : "Add to cart"}
  //           </Button>
  //           <Button
  //             fullWidth
  //             variant="contained"
  //             style={cartBtnStyle}
  //             onClick={handleClickWatchForFree}
  //           >
  //             Watch for free
  //           </Button>
  //         </>
  //         {/* )} */}
  //         {/* <Button
  //                 fullWidth
  //                 variant="contained"
  //                 style={cartBtnStyle}
  //                 onClick={handleClickBuyCourse}
  //               >
  //                 BUY NOW
  //               </Button> */}
  //       </>
  //     );
  //   };

  const EnrollNowButton = () => {
    return (
      <Button
        fullWidth
        variant="contained"
        className={clsx(classes.enroll, classes.button)}
        onClick={handleEnrollment}
      >
        <IoRocketSharp className={classes.enrollIcon} />
        Enroll Now
      </Button>
    );
  };
  const StartCourseButton = () => {
    return (
      // <Link to={`${pathname}/lessons`}>
      <Button
        fullWidth
        variant="contained"
        className={clsx(classes.startCourse, classes.button)}
        onClick={() => {
          history.push(`${pathname}/lessons`);
          dispatchCourseEnrol();
        }}
      >
        <BsPlayFill className={classes.startIcon} />
        Start course
      </Button>
      // </Link>
    );
  };

  const PaidCourseMultiButton = () => {
    return (
      <div className={classes.multiButtonContainer}>
        <Button
          className={clsx(classes.addToCart, classes.button)}
          fullWidth
          variant="contained"
          onClick={handleClickAddToCart}
          disabled={isInCart}
        >
          {isInCart ? (
            <>
              {/* <BsCartCheck className={cartIcon} /> */}
              Added to cart
            </>
          ) : (
            <>
              <GrCart className={classes.cartIcon} />
              Add to cart
            </>
          )}
        </Button>
        {isEnrolledForUnlockUse ? (
          <StartCourseButton />
        ) : (

          <Tooltip title="Insufficient Unlocks!">
            <Button
              fullWidth
              variant="contained"
              className={clsx(classes.watchForFree, classes.button)}
              onClick={user?.unlocksLeft <= 0 ? null : handleClickWatchForFree}
              disableRipple={user?.unlocksLeft <= 0}

            >
              <FiUnlock className={classes.unlockIcon} />
              Watch for free
            </Button>
          </Tooltip>


        )}
      </div>
    );
  };

  const checkIfEnrolled = () => {
    if (!isEnrolled) return <EnrollNowButton />;
    return <StartCourseButton />;
  };

  // CONDITIONS
  //? 1- user is subscribed ->
  // 1- User is not enrolled in course -> Enroll now
  // 2- User is enrolled in course     -> Start course
  //? 2- user is not subscribed ->
  // 1- User is enrolled in course     -> Start course
  // Course is free
  // 1- User is not enrolled in course -> Enroll now
  // 2- User is enrolled in course     -> Start course
  // Course is paid
  // 1- User has not bought the course ->  Add to cart , watch for free
  // 2- User is enrolled in course     -> Start course

  if (isSubscribed) checkIfEnrolled();
  else {
    // if (isEnrolled) return <StartCourseButton />

    if (isFree) checkIfEnrolled();

    if (isPaid)
      if (isEnrolled) return <StartCourseButton />;
      else return <PaidCourseMultiButton />;
  }

  return checkIfEnrolled();
};

export default CourseDetailsButton;
