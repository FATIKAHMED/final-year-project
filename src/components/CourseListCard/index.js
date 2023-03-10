
import * as React from "react";
import { useTheme } from "@material-ui/styles";
import { Box, Chip, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';
import isEmpty from "utils/is-empty";

const useStyles = makeStyles((theme) => ({
  cardMain: {
    display: "flex",
    marginBottom: "1rem",
    background: "transparent !important",
    boxShadow: "none",
    borderRadius: 0,
    gap: "1rem",
    [theme.breakpoints.down("660")]: {
      "flexDirection": "column",
      "maxWidth": "280px",
      "margin": "0 auto",
      "borderRadius": "6px !important",
      "background": "#fafafa",
      "boxShadow": "0px 12px 40px #e9f2ff !important",
    }
  },
  title: {
    color: theme.palette.text.header,
    fontFamily: `${theme.typography.fontFamily} !important`,
    fontWeight: "500 !important",
    fontSize: "1.25rem",
    marginBottom: "3px !important",
    [theme.breakpoints.down(660)]: {
      fontSize: "1.25rem",
      "display": "-webkit-box",
      "overflow": "hidden",
      "fontSize": "15px",
      "fontWeight": "500",
      "textOverflow": "ellipsis",
      "whiteSpace": "pre-wrap",
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": "2",
      "maxWidth": "240px"
    },

  },
  card: {
    display: "flex",
    marginBottom: "1rem",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
  },
  cardImg: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    borderRadius: "6px",
    maxWidth: "280px",
    objectFit: "cover",
    minWidth: "280px",
    minHeight: "180px",
    maxHeight: "200px",
    aspectRatio: "16/9",
    [theme.breakpoints.down("600")]: {
      "borderBottomLeftRadius": "0",
      "borderBottomRightRadius": "0"
    }
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "3rem",
    [theme.breakpoints.down("660")]: {
      "flexDirection": "column",
      "gap": "0rem",
      "alignItems": "flex-start",
    },
    "& .cardContentBox": {
      display: "flex",
      flexDirection: "column",
      padding: "3px 0",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  },
  cardDesc: {
    // maxWidth: "750px",
    // maxWidth: "640px",
    maxWidth: "695px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: `${theme.typography.fontFamily} !important`,
    color: theme.palette.text.header,
    marginBottom: "1rem !important"
    // fontWeight: theme.typography.fontWeightMedium + "!important",
  },
  chip: {
    background: `${theme.palette.background.lightBlue} !important`,
    border: `1px solid rgba(0, 0, 0, 0.1) !important`,
    color: ` ${theme.palette.text.pill} !important`,
    marginBottom: ".5rem",
    fontSize: "0.6rem !important",
    height: "20px !important",
    "& .MuiChip-label": {
      padding: "0 .6rem",
    }
  },
  price: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    fontSize: "1.4rem !important",
    color: `${theme.palette.text.header} !important`
  },
  // ratingText: {
  //   marginRight: "1rem", color: theme.palette.background.darkOrange
  // },
}));

export default function CourseListCard(props) {
  const theme = useTheme();
  const classes = useStyles();

  const [courseDetailUrl, setCourseDetailUrl] = React.useState(`/courses`);
  React.useEffect(() => {
    setCourseDetailUrl(`/courses/${props.courseDetails.slug}`);
  }, [props.courseDetails.slug]);

  return (
    <>
      <Card className={classes.cardMain}
        sx={{
          // display: "flex",
          // marginBottom: "1rem",
          // background: "transparent",
          // boxShadow: "none",
          // borderRadius: 0,
          // gap: "1rem",
        }}
        elevation={0}
      >
        <CardMedia
          component="img"
          className={classes.cardImg}
          sx={{
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center center",
            // borderRadius: "6px",
            // maxWidth: "280px",
            // objectFit: "cover",
            // minWidth: "280px",
            // minHeight: "180px",
            // maxHeight: "200px",
            // aspectRatio: "16/9",
          }}
          image={props.courseDetails.coverPhoto}
          alt="Course Cover Photo"
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <CardContent className={classes.cardContent}>
            <Box className={"cardContentBox"}>
              <Link to={courseDetailUrl}>
                <Typography component="div" variant="h5" className={classes.title}>
                  {props.courseDetails.title}
                </Typography>
              </Link>
              <div style={{ marginBottom: ".5rem", display: "flex", gap: ".3rem", flexWrap: "wrap" }}>
                {props.courseDetails.categories.slice(0, 3).map((category) => {
                  return <Chip size="small" key={category?.title} label={category.title} className={classes.chip} />;
                })}
                {props.courseDetails.categories.length > 3 && (
                  <Chip
                    size="small"
                    className={classes.chip}
                    label={`${props.courseDetails.categories.length - 3} +`}
                  />
                )}
              </div>
              <Typography
                variant="caption"
                className={classes.cardDesc}
                component="div"
              >
                {!isEmpty(props.courseDetails.description)
                  ? ReactHtmlParser(props.courseDetails.description.contentHtml)
                  : "Description Not Available"}
              </Typography>

              <span style={{ display: "flex", marginBottom: "3px" }}>
                {/* darkOrange */}
                <Typography variant="body2"
                  sx={{ mr: 1, color: theme.palette.background.softOrange, fontWeight: 600 }}
                >
                  {props.courseDetails.averageRating}
                </Typography>
                <Rating
                  size="small"
                  name="half-rating"
                  // defaultValue={props.courseDetails.averageRating}
                  value={+(props.courseDetails.averageRating)}
                  precision={0.5}
                  readOnly
                  style={{ color: theme.palette.background.softOrange }}
                />
              </span>
            </Box>
            <span>
              <Typography
                variant="h6"
                className={classes.price}
              >
                {props.courseDetails.price === 0
                  ? "Free"
                  : `$${props.courseDetails.price}`}
              </Typography>
            </span>
          </CardContent>
        </Box>
      </Card>
      <Divider style={{ margin: "2rem 0" }} />
    </>
  );
}
