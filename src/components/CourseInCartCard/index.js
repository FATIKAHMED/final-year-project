import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CardMedia, CardContent, Card, Box } from "@mui/material";
import { Button, Divider, useTheme } from "@material-ui/core";
import { removeCartItemAction } from "redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import isEmpty from "utils/is-empty";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.header,
    fontFamily: `${theme.typography.fontFamily} !important`,
    fontWeight: "500",
    marginBottom: "3px !important",
    "display": "-webkit-box",
    "overflow": "hidden",
    "fontSize": "15px",
    "fontWeight": "500",
    "textOverflow": "ellipsis",
    "whiteSpace": "pre-wrap",
    "WebkitBoxOrient": "vertical",
    "WebkitLineClamp": "2",
    // "maxWidth": "240px"
  },
  card: {
    display: "flex",
    marginBottom: "1rem",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
  },
  cardDesc: {
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: `${theme.typography.fontFamily} !important`,
    color: theme.palette.text.header,
    // fontWeight: theme.typography.fontWeightMedium + "!important",
  },
  price: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    fontSize: "1.4rem !important",
    color: `${theme.palette.text.header} !important`,
  },
  button: {
    border: "1px solid #0000001A",
    background: "white",
    textTransform: "capitalize",
    fontSize: "1rem",
    "&:hover": {
      // gradientBlue
      border: `1px solid ${theme.palette.text.link_sec}`,
      color: theme.palette.text.link_sec,
    },
  },
}));

const CourseInCartCard = ({ id, title, details }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { coverPhoto, slug, description, price } = details;

  const [courseDetailUrl, setCourseDetailUrl] = React.useState(`/courses`);

  React.useEffect(() => {
    setCourseDetailUrl(`/courses/${slug}`);
  }, [slug]);

  const handleClickRemoveItem = () => {
    dispatch(removeCartItemAction(id, price));
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          marginBottom: "1rem",
          background: "transparent",
          boxShadow: "none",
          borderRadius: 0,
          [theme.breakpoints.down(660)]: {
            flexDirection: "column",
            alignItems: "center",

          }
        }}
      >
        <CardMedia
          component="img"
          sx={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            maxWidth: "280px",
            objectFit: "cover",
            minWidth: "280px",
            minHeight: "180px",
            maxHeight: "200px",
            aspectRatio: "16/9",
            borderRadius: "6px",
            [theme.breakpoints.down(660)]: {
              maxWidth: "100%"
            }
          }}
          image={coverPhoto}
          alt="Course Cover Photo"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <CardContent>
            <Link to={courseDetailUrl}>
              <Typography
                component="div"
                variant="h5"
                className={classes.title}
              >
                {title}
              </Typography>
            </Link>
            <Typography
              variant="caption"
              className={classes.cardDesc}
              component="div"
            >
              {!isEmpty(description) ? ReactHtmlParser(description.contentHtml) : "Description Not Available"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                gap: "1rem",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Typography variant="h6" className={classes.price}>
                {price === 0 ? "Free" : `$${price}`}
              </Typography>
              <Button
                onClick={handleClickRemoveItem}
                className={classes.button}
                variant="outlined"
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Divider style={{ margin: "2rem 0" }} />
    </>
  );
};

export default CourseInCartCard;
