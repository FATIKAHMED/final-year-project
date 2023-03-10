// * Libraries
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Container } from "@material-ui/core";

// * Components
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.home,
    minWidth: "100%",
    minHeight: "100%",
  },

  footer: {},
  childrenWrapper: {
    minHeight: "50vh",
    paddingTop: "5rem",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.childrenWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
