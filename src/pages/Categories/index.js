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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryImage from "assets/category.jpg";
// * Icons
import { BsFilter } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import CategoryCard from "components/CategoryCard";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "3rem 2rem",
    [theme.breakpoints.down("400")]: {
      padding: "3rem 1rem"
    },
    "& .title": {
      color: theme.palette.text.header,
      fontWeight: "600",
      fontSize: "2.5rem",
      marginBottom: ".2rem"
    },
    "& .subTitle": {
      color: theme.palette.text.header,
      fontWeight: "500",
      fontSize: "1rem",
      marginBottom: "3rem",
    },
    "& .btnContainer": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1rem",
      "& .alignCenter": {
        display: "flex",
        alignItems: "center",
        "& .para": {
          fontSize: "1rem",
          fontWeight: "500",
          color: theme.palette.text.header,
        },
      },
    },
  },
  button: {
    border: "1px solid #0000001A",
    background: "white",
    "&:hover": {
      // gradientBlue
      border: `1px solid ${theme.palette.text.link_sec}`,
      color: theme.palette.text.link_sec,
    },
    paddingTop: "10px",
    paddingBottom: "10px",
  },

}));

const Categories = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const category = useSelector((state) => state.category.all.docs);

  return (
    <Container className={classes.container}>
      <Typography className="title" gutterBottom>
        Categories
      </Typography>
      <Typography className="subTitle">
        Filter the categories and start learning
      </Typography>
      {/* <div className="btnContainer">
        <span style={{ display: "flex", gap: "1rem" }}>
          <Button
            startIcon={<BsFilter />}
            className={classes.button}
            variant="outlined"
          >
            Filter
          </Button>
          <Button
            endIcon={<BiChevronDown />}
            className={classes.button}
            variant="outlined"
          >
            Most Popular
          </Button>
        </span>
        <div className="alignCenter">
          <Typography className="para">4 results</Typography>
        </div>
      </div> */}
      {/* // <Grid item xs={12} md={3} className="gridItem">
        // </Grid> */}
      <Grid container rowGap={0} columnGap={2} spacing={0}>
        {category &&
          category.map((item) => {
            return (
              <CategoryCard category={item} key={item.slug} />
            )
          })}
      </Grid>
    </Container>
  );
};

export default Categories;
