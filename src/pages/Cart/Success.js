// * Libraries
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ROLE } from 'utils/constants';
import { useHistory, useParams, useLocation, Link } from 'react-router-dom'
import { getOrderHistoryAction, getCoursesList, getStripeSessionDetailsAction, subscribeUserToPlanAction, emptyCartAction } from 'redux/actions'
import * as queryString from 'query-string';
import isEmpty from "utils/is-empty"
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import check from "assets/check.png"



const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 0",
        "& .imgBox": {
            marginBottom: ".5rem",
            "& img": {
                height: 140,
                width: 140,
            }
        },
        "& .title": {
            color: theme.palette.text.header,
            fontSize: "2.5rem",
            fontWeight: "bold"
        },
        "& .subTitle": {
            color: theme.palette.border.darkShadeGray,
            fontSize: "1rem",
            marginBottom: "2rem",
        },
        "& .redirectBtn": {
            color: "#fff",
            background: theme.palette.text.link_sec,
            fontSize: ".8rem",
            fontWeigth: 500,
            padding: ".8rem 1.5rem",
            borderRadius: "6px",
            textTransform: "capitalize"

        },
    }

}));

const Subscription = () => {
    const location = useLocation();
    const classes = useStyles();
    const userRole = useSelector((state) => state.auth.user.role);
    const userId = useSelector((state) => state.auth.user._id)
    const userSubscription = useSelector((state) => state.subscription.subscription)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(async () => {

        const handleUserBuying = async (session_id) => {
            if (!isEmpty(session_id)) {
                const sessionResult = await dispatch(getStripeSessionDetailsAction(session_id))

                // console.log("STRIPE_CART_SESSION_RESULT", sessionResult)
                if (!isEmpty(sessionResult.res)) {
                    dispatch(emptyCartAction())
                    // const subsriptionResult = await dispatch(subscribeUserToPlanAction(sessionResult.res))

                    // if (!isEmpty(subsriptionResult.res)) {
                    //     // history.push('/dashboard')
                    // }

                }
            }
            // else history.push('/subscription')
        }

        const urlQueryString = queryString.parse(location.search)
        const { session_id } = urlQueryString

        handleUserBuying(session_id)


    }, []);

    const handleRedirect = () => {
        history.push("/dashboard")
    }
    return (
        <Container className={classes.container}>
            <div className="imgBox">
                <img src={check} alt="checkImg" />
            </div>
            <Typography className="title">Success!</Typography>
            <Typography className="subTitle">Woohoo, your order has been completed successfully.</Typography>
            <Button className="redirectBtn" onClick={handleRedirect}>
                Go to dashboard
            </Button>
        </Container>
    )
}

export default Subscription
