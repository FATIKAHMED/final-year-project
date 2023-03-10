// * Libraries
import React, { useContext } from "react";
import {
  IconButton,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseImage from "assets/course.jpg";
import MyIndividualCategoryCard from "components/MyIndividualCategoryCard";
// import noImg from "assets/no-img-available.png";


// * Assets
import EmptySearchResult from 'assets/search_result_empty.svg'

// * Icons
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import img1 from "assets/category1.svg";
import img2 from "assets/category2.svg";
import img3 from "assets/category3.svg";
import img4 from "assets/category4.svg";
import img5 from "assets/category5.svg";
import img6 from "assets/category6.svg";
import { sortCategoryCourses } from "redux/actions";
import { useDispatch } from "react-redux";
import MyIndividualCourseCardSkeleton from "components/MyIndividualCourseCardSkeleton";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "3rem 2rem",
    "& .pageTitle": {
      color: theme.palette.text.header,
      fontWeight: "500",
      fontSize: "1.8rem",
      textTransform: "capitalize",
    },
    "& .pageSubTitle": {
      color: theme.palette.text.header,
      fontWeight: "500",
      fontSize: "1rem",
      marginBottom: "1rem",
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
    // [theme.breakpoints.down("500")]: {
    //   justifyContent: "flex-start",
    // }
  },
  resultsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: ".5rem",
    "& .arrowIcon": {
      display: "flex",
      flexDirection: "column",
      "& .activeBtn": {
        color: theme.palette.text.link_sec,
      },
    },
    [theme.breakpoints.down("500")]: {
      flexDirection: "column",
      "& > span": {
        flexDirection: "column",
      },
      "& button:last-child": {
        marginBottom: "1rem",
      },
    }
  },
  filter: {
    color: theme.palette.text.link_sec,
    fontSize: ".8rem",
    fontWeight: "500",
    marginBottom: "3rem",
    cursor: "pointer",
    display: "inline-block",
    [theme.breakpoints.down("500")]: {
      "display": "block",
      "textAlign": "center",
      "border": "1px solid",
      "borderRadius": "6px",
      "padding": "1rem"

    }
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
    // border: "1px solid",
    width: "250px",
    borderRadius: "5px",
    // veryLightGray2
    boxShadow: `0px 8px 16px ${theme.palette.background.veryLightGray2}`,
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
  button: {
    border: "1px solid #0000001A",
    background: theme.palette.common.white,
    textTransform: 'none',
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
  LoadBtn: {
    padding: ".8rem 1.8rem",
    color: theme.palette.text.header,
    fontWeight: theme.typography.fontWeightBold,
  },
  categoryCont: {
    background: "white",
    borderRadius: "6px",
    marginBottom: "4rem",
    border: "1px solid #0000001A",
    boxShadow: "0px 4px 8px 0px #0000000a",
  },
  imgCont: {
    width: "100%",
    "& .imgSvg": {
      background: "#EAF4FA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // padding: "2rem",
      minHeight: "230px",
      height: "100%",
      "& img": {
        maxWidth: "100%",
      }
    }
  },
  categoryContentCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

    "& .categoryContent": {
      padding: "1rem 2rem",
      [theme.breakpoints.down("600")]: {
        padding: "2rem 1rem"
      },

      "& .catTitle": {
        color: "#343434",
        fontSize: "40px",
        textTransform: "capitalize",
        WebkitLineClamp: 2,
        fontWeight: 600,
        [theme.breakpoints.between("860", "1200")]: {
          fontSize: "1.8rem"
        },
        [theme.breakpoints.down("860")]: {
          fontSize: "1.5rem",
          lineHeight: "1.75rem",
          WebkitLineClamp: "auto",
          marginBottom: ".5rem"
        },
      },
      "& .catSubTitle": {
        color: "#7DA499",
        fontSize: "13px",
        textTransform: "capitalize",
        fontWeight: 500,
        marginBottom: "1rem",
        WebkitLineClamp: 2,
        [theme.breakpoints.down("860")]: {
          lineHeight: "1rem",
          WebkitLineClamp: "auto",
          marginBottom: ".5rem"
        },
      },
      "& .catPara": {
        color: "#343434",
        fontSize: "12px",
        lineHeight: "18px",
        fontWeight: 400,
        WebkitLineClamp: 3,
        [theme.breakpoints.down("500")]: {
          WebkitLineClamp: "auto",
          WebkitBoxOrient: "horizontal",
        }
      },
      "& .catTitle,& .catSubTitle,& .catPara": {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  },
  coursesCont: {

    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    marginBottom: "3rem",
    "& .no-search-result": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("500")]: {
        "& h3": {
          fontSize: "1.1rem",
        },
        "& p": {
          fontSize: ".9rem",
          textAlign: "center"
        },
      },
      "& img": {
        maxWidth: '400px',
        marginBottom: '20px',
        [theme.breakpoints.down("600")]: {
          maxWidth: "100%"
        }
      }


    }
  }

}));
const arr = [1, 2, 3, 4]

const Index = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [categoryName, setCategoryName] = React.useState("");
  const [categorySlug, setCategorySlug] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [categoryImg, setCategoryImg] = React.useState(null);
  const [courses, setCourses] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [filterCourses, setFilterCourses] = React.useState({
    course: "asc",
    rating: "asc",
    price: "asc",
  });
  const user = useSelector((state) => state.auth.user);
  const allCourses = useSelector((state) => state.courses?.store?.docs);
  const category = useSelector((state) => state.category?.all?.docs);

  const { price, rating, course } = filterCourses;

  const getSortedCourses = async (id) => {
    const { res, error } = await dispatch(sortCategoryCourses({ categoryId: id, price, averageRating: rating, title: course }));
    setLoading(false)
    if (res) {
      setCourses(res)
      setError(null)
    }
    else {
      setError(error)
    }
  }



  React.useEffect(() => {
    let pathname = location.pathname;
    let slug = pathname.split("/")[2];
    let name = slug.replaceAll("-", " ");
    const id = category?.filter(item => item.slug === slug)[0]?._id;
    setCategorySlug(slug);
    setCategoryName(name);
    setCategoryId(id);
    handleImg()

    if (id) getSortedCourses(id)

  }, [location]);

  React.useLayoutEffect(() => {

    if (categoryId && courses.length > 0) getSortedCourses(categoryId)

  }, [filterCourses]);

  const handleImg = () => {
    const arr = [img1, img2, img3, img4, img5, img6]
    const index = Math.floor(Math.random() * 6);
    setCategoryImg(arr[index])

  }

  const ArrowsIcon = ({ asc, desc }) => {
    return (
      <div className="arrowIcon">
        <BiChevronUp
          style={{
            position: "relative",
            bottom: "-4px",
          }}
          className={asc ? "activeBtn" : ""}
        />
        <BiChevronDown style={{
          position: "relative",
          top: "-4px",
        }}
          className={desc ? "activeBtn" : ""}
        />
      </div>
    )
  }

  const handleToggle = (val) => {
    if (val === "course") {
      setFilterCourses({ ...filterCourses, course: filterCourses.course == "asc" ? "desc" : "asc" });
    }
    else if (val === "rating") {
      setFilterCourses({ ...filterCourses, rating: filterCourses.rating == "asc" ? "desc" : "asc" });
    }
    else {
      setFilterCourses({ ...filterCourses, price: filterCourses.price == "asc" ? "desc" : "asc" });

    }
  }
  const handleReset = () => {
    if (categoryId && courses.length > 0) getSortedCourses(categoryId)
    setFilterCourses({
      course: "asc",
      rating: "asc",
      price: "asc",
    });
  }


  return (
    <Container className={classes.container}>
      <Grid container className={classes.categoryCont}>
        <Grid item sm={4} className={classes.imgCont}>
          <div className="imgSvg"><img src={categoryImg} alt="category background" /></div>
        </Grid>
        <Grid item sm={8} className={classes.categoryContentCont}>
          <div className="categoryContent">
            <div className="catTitle">{categoryName} Course</div>
            <div className="catSubTitle">The best {categoryName} courses chosen for your success</div>
            <div className="catPara">Learn {categoryName} with the best of instructors, lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit ametlorem ipsum dolar sit ametlorem ipsum dolar sit ametlorem ipsum dolar sit ametlorem ipsum dolar sit ametlorem ipsum dolar sit ametlorem ipsum dolar sit amet</div>
          </div>
        </Grid>
      </Grid>
      {/* <Typography className="pageTitle">{categoryName} Courses</Typography>
      <Typography className="pageSubTitle">
        Courses to get you started
      </Typography> */}
      <div className={classes.resultsContainer}>
        <span style={{ display: "flex", gap: "1rem" }}>
          <Button
            endIcon={<ArrowsIcon asc={course == "asc"} desc={course == "desc"} />}
            // size="small"
            // onClick={filterEnableHandler}
            className={classes.button}
            variant="outlined"
            onClick={() => handleToggle("course", "desc")}
          >
            {/* sortCategoryCourses */}
            Course name
          </Button>
          <Button
            endIcon={<ArrowsIcon asc={rating == "asc"} desc={rating == "desc"} />}
            // size="small"
            className={classes.button}
            variant="outlined"
            onClick={() => handleToggle("rating", "desc")}
          >
            Rating
          </Button>
          {/* <Button
            endIcon={<ArrowsIcon asc={price == "asc"} desc={price == "desc"} />}
            // size="small"
            className={classes.button}
            variant="outlined"
            onClick={() => handleToggle("price", "desc")}
          >
            Price
          </Button> */}
        </span>
        <div className={classes.flexEnd}>
          <h4 className="para">{courses.length > 0 ? courses.length == 1 ? `${courses.length} result` : `${courses.length} results` : "No result"}</h4>
          {/* <h4 className="para">{coursesInStore.totalDocs ? coursesInStore.totalDocs : 0} results</h4> */}
        </div>
      </div>
      <div className={classes.filter} onClick={handleReset}>Reset Filters</div>

      <div className={classes.coursesCont}>
        {loading ? arr.map(item => <MyIndividualCourseCardSkeleton key={item} />) :

          courses.length > 0 ? courses?.map((item) => {
            return (
              <MyIndividualCategoryCard
                image={item?.coverPhoto}
                title={item?.title}
                description={item?.description}
                rating={item?.rating}
                price={item?.price}
                date={item?.createdAt}
                courseLink={`/courses/${item?.slug}`}
                categoryCard={true}
                key={item?.createdAt}
              />
            );
          }) :
            (
              <div style={{ margin: "0 auto" }}>
                <div className='no-search-result'>
                  <img src={EmptySearchResult} alt="no result" />
                  <h3>Sorry no results found</h3>
                  <p>Try again searching for something else.</p>
                </div>
              </div>
            )

        }
      </div>

      {error && <div style={{ fontWeight: "bold", fontSize: "2rem" }}>Oops!,Failed To Fetch Data</div>}
      {
        courses.length > 6 && <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Button
            className={`${classes.LoadBtn}`}
            // onClick={}
            variant="outlined"
          >
            Load More
          </Button>
        </div>
      }
    </Container >
  );
};

export default Index;

