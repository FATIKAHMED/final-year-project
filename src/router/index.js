// * Libraries
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import * as queryString from "query-string";
import { axiosDEF, axiosJWT } from "utils/axios";
import { getCourseDetailsAction, checkCourseAccessAction } from "redux/actions";




// * Pages
// import Home from "pages/Home";
// import NotFound404 from "pages/404";
// import Search from "pages/Search";
// import Notification from "pages/Notification";
// import Login from "pages/Login";
// import Signup from "pages/Signup";
// import Referral from "pages/Referral";
// import Subscription from "pages/Subscription";
// import SubscriptionSuccess from "pages/Subscription/Success";
// import Pricing from "pages/Pricing";
// import Courses from "pages/Courses";
// import Dashboard from "pages/Dashboard";
// import MyCourses from "pages/MyCourses";
// import Orders from "pages/Orders";
// import Account from "pages/Account";
// import CourseLearn from "pages/CourseLearn";
// import Cart from "pages/Cart";
// import CartSuccess from "pages/Cart/Success";
// import Checkout from "pages/Checkout";
// import Reciept from "pages/Reciept";
// import Course from "pages/Courses/Course";
// import Categories from "pages/Categories";
// import Category from "pages/Categories/Category";
// import AuthenticateGoogle from "pages/Authenticate/Google";
// import AuthenticateFacebook from "pages/Authenticate/Facebook";
// import VideoLessons from "pages/VideoLessons";
// import Forgotpassword from "pages/Forgotpassword";
// import Resetpassword from "pages/Resetpassword";
// import BusinessSignup from "pages/BusinessSignup";
// import Employees from "pages/Employees";
// import CreateNewEmployee from "pages/Employees/CreateNew";
// import CreateNewUser from "pages/Users/CreateNew";
// import Users from "pages/Users";
// import VerifyEmail from "pages/VerifyEmail";


// * Components
import _ScrollToTop from "components/ScrollToTop";
import Layout from "components/Layout";
import VideoSectionLayout from "components/VideoSectionLayout";
import Loader from "components/Loader";



// * LAZYLOAD Pages
const Home = React.lazy(() => import('pages/Home'));
const NotFound404 = React.lazy(() => import('pages/404'));
const Search = React.lazy(() => import('pages/Search'));
const Notification = React.lazy(() => import('pages/Notification'));
const Login = React.lazy(() => import('pages/Login'));
const Signup = React.lazy(() => import('pages/Signup'));
const Referral = React.lazy(() => import('pages/Referral'));
const Subscription = React.lazy(() => import('pages/Subscription'));
const SubscriptionSuccess = React.lazy(() => import('pages/Subscription/Success'));
const Pricing = React.lazy(() => import('pages/Pricing'));
const Courses = React.lazy(() => import('pages/Courses'));
const Dashboard = React.lazy(() => import('pages/Dashboard'));
const MyCourses = React.lazy(() => import('pages/MyCourses'));
const Orders = React.lazy(() => import('pages/Orders'));
const Account = React.lazy(() => import('pages/Account'));
const CourseLearn = React.lazy(() => import('pages/CourseLearn'));
const Cart = React.lazy(() => import('pages/Cart'));
const CartSuccess = React.lazy(() => import('pages/Cart/Success'));
const Checkout = React.lazy(() => import('pages/Checkout'));
const Reciept = React.lazy(() => import('pages/Reciept'));
const Course = React.lazy(() => import('pages/Courses/Course'));
const Categories = React.lazy(() => import('pages/Categories'));
const Category = React.lazy(() => import('pages/Categories/Category'));
const AuthenticateGoogle = React.lazy(() => import('pages/Authenticate/Google'));
const AuthenticateFacebook = React.lazy(() => import('pages/Authenticate/Facebook'));
const VideoLessons = React.lazy(() => import('pages/VideoLessons'));
const Forgotpassword = React.lazy(() => import('pages/Forgotpassword'));
const Resetpassword = React.lazy(() => import('pages/Resetpassword'));
const BusinessSignup = React.lazy(() => import('pages/BusinessSignup'));
const Employees = React.lazy(() => import('pages/Employees'));
const CreateNewEmployee = React.lazy(() => import('pages/Employees/CreateNew'));
const CreateNewUser = React.lazy(() => import('pages/Users/CreateNew'));
const Users = React.lazy(() => import('pages/Users'));
const VerifyEmail = React.lazy(() => import('pages/VerifyEmail'));










function PrivateRoute({
  component: Component,
  isAuthenticated,
  screenLayout,
  ...children
}) {
  const slug = children.computedMatch.params.id;

  if (isAuthenticated === true) {
    // return
    if (screenLayout === "VideoSectionLayout") {
      return (
        <Suspense fallback={<Loader />}>
          <Route
            {...children}
            render={(props) => (
              <VideoSectionLayout>
                <Component {...props} />
              </VideoSectionLayout>
            )}
          />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<Loader />}>
          <Route
            {...children}
            render={(props) => (
              <Layout>
                <Component {...props} />
              </Layout>
            )}
          />
        </Suspense>
      );
    }
  }
  return <Redirect to="/login" />;
}

function UnAuthenticatedRoute({
  component: Component,
  isAuthenticated,
  screenLayout,
  ...children
}) {
  if (isAuthenticated === true) {
    return <Redirect to="/dashboard" />;
  }
  if (screenLayout === "VideoSectionLayout") {
    return (
      <Suspense fallback={<Loader />}>
        <Route
          {...children}
          render={(props) => (
            <VideoSectionLayout>
              <Component {...props} />
            </VideoSectionLayout>
          )}
        />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<Loader />}>
        <Route
          {...children}
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      </Suspense>
    );
  }
}

function NormalRoute({
  component: Component,
  screenLayout,
  ...children
}) {
  if (screenLayout === "VideoSectionLayout") {
    return (
      <Suspense fallback={<Loader />}>
        <Route
          {...children}
          render={(props) => (
            <VideoSectionLayout>
              <Component {...props} />
            </VideoSectionLayout>
          )}
        />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<Loader />}>
        <Route
          {...children}
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      </Suspense>
    );
  }
}

const RouterIndex = ({ ...rest }) => {
  const user = useSelector((state) => {
    const isAuthenticated = state.auth.isAuthenticated;
    const role = state.auth.user.role;
    return {
      isAuthenticated,
      role,
    };
  });
  const { isAuthenticated, role } = user;

  return (
    <Router>
      <_ScrollToTop>
        {/* <Layout> */}
        <Switch>
          {/* Public routes */}
          <NormalRoute exact path="/" component={Home} />
          <NormalRoute exact path="/search" component={Search} />
          <NormalRoute exact path="/courses" component={Courses} />
          <NormalRoute exact path="/pricing" component={Pricing} />
          <NormalRoute exact path="/courses/:id" component={Course} />
          <NormalRoute exact path="/categories" component={Categories} />
          <NormalRoute exact path="/categories/:id" component={Category} />
          <NormalRoute exact path="/404" component={NotFound404} />
          <NormalRoute exact path="/reciept" component={Reciept} />
          <NormalRoute exact path="/subscription" component={Subscription} />
          <NormalRoute exact path="/verifyEmail*" component={VerifyEmail} />

          {/* <Route exact path="/" render={() => <Home {...rest} />} /> */}
          {/* <Route exact path="/search" render={() => <Search {...rest} />} />
          <Route exact path="/courses" render={() => <Courses {...rest} />} />
          <Route exact path="/pricing" render={() => <Pricing {...rest} />} /> */}
          {/* <Route
            exact
            path="/courses/:id"
            render={() => <Course {...rest} />}
          /> */}
          {/* <Route
            exact
            path="/categories"
            render={() => <Categories {...rest} />}
          /> */}
          {/* <Route
            exact
            path="/categories/:id"
            render={() => <Category {...rest} />} />*/}
          {/* <Route exact path="/404" render={() => <NotFound404 {...rest} />} /> */}
          {/* <Route exact path="/:id" render={() => <Product {...rest} />} /> */}

          {/* Conditional routes */}
          <Route
            exact
            path="/authenticate/facebook*"
            render={() => {
              const urlParams = queryString.parse(window.location.search);

              if (urlParams.error || !urlParams.code)
                return <Redirect to="/login" />;
              else
                return (
                  <Layout>
                    <AuthenticateFacebook code={urlParams.code} />;
                  </Layout>
                );
            }}
          />
          <Route
            exact
            path="/authenticate/google*"
            render={() => {
              const urlParams = queryString.parse(window.location.search);
              if (urlParams.error || !urlParams.code)
                return <Redirect to="/login" />;
              else
                return (
                  <Layout>
                    <AuthenticateGoogle code={urlParams.code} />
                  </Layout>
                );
            }}
          />

          {/* UnAuthenticated user routes */}
          <UnAuthenticatedRoute
            exact
            path="/login"
            component={Login}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <UnAuthenticatedRoute
            exact
            path="/signup"
            component={Signup}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <UnAuthenticatedRoute
            exact
            path="/r/:referralCode"
            component={Signup}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <UnAuthenticatedRoute
            exact
            path="/reset-password/*"
            component={Resetpassword}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <UnAuthenticatedRoute
            exact
            path="/forgot-password"
            component={Forgotpassword}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <UnAuthenticatedRoute
            exact
            path="/business-signup"
            component={BusinessSignup}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          {/* Authenticated user routes */}
          <PrivateRoute
            exact
            path="/business-signup"
            component={BusinessSignup}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/courses/:id/lessons"
            component={VideoLessons}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/courses/:id/learn"
            component={CourseLearn}
            isAuthenticated={isAuthenticated}
            role={role}
            screenLayout="VideoSectionLayout"
          />
          <PrivateRoute
            exact
            path="/account"
            component={Account}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/subscription/success"
            component={SubscriptionSuccess}
            isAuthenticated={isAuthenticated}
            role={role}
          />

          <PrivateRoute
            exact
            path="/referral"
            component={Referral}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/my-courses"
            component={MyCourses}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/my-orders"
            component={Orders}
            isAuthenticated={isAuthenticated}
            role={role}
          />

          <PrivateRoute
            exact
            path="/notifications"
            component={Notification}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/my-cart"
            component={Cart}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/my-cart/success"
            component={CartSuccess}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/my-cart/checkout"
            component={Checkout}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/dashboard/employees"
            component={Employees}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/dashboard/employees/new"
            component={CreateNewEmployee}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/dashboard/users"
            component={Users}
            isAuthenticated={isAuthenticated}
            role={role}
          />
          <PrivateRoute
            exact
            path="/dashboard/users/new"
            component={CreateNewUser}
            isAuthenticated={isAuthenticated}
            role={role}
          />

          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
        {/* </Layout> */}
      </_ScrollToTop>
    </Router>
  );
};

export default RouterIndex;
