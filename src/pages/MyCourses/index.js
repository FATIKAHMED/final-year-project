// * Libraries
import React, { useState, useEffect, Suspense } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCoursesList, getFilteredCoursesList } from 'redux/actions'
import { Link } from "react-router-dom";

// * Utitlities
import { dateFormat } from 'utils/convertTime'
import isEmpty from "utils/is-empty";

// * Icons
// import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import EmptyCartPNG from "assets/emptyCart.png";
import { BiChevronDown } from "react-icons/bi";


// * Components
import MyIndividualCourseCard from "components/MyIndividualCourseCard";
import MyIndividualCourseCardSkeleton from "components/MyIndividualCourseCardSkeleton";
import MyCourseCategoryFilterPopover from 'components/MyCourseCategoryFilterPopover'
import MyCourseProgressFilterPopover from 'components/MyCourseProgressFilterPopover'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    fontFamily: theme.typography.fontFamily,

    "& .header": {
      "& .title": {
        fontWeight: "500",
        fontSize: "25px",
      },
      "& .subTitle": {
        fontWeight: "normal",
        fontSize: "15px",
      },
    },
    "& .buttonContainer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "1rem 0",
      [theme.breakpoints.down(500)]: {
        flexDirection: "column-reverse",
        gap: "1rem",
        alignItems: "stretch",
        marginTop: "2rem",
      },
      "& .buttons": {
        display: "flex",
        gap: "1rem",
        [theme.breakpoints.down(500)]: {
          flexDirection: "column",
          // width: "100%"
        },
        "& .btn": {
          border: "1px solid red",
          padding: "1rem 1.5rem",
          background: "white",
          border: "1px solid #0000001A",
          borderRadius: "4.5px",
          textTransform: "capitalize",
          fontWeight: "500",
          [theme.breakpoints.down(500)]: {
            flex: 1
          },
          "& .icon": {
            marginLeft: ".5rem",
          },
        },
      },
      "& .results": {
        fontWeight: "normal",
        fontSize: "15px",
      },
    },
    "& .reset": {
      marginBottom: "1rem",
      // gradientBlue
      color: theme.palette.text.link_sec,
      fontSize: "12px",
      fontWeight: "500",
      cursor: "pointer",
      display: 'inline-block',
      [theme.breakpoints.down(500)]: {
        display: "block",
        border: "1px solid #4d9ad5",
        padding: "1rem 1.5rem",
        borderRadius: "4.5px",
        textAlign: "center",
        marginBottom: "2rem",

      },
    },
    "& .individualCourseCardContainer": {
      display: "flex",
      gap: "1.5rem",
      flexWrap: "wrap",
      [theme.breakpoints.down(650)]: {
        justifyContent: "center",
        alignItems: "center"
      },

    },
    "& .individualCourseCardContainer.jc-center": {
      justifyContent: "center"
    },
  },
  emptyCart: {
    width: "300px",
  },
  noItemsinCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // padding: "10px",
    // borderRadius: '10px',
    margin: "50px 0",
    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    "& .title": {
      margin: "10px 0 3px  0",
    },
    "& .desc": {
      textDecoration: "underline"
    },
  },
}));

const MyCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)
  const myCourses = useSelector(state => state.courses.enrolled)

  const [isLoading, setIsLoading] = useState(false)
  const [filterCategories, setFilterCategories] = useState([]);
  const [mycourseFilter, setMycourseFilter] = useState({ categories: "", progress: "" });
  const [isFiltered, setIsFiltered] = useState(false);

  const skeletonArr = [1, 2, 3, 4]

  useEffect(() => {
    const getUserCourses = async () => {
      setIsLoading(true)
      await dispatch(getEnrolledCoursesList(user._id))
      setIsLoading(false)
    }

    getUserCourses()

    // const timeout = setTimeout(() => {
    // }, 3000);
    // return () => {
    //   clearTimeout(timeout);
    // };
  }, []);
  useEffect(() => {
    let cats = []
    if (!isEmpty(myCourses) && !isFiltered) {
      myCourses?.map(item => item.course.categories?.map(category => {
        if (!cats.includes(category?.title)) {
          cats.push(category.title)
        }
      }))
      setFilterCategories(cats)
    }
  }, [myCourses]);

  useEffect(() => {
    const getFilteredCourses = async () => {
      if (isEmpty(mycourseFilter)) {
        setIsFiltered(false)
        return
      }

      setIsFiltered(true)
      setIsLoading(true)
      await dispatch(getEnrolledCoursesList(user._id, mycourseFilter))
      setIsLoading(false)
    }
    getFilteredCourses()
  }, [mycourseFilter]);

  const handleFilter = (filter) => {

    // console.log("handleFilter", filter)
    setMycourseFilter(prev => ({ ...prev, ...filter }))
  }

  const handleResetFilter = () => {
    setIsFiltered(false)
    window.location.reload()
    // setMycourseFilter({ categories: "", progress: "" })
  }

  return (
    <Container className={classes.container}>
      <div className="header">
        <Typography className="title">My Courses</Typography>
        <Typography className="subTitle">
          All of your courses accessable will be listed here
        </Typography>
      </div>
      <div className="buttonContainer">
        <div className="buttons">
          {/* <Button className="btn">
            Most Popular
            <span className="icon">
              <BsChevronDown />
              /* <BsChevronUp /> 
            </span>
          </Button> */}
          <MyCourseCategoryFilterPopover handleFilter={handleFilter} categories={filterCategories} />
          <MyCourseProgressFilterPopover handleFilter={handleFilter} />
        </div>
        <Typography className="results">{myCourses.length <= 1 ? `${myCourses.length} result` : `${myCourses.length} results`}</Typography>
      </div>
      <Typography onClick={handleResetFilter} className="reset">Reset Filters</Typography>


      <div className={`individualCourseCardContainer ${myCourses.length <= 0 ? "jc-center" : ""}`}>

        {isLoading ?
          skeletonArr.map(item => <MyIndividualCourseCardSkeleton key={item} />) :
          myCourses.length > 0 ? myCourses?.map((item) => {

            return (
              // <Link to={`/courses/${item.course.slug}`}>
              <Suspense fallback={<MyIndividualCourseCardSkeleton />}>
                <MyIndividualCourseCard
                  courseLink={`/courses/${item.course.slug}/lessons`}
                  courseId={item.course._id}
                  image={item.course.coverPhoto}
                  title={item.course.title}
                  description={item.course.description}
                  rating={item.rating}
                  complete={item.courseProgress}
                  date={dateFormat(item.createdAt)}
                  slug={`/courses/${item.course.slug}`}
                  slugOnly={`${item.course.slug}`}
                  key={item.course.slug}
                />
              </Suspense>
              // </Link>
            )
          }) :
            <div className={classes.noItemsinCart}>
              <div className="col1">
                <img
                  src={EmptyCartPNG}
                  alt="empty cart"
                  className={classes.emptyCart}
                />
                <div className="info">
                  <h4 className="title">There are no courses.</h4>
                  <p className="desc"><Link to="/courses">Enroll Now!</Link></p>
                </div>
              </div>
            </div>
        }
      </div>
    </Container>
  );
};

export default MyCourses;
