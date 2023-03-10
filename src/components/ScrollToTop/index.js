import React, { useEffect } from 'react';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // Link,
    useLocation,
    withRouter
} from 'react-router-dom'
function _ScrollToTop(props) {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return props.children
}
export default withRouter(_ScrollToTop)