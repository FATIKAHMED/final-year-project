import React, { useEffect, useState } from "react";
import { Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams, useLocation } from "react-router-dom";
import isEmpty from "utils/is-empty";

const useStyles = makeStyles((theme) => ({
  subNavbar: {
    border: "1px solid #0000001A",
    borderRadius: "0",
    width: "100%",
    // backgroundLayout
    backgroundColor: theme.palette.background.home,
    // padding: ".3rem 10rem",
    padding: ".6rem 11rem",
    color: "black",
    position: "fixed",
    top: "77px",
    zIndex: "1",
    [theme.breakpoints.down("md")]: {
      padding: ".5rem 1rem",
    },

    "& .links": {
      display: "flex",
      gap: "2rem",
      justifyContent: "flex-start",
      maxWidth: "1000px",
      margin: "auto",
      [theme.breakpoints.down("md")]: {
        gap: " 1rem",
        justifyContent: "center",
      },

      "& a": {
        color: theme.palette.text.primary,
        textDecoration: "none",
        fontSize: "12px",
        fontWeight: "400",
      },
      "& .active": {
        color: theme.palette.text.link_sec,
      },
    },

  },

}));
const SubNavbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const params = useParams();
  const [isClassActive, setIsClassActive] = useState(false);
  const [slug, setSlug] = useState(null)

  useEffect(() => {
    if (location.pathname.endsWith("/learn")) {
      setIsClassActive(true);
      // console.log("location", location.pathname)
    }

  }, [location])

  useEffect(() => {
    setSlug(params.id)
    if (isEmpty(params.id))
      setSlug(null)
  }, [])

  return (
    <Paper elevation={0} className={classes.subNavbar}>
      <Box className="links">
        <Link to={`/courses/${slug}/lessons`} className={isClassActive ? "active" : ""}>Video Lessons</Link>
        <Link /*to="/exam-reviews"*/ >Exam Reviews</Link>
        <Link /*to="/solutions"*/ >Solutions</Link>
      </Box>
    </Paper>
  );
};

export default SubNavbar;
