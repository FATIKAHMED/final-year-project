// * Libraries
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { emptyCartAction, logout, searchCourse } from "redux/actions";
import { TextField, Button, InputAdornment, IconButton, ListItemAvatar, Avatar, Badge } from "@material-ui/core";
import clsx from "clsx";

// * Components
import ProfileDopdownPopover from "components/ProfileDopdownPopover";
import IconButtonUnlock from "components/IconButtonUnlock";
import CategoriesDropdownPopover from "components/CategoriesDropdownPopover";
import CartDropdownPopover from "components/CartDropdownPopover";

// * Icons
import { BiSearch } from "react-icons/bi";
import Logo from "assets/logo.svg";




import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import { AiOutlineMenu } from "react-icons/ai";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CategoriesDropdownLink from "components/CategoriesDropdownLink";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { VscUnlock } from "react-icons/vsc";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles((theme) => ({
    svg: {
        color: theme.palette.text.primary,
    },
    leftLinksContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",

    },
    rightLinksContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
    },

    linkContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("960")]: {
            display: "none",
        },

        "& .subscribe": {
            // border: `1px solid ${theme.palette.text.active}`,
            background: theme.palette.background.searchBg,
            [theme.breakpoints.between("960", "1024")]: {
                marginRight: "0px !important",
            },
            "& a": {
                padding: "10px 0px",
                color: theme.palette.text.active,
            },
            "&:hover": {
                cursor: "pointer",
            },
        },
        "& .courses": {
            [theme.breakpoints.between("960", "1024")]: {
                marginRight: "5px",
            },
        },
        "& .link": {
            marginRight: "10px",
            borderRadius: "4px",

            "& .link-with-icon": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& .caret-svg": {
                    fontSize: "12px",
                    marginLeft: "6px",
                },
            },
            "&:hover a": {
                cursor: "pointer",
                // color: theme.palette.text.active,
            },
            "& a,& .categoriesCont": {
                // padding: "7px 10px",
                marginLeft: "8px",
                marginRight: "8px",
                color: theme.palette.text.primary,
                textDecoration: "none",
                display: "flex",
                fontSize: "15px",
                fontWeight: "400",
                [theme.breakpoints.between("960", "1024")]: {
                    padding: "0",
                    marginRight: "14px",
                },
            },
            "& svg": {
                fontSize: "22px",
            },
        },
    },
    signupButton: {
        background: theme.palette.background.gradient,
        textTransform: "capitalize",
        padding: "3px 6px",
        boxShadow: "none",
        "&:hover": {
            boxShadow: "none",
        },
    },
    signUpLink: {
        // marginLeft: "10px",
        // borderRadius: "4px",
        "&:hover": {
            backgroundColor: theme.palette.background.hover,
            cursor: "pointer",
            // borderBottom: "1px solid"
        },
        "& .signup": {
            padding: "7px 15px",
            color: `#fff !important`,
            textDecoration: "none",
            display: "flex",
            fontSize: "15px",
            fontWeight: "500",
        },
    },
    searchContainer: {
        borderRadius: "4px",
        [theme.breakpoints.between("960", "1024")]: {
            marginRight: "10px",
        },
    },
    searchFieldRoot: {
        background: theme.palette.background.searchBg,
        // border: `1px solid ${ theme.palette.text.link_sec }`,
        border: `1px solid #dde2e7`,
        color: theme.palette.text.primary,
        fontSize: "15px",
        fontWeight: "300",
        width: "100%",
        // width: "45px",
        height: "45px",
        borderRadius: "6px",
        transition: "all 0.4s ease",
        fontFamily: "Poppins",
        cursor: "pointer",
        flexDirection: "row-reverse",

        "& .MuiOutlinedInput-inputMarginDense": {},
        // "&:hover": {
        //   background: theme.palette.primary.light,
        // },
        "&:focus-within": {
            // iconGray
            border: `1px solid ${theme.palette.text.link_sec}`,
            cursor: "pointer"
        },
        "& ::placeholder": {
            // color: "#A6A1A1",
            // color: theme.palette.text.placeholder,
            color: theme.palette.text.primary,
        },
        "& fieldset": {
            borderRadius: "6px",
            border: "none",
        },
    },
    searchBarExpand: {
        // "& .MuiInputBase-root ": {
        //     width: "250px !important"
        // }
    },

    heroButtonContainer: {
        "& img": {
            width: "100px",
            position: "relative",
            top: "3px",
            marginRight: "10px",
        },
    },
    sectionDivider: {
        marginBottom: "10px",
    },
    menuDivider: {
        marginTop: "30px",
        "& .menu-name": {
            marginBottom: "5px",
            fontWeight: "500",
        },
        "& hr": {
            marginBottom: "10px",
        },
    },
    iconButton: {
        padding: '0 8px',
        "&:hover": {
            background: 'none'
        },
        "&:hover svg": {
            color: theme.palette.text.active
        },
        "&:focus-within": {
            background: 'none'
        },
        [theme.breakpoints.between("960", "1024")]: {
            padding: "0 4px",
        },
    },
    badgeRoot: {
        "& .MuiBadge-badge": {
            background: theme.palette.text.active,
            color: theme.palette.background.paper,
            fontSize: '10px'
        }

    },


    list: {
        width: 250,
        "& a": {
            color: "#343434 !important",
        }
    },
    fullList: {
        width: 'auto',
    },
}));

const MobileNavbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const category = useSelector((state) => state.category.all.docs);
    const user = useSelector((state) => {
        const isAuthenticated = state.auth.isAuthenticated;
        const role = state.auth.user.role;
        const unlocks = state.auth.user.unlocksLeft;
        const firstName = state.auth.user.firstName;
        const picture = state.auth.user.picture;
        return {
            isAuthenticated,
            role,
            unlocks,
            firstName,
            picture
        };
    });
    const cartCount = useSelector((state) => state.cart.unseenCounts.cart);
    const isSearchScreenMounted = location.pathname.includes("search");
    const { isAuthenticated, unlocks, firstName, picture } = user;

    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const [searchBarExpand, setSearchBarExpand] = useState(false);

    const handleSubmitSearch = async () => {
        setLoading(true);

        const { res, error } = await dispatch(searchCourse(search));

        if (res) {
            setSearch("");
            history.push(res);
        } else {
            history.push('/404');
        }


        setLoading(false);
    };


    const handleCatMenu = () => {
        setCatOpen(!catOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(emptyCartAction());
        history.push("/login");
    };



    const toggleDrawer = (val) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuOpen(val)
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                // [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
        >
            <List
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {/* <div className={clsx(classes.rightLinksContainer, classes.linkContainer)}> */}
                <ListItem button className="link">
                    <Link to="/login">Login</Link>
                </ListItem>
                <ListItem button
                    variant="contained"
                    classes={{ root: classes.signupButton }}
                    className={classes.signUpLink}
                >
                    <Link to="/signup" className="signup">signup</Link>
                </ListItem>
                <ListItem button className="link subscribe">
                    <Link to="/subscription">Subscribe</Link>
                </ListItem>
                {/* </div> */}
            </List>
            <Divider />

            <List>
                <ListItem button>
                    {/* {!isSearchScreenMounted && ( */}
                    <div className={classes.searchContainer} >
                        <TextField
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            // disableUnderline
                            disabled={loading}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && search.length > 0) {
                                    handleSubmitSearch();
                                }
                            }}
                            onFocus={() => { setSearchBarExpand(true) }}
                            onBlur={() => { setSearchBarExpand(false) }}
                            className={`${searchBarExpand ? classes.searchBarExpand : ""} `}
                            InputProps={{
                                classes: {
                                    root: classes.searchFieldRoot,
                                },
                                // disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment disabled={search.length > 0 ? false : true} position="start"
                                        onClick={() => {
                                            if (search.length > 0) {
                                                toggleDrawer(false)
                                                handleSubmitSearch();
                                            }
                                        }}
                                        onKeyDown={toggleDrawer(false)}
                                    >
                                        <BiSearch />
                                    </InputAdornment>
                                ),

                            }}
                            variant="outlined"
                            placeholder="Search courses"
                        />
                    </div>
                    {/* // )} */}
                </ListItem>
            </List>
            <Divider />
            <List
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <ListItem button>
                    <div className="link courses">
                        <Link to="/courses">Courses</Link>
                    </div>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleCatMenu}>
                    {/* <ListItemIcon>
                    </ListItemIcon> */}
                    <ListItemText primary="Categories" />
                    {catOpen ? <MdExpandLess /> : <MdExpandMore />}
                </ListItem>
                <Collapse in={catOpen} timeout="auto" unmountOnExit>
                    <List
                        component="div"
                        disablePadding
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        {category &&
                            category.slice(0, 10).map((category) => {
                                return (
                                    <ListItem key={category?.slug} button>
                                        <Link to={`/categories/${category?.slug}`}>
                                            <ListItemText primary={category?.title} />
                                        </Link>
                                    </ListItem>
                                );
                            })}
                        <ListItem button>
                            <Link to={`/categories`}>
                                <ListItemText primary="View All Categories" />
                            </Link>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon><AiOutlineMenu /></ListItemIcon>                        
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );
    const listAuthenticated = (anchor) => (
        <div
            className={clsx(classes.list, {
                // [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <img src={picture} height="100%" width='auto' alt="user profile" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={firstName} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    {/* {!isSearchScreenMounted && ( */}
                    <div className={classes.searchContainer} >
                        <TextField
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            // disableUnderline
                            disabled={loading}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && search.length > 0) {
                                    handleSubmitSearch();
                                }
                            }}
                            onFocus={() => { setSearchBarExpand(true) }}
                            onBlur={() => { setSearchBarExpand(false) }}
                            className={`${searchBarExpand ? classes.searchBarExpand : ""} `}
                            InputProps={{
                                classes: {
                                    root: classes.searchFieldRoot,
                                },
                                // disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment disabled={search.length > 0 ? false : true} position="start"
                                        onClick={() => {
                                            if (search.length > 0) {
                                                toggleDrawer(false)
                                                handleSubmitSearch();
                                            }
                                        }}
                                        onKeyDown={toggleDrawer(false)}
                                    >
                                        <BiSearch />
                                    </InputAdornment>
                                ),

                            }}
                            variant="outlined"
                            placeholder="Search courses"
                        />
                    </div>
                    {/* // )} */}
                </ListItem>
            </List>
            <Divider />
            <List
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <ListItem button>
                    <div className="link courses">
                        <Link to="/courses">Courses</Link>
                    </div>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem button onClick={handleCatMenu}>
                    {/* <ListItemIcon>
                    </ListItemIcon> */}
                    <ListItemText primary="Categories" />
                    {catOpen ? <MdExpandLess /> : <MdExpandMore />}
                </ListItem>
                <Collapse in={catOpen} timeout="auto" unmountOnExit>
                    <List
                        component="div"
                        disablePadding
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        {category &&
                            category.slice(0, 10).map((category) => {
                                return (
                                    <ListItem key={category?.slug} button>
                                        <Link to={`/categories/${category?.slug}`}>
                                            <ListItemText primary={category?.title} />
                                        </Link>
                                    </ListItem>
                                );
                            })}
                        <ListItem button>
                            <Link to={`/categories`}>
                                <ListItemText primary="View All Categories" />
                            </Link>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <ListItem button>
                    <div className="link courses">
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                </ListItem>
                <ListItem button>
                    <div className="link courses">
                        <Link to="/my-courses">My Courses</Link>
                    </div>
                </ListItem>
                <ListItem button className="link subscribe">
                    <Link to="/subscription">Subscribe</Link>
                </ListItem>
                <ListItem button>
                    <div className="link courses">
                        <Link to="/my-cart">Cart</Link>
                    </div>
                </ListItem>
                <ListItem button>
                    <div className="link courses">
                        <Link to="/referral">Unlocks</Link>
                    </div>
                </ListItem>
                <ListItem button>
                    <div className="link courses">
                        <Link to="/my-orders">Orders</Link>
                    </div>
                </ListItem>
                <ListItem button>
                    <div className="link courses">
                        <Link to="/notifications">Notifications</Link>
                    </div>
                </ListItem>
                <ListItem button>
                    <div className="link courses">
                        <Link to="/account">Edit Profile</Link>
                    </div>
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <div className="link courses">
                        <ListItemText primary="Logout" />
                    </div>
                </ListItem>
            </List>



        </div>
    );

    if (isAuthenticated) {
        return (
            <div className={classes.leftLinksContainer} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconButton className={classes.iconButton} onClick={toggleDrawer(true)} disableRipple >
                    <AiOutlineMenu />
                </IconButton>
                <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
                    {listAuthenticated()}
                </Drawer>
                <div className={classes.heroButtonContainer}>
                    <Link to="/">
                        <img src={Logo} alt="logo" width={100} height={"auto"} />
                    </Link>
                </div>
                <div>
                    <Link to="/referral">
                        <IconButton className={classes.root} disableRipple >
                            <Badge className={classes.badgeRoot} badgeContent={unlocks} anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }} >
                                <VscUnlock className={classes.svg} />
                            </Badge>
                        </IconButton>
                    </Link>
                    <Link to="/my-cart">
                        <IconButton className={classes.iconButton}>
                            <Badge className={classes.badgeRoot} badgeContent={cartCount} anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }} >
                                <IoCartOutline className={classes.svg} />
                            </Badge>
                        </IconButton>
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <div className={classes.leftLinksContainer} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <IconButton className={classes.root} onClick={toggleDrawer(true)} disableRipple >
                <AiOutlineMenu />
            </IconButton>
            <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
            <div className={classes.heroButtonContainer}>
                <Link to="/">
                    <img src={Logo} alt="logo" width={100} height={"auto"} />
                </Link>
            </div>
            <div>{/* className={clsx(classes.rightLinksContainer, classes.linkContainer)} */}
                <Button
                    variant="contained"
                    classes={{ root: classes.signupButton }}
                    className={classes.signUpLink}
                >
                    <Link to="/signup" className="signup">signup</Link>
                </Button>
            </div>
        </div>
    )


    // if (isAuthenticated /*&& role === ROLE.Student*/) {
    //     return (
    //         <>
    //             <div className={classes.leftLinksContainer}>
    //                 <div className={classes.heroButtonContainer}>
    //                     <Link to="/">
    //                         <img src={Logo} alt="logo" />
    //                     </Link>
    //                 </div>

    //                 <div className={classes.linkContainer}>
    //                     <div className="link courses">
    //                         <Link to="/courses">Courses</Link>
    //                     </div>
    //                     <CategoriesDropdownPopover />
    //                     {!isSearchScreenMounted && (
    //                         <div className={classes.searchContainer} >
    //                             <TextField
    //                                 value={search}
    //                                 onChange={(e) => setSearch(e.target.value)}
    //                                 disableUnderline
    //                                 disabled={loading}
    //                                 onKeyUp={(e) => {
    //                                     if (e.key === "Enter" && search.length > 0) {
    //                                         handleSubmitSearch();
    //                                     }
    //                                 }}
    //                                 onFocus={() => { setSearchBarExpand(true) }}
    //                                 onBlur={() => { setSearchBarExpand(false) }}
    //                                 className={`${searchBarExpand ? classes.searchBarExpand : ""} `}
    //                                 InputProps={{
    //                                     classes: {
    //                                         root: classes.searchFieldRoot,
    //                                     },
    //                                     startAdornment: (
    //                                         <InputAdornment disabled={search.length > 0 ? false : true} position="start"
    //                                             onClick={() => {
    //                                                 if (search.length > 0) {
    //                                                     handleSubmitSearch();
    //                                                 }
    //                                             }}
    //                                         >
    //                                             <BiSearch />
    //                                         </InputAdornment>
    //                                     ),
    //                                     // endAdornment: <InputAdornment position="start"><BiSearch /></InputAdornment>,
    //                                     // endAdornment: endIcon && value.length > 0 && (
    //                                     //   <InputAdornment position="end">{endIcon}</InputAdornment>
    //                                     // ),
    //                                 }}
    //                                 variant="outlined"
    //                                 placeholder="Search courses"
    //                             />
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>

    //             <div
    //                 className={clsx(classes.rightLinksContainer, classes.linkContainer)}
    //             >
    //                 <div className="link subscribe">
    //                     <Link to="/subscription">Subscribe</Link>
    //                 </div>
    //                 <Link to="/referral">
    //                     <IconButtonUnlock unlocks={unlocks} />
    //                 </Link>
    //                 <CartDropdownPopover count={cartCount} />
    //                 <ProfileDopdownPopover />
    //             </div>
    //         </>
    //     );

    // }

    // return (
    //     <>
    //         <div className={classes.leftLinksContainer}>
    //             <div className={classes.heroButtonContainer}>
    //                 <Link to="/">
    //                     <img src={Logo} alt="logo" />
    //                 </Link>
    //             </div>

    //             <div className={classes.linkContainer}>
    //                 <div className="link courses">
    //                     <Link to="/courses">Courses</Link>
    //                 </div>
    //                 <div className="link">
    //                     <CategoriesDropdownPopover />
    //                 </div>

    //                 {!isSearchScreenMounted && (
    //                     <div className={classes.searchContainer}>
    //                         <TextField
    //                             value={search}
    //                             onChange={(e) => setSearch(e.target.value)}
    //                             disableUnderline
    //                             disabled={loading}
    //                             onKeyUp={(e) => {
    //                                 if (e.key === "Enter" && search.length > 0) {
    //                                     handleSubmitSearch();
    //                                 }
    //                             }}
    //                             onFocus={() => { setSearchBarExpand(true) }}
    //                             onBlur={() => { setSearchBarExpand(false) }}
    //                             className={`${searchBarExpand ? classes.searchBarExpand : ""} `}
    //                             InputProps={{
    //                                 classes: {
    //                                     root: classes.searchFieldRoot,
    //                                 },
    //                                 startAdornment: (
    //                                     <InputAdornment position="start" disabled={search.length > 0 ? false : true} position="start" onClick={() => {
    //                                         if (search.length > 0) {
    //                                             handleSubmitSearch();
    //                                         }
    //                                     }}>
    //                                         <BiSearch />
    //                                     </InputAdornment>
    //                                 ),
    //                             }}
    //                             variant="outlined"
    //                             placeholder="Search courses"
    //                         />
    //                     </div>
    //                 )}
    //             </div>
    //         </div>

    //         <div className={clsx(classes.rightLinksContainer, classes.linkContainer)}>
    //             <div className="link subscribe">
    //                 <Link to="/subscription">Subscribe</Link>
    //             </div>
    //             <div className="link">
    //                 <Link to="/login">Login</Link>
    //             </div>
    //             <Button
    //                 variant="contained"
    //                 classes={{ root: classes.signupButton }}
    //                 className={classes.signUpLink}
    //             >
    //                 <Link to="/signup">signup</Link>
    //             </Button>
    //         </div>
    //     </>
    // );
};

export default MobileNavbar;
