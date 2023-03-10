// * Libraries
import React, { useEffect, useState, useRef, Suspense } from "react";
import { Link } from "react-router-dom"

import {
  IconButton,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  Popover,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import CourseImage from "assets/course.jpg";
import { useDispatch } from "react-redux";
import { getCoursesList } from "redux/actions";
import Tippy from "@tippyjs/react";


// * Icons
import { BsFilter } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";

// * Components
import CourseCard from "components/CourseCard";
import _Button from "components/Button";
import CourseFilterDropdown from "components/CourseFilterDropdown";
import CourseListCard from "components/CourseListCard";
import { Skeleton } from "@mui/material";
import CourseListCardSkeleton from "components/CourseListCardSkeleton";
import Pagination from "components/Pagination";
import CourseFilterDropdownPopover from "components/CourseFilterDropdownPopover";
import Loader from "components/Loader";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    // position: 'absolute',
    // top: '0'
  },
  paper: {
    pointerEvents: "auto",
    padding: theme.spacing(5),
    width: "250px",
    // margin: '0 20px'
  },
  mainContainer: {
    // maxWidth: "1180px",
    padding: "2rem",
    [theme.breakpoints.down("400")]: {
      padding: "1rem",
    },
  },
  container: {
    padding: "3rem 0",
    "& .title": {
      fontWeight: "500",
      fontSize: "1.8rem",
      marginBottom: "1rem",
      color: theme.palette.text.header,
      [theme.breakpoints.down("540")]: {
        fontSize: "1.6rem",
      },
    },
  },
  card: {
    marginBottom: "40px",
    "& .MuiCardHeader-root": {
      // veryLightGray6
      borderBottom: `1px solid ${theme.palette.border.gray6}`,
    },
    "& .courses": {
      display: "flex",
      flexDirection: "column",

      "& .course": {
        display: "inline-block",
        margin: "10px 12px 10px",
        "& p": {
          fontSize: "12px",
        },
      },
    },
  },
  coursesContainer: {
    padding: "2rem 0",
    "& .containerPara": {
      marginTop: "10px",
      marginBottom: "30px",
    },
  },
  courses: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  course: {
    position: "relative",
    // border: "1px solid",
    width: "250px",
    borderRadius: "5px",
    // veryLightGray2
    boxShadow: `0px 8px 16px ${theme.palette.border.gray5}`,
    "& a": {
      textDecoration: "none",
    },
    "& .image": {
      width: "100%",
      borderRadius: "5px 5px 0px 0",
    },
    "& .info": {
      padding: "10px",
    },
  },
  flexEnd: {
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    "& .para": {
      fontSize: "1rem",
      fontWeight: "500",
      color: theme.palette.text.header

    },
  },
  filter: {
    // [theme.breakpoints.down("500")]: {
    //   "display": "block",
    //   "textAlign": "center",
    //   "border": "1px solid",
    //   "borderRadius": "6px",
    //   "padding": "1rem"

    // }
  },
  resultsContainer: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("500")]: {
      flexDirection: "column",
      "& > span": {
        flexDirection: "column",
      },
      "& div .MuiButtonBase-root.MuiButton-root.MuiButton-outlined ": {
        marginBottom: "1rem",
        flex: 1
      },
    }
  },
  button: {
    border: "1px solid #0000001A",
    background: theme.palette.common.white,
    "&:hover": {
      // gradientBlue
      border: `1px solid ${theme.palette.text.link_sec}`,
      color: theme.palette.text.link_sec,
    },
    "paddingTop": "10px",
    "paddingBottom": "10px",
    [theme.breakpoints.down("500")]: {
      flex: 1,
    }
  },
  ordersHistory: {
    "& .orders": {
      display: "flex",
      flexDirection: "column",

      "& .order": {
        // #b251df
        borderLeft: "5px solid rgba(178, 81, 223,.3)",
        paddingLeft: "20px",
        "& div": {
          display: "flex",
          marginBottom: "8px",
        },
        margin: "10px 12px 10px",
        "& p": {
          fontSize: "12px",
        },
      },
    },
  },
  pagination: {
    "& .MuiPagination-ul ": {
      justifyContent: "center"
    },
    "& .Mui-selected": {
      background: "transparent !important",
      border: 0,
      borderRadius: 0,
      borderBottom: `1px solid ${theme.palette.text.header} !important`,
    },
    "& .MuiPaginationItem-outlined": {
      border: 0,
      borderRadius: 0,
    },
    "& .Mui-disabled,& .MuiPaginationItem-previousNext": {
      // lightGray3
      border: `1px solid ${theme.palette.border.gray3}`,
      background: theme.palette.common.white,
      borderRadius: "100%",
    },
  },
  mobileFilterDrawer: {
    "& .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft": {
      [theme.breakpoints.up("400")]: {
        width: "18rem",
      },
      [theme.breakpoints.up("660")]: {
        width: "20rem",
      },
      "& > nav,& > span": {
        margin: "1rem 1.5rem !important",
      },
      "& > nav:first-child": {
        marginTop: "3rem !important",
      },

    }
  }
}));

const Index = (props) => {
  const [instance, setInstance] = useState(null);
  const [filterState, setFilterState] = useState(true);

  function DropdownContent({ hide }) {
    return <button onClick={hide} />;
  }

  const classes = useStyles();
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("960"));

  const coursesInStore = useSelector((state) => state.courses.store);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoursesList(user._id));
    if (tablet) setFilterState(!filterState)
  }, [tablet]);

  const filterEnableHandler = () => {
    setFilterState(!filterState);
  };


  const onPageChange = async (page) => {
    // const { res, error } = await dispatch(searchCourse(search, page, limit))
    dispatch(getCoursesList(user._id, page));
  }



  return (
    <Container className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.info}>
          <h1 className="title">Awesome courses to get started</h1>
        </div>
        <div className={classes.resultsContainer}>
          <span style={{ display: "flex", gap: "1rem" }} className={classes.filter}>
            <Button
              startIcon={<BsFilter />}
              // size="small"
              onClick={filterEnableHandler}
              className={classes.button}
              variant="outlined"
            >
              Filter
            </Button>
            {/* <Button
              endIcon={<BiChevronDown />}
              // size="small"
              className={classes.button}
              variant="outlined"
            >
              Most Popular
            </Button> */}
            <CourseFilterDropdownPopover />
          </span>
          <div className={classes.flexEnd}>
            <h4 className="para">{coursesInStore?.totalDocs ? coursesInStore?.totalDocs : 0} results</h4>
          </div>
        </div>
      </div>

      <Grid container spacing={5}>
        {(filterState && !tablet) && (
          <Grid item xs={3}>
            <CourseFilterDropdown />
          </Grid>
        )}
        <Grid item xs={(filterState && !tablet) ? 9 : 12}>
          {!coursesInStore?.totalDocs && <CourseListCardSkeleton />}
          <Suspense fallback={<CourseListCardSkeleton />}>
            {coursesInStore?.docs?.map((course) => {
              return <CourseListCard courseDetails={course} key={course?._id} />;
            })}
          </Suspense>
        </Grid>
      </Grid>
      <>
        {(filterState && tablet) && (
          <Drawer
            anchor={"left"}
            open={filterState}
            onClose={() => setFilterState(false)}
            className={classes.mobileFilterDrawer}
          >
            <CourseFilterDropdown />
          </Drawer>
        )}
      </>

      {/*// TODO: Enable this when search & filter is done  */}
      {
        (coursesInStore?.totalPages > 1 || !coursesInStore?.totalDocs) &&
        <Pagination
          pageChangeCallback={onPageChange}
          count={coursesInStore?.totalPages} />
      }
    </Container >
  );
};

export default Index;
