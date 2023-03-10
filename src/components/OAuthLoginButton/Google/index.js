import React from 'react'
import * as queryString from 'query-string';
import { InputLabel, FormGroup, IconButton } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";


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
            fontWeight: 600 + " !important",
            fontSize: '18px' + " !important",
            color: theme.palette.text.link_sec,
            margin: 0 + " !important",
            padding: 0 + " !important",
            marginLeft: "12px" + " !important",

        }
    }

}))
const Index = () => {
    const classes = useStyles()


    const stringifiedParams = queryString.stringify({
        client_id: "227141246083-k2ljmp5trdglk5qgcjse8sneksfa5vtu.apps.googleusercontent.com",
        // client_id: window.env.GOOGLE_OAUTH_CLIENT_ID,
        redirect_uri: `${window.location.origin}/authenticate/google`,
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
    });


    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

    return (
        <IconButton className={classes.root} href={googleLoginUrl} variant='contained' >
            <GoogleSVG />
            <span className="title">Google</span>
        </IconButton >

    )
}

export default Index
