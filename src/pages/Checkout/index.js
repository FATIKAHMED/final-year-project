// * Libraries
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DaPrepSVG from 'assets/DAPrep.js'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { emptyCartAction } from 'redux/actions'
import { ROLE } from "utils/constants";
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from "utils/misc";

// * Components
import DropdownPopover from 'components/DropdownPopover'
import ProfileDopdownPopover from 'components/ProfileDopdownPopover'
import StripeCheckoutWrapper from 'components/StripeCheckoutWrapper'
import CartItem from 'components/CartItem'
import {
    SwipeableDrawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Collapse,
    TextField,
    Button,
    Badge,
    Container
} from "@material-ui/core";
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

// * Icons
import { IoCartOutline, IoNotificationsOutline } from 'react-icons/io5'
import { VscUnlock } from 'react-icons/vsc'
import EmptyCartSvg from 'assets/EmptyCart.svg'
import EmptyCartPNG from 'assets/emptyCart.png'

const useStyles = makeStyles((theme) => ({
    emptyCart: {
        width: '300px',
    },
    courseTableHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemsInformer: {
        marginBottom: '15px',
        fontSize: '14px',
    },
    banner: {
        marginBottom: '30px',
        background: theme.palette.text.primary,
        color: theme.palette.common.white,
        padding: "40px"

    },
    noItemsinCart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        // padding: "10px",
        // borderRadius: '10px',
        margin: '50px 0',
        // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: 'center',
        "& .title": {
            margin: '10px 0 3px  0',
        }

    },

    cartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px',
        padding: "10px",
        margin: '10px 0',
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        // background: theme.palette.background.hover,

        "& .col1, & .col2, & .col3": {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: "10px"
        },
        "& .col1": {
            // border: "1px solid",
            padding: "10px",
            borderRadius: '0 20px 20px 0',
            // background: theme.palette.background.paper,

        },
        "& .image": {
            width: "70px",
            // height: "50px",
            borderRadius: "50%",
            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)",
            marginRight: '10px'
        },
        "& .info": {
            // display: 'flex',
            // justifyContent: 'flex-start',
            // alignItems: 'flex-start',
            // flexDirection: 'column',
        }
    },

}));

const Checkout = () => {
    const dispatch = useDispatch();
    const classes = useStyles()


    const cartCount = useSelector((state) => state.cart.unseenCounts.cart)
    const cartItemsArray = useSelector((state) => state.cart.lists.cart)
    const cartAmount = useSelector((state) => state.cart.credit.amount)

    const handleClickResetCart = () => {
        dispatch(emptyCartAction())
    }


    return (
        <div>
            <div className={classes.banner}>
                <Container>
                    <h1>Checkout</h1>
                </Container>
            </div>

            <Container>

                <div>
                    <h2>Enter your card information</h2>
                    <Elements stripe={stripePromise}>
                        <StripeCheckoutWrapper />
                    </Elements>

                </div>
                <div>
                    <h4>Order Details</h4>
                    <div className={classes.cart}>
                        {cartItemsArray.length > 0 && cartItemsArray.map((item, i) =>
                            <CartItem key={i} id={item.id} title={item.title} details={item} />
                        )}
                    </div>
                </div>
                <div>
                    <h4>Summary</h4>
                    <p>Original price: ${cartAmount}</p>
                    <p>Discounts: $0</p>
                    <hr />
                    <p>Total: ${cartAmount}</p>
                    <code>By completing your purchase you agree to these <a href="#">Terms of Service.</a></code>
                    {/* <Link to='/my-cart/'> */}
                    {/* </Link> */}
                </div>
            </Container>
        </div>
    )
}

export default Checkout
