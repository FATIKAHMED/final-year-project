// * Libraries
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ROLE } from 'utils/constants';
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { getOrderHistoryAction, getCoursesList, getStripeSessionDetailsAction, subscribeUserToPlanAction } from 'redux/actions'
import * as queryString from 'query-string';
import isEmpty from "utils/is-empty"

const Subscription = () => {
    const location = useLocation()
    const userRole = useSelector((state) => state.auth.user.role);
    const userId = useSelector((state) => state.auth.user._id)
    const userSubscription = useSelector((state) => state.subscription.subscription)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(async () => {

        const handleUserSubscription = async (session_id) => {
            if (!isEmpty(session_id)) {
                const sessionResult = await dispatch(getStripeSessionDetailsAction(session_id))

                if (!isEmpty(sessionResult.res)) {
                    const subsriptionResult = await dispatch(subscribeUserToPlanAction(sessionResult.res))

                    if (!isEmpty(subsriptionResult.res)) {
                        history.push('/dashboard')
                    }

                }
            } else history.push('/subscription')
        }

        const urlQueryString = queryString.parse(location.search)
        const { session_id } = urlQueryString

        handleUserSubscription(session_id)


    }, []);
    return (
        <>
            Yay you are subscribed to the plan successfully, you will be redirected shortly.
        </>
    )
}

export default Subscription
