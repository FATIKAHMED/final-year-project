// import React, { useEffect, useState } from 'react'
import React, { useState } from 'react'
import {
    IconButton,
    // InputLabel, FormGroup, 
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
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// * Icons
import FacebookSvg from 'assets/facebookSVG'

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
            // margin: 0 + " !important",
            margin: "0 !important",
            // padding: 0 + " !important",
            padding: "0 !important",
            // marginLeft: "12px" + " !important",
            marginLeft: "12px !important",

        }
    }

}))
const FacebookLoginButton = ({ setErrorMessageAlert, setSuccessMessageAlert }) => {
    const classes = useStyles()
    const history = useHistory()
    // let location = useLocation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const responseFacebook = async (response) => {
        setLoading(true)
        setErrorMessageAlert(null)
        setSuccessMessageAlert(null)

        // console.log("RESPONSE FACEBOOK", response)
        if (response.accessToken) {
            try {
                const res = await axiosDEF.post(`/api/account/oauth`, { auth_type: 'facebook', access_token: response.accessToken, userID: response.userID })

                if (res.status === 200 || res.status === 201) {
                    setLoading(false)
                    setSuccess(true)
                    setSuccessMessageAlert('Please wait while we authenticate...')
                    dispatch(authenticateAction(res.data))
                    history.push('/');
                }

            } catch (error) {
                // console.log("ERROR", error.response)

                if (error.response.status === 400) {
                    setErrorMessageAlert(error.response.data.message)
                }
                setErrorMessageAlert(error.response.statusText)

                setLoading(false)
                setSuccess(false)
                history.push('/login');
            }
        }
    }

    return (
        <FacebookLogin
            appId="1260746177759271"
            autoLoad={false}
            fields="name,email,picture"
            render={renderProps => (
                <IconButton className={classes.root} onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained'  >
                    <FacebookSvg />
                    <span className="title">Facebook</span>
                </IconButton>)
            }
            // isMobile={true}
            // onClick={() => console.log('component click')}
            callback={responseFacebook} />
    )
}

export default FacebookLoginButton
