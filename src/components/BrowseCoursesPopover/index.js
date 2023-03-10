// * Libraries
import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
    Popover,
    //  Icon, Button
} from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        "&:hover": {
            cursor: "default",
        },
    },
    element: {
        fontSize: ".65rem",

        paddingRight: "8px",
        textTransform: "capitalize",
        fontWeight: "500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 20px",
        [theme.breakpoints.up("md")]: {
            fontSize: ".75rem",
        },
    },
    link: {
        "&:hover": {
            cursor: "pointer",
        },
    },
    popover: {
        pointerEvents: "none",
    },
    popoverContent: {
        pointerEvents: "auto",
        background: "white",
        borderRadius: "0",
        transform: "translateY(8px) !important",
    },

    popoverPaper: {
        display: "flex",
        flexDirection: "column",
        padding: "20px 30px 10px 30px",
        borderRadius: "5px",
        "& .link": {
            fontSize: ".65rem",
            // fontWeight: 600,
            // textTransform: "capitalize",
            margin: "0",
            width: "max-content",
            marginBottom: "15px",
            [theme.breakpoints.up("md")]: {
                fontSize: ".70rem",
            },
            "&::after": {
                content: '""',
                display: "block",
                width: 0,
                height: "2px",
                background: "blue",
                transition: "width .4s",
            },
            "&:hover::after": {
                width: "100%",
            },
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
    popoverPaperGrid: {
        display: "grid !important",
        gridTemplateColumns: "repeat(2,1fr)",
        gridColumnGap: "30px",
    },
}));

const PopoverMenu = ({ title = "Browse courses" }) => {

    const [openedPopover, setOpenedPopover] = useState(false);
    const popoverAnchor = useRef(null);

    const classes = useStyles();
    // const theme = useTheme();
    // const desktop = useMediaQuery(theme.breakpoints.up("lg"));

    const popoverEnter = ({ currentTarget }) => {
        setOpenedPopover(true);
    };

    const popoverLeave = ({ currentTarget }) => {
        setOpenedPopover(false);
    };

    return (
        <div className={classes.wrapper}>
            <span
                ref={popoverAnchor}
                aria-owns="mouse-over-popover"
                aria-haspopup="true"
                onMouseEnter={popoverEnter}
                onMouseLeave={popoverLeave}
                className={classes.element}
            ><p>{title}</p>
                {/* <IoChevronDownOutline
                    style={{
                        marginLeft: "8px",
                        position: "relative",
                        bottom: `${desktop ? "1px" : "0px"}`,
                    }}
                /> */}
                "^"
            </span>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.popoverContent,
                }}
                open={openedPopover}
                // open={true}
                // disableScrollLock
                anchorEl={popoverAnchor.current}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                elevation={2}
                PaperProps={{
                    onMouseEnter: popoverEnter,
                    onMouseLeave: popoverLeave,
                    //   classes: { root: classes.popoverPaper },
                }}
            >
                <div>
                    <ul>
                        <li>Course</li>
                        <li>Course</li>
                        <li>Course</li>
                    </ul>
                </div>
            </Popover>
        </div>
    );
};

export default PopoverMenu;