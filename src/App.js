// * Libraries
import { useEffect, useLayoutEffect } from 'react'
import { getCategoriesListAction, getStripeSubscriptionPlanAction, checkUserSessionAction, bootstrapAppApis } from 'redux/actions';
import { ThemeProvider } from '@material-ui/core/styles'
import { lightTheme } from 'utils/theme'
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from "react-router-dom";

// * Styling
import "App.css";

// * Router
import Router from './router'



function App() {
  const dispatch = useDispatch()
  // const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    const interval = setTimeout(() => {
      dispatch(bootstrapAppApis())
    }, 2000);
    return () => {
      clearTimeout(interval)
    }
  }, [])

  // console.log("location", location)
  // useEffect(() => {
  //   checkUserActiveSession()
  // }, [location]);

  useLayoutEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);


  const onVisibilityChange = async () => {
    let hidden, visibilityChange;

    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    }
    else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    }
    else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    if (!document[hidden])
      checkUserActiveSession()

  };

  const checkUserActiveSession = async () => {
    if (isAuthenticated) {
      await dispatch(checkUserSessionAction())
    }
  }


  return (
    <ThemeProvider theme={lightTheme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
