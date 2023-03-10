// * Libraries
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartAction, createCheckoutSessionAction } from "redux/actions";
import EmptyCartPNG from "assets/emptyCart.png";
import CourseInCartCard from "components/CourseInCartCard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "3rem 4rem",
    [theme.breakpoints.down(660)]: {
      padding: "3rem 1.5rem",
    },
    "& .title": {
      fontWeight: "500",
      fontSize: "25px",
    },
    "& .headerContainer": {
      display: "flex",
      gap: "1rem",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "1rem 0",
    },
    "& .bottomContainer": {
      display: "flex",
      gap: "1rem",
      justifyContent: "flex-end",
      alignItems: "center",
      margin: "1rem 0",
      "& .boldText": {
        fontWeight: "700",
      },
    },
  },
  button: {
    border: "1px solid #0000001A",
    background: "white",
    textTransform: "capitalize",
    fontSize: "1rem",
    "&:hover": {
      // gradientBlue
      border: `1px solid ${theme.palette.text.link_sec}`,
      color: theme.palette.text.link_sec,
    },
  },
  emptyCart: {
    width: "300px",
  },
  noItemsinCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // padding: "10px",
    // borderRadius: '10px',
    margin: "50px 0",
    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    "& .title": {
      margin: "10px 0 3px  0",
    },
  },
}));
const CartPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartCount = useSelector((state) => state.cart.unseenCounts.cart);
  const cartItemsArray = useSelector((state) => state.cart.lists.cart);
  const cartAmount = useSelector((state) => state.cart.credit.amount);
  const customerId = useSelector((state) => state.auth.user.stripe_customerId);
  const cartItemsId = cartItemsArray.map((item) => item.id);

  const handleClickResetCart = () => {
    dispatch(emptyCartAction());
  };

  const handleClickCheckout = async () => {
    await dispatch(
      createCheckoutSessionAction(customerId, null, "payment", cartItemsId)
    );
  };

  return (
    <>
      {cartItemsArray.length > 0 ? (
        <div className={classes.container}>
          <h1 className="title">Shopping Cart</h1>
          <div className="headerContainer">
            <Typography>
              {cartCount.toString()} {cartCount > 1 ? "Items" : "Item"} in cart
            </Typography>
            <Button
              onClick={handleClickResetCart}
              className={classes.button}
              variant="outlined"
            >
              Reset
            </Button>
          </div>
          {cartItemsArray.map((item, i) => (
            <CourseInCartCard
              key={i}
              id={item.id}
              title={item.title}
              details={item}
            />
          ))}
          <div className="bottomContainer">
            <Typography>
              Total Amount: <span className="boldText">${cartAmount.toFixed(2)}</span>
            </Typography>
            <Button
              onClick={handleClickCheckout}
              className={classes.button}
              variant="outlined"
            >
              Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.noItemsinCart}>
          <div className="col1">
            <img
              src={EmptyCartPNG}
              alt="empty cart"
              className={classes.emptyCart}
            />
            <div className="info">
              <h4 className="title">Your cart is empty</h4>
              <p className="desc">Lets add some courses!<Link to="/courses"> Add Now</Link></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
