import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

    anchor: {
        textDecoration: "none",
        // "width": "181px",
        "minHeight": "90px",
        "background": "#FFFFFF",
        "boxShadow": "0px 5px 18px rgba(0, 0, 0, 0.05)",
        "borderRadius": "4px",
        border: "1px solid transparent",
        "&:active, &:visited, &:link": {
            color: "#343434"
        },
        "&:hover": {
            border: `1px solid ${theme.palette.text.active}`,
        },
        "& .containerBox": {
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            padding: "1rem",
            [theme.breakpoints.between(960, 1100)]: {
                display: "block",
                padding: "0.75rem",
                height: "100%",
            },

        },
        "& .containerTitle": {
            // borderBottom: `1px solid ${theme.palette.text.active}`,
            width: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: theme.typography.fontFamily,
            fontWeight: "500",
            fontSize: "13px",
            lineHeight: "19px",
            color: theme.palette.text.headline,

        },
        "& .containerHeadline": {
            maxWidth: "150px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: theme.typography.fontFamily,
            fontSize: "10px",
            color: theme.palette.border.darkShadeGray,

        },

    }
}));
const CategoriesDropdownLink = ({ title, headline, slug }) => {
    const classes = useStyles();

    return (
        <Link to={`/categories/${slug}`} className={classes.anchor} >
            <span
                // style={{ display: "flex", flexDirection: "column" }}
                key={slug}
                className="containerBox"
            >
                <Typography
                    className="containerTitle"
                    variant="h6"
                    gutterBottom
                    component="div"
                >
                    {title}
                </Typography>
                <Typography
                    className="containerHeadline"
                    variant="caption"
                    display="block"
                    gutterBottom
                >
                    {headline != "" ? headline : "N/A"}
                    {headline != "" ? headline : "N/A"}
                </Typography>
            </span>
        </Link>
    );
};

export default CategoriesDropdownLink;
