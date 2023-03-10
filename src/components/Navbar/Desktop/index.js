// * Libraries
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { searchCourse } from "redux/actions";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import clsx from "clsx";

// * Components
import ProfileDopdownPopover from "components/ProfileDopdownPopover";
import IconButtonUnlock from "components/IconButtonUnlock";
import CategoriesDropdownPopover from "components/CategoriesDropdownPopover";
import CartDropdownPopover from "components/CartDropdownPopover";

// * Icons
import { BiSearch } from "react-icons/bi";
import Logo from "assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  svg: {
    color: theme.palette.text.primary,
  },
  leftLinksContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",

  },
  rightLinksContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  linkContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("960")]: {
      display: "none",
    },

    "& .subscribe": {
      // border: `1px solid ${theme.palette.text.active}`,
      background: theme.palette.background.searchBg,
      [theme.breakpoints.between("960", "1024")]: {
        marginRight: "0px !important",
      },
      "& a": {
        padding: "10px 0px",
        color: theme.palette.text.active,
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    "& .courses": {
      [theme.breakpoints.between("960", "1024")]: {
        marginRight: "5px",
      },
    },
    "& .link": {
      marginRight: "10px",
      borderRadius: "4px",

      "& .link-with-icon": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .caret-svg": {
          fontSize: "12px",
          marginLeft: "6px",
        },
      },
      "&:hover a": {
        cursor: "pointer",
        // color: theme.palette.text.active,
      },
      "& a,& .categoriesCont": {
        // padding: "7px 10px",
        marginLeft: "8px",
        marginRight: "8px",
        color: theme.palette.text.primary,
        textDecoration: "none",
        display: "flex",
        fontSize: "15px",
        fontWeight: "400",
        [theme.breakpoints.between("960", "1024")]: {
          padding: "0",
          marginRight: "14px",
        },
      },
      "& svg": {
        fontSize: "22px",
      },
    },
  },
  signupButton: {
    background: theme.palette.background.gradient,
    textTransform: "capitalize",
    padding: "3px 6px",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
  signUpLink: {
    // marginLeft: "10px",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.palette.background.hover,
      cursor: "pointer",
      // borderBottom: "1px solid"
    },
    "& a": {
      padding: "7px 15px",
      color: theme.palette.common.white,
      textDecoration: "none",
      display: "flex",
      fontSize: "15px",
      fontWeight: "500",
    },
  },
  searchContainer: {
    borderRadius: "4px",
    [theme.breakpoints.between("960", "1024")]: {
      marginRight: "10px",
    },
  },
  searchFieldRoot: {
    background: theme.palette.background.searchBg,
    // border: `1px solid ${ theme.palette.text.link_sec }`,
    border: `1px solid #dde2e7`,
    color: theme.palette.text.primary,
    fontSize: "15px",
    fontWeight: "300",
    width: "250px",
    // width: "45px",
    height: "45px",
    borderRadius: "6px",
    transition: "all 0.4s ease",
    fontFamily: "Poppins",
    cursor: "pointer",
    flexDirection: "row-reverse",

    "& .MuiOutlinedInput-inputMarginDense": {},
    // "&:hover": {
    //   background: theme.palette.primary.light,
    // },
    "&:focus-within": {
      // iconGray
      border: `1px solid ${theme.palette.text.link_sec}`,
      cursor: "pointer"
    },
    "& ::placeholder": {
      // color: "#A6A1A1",
      // color: theme.palette.text.placeholder,
      color: theme.palette.text.primary,
    },
    "& fieldset": {
      borderRadius: "6px",
      border: "none",
    },
  },
  searchBarExpand: {
    "& .MuiInputBase-root ": {
      width: "350px !important"
    }
  },

  heroButtonContainer: {
    "& img": {
      width: "100px",
      position: "relative",
      top: "3px",
      marginRight: "10px",
    },
  },
  sectionDivider: {
    marginBottom: "10px",
  },
  menuDivider: {
    marginTop: "30px",
    "& .menu-name": {
      marginBottom: "5px",
      fontWeight: "500",
    },
    "& hr": {
      marginBottom: "10px",
    },
  },
}));

const Index = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => {
    const isAuthenticated = state.auth.isAuthenticated;
    const role = state.auth.user.role;
    const unlocks = state.auth.user.unlocksLeft;
    return {
      isAuthenticated,
      role,
      unlocks,
    };
  });
  const cartCount = useSelector((state) => state.cart.unseenCounts.cart);
  const isSearchScreenMounted = location.pathname.includes("search");
  const { isAuthenticated, unlocks } = user;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchBarExpand, setSearchBarExpand] = useState(false);

  const handleSubmitSearch = async () => {
    setLoading(true);

    const { res, error } = await dispatch(searchCourse(search));
    setLoading(false);

    if (res) {
      setSearch("");
      history.push(res);
    } else {
      history.push('/404');
    }


  };

  // if (isAuthenticated && role === ROLE.Student && isLearnScreenMounted) {
  //   return (
  // <>
  //   <div className={classes.heroButtonContainer}>
  //     <Link to="/">
  //       <img src={Logo} />
  //     </Link>
  //     <div className={classes.linkContainer}>
  //       <div className="link">
  //         <Link to="/courses">My courses</Link>
  //       </div>
  //       <div className="link">
  //         <Link to={`/ courses / ${ slug } / lessons`}>Video Lessons</Link>
  //       </div>
  //       <div className="link">
  //         <Link to="/">Exam Reviews</Link>
  //       </div>
  //       <div className="link">
  //         <Link to="/">Solutions</Link>
  //       </div>
  //     </div>
  //   </div>

  //   <div className={classes.linkContainer}>
  //     <div className="link">
  //       <Link to="/subscription">Subscription</Link>
  //     </div>

  //     <div className="link">
  //       <Link to="/">Search Courses</Link>
  //     </div>

  //     <Link to="/unlocks">
  //       <IconButtonUnlock unlocks={unlocks} />
  //     </Link>

  //     <div className="link">
  //       <ProfileDopdownPopover />
  //     </div>
  //   </div>
  // </>
  //  );
  // }

  if (isAuthenticated /*&& role === ROLE.Student*/) {
    return (
      <>
        <div className={classes.leftLinksContainer}>
          <div className={classes.heroButtonContainer}>
            <Link to="/">
              <img src={Logo} alt="logo" width={100} height={"auto"} />
            </Link>
          </div>

          <div className={classes.linkContainer}>
            <div className="link courses">
              <Link to="/courses">Courses</Link>
            </div>
            {/* <div className="link">
               <Link className="link-with-icon" to="/categories">
                <p>
                  Categoreez
                </p>
                <BsCaretDownFill className='caret-svg' />
              </Link> 
            </div> */}
            <CategoriesDropdownPopover />
            {!isSearchScreenMounted && (
              <div className={classes.searchContainer} >
                <TextField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  // disableUnderline
                  disabled={loading}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" && search.length > 0) {
                      handleSubmitSearch();
                    }
                  }}
                  onFocus={() => { setSearchBarExpand(true) }}
                  onBlur={() => { setSearchBarExpand(false) }}
                  className={`${searchBarExpand ? classes.searchBarExpand : ""} `}
                  InputProps={{
                    classes: {
                      root: classes.searchFieldRoot,
                    },
                    // disableUnderline: true,
                    startAdornment: (
                      <InputAdornment disabled={search.length > 0 ? false : true} position="start"
                        onClick={() => {
                          if (search.length > 0) {
                            handleSubmitSearch();
                          }
                        }}
                      >
                        <BiSearch />
                      </InputAdornment>
                    ),
                    // endAdornment: <InputAdornment position="start"><BiSearch /></InputAdornment>,
                    // endAdornment: endIcon && value.length > 0 && (
                    //   <InputAdornment position="end">{endIcon}</InputAdornment>
                    // ),
                  }}
                  variant="outlined"
                  placeholder="Search courses"
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={clsx(classes.rightLinksContainer, classes.linkContainer)}
        >
          <div className="link subscribe">
            <Link to="/subscription">Subscribe</Link>
          </div>
          <Link to="/referral">
            <IconButtonUnlock unlocks={unlocks} />
          </Link>
          <CartDropdownPopover count={cartCount} />
          {/* <Link to="/my-cart">
            <IconButtonCart cartCount={cartCount} />
          </Link> */}
          <ProfileDopdownPopover />
        </div>
      </>
    );
    // return (
    //   <>
    //     <div className={classes.heroButtonContainer}>
    //       <Link to="/">
    //         <img src={Logo} />
    //       </Link>
    //     </div>
    //     <div className={classes.linkContainer}>
    //       <div className="link">
    //         <Link to="/dashboard">Dashboard</Link>
    //       </div>
    //       <div className="link">
    //         <Link to="/courses">Courses</Link>
    //       </div>

    //       <div className="link">
    //         <Link to="/subscription">Subscription</Link>
    //       </div>
    //       <div className="link">
    //         <Link to="/referral">Referrals</Link>
    //       </div>
    //       <div className="link">
    //         <Link to="/">Search Courses</Link>
    //       </div>

    //       <Link to="/unlocks">
    //         <IconButtonUnlock unlocks={unlocks} />
    //       </Link>

    //       <Link to="/notifications">
    //         <IconButtonNotification notifications={0} />
    //       </Link>

    //       <Link to="/my-cart">
    //         <IconButtonCart cartCount={cartCount} />
    //       </Link>

    //       <div className="link">
    //         <ProfileDopdownPopover />
    //       </div>
    //     </div>
    //   </>
    // );
  }

  return (
    <>
      <div className={classes.leftLinksContainer}>
        <div className={classes.heroButtonContainer}>
          <Link to="/">
            <img src={Logo} alt="logo" width={100} height={"auto"} />
          </Link>
        </div>

        <div className={classes.linkContainer}>
          <div className="link courses">
            <Link to="/courses">Courses</Link>
          </div>
          <div className="link">
            {/* <Link className="link-with-icon" to="/categories"> */}
            <CategoriesDropdownPopover />
            {/* <p>Categories</p>
              <BsCaretDownFill className="caret-svg" /> */}
            {/* </Link> */}
          </div>
          {/* <div className={classes.searchContainer}>
            <TextField
              // disableUnderline
              InputProps={{
                classes: {
                  root: classes.searchFieldRoot,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <BiSearch />
                  </InputAdornment>
                ),
                // endAdornment: endIcon && value.length > 0 && (
                //   <InputAdornment position="end">{endIcon}</InputAdornment>
                // ),
              }}
              variant="outlined"
              placeholder="Search courses"
            />
          </div> */}
          {!isSearchScreenMounted && (
            <div className={classes.searchContainer}>
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // disableUnderline
                disabled={loading}
                onKeyUp={(e) => {
                  if (e.key === "Enter" && search.length > 0) {
                    handleSubmitSearch();
                  }
                }}
                onFocus={() => { setSearchBarExpand(true) }}
                onBlur={() => { setSearchBarExpand(false) }}
                className={`${searchBarExpand ? classes.searchBarExpand : ""} `}
                InputProps={{
                  classes: {
                    root: classes.searchFieldRoot,
                  },
                  // disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" disabled={search.length > 0 ? false : true} position="start" onClick={() => {
                      if (search.length > 0) {
                        handleSubmitSearch();
                      }
                    }}>
                      <BiSearch />
                    </InputAdornment>
                  ),
                  // endAdornment: <InputAdornment position="start"><BiSearch /></InputAdornment>,
                  // endAdornment: endIcon && value.length > 0 && (
                  //   <InputAdornment position="end">{endIcon}</InputAdornment>
                  // ),
                }}
                variant="outlined"
                placeholder="Search courses"
              />
            </div>
          )}
        </div>
      </div>

      <div className={clsx(classes.rightLinksContainer, classes.linkContainer)}>
        <div className="link subscribe">
          <Link to="/subscription">Subscribe</Link>
        </div>
        <div className="link">
          <Link to="/login">Login</Link>
        </div>
        <Button
          variant="contained"
          classes={{ root: classes.signupButton }}
          className={classes.signUpLink}
        >
          <Link to="/signup">signup</Link>
        </Button>
      </div>
    </>
  );
};

export default Index;
