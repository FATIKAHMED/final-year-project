import {
  Avatar, Button,
  // Divider, Paper
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";

// * Icons
// import { BsCaretDownFill } from "react-icons/bs";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import IconButtonCart from "components/IconButtonCart";
import CartDropDownPopoverSkeleton from "components/CartDropDownPopoverSkeleton";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // gap: "1rem",
    gap: ".4rem",
    transition: "all 0.2s ease",
    // padding: "0 15px",
    borderRadius: "10px",
    color: theme.palette.text.primary,

    "&:hover": {
      // backgroundColor: theme.palette.background.hover,
      cursor: "pointer",
      color: theme.palette.text.active,
    },
  },
  tippyRoot: {
    "& .tippy-content": {},
  },
  cartDropdown: {
    width: "15rem",
    padding: ".3rem .2rem",
    "& .coursesContainer": {
      maxHeight: "20rem",
      overflowY: "auto",
      "& .course": {
        display: "flex",
        padding: "1rem 0",
        gap: ".5rem",
        alignItems: "center",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        "& .avatar": {
          height: "60px",
          width: "60px",
        },
        "& .title": {
          fontWeight: "700",
          fontFamily: `${theme.typography.fontFamily} !important`,
          fontSize: "16px",
          maxWidth: "100%",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        "& .price": {
          fontWeight: "500",
          fontSize: "14px",
          fontFamily: `${theme.typography.fontFamily} !important`,
        },
      },
    },
    "& .bottomContainer": {
      marginTop: "1rem",
      "& .price": {
        fontFamily: `${theme.typography.fontFamily} !important`,
        fontWeight: "700",
        fontSize: "18px",
        marginBottom: ".3rem",
      },
      "& .button": {
        fontFamily: `${theme.typography.fontFamily} !important`,
        borderRadius: 0,
        color: "white",
        padding: ".7rem 0",
        background: "rgb(47, 48, 97)",
        textTransform: "capitalize",
      },
    },
  },
  noItems: {
    padding: "1rem 1.5rem",
    textAlign: "center",
    "& a": {
      textDecoration: "none",
      // lightSkyBlue
      color: theme.palette.text.cardTitle,
      fontWeight: "500",
    },
  },
}));

const CartDropdownPopover = ({ count }) => {
  const classes = useStyles();
  const cartItemsArray = useSelector((state) => state.cart.lists.cart);
  const cartAmount = useSelector((state) => state.cart.credit.amount);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [])

  function DropdownContent({ hide }) {
    return (
      <>
        {count > 0 ? (
          <>
            {isLoading ? <CartDropDownPopoverSkeleton /> :
              <div className={classes.cartDropdown}>
                <div className="coursesContainer">
                  {cartItemsArray.map((course) => {
                    return (
                      <div className="course" key={Math.random() * 1000000}>
                        <Avatar
                          src={course.coverPhoto}
                          className="avatar"
                          variant="square"
                        />
                        <div>
                          <Typography className="title">{course.title}</Typography>
                          <Typography className="price">${course.price}</Typography>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bottomContainer">
                  <Typography className="price">Total: ${cartAmount.toFixed(2)}</Typography>
                  <Link to="/my-cart">
                    <Button fullWidth className="button">
                      Go To Cart
                    </Button>
                  </Link>
                </div>
              </div>
            }
          </>

        ) : (
          <>
            {isLoading ?
              <CartDropDownPopoverSkeleton />
              :
              <div className={classes.noItems}>
                <Typography>Your cart is empty!</Typography>
                <Link to="/courses">
                  <Typography>Lets add some courses</Typography>
                </Link>
              </div>
            }
          </>
        )}
      </>
    );
  }

  return (
    <Tippy
      className={classes.tippyRoot}
      content={<DropdownContent hide={false} />}
      //   onCreate={setInstance}
      placement="bottom"
      animation="shift-away"
      arrow={false}
      theme="light-border"
      trigger="mouseenter click"
      maxWidth="max-content"
      appendTo="parent"
      delay={100}
      interactive={true}
    >
      <Link to="/my-cart">
        <div aria-expanded="false" className={classes.wrapper}>
          <IconButtonCart cartCount={count} />
        </div>
      </Link>
    </Tippy>
  );
};

export default CartDropdownPopover;
