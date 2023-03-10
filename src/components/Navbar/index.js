// * Libraries
import React, { useState, useEffect } from 'react'
import { Container, useMediaQuery, useTheme } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'

// * Components
import BusinessSubNavbar from "components/BusinessSubNavbar";
import DesktopNavigation from "./Desktop";
import MobileNavigation from "./Mobile";

// * Utilities
import { ROLE } from "utils/constants";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: 'column',
    position: "fixed",
    zIndex: 3,
    width: '100%'
  },
  navbar: (props) => ({
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.05)",
    padding: "10px 0px",
    width: "100%",
  }),
  subNavbar: {
    // background: theme.palette.background.paper,
    backgroundColor: theme.palette.background.home,
    padding: "10px 0px",
    color: theme.palette.text.primary,
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
  },
  container: {
    display: "flex",
    justifyContent: "space-between"
  }
  // wrapperMobile: (props) => ({
  //   background: theme.palette.background.paper,
  //   color: theme.palette.text.primary,
  //   padding: "0.5rem 1rem",
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   "& .hero-logo": {
  //     zIndex: "1",
  //     display: "flex",
  //     justifyContent: "flex-start",
  //     alignItems: "center",
  //     "& img": { width: "30px", marginRight: "10px" },
  //     "& p": {
  //       fontWeight: "300",
  //     },
  //   },
  // }),
  // drawer: {
  //   "& .MuiDrawer-paper ": {
  //     width: "80%",
  //     padding: "0 30px",
  //     paddingLeft: "40px",
  //   },
  //   "& .profile-section": {
  //     marginTop: "40px",
  //   },

  //   "& .search-section": {
  //     marginTop: "20px",
  //     marginBottom: "10px",
  //   },
  //   "& .navbar-section": {
  //     "& .MuiList-root": {
  //       paddingLeft: "0",
  //       paddingRight: "0",

  //       "& .MuiListItem-root": {
  //         padding: "5px 0",
  //         // paddingBottom: "5px",

  //         "& .MuiListItemText-primary ": {
  //           fontSize: "12px",
  //           fontWeight: "300",
  //           letterSpacing: "0.8px",
  //           color: theme.palette.common.white,
  //           textTransform: "capitalize",
  //         },
  //         "& svg": {
  //           color: theme.palette.text.disabled,
  //           fontSize: "12px",
  //         },
  //       },
  //     },
  //     "& .MuiCollapse-container": {
  //       paddingLeft: "10px",
  //     },
  //   },
  // },
}));

const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("960"));
  const role = useSelector(state => state.auth.user.role)
  const [isDashboard, setIsDashboard] = useState(false)

  useEffect(() => {
    const pathname = location.pathname.replace('/', '')
    if (pathname.includes('dashboard'))
      setIsDashboard(true)

  }, [])

  return (
    <div className={classes.main} >
      <div className={classes.navbar}>
        <Container maxWidth="lg" className={classes.container} >
          {mobile ? <MobileNavigation /> : <DesktopNavigation />}
        </Container>
      </div>
      {
        (role === ROLE.BusinessAdmin || role === ROLE.BusinessManager) && isDashboard &&
        <div className={classes.subNavbar}>
          <Container maxWidth="lg" className={classes.container} >
            <BusinessSubNavbar />
          </Container>
        </div>
      }
    </div >

  );
};

export default Header;
