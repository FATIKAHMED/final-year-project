import * as React from "react";
// import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';

//* Assests
import noImg from "assets/no-img-available.png";
import isEmpty from "utils/is-empty";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.header,
    fontFamily: `${theme.typography.fontFamily} !important`,
    fontWeight: "500",
    marginBottom: "3px !important",
  },
  cardDesc: {
    //  maxWidth: "750px",
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: `${theme.typography.fontFamily} !important`,
    color: theme.palette.text.header,
  },
}));

export default function CategoryListCard({ category }) {
  // const theme = useTheme();
  const { title, description, slug, img } = category;
  const classes = useStyles();
  const [courseDetailUrl, setCourseDetailUrl] = React.useState(`/categories`);

  React.useEffect(() => {
    setCourseDetailUrl(`/categories/${slug}`);
  }, [slug]);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          //   marginBottom: "1rem",
          background: "transparent",
          alignItems: "center",
          boxShadow: "none",
          borderRadius: 0,
        }}
      // variant="outlined"
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
          }}
          image={img ? img : noImg}
          alt="Category Cover Photo"
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
          </CardContent>
        </Box>
      </Card>
      <Divider style={{ margin: "1rem 0" }} />
    </>
  );
}
