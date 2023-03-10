// * Libraries
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ROLE } from 'utils/constants';
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { getOrderHistoryAction, getCoursesList, getEnrolledCoursesList, getSubscriptionOfUserAction, getNotificationsAction } from 'redux/actions'
import * as queryString from 'query-string';
import isEmpty from "utils/is-empty"

// * Components
import StudentDashboard from './Student'
import BusinessAdminDashboard from './BusinessAdmin'
import BusinessStudentDashboard from './BusinessStudent'

const Dashboard = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const userRole = useSelector((state) => state.auth.user.role);
    const userId = useSelector((state) => state.auth.user._id)

    useEffect(() => {

        dispatch(getSubscriptionOfUserAction(userId))
        dispatch(getNotificationsAction(userId))
        dispatch(getOrderHistoryAction(userId))
        dispatch(getCoursesList(userId))
        dispatch(getEnrolledCoursesList(userId))

        if (!userRole || userRole === 'undefined') history.push("/");

    }, []);

    if (userRole === ROLE.Student || userRole === ROLE.BusinessAdmin) return <StudentDashboard {...props} />
    // else if (userRole === ROLE.SuperAdmin) return <StudentDashboard />
    // else if (userRole === ROLE.Manager) return <StudentDashboard />
    // else if (userRole === ROLE.BusinessAdmin) return <BusinessAdminDashboard {...props} />
    else if (userRole === ROLE.BusinessManager) return <BusinessAdminDashboard {...props} />
    else if (userRole === ROLE.BusinessStudent) return <BusinessStudentDashboard {...props} />
    else return <><div>You were not supposed to be here. Be gone!</div></>
}

export default Dashboard
