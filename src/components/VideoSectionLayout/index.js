import React from "react";
// * Libraries
import { makeStyles } from "@material-ui/core/styles";

// * Components
import DrawerNavbar from "components/DrawerNavbar";
import DesktopNavigation from "components/Navbar";
import SubNavbar from "components/SubNavbar";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.home,
    minWidth: "100%",
    minHeight: "100%",
  },

  footer: {},
  childrenWrapper: {
    minHeight: "50vh",
  },
}));
const VideoSectionLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DesktopNavigation />
      <SubNavbar />
      <DrawerNavbar bodyContent={children} />
    </div>
  );
};

export default VideoSectionLayout;
