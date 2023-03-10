import * as React from "react";
// import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, useTheme } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';

//* Assests
import noImg from "assets/no-img-available.png";
import isEmpty from "utils/is-empty";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.text.header,
        fontFamily: `${theme.typography.fontFamily} !important`,
        fontWeight: "600",
        marginBottom: "3px !important",
        fontSize: "1.2rem !important",
    },
    cardDesc: {
        //  maxWidth: "750px",
        maxWidth: "100%",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily: `${theme.typography.fontFamily} !important`,
        color: theme.palette.border.darkShadeGray,
        fontSize: "10px !important",
        lineHeight: "15px !important",
    },
    categoryCont: {
        display: "flex",
        marginBottom: "2.125rem",
        background: "white",
        alignItems: "center",
        borderRadius: "6px",
        minWidth: 270,
        maxWidth: 270,
        minHeight: 150,
        border: "1px solid transparent",
        transition: 'all .2s ease !important',
        "boxShadow": "0px 8px 16px 0px #6060601f !important",
        transform: "translateY(0)",
        "&:hover": {
            border: `1px solid ${theme.palette.text.link_sec}`,
            cursor: "pointer",
            // top: "-10px",
            transform: "translateY(-10px)",
        },
        [theme.breakpoints.down("1180")]: {
            maxWidth: "100%",
            flex: 1,
        }

    },
}));

export default function CategoryCard({ category }) {
    // const theme = useTheme();
    const { title, description, slug, img } = category;
    const classes = useStyles();
    const theme = useTheme();
    const [courseDetailUrl, setCourseDetailUrl] = React.useState(`/categories`);

    React.useEffect(() => {
        setCourseDetailUrl(`/categories/${slug}`);
    }, [slug]);

    return (
        <Card
            // sx={{
            //     display: "flex",
            //     marginBottom: "2.125rem",
            //     background: "white",
            //     alignItems: "center",
            //     borderRadius: "6px",
            //     minWidth: 270,
            //     maxWidth: 270,
            //     minHeight: 150,
            //     border: "1px solid transparent",
            //     transition: 'all .2s ease',
            // }}
            elevation={0}
            className={classes.categoryCont}
        >
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Link to={courseDetailUrl}>
                    <CardContent>
                        <Typography
                            component="div"
                            variant="h6"
                            className={classes.title}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.cardDesc}
                            component="div"
                        >
                            {!isEmpty(description) ? description : "Description Not Available"}
                            {/* Courses on chemical sciences and chemist labs stuff are here. Lorem ipsum dolar sit
                                Courses on chemical sciences and chemist labs stuff are here. Lorem ipsum dolar sit */}
                        </Typography>
                    </CardContent>
                </Link>
            </Box>
        </Card>
    );
}
