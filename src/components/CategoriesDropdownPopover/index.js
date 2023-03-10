// import { Divider, Paper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";

// * Icons
import { BsCaretDownFill } from "react-icons/bs";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import { getCourseByCategoryId } from "redux/actions";
import CategoriesDropdownLink from "components/CategoriesDropdownLink";
import bg from 'assets/categoryDropdownBg.png';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // gap: "1rem",
    gap: ".4rem",
    transition: "all 0.2s ease",
    padding: "0 15px",
    borderRadius: "10px",
    color: theme.palette.text.primary,

    "&.categories": {
      [theme.breakpoints.between("960", "1024")]: {
        padding: "0",
        marginRight: "14px",
      },
    },
    "&:hover": {
      // backgroundColor: theme.palette.background.hover,
      cursor: "pointer",
      color: theme.palette.text.active,
    },
    "& .svg": {
      fontSize: "0.75rem !important",
      // marginLeft: "3px",
    },
  },
  tippyRoot: {
    marginTop: "10px",
    left: "0%",
    background: "#fff",
    // left: "6.6%",
    // [theme.breakpoints.between(960, 1100)]: {
    //   left: "0",
    // },

    "& .tippy-content": {
      //   padding: "5px 0",
      // minWidth: "200px",
    },
    "&.tippy-box": {
      // left: "6.6%",

      background: `url(${bg}),#fff center no-repeat`,

    },
  },
  container: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    position: "relative",
    [theme.breakpoints.between(960, 1100)]: {
      gap: ".5rem",
      padding: ".5rem",
    },
    // "& .containerItem": {
    //   // borderBottom: `1px solid ${theme.palette.text.active}`,
    //   width: "150px",
    //   overflow: "hidden",
    //   textOverflow: "ellipsis",
    //   whiteSpace: "nowrap",
    //   fontFamily: theme.typography.fontFamily,
    // },
    // "& .containerHeadline": {
    //   maxWidth: "150px",
    //   display: "-webkit-box",
    //   WebkitBoxOrient: "vertical",
    //   WebkitLineClamp: 3,
    //   overflow: "hidden",
    //   textOverflow: "ellipsis",
    //   fontFamily: theme.typography.fontFamily,
    // },
    "& .viewMoreItem": {
      // "minHeight": "90px",
      background: "#FFFFFF",
      height: "auto",
      width: "100%",
      boxShadow: "0px 5px 18px rgba(0, 0, 0, 0.05)",
      borderRadius: "4px",
      border: "1px solid transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      fontWeight: "600",
      position: "relative",
      bottom: "4px",
      left: "4px",
      "& span": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        bottom: "-4px",
        left: "-4px",
        fontWeight: "500",
        background: "#FFFFFF",
        height: "100%",
        width: "100%",
        boxShadow: "0px 5px 18px rgba(0, 0, 0, 0.05)",
        borderRadius: "4px",
        border: "1px solid transparent",

      },
    },
  },
  paddingZero: {
    padding: 0,
  },
  // anchor: {
  //   textDecoration: "none",
  //   "&:active, &:visited, &:link": {
  //     color: "#343434"
  //   }
  // }
}));


const CategoriesDropdownPopover = () => {
  const classes = useStyles();
  const category = useSelector((state) => state.category.all.docs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // console.log("category-->", category);
  function DropdownContent({ hide }) {
    return (
      <span>
        <div className={classes.container}>
          {category &&
            category.slice(0, 5).map((category) => {
              return (<CategoriesDropdownLink slug={category?.slug} key={category?.slug} title={category.title} headline={category.headline} />);
            })}
        </div>
        <div className={classes.container}>
          {category &&
            category.slice(5, 9).map((category) => {
              return (<CategoriesDropdownLink slug={category?.slug} key={category?.slug} title={category.title} headline={category.headline} />);
            })}
          {category &&
            <Link to="/categories" className="viewMoreItem">
              <span>View More</span>
            </Link>
          }
        </div>
        {/* <div className={classes.container}>
          {category &&
            category.slice(5, 10).map((category, index) => {
              return (
                <Link to={`/categories/${category?.slug}`} className={classes.anchor}>
                  <span
                    style={{ display: "flex", flexDirection: "column" }}
                    key={category + index + 5}
                  >
                    <Typography
                      className="containerItem"
                      variant="h6"
                      gutterBottom
                      component="div"
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="containerHeadline"
                      display="block"
                      gutterBottom
                    >
                      {category.headline != "" ? category.headline : "N/A"}
                    </Typography>
                  </span>
                </Link>
              );
            })}
        </div> */}
      </span >
    );
  }

  return (
    <Tippy
      className={classes.tippyRoot}
      content={<DropdownContent hide={false} />}
      //   onCreate={setInstance}
      placement="bottom"
      animation="shift-away"
      arrow={false}
      theme="light-border"
      trigger="mouseenter click"
      maxWidth="max-content"
      appendTo="parent"
      delay={100}
      interactive={true}
    >
      {/* <Link to="/categories"> */}
      <div
        aria-expanded="false"
        className={`${classes.wrapper} ${!isAuthenticated && classes.paddingZero
          } categoriesCont`}
      >
        <p className="name">Categories</p>
        <BsCaretDownFill className="svg" />
      </div>
      {/* </Link> */}
    </Tippy>
  );
};

export default CategoriesDropdownPopover;
