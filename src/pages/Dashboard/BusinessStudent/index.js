// * Libraries
import React, { useEffect } from "react";
import { IconButton, Button, Container, Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import isEmpty from "utils/is-empty";
import { getBusinessDetailsAction, getMyBusinessCourseDetailsAction } from 'redux/actions'
import ReactHtmlParser from 'react-html-parser';

// * Utilities
import { toDateTime, getDisplayDate } from "utils/convertTime";

// * Components
import SubscriptionCard from 'components/SubscriptionCard'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem 0"
    },
    card: {
        marginBottom: '40px',
        "& .MuiCardHeader-root": {
            // veryLightGray6
            borderBottom: `1px solid ${theme.palette.border.gray9}`
        },
        "& .courses": {
            display: "flex",
            flexDirection: "column",

            "& .course": {
                display: "inline-block",
                margin: "10px 12px 10px",
                "& p": {
                    fontSize: '12px'
                }
            }

        }
    },
    info: {
        "& .profile-picture": {
            width: "50px",
            borderRadius: '50%',
        }
    },
    ordersHistory: {
        "& .orders": {
            display: "flex",
            flexDirection: "column",

            "& .order": {
                borderLeft: '5px solid rgba(178, 81, 223,.3)',
                paddingLeft: '20px',
                "& div": {
                    display: "flex",
                    marginBottom: '8px'
                },
                margin: "10px 12px 10px",
                "& p": {
                    fontSize: '12px'
                }
            }

        }
    }
}));

const Index = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const coursesBought = useSelector((state) => state.courses.bought)
    const myOrdersHistory = useSelector((state) => state.order.history)
    const userSubscription = useSelector((state) => state.subscription.subscription)
    const myBusinessCourses = useSelector((state) => {
        const businessCourses = state.business.businessCourseDetails.courses;
        const hasAccessCourses = [];

        if (!isEmpty(businessCourses)) {
            Object.entries(businessCourses).forEach(([key, value]) => {
                if (value.hasAccess === true) {
                    hasAccessCourses.push(state.courses.store.docs.filter(item => item._id === key)[0])
                }
            });

            return hasAccessCourses
        }

    })

    useEffect(async () => {
        await dispatch(getBusinessDetailsAction(user.business))
        await dispatch(getMyBusinessCourseDetailsAction(user.businessCourse))
    }, [])

    return (
        <>
            <Container>
                <div className={classes.container}>
                    <div className={classes.info}>
                        <img className="profile-picture" src={user.picture} alt="profile pic" />
                        <h1 className="title">Welcome, {user ? user.firstName : "User"}!</h1>
                        <p className="para">You will be learning alot today.</p>
                    </div>
                </div>
                <Card className={classes.card}>
                    <CardHeader title="My courses" />
                    <CardContent>

                        {isEmpty(myBusinessCourses) ?
                            <div className={classes.info}>
                                <h3 className="title">Looks like you don't have any courses yet.</h3>
                                <p className="para">Your admin will give you course access which will be shown here.</p>
                            </div>
                            :
                            <ul className="courses">
                                {myBusinessCourses.map(course =>
                                    <li className='course'>
                                        <Link to={`/courses/${course?.slug}/lessons`}>
                                            <div>
                                                <h3>{course?.title}</h3>
                                                <p>{ReactHtmlParser(course.description.contentHtml)}</p>
                                            </div>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        }
                    </CardContent>
                </Card>
                {/* <SubscriptionCard /> */}
                {/* <Card className={classes.card}>
                    <CardHeader title="My Orders" />
                    <CardContent>
                        {isEmpty(myOrdersHistory) ?
                            <>
                                <h3 className="title">You have no orders in your order history.</h3>
                                <p className="para">Buy courses to see your order purchase information here.</p>
                            </>
                            :

                            <div className={classes.ordersHistory}>
                                <ul className="orders">

                                    {myOrdersHistory.map(order =>
                                        <li key={order._id} className='order'>
                                            <div>
                                                <p>Invoice - {order.orderHash}</p>
                                            </div>
                                            <div>
                                                {order.type === 'subscription' ? <p>Subscription: {order.subscription?.title}</p> :
                                                    <ul>
                                                        <p>Course List - </p>
                                                        {order.course.map(course => <Link to={`/courses/${course.slug}`}><li>{course.title}</li></Link>)}
                                                    </ul>
                                                }
                                            </div>
                                            <div>
                                                <p>{getDisplayDate(order.createdAt.toString())}</p>
                                            </div>
                                            <div>
                                                <p>Total Price - ${order.amount}</p>
                                            </div>
                                            <div>
                                                <p>Payment Type - {order.paymentMethod}</p>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        }
                    </CardContent>
                </Card> */}
                <Card className={classes.card}>
                    <CardHeader title="My Unlocks" />
                    <CardContent>
                        <div className={classes.info}>
                            {user.unlocks === 0 || isEmpty(user.unlocks) ?
                                <>
                                    <h3 className="title">You don't have any unlocks yet.</h3>
                                    <Link to='/referral'>
                                        <p className="para">Learn more about unlocks</p>
                                    </Link>
                                </>
                                :
                                <>
                                    <h3 className="title">You have {user.unlocks.toString()} unlocks</h3>
                                    <p className="para">Learn more about unlocks</p>
                                </>
                            }
                        </div>
                    </CardContent>
                </Card>

            </Container>
        </>
    )
}

export default Index
