import React, {
    // useEffect,
    useState
} from 'react'
import GoogleLogin from 'react-google-login';
import {
    // InputLabel, FormGroup,
    IconButton
} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { authenticateAction } from 'redux/actions'
// import { BASE_URL } from 'utils/constants';
import { axiosDEF } from 'utils/axios';
import {
    useHistory,
    // useLocation 
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

// * Icons
import GoogleSVG from 'assets/googleSVG'

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.background.paper,
        borderRadius: '6px',
        boxShadow: '0px 8px 14px rgb(0 0 0 / 4%)',
        width: '200px',
        height: '50px',
        // padding: '15px 25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        "& .title": {
            // fontWeight: 600 + " !important",
            fontWeight: "600 !important",
            // fontSize: '18px' + " !important",
            fontSize: "18px !important",
            color: theme.palette.text.link_sec,
            margin: 0 + " !important",
            padding: 0 + " !important",
            // marginLeft: "12px" + " !important",
            marginLeft: "12px !important",

        }
    }

}))
const GoogleLoginButton = ({ setErrorMessageAlert, setSuccessMessageAlert }) => {
    const classes = useStyles()
    const history = useHistory()
    // let location = useLocation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    // const [setSuccess] = useState(false)

    const responseGoogleSuccess = async (response) => {
        setLoading(true)
        setErrorMessageAlert(null)
        setSuccessMessageAlert(null)

        try {
            const res = await axiosDEF.post(`/api/account/oauth`, { auth_type: 'google', token_id: response.tokenId })

            if (res.status === 200 || res.status === 201) {
                setLoading(false)
                setSuccess(true)
                setSuccessMessageAlert('Please wait while we authenticate...')
                dispatch(authenticateAction(res.data))
                history.push('/');
            }

        } catch (error) {
            // console.log("ERROR", error)
            // if (error.response.status === 400) {
            //     setErrorMessageAlert(error.response.data.message)
            // }
            setLoading(false)
            setSuccess(false)
            history.push('/login');
        }
    }
    const responseGoogleError = (error) => {
        // console.log("Google error", error);
    }

    return (
        <GoogleLogin
            autoLoad={false}
            clientId="227141246083-k2ljmp5trdglk5qgcjse8sneksfa5vtu.apps.googleusercontent.com"
            render={renderProps => (
                <IconButton className={classes.root} variant='contained' onClick={renderProps.onClick} disabled={renderProps.disabled || loading} >
                    <GoogleSVG />
                    {/* <span className="title">Google</span> */}
                    <span className="title">{loading ? "Loading... " : "Google"}</span>
                </IconButton >
            )}
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleError}
            cookiePolicy={'single_host_origin'}
            accessType='offline'
            prompt='consent'
        // responseType='code'
        // redirectUri={`${window.location.origin}/authenticate/google`}
        // uxMode="redirect"
        // isMobile={true}
        />
    )
}

export default GoogleLoginButton
