// * Libraries
import React, {
  // useEffect,
  useState
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Tippy from "@tippyjs/react";
// import Tippy, { useSingleton } from "@tippyjs/react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCartItemAction,
  setCurrentTopicDetailsAction,
  setCurrentLessonDetailsAction,
  getCourseDetailsAction,
  updateUserTopicProgressDetailsAction
} from "redux/actions";

// * Assets
import CourseImage from "assets/course.jpg";

// * Components
import {
  // SwipeableDrawer,
  // Divider,
  // IconButton,
  // List,
  // ListItem,
  // ListItemText,
  // Collapse,
  // TextField,
  Button,
  // Badge,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  course: {
    position: "relative",
    // border: "1px solid",
    width: "250px",
    borderRadius: "5px",
    // veryLightGray2
    boxShadow: theme.palette.boxShadow.search,
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
}));

const CourseCardDetails = ({ itemId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, user } = auth
  const courseDetails = useSelector((state) => state.courses.store.docs.find((course) => course._id === itemId));
  const isInCart = useSelector((state) => state.cart.lists.cart.find((item) => item.id === itemId) ? true : false);
  const isBought = useSelector((state) => state.courses.bought.find((course) => course._id === courseDetails._id) ? true : false)
  const updatedCourseDetails = useSelector((state) => state.courses.courseDetails);
  const isSubscribed = useSelector((state) => {
    if (state.subscription?.subscription?.subscriptionStatus === 'active')
      return true
    else
      return false
  });
  const [loading, setLoading] = useState(false);

  const { _id, title, slug, price, coverPhoto, description } = courseDetails;

  const handleClickAddToCart = () => {
    if (isAuthenticated === false) {
      history.push('/login')
      return
    }

    const buyable = {
      id: itemId,
      title,
      price,
      slug,
      coverPhoto,
      description
    };

    dispatch(addCartItemAction(itemId, buyable));
  };

  const handleClickGoToCourse = async () => {
    if (!isAuthenticated)
      history.push('/login')

    setLoading(true);
    // const { res, error } = await dispatch(getCourseDetailsAction(_id));
    const { res } = await dispatch(getCourseDetailsAction(_id));

    if (res) {
      const currentLesson = updatedCourseDetails.lessons[0];
      const lessons = updatedCourseDetails.lessons;
      dispatch(setCurrentLessonDetailsAction(currentLesson, lessons));

      const currentTopic = currentLesson.topics[0];
      const currentLessonAllTopics = currentLesson.topics;
      // console.log("currentLessonAllTopics", currentLessonAllTopics)

      await dispatch(setCurrentTopicDetailsAction(currentTopic, currentLessonAllTopics, user));
      setLoading(false);
      history.push(`/courses/${slug}/lessons`);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>{title}</h1>
      <h4>Updated: July 2021</h4>
      <p>
        Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube,
        Email, Facebook Marketing, Analytics & More!
      </p>
      <ul>
        <li>Grow a Business Online From Scratch</li>
        <li>Make Money as an Affiliate Marketer</li>
        <li>Get Hired as a Digital Marketing Expert</li>
      </ul>
      <div>
        {isBought || isSubscribed || price <= 0 ? (
          // <Link to={`/courses/${slug}/learn`}>
          <Button
            onClick={() => handleClickGoToCourse()}
            disabled={loading}
            variant="contained"
            color="secondary"
          >
            {isAuthenticated ? 'Go to Course' : 'Enroll now'}
          </Button>
        ) : (
          // </Link>
          <>
            {isInCart ? (
              <Link to="/my-cart">
                <Button variant="contained" color="secondary">
                  Go to cart
                </Button>
              </Link>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickAddToCart}
              >
                Add to cart
              </Button>
            )}
          </>
        )}

        {/* <button>Heart</button> */}
      </div>
    </div>
  );
};
const CourseCard = ({ courseDetails }) => {
  const { _id, title, enrolled, slug } = courseDetails;
  const classes = useStyles();
  // const [source, target] = useSingleton();

  // TODO: Tippy to singleton

  return (
    <>
      <Tippy
        theme="light-border"
        interactive={true}
        interactiveBorder={20}
        placement="right"
        // delay={100}
        animation="shift-away"
        content={<CourseCardDetails itemId={_id} />}
      >
        <div key={_id} className={classes.course}>
          <Link
            to={
              !slug ? "/courses/the-complete-surgeon-basics" : `/courses/${slug}`
            }
          >
            <img className="image" alt="course card img" src={CourseImage} />
            <div className="info">
              <h3>{title}</h3>
              <p>
                Rating 4/5 <span>({enrolled.length})</span>
              </p>
              <p>Best seller</p>
            </div>
          </Link>
        </div>
      </Tippy>
    </>
  );
};

export default CourseCard;
