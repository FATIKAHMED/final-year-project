import * as React from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { getFilteredCoursesList } from "redux/actions";
import {
  ListItemText,
  List,
  Collapse,
  Divider,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Chip
} from "@material-ui/core";
import { Rating, ListItemButton, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import isEmpty from "utils/is-empty";
import { sortObject } from "utils/misc";
// import { Rating } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  listCont: {
    display: "flex",
    flexDirection: "column",
    gap: "0rem",
    border: "1px solid rgb(0 0 0 / 10%)",
    marginBottom: "1rem",
    borderRadius: "6px !important",
    "& .MuiTypography-body1": {
      fontWeight: "500",
      color: "#343434",
      fontSize: "1.2rem",
    },
    "&.MuiAccordion-root:before": {
      height: "0 !important"
    },
    // "& .MuiFormGroup-root": {
    //   padding: "1rem 0",
    // },
    "& .MuiFormControlLabel-root": {
      margin: 0
    },
    "& .menuCont": {
      "&.MuiListItemButton-root": {
        "boxShadow": "0px 4px 8px 0px #4a49490f",
        "border": "1px solid rgb(0 0 0 / 10%)",
        "borderRadius": "6px",
        "background": "#fff",
        // "marginBottom": "1rem",
        "padding": "0.8rem 1rem"
      },
      "& .icon": { width: "1.5rem", height: "1.5rem", color: "#343434" },
    },
    "& .itemCont": {
      "background": "#fff",
      "border": "1px solid rgb(0 0 0 / 10%)",
      "borderRadius": "6px",
      "padding": "0.7rem 0"
    },
    "& .paddingY": { paddingTop: ".8rem", paddingBottom: ".8rem" },
    "& .ratingText": { fontSize: ".7rem", marginLeft: ".4rem" },
    "& .total": { fontSize: ".7rem", marginLeft: ".4rem", color: "#9CBBB3" },
  },
  FormControl: {
    width: "100%",
    padding: ".8rem 0",
    "& .MuiIconButton-root": {
      padding: "5px",
    }
  },
  groupCont: {
    gap: ".2rem",
    "& .MuiListItemButton-root": {
      padding: "0",
      paddingLeft: "1rem",
      // paddingLeft: "1.4rem",
    },
    // "& .MuiIconButton-colorSecondary": {
    //   padding: "4px",
    // },

  },
  accordion: {
    // veryLightGray3
    border: `1px solid ${theme.palette.border.gray6}`,
    margin: "10px 0",
    borderRadius: "8px !important",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.04) !important",
    "& .MuiAccordionSummary-root": {
      flexDirection: "row-reverse",
      // borderBottom: `1px solid ${theme.palette.border.gray6}`,
      padding: "0 1.5rem",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      paddingLeft: "0.6rem",
      paddingRight: "0.3rem",
    },

    "&.MuiAccordion-root:before": {
      display: "none",
    },
    "& .makeStyles-details": {
      borderBottom: "none",
    },
    "& .accordionSummarySpan": {
      display: "flex",
      padding: ".5rem",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
    "& .lessonTitle": {
      fontSize: "20px",
      fontWeight: "500",
    },
    "& .time": {
      // gradientBlue
      color: theme.palette.text.link_sec,
      fontWeight: "normal",
      fontSize: "13px",
      margin: "0 .5rem",
    },
    "& .icon": {
      height: "25px", width: "25px", color: theme.palette.text.header
    },
    "& .accDetails": {
      padding: "1.2rem 2rem",
      "&:not(:last-child)": {
        borderBottom: "1px solid rgba(0, 0, 0, .07)",
      },
    },
  },
  details: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    backgroundColor: theme.palette.background.veryLightGray2,
    borderRadius: " 0 0 8px 8px !important",
    borderTop: '1px solid rgba(0, 0, 0, .125)',

    "&$expanded": {
      minHeight: 56,
    },
    "&.MuiAccordionDetails-root ": {
      padding: 0
    },
    "& .topicTitle ": {
      fontSize: "15px",
      fontWeight: "500"
    },
    "& .formItemCont": {
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "flex-start",
      "paddingLeft": "1rem"
    }
  },


}));

export default function CourseFilterDropdown() {
  const [openRatings, setOpenRatings] = React.useState(true);
  const [openDuration, setOpenDuration] = React.useState(false);
  const [openFeatures, setOpenFeatures] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [ratings, setRatings] = React.useState(null);
  const [duration, setDuration] = React.useState({
    extraShort: false,
    short: false,
    medium: false,
    long: false,
    extraLong: false,
  })
  const [features, setFeatures] = React.useState({
    quiz: false,
    practice: false,
    exercise: false,
    challenge: false,
  })
  const [categories, setCategories] = React.useState({})
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    ratings: "",
    duration: "",
  })

  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cats = useSelector(state => state.category.all.docs)

  React.useEffect(() => {
    initialPopulateCategories()
  }, [])

  const RenderChip = ({ value }) => {
    if (value <= 0) return null
    return <Chip style={{ fontSize: "10px" }} label={value} size="small" variant="outlined" />
  }

  const initialPopulateCategories = () => {
    let objCats = {}
    cats?.forEach(category => {
      if (category.status !== 1) return
      objCats[category.title] = false

    })
    objCats = sortObject(objCats)
    setCategories(objCats)
  }
  const resetFilterFields = () => {
    initialPopulateCategories()
    setFeatures({
      quiz: false,
      practice: false,
      exercise: false,
      challenge: false,
    })
    setDuration({
      extraShort: false,
      short: false,
      medium: false,
      long: false,
      extraLong: false,
    })
    setRatings(null)
    setOpenRatings(true)
  }
  const handleRatingsOpen = () => {
    setOpenRatings(!openRatings);
  };
  const handleVideoOpen = () => {
    setOpenDuration(!openDuration);
  };
  const handleFeaturesOpen = () => {
    setOpenFeatures(!openFeatures);
  };
  const handleCategoriesOpen = () => {
    setOpenCategories(!openCategories);
  };
  const handleRatings = (e) => {
    // console.log("handleRatings-->", e.target.value)
    setRatings(e.target.value)
  };
  const handleDuration = (e) => {
    // console.log("handleDuration-->", e.target.name, e.target.checked)
    setDuration({ ...duration, [e.target.name]: e.target.checked });
    // console.log("-->", Object.keys(duration))
    // if (e.target.checked) console.log("name-->", e.target.name)
  };
  const handleFeatures = (e) => {
    // console.log("handleFeatures-->", e.target.name, e.target.checked)
    setFeatures({ ...features, [e.target.name]: e.target.checked });

  };
  const handleCategories = (e) => {
    const updated = {
      ...categories,
      [e.target.name]: e.target.checked
    }
    setCategories(updated);
  };

  const { extraShort, short, medium, long, extraLong } = duration;
  const { quiz, practice, exercise, challenge } = features;

  const onFilterCourse = async (obj) => {
    const { ratings, duration, features } = obj
    const sort = "popularity";
    const asc = true;
    // console.log("ratings", ratings)
    const filtered = { ...obj, sort, asc }
    // console.log("filtered-->", filtered)
    setLoading(true)
    dispatch(getFilteredCoursesList(filtered));
    setLoading(false)

  };

  const getObjectFilteredString = (stateObj) => {
    if (isEmpty(stateObj)) return ''

    let filterArray = [];
    let filterString = '';
    for (const key in stateObj) {
      if (stateObj[key] === true) filterArray.push(key)
    }
    if (!isEmpty(filterArray)) filterString = filterArray.toString()
    return filterString
  }

  const handleSubmit = () => {
    // if (errors.ratings || errors.duration) return
    // function getKeyByValue(object, value) {
    //   return Object.keys(object).find(key => object[key] === value);
    // }
    // const durationKey = getKeyByValue(duration, true)
    // console.log("durationKey--> ", durationKey)

    const durationString = getObjectFilteredString(duration)
    const featureString = getObjectFilteredString(features)
    const categoriesString = getObjectFilteredString(categories)
    // if (!ratings || !durationKey) return
    onFilterCourse({ ratings, duration: durationString, features: featureString, categories: categoriesString })
    // onFilterCourse({ ratings, duration: durationKey })
  }

  const handleResetFilters = async () => {
    const filtered = { sort: "popularity", asc: true }
    resetFilterFields()

    setLoading(true)
    await dispatch(getFilteredCoursesList(filtered));
    setLoading(false)


  }
  return (
    <>
      <Accordion
        elevation={0}
        style={{ maxWidth: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.listCont}
        defaultExpanded={true}

      >
        {/* <Divider /> */}
        <AccordionSummary
          expandIcon={<BiChevronDown className="icon" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleRatingsOpen} className={"menuCont"}
        >
          <span className="accordionSummarySpan">
            <Typography className="lessonTitle">Ratings</Typography>
          </span>

        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>

          <FormControl className={classes.FormControl}>
            <RadioGroup aria-label="rating" name="rating1" className={classes.groupCont} value={ratings} onChange={handleRatings}>
              <div className="formItemCont">
                <FormControlLabel value="5.0" control={<Radio />} />
                <Rating
                  size="small"
                  name="half-rating"
                  defaultValue={5.0}
                  precision={0.5}
                  readOnly
                  style={{ color: theme.palette.background.softOrange }}
                />
                <span className="ratingText">5.0</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel value="4.5" control={<Radio />} />
                <Rating
                  size="small"
                  name="half-rating"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                  style={{ color: theme.palette.background.softOrange }}
                />
                <span className="ratingText">4.5</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel value="4.0" control={<Radio />} />
                <Rating
                  size="small"
                  name="half-rating"
                  defaultValue={4}
                  precision={0.5}
                  readOnly
                  style={{ color: theme.palette.background.softOrange }}
                />
                <span className="ratingText">4.0</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel value="3.5" control={<Radio />} />
                <Rating
                  size="small"
                  name="half-rating"
                  defaultValue={3.5}
                  precision={0.5}
                  readOnly
                  style={{ color: theme.palette.background.softOrange }}
                />
                <span className="ratingText">3.5</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel value="3.0" control={<Radio />} />
                <Rating
                  size="small"
                  name="half-rating"
                  defaultValue={3.0}
                  precision={0.5}
                  readOnly
                  style={{ color: theme.palette.background.softOrange }}
                />
                <span className="ratingText">3.0</span>
                {/* <span className="total">(1200)</span> */}
              </div>
            </RadioGroup>
          </FormControl>

        </AccordionDetails>
      </Accordion>

      {/* <Divider /> */}
      <Accordion
        elevation={0}
        style={{ maxWidth: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.listCont}
      >
        <AccordionSummary
          expandIcon={<BiChevronDown className="icon" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleVideoOpen} className={"menuCont"}>
          <span className="accordionSummarySpan">
            <Typography className="lessonTitle">Duration {" "} <RenderChip value={Object.values(duration).filter(item => item === true)?.length} />
            </Typography>
          </span>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>

          <FormControl className={classes.FormControl}>
            <FormGroup className={classes.groupCont}>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={extraShort} onChange={handleDuration} name="extraShort" />} />
                <span className="ratingText">0-1 Hour</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={short} onChange={handleDuration} name="short" />} />
                <span className="ratingText">1-3 Hours</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={medium} onChange={handleDuration} name="medium" />} />
                <span className="ratingText">3-6 Hours</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={long} onChange={handleDuration} name="long" />} />
                <span className="ratingText">6-17 Hours</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={extraLong} onChange={handleDuration} name="extraLong" />} />
                <span className="ratingText">17+ Hours</span>
                {/* <span className="total">(1200)</span> */}
              </div>
            </FormGroup>
          </FormControl>

        </AccordionDetails>
      </Accordion>

      <Accordion
        elevation={0}
        style={{ maxWidth: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.listCont}
      >
        <AccordionSummary
          expandIcon={<BiChevronDown className="icon" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleFeaturesOpen} className={"menuCont"}>
          <span className="accordionSummarySpan">
            <Typography className="lessonTitle">Features {" "} <RenderChip value={Object.values(features).filter(item => item === true)?.length} /></Typography>
          </span>
        </AccordionSummary>

        <AccordionDetails classes={{ root: classes.details }}>
          <FormControl className={classes.FormControl}>
            <FormGroup className={classes.groupCont}>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={quiz} onChange={handleFeatures} name="quiz" />} />
                <span className="ratingText">Quizes</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={practice} onChange={handleFeatures} name="practice" />} />
                <span className="ratingText">Practice Tests</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={exercise} onChange={handleFeatures} name="exercise" />} />
                <span className="ratingText">Exercises</span>
                {/* <span className="total">(1200)</span> */}
              </div>
              <div className="formItemCont">
                <FormControlLabel control={<Checkbox checked={challenge} onChange={handleFeatures} name="challenge" />} />
                <span className="ratingText">Challenges</span>
                {/* <span className="total">(1200)</span> */}
              </div>
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion
        elevation={0}
        style={{ maxWidth: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.listCont}
      >
        <AccordionSummary
          expandIcon={<BiChevronDown className="icon" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleCategoriesOpen} className={"menuCont"}>
          <span className="accordionSummarySpan">
            <Typography className="lessonTitle">Category {" "} <RenderChip value={Object.values(categories).filter(item => item === true)?.length} /></Typography>
          </span>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>
          <FormControl className={classes.FormControl}>
            <FormGroup className={classes.groupCont}>
              {!isEmpty(categories) && Object.keys(categories).map((name, i) =>
                <div key={i} className="formItemCont">
                  <FormControlLabel control={<Checkbox checked={categories[name]} onChange={handleCategories} name={name} />} />
                  <span className="ratingText">{name}</span>
                  {/* <span className="total">(1200)</span> */}
                </div>
              )}
            </FormGroup>
          </FormControl>

        </AccordionDetails>
      </Accordion>
      {/* </Accordion> */}
      <span
        style={{
          margin: "1rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Button
          fullWidth
          style={{
            // darkPurple
            background: !loading ? theme.palette.background.purple : "lightgrey",
            color: "white",
            textTransform: "capitalize",
            padding: "10px 4px"
          }}
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        // disabled={btnDisabled}

        >
          Apply Filters
        </Button>
        <Button
          fullWidth
          // gradientBlue
          onClick={handleResetFilters}
          style={{ color: theme.palette.text.link_sec, textTransform: "capitalize" }}
        >
          Reset Filters
        </Button>
      </span>
    </>
  );
}
