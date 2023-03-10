// * Libraries
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { searchCourse } from "redux/actions";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import clsx from "clsx";

// * Components
import ProfileDopdownPopover from "components/ProfileDopdownPopover";
import IconButtonUnlock from "components/IconButtonUnlock";
import CategoriesDropdownPopover from "components/CategoriesDropdownPopover";
import CartDropdownPopover from "components/CartDropdownPopover";

// * Icons
import { BiSearch } from "react-icons/bi";
import Logo from "assets/logo.svg";

const useStyles = makeStyles((theme) => ({

    leftLinksContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    linkContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .link": {
            marginRight: "10px",
            "&:hover a": {
                cursor: "pointer",
                color: theme.palette.text.active,
            },
            "&.active a": {
                color: theme.palette.text.active,
            },

            "& a": {
                marginLeft: "8px",
                marginRight: "8px",
                color: theme.palette.text.primary,
                textDecoration: "none",
                display: "flex",
                fontSize: "12px",
                fontWeight: "300",
            },
        },
    },
}));

const BusinessSubNavbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const user = useSelector((state) => {
        const isAuthenticated = state.auth.isAuthenticated;
        const role = state.auth.user.role;
        const unlocks = state.auth.user.unlocksLeft;
        return {
            isAuthenticated,
            role,
            unlocks,
        };
    });
    const cartCount = useSelector((state) => state.cart.unseenCounts.cart);
    const { isAuthenticated, unlocks } = user;

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeLink, setActiveLink] = useState('dashboard')

    useEffect(() => {
        const activePathname = location.pathname.replace('/', '')
        // console.log("active", activePathname)
        setActiveLink(activePathname)
    }, [location])
    return (
        <>
            <div className={classes.leftLinksContainer}>
                <div className={classes.linkContainer}>
                    <div className={activeLink === 'dashboard' ? "link active" : "link"}>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                    <div className={activeLink.includes('employees') ? "link active" : "link"}>
                        <Link to="/dashboard/employees">Employees</Link>
                    </div>
                    <div className={activeLink.includes('users') ? "link active" : "link"}>
                        <Link to="/dashboard/users">Users</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BusinessSubNavbar;
