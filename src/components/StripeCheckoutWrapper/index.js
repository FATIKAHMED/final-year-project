// * Libraries
// import { Link } from "react-router-dom";
import {
    useState,
    // useEffect
} from "react";
// import { useTheme, makeStyles } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import DaPrepSVG from 'assets/DAPrep.js'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { emptyCartAction, stripeIntentClientSecretAction, enrollUserInCourses } from 'redux/actions'
// import { ROLE } from "utils/constants";
import {
    //  Elements,
    useStripe, useElements
} from '@stripe/react-stripe-js';
// import { stripePromise } from "utils/misc";

// * Components
// import DropdownPopover from 'components/DropdownPopover'
// import ProfileDopdownPopover from 'components/ProfileDopdownPopover'
// import CartItem from 'components/CartItem'
import {
    // SwipeableDrawer,
    // Divider,
    // IconButton,
    // List,
    // ListItem,
    // ListItemText,
    // Collapse,
    // TextField,
    // Badge,
    // Container,
    Button,
} from "@material-ui/core";
import {
    CardElement,
    //  CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement 
} from '@stripe/react-stripe-js';

const StripeCheckoutWrapper = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    const cartItemsArray = useSelector(state => state.cart.lists.cart)
    const [loading, setLoading] = useState(false)

    const handlePaymentSubmit = async () => {

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const cardElement = elements.getElement(CardElement);


        try {

            setLoading(true);

            let obj = {
                items: cartItemsArray,
                currency: 'usd',
            };

            const { res, error } = await dispatch(stripeIntentClientSecretAction(obj))
            if (error) {
                // console.log("STRIPE_INTENT_CLIENT ERROR", error.response, obj)
            }
            if (res) {
                // console.log("STRIPE_INTENT_CLIENT_SECRET", res, cardElement)
                payWithCard(cardElement, res);

                setLoading(false);

            }
        }
        catch (error) {
            setLoading(false);

        }

    }
    const payWithCard = async (cardElement, intentResponse) => {
        // const response = await stripe.confirmCardPayment(intentResponse.clientSecret, {
        //     payment_method: {
        //         card: cardElement,
        //         billing_details: {
        //             name: user.firstName ? user.firstName : "Da Prep User",
        //         },
        //     }
        // });
        // console.log("payWithCard response", response)

        // const { res, error } = await dispatch(enrollUserInCourses(user._id, cartItemsArray, intentResponse.amount))
        const { res } = await dispatch(enrollUserInCourses(user._id, cartItemsArray, intentResponse.amount))
        // console.log("enrollUserInCourses response", res)

        if (res) {
            dispatch(emptyCartAction())
            history.push('/my-cart')
        }

    }
    return (
        <div>
            <CardElement />
            <Button disabled={loading || (!stripe || !elements)} variant="contained" onClick={handlePaymentSubmit}
            // disabled={!stripe}
            >Proceed with payment</Button>
        </div>
    )
}

export default StripeCheckoutWrapper
