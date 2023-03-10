// * Libraries
import React, {
    useState,
    //  useEffect,useRef
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Tippy from "@tippyjs/react";
import { logout, emptyCartAction, getFilteredCoursesList, getSortedCoursesList } from "redux/actions";
import { useHistory } from "react-router-dom";

// * Components
import {
    Divider,
    Button,
    //  Chip
} from "@material-ui/core";

// * Icons
import { BsCaretDownFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";


const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.2s ease",
        // padding: "7px 15px",
        // padding: "7px 0 7px 15px",
        borderRadius: "10px",
        color: theme.palette.text.primary,

        "&:hover": {
            // backgroundColor: theme.palette.background.hover,
            cursor: "pointer",
            color: theme.palette.text.active,
        },

        "& .name": {
            fontSize: "12px",
            fontWeight: "500",
            marginRight: "5px",
        },
        "& .svg": {
            fontSize: "12px",
            position: "relative",
            top: ".5px",
        },
        "& .image": {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            placeItems: "center",
            objectPosition: "center",
            marginRight: "10px",
        },
    },
    tippyRoot: {
        "& .tippy-content": {
            padding: "5px 0",
            minWidth: "200px",
        },
    },
    dropdownContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        "& hr": {
            width: "100%",
        },
        "& .link-item": {
            width: "100%",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            color: theme.palette.text.primary,
            fontWeight: "400",
            fontSize: "13px",

            "&:hover": {
                cursor: "pointer",
                color: theme.palette.text.active,
            },

            "&:hover .chip": {
                cursor: "pointer",
                color: theme.palette.text.active,
            },

            "& .chip": {
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: "9px",
                fontWeight: 600,
                borderRadius: "50%",
                background: theme.palette.text.active,
                border: `1px solid ${theme.palette.text.active}`,
                color: theme.palette.background.paper + " !important",
            },
        },
    },
    button: {
        border: "1px solid #0000001A",
        background: theme.palette.common.white,
        "&:hover": {
            // gradientBlue
            border: `1px solid ${theme.palette.text.link_sec}`,
            color: theme.palette.text.link_sec,
        },
        "paddingTop": "10px",
        "paddingBottom": "10px",
    },
}));

const CourseFilterDropdownPopover = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [instance, setInstance] = useState(null);
    const [isPopularSort, setIsPopularSort] = useState(true);
    const user = useSelector((state) => state.auth.user);
    const unreadCount = useSelector((state) => state.notification.unreadCount);
    const orderCount = useSelector((state) => state.order.totalCount);
    const cartCount = useSelector((state) => state.cart.unseenCounts.cart);
    const unlocksCount = useSelector((state) => state.auth.user.unlocksLeft);


    const { firstName, picture } = user;

    const handleLogoutClick = () => {
        dispatch(logout());
        dispatch(emptyCartAction());
        history.push("/login");
    };
    const handleHide = async (e, hide) => {
        hide()
        const sort = e.target.name
        const filtered = { sort, asc: true }
        const { res, error } = await dispatch(getSortedCoursesList(filtered));
        if (e.target.name === "popularity") {
            setIsPopularSort(true)
        }
        else if (e.target.name === "newest") {
            setIsPopularSort(false)
        }

    }

    function DropdownContent({ hide }) {
        return (
            <div className={classes.dropdownContainer}>
                <Link className="link-item" name="popularity" onClick={(e) => handleHide(e, hide)} >
                    Most Popular
                </Link>
                {/* <Link className="link-item" onClick={hide} >
                    Highest Rated
                </Link> */}
                <Link className="link-item" name="newest" onClick={(e) => handleHide(e, hide)}  >
                    Newest
                </Link>
            </div>
        );
    }

    return (
        <Tippy
            className={classes.tippyRoot}
            content={instance ? <DropdownContent hide={instance.hide} /> : ""}
            onCreate={setInstance}
            placement="bottom"
            animation="shift-away"
            arrow={false}
            theme="light-border"
            trigger=" click"
            appendTo="parent"
            // delay={100}
            interactive={true}
        >
            <div aria-expanded="false" className={classes.wrapper}>
                <Button
                    endIcon={<BiChevronDown />}
                    // size="small"
                    className={classes.button}
                    variant="outlined"
                >
                    {isPopularSort ? "Most Popular" : "Newest"}
                </Button>
            </div>
        </Tippy>
    );
};

export default CourseFilterDropdownPopover;
