// * Libraries
import React, {
  useState,
  //  useEffect,useRef
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Tippy from "@tippyjs/react";
import { logout, emptyCartAction } from "redux/actions";
import { useHistory } from "react-router-dom";

// * Components
import {
  Divider,
  //  Chip
} from "@material-ui/core";

// * Icons
import { BsCaretDownFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease",
    // padding: "7px 15px",
    padding: "7px 0 7px 15px",
    borderRadius: "10px",
    color: theme.palette.text.primary,
    [theme.breakpoints.between("960", "1024")]: {
      paddingLeft: "4px",
    },
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
}));

const ProfileDropdownPopover = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [instance, setInstance] = useState(null);
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

  function DropdownContent({ hide }) {
    return (
      <div className={classes.dropdownContainer}>
        <Link className="link-item" onClick={hide} to="/dashboard">
          Dashboard
        </Link>
        <Link className="link-item" onClick={hide} to="/my-courses">
          My Courses
        </Link>

        <Divider />

        <Link className="link-item " onClick={hide} to="/my-cart">
          Cart
          {/* //TODO: Dynamic connect cart items counter  */}
          {cartCount > 0 && (
            <div className="chip">{cartCount > 9 ? "9+" : cartCount}</div>
          )}
        </Link>
        <Link className="link-item" onClick={hide} to="/referral">
          Unlocks
          {unlocksCount > 0 && (
            <div className="chip">{unlocksCount > 99 ? "99+" : unlocksCount}</div>
          )}
        </Link>
        <Link className="link-item" onClick={hide} to="/my-orders">
          Orders
          {orderCount > 0 && (
            <div className="chip">{orderCount > 9 ? "9+" : orderCount}</div>
          )}
        </Link>
        <Link className="link-item" onClick={hide} to="/notifications">
          Notifications
          {unreadCount > 0 && (
            <div className="chip">{unreadCount > 9 ? "9+" : unreadCount}</div>
          )}
        </Link>

        <Divider />

        <Link className="link-item" onClick={hide} to="/account">
          Edit Profile
        </Link>

        {user.role != "Student" && (
          <Link className="link-item" onClick={hide} to="/account">
            Account Settings
          </Link>
        )}
        <Divider />

        <p className="link-item" onClick={hide} onClick={handleLogoutClick}>
          Logout
        </p>
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
      trigger="mouseenter click"
      appendTo="parent"
      // delay={100}
      interactive={true}
    >
      <div aria-expanded="false" className={classes.wrapper}>
        {picture && (
          <img className="image" src={picture} alt="user profile pic" width={"40px"} height={"40px"} />
        )}
        <p className="name">{firstName}</p>
        <BsCaretDownFill className="svg" />
      </div>
    </Tippy>
  );
};

export default ProfileDropdownPopover;
