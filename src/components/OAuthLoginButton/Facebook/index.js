import React from 'react'
import * as queryString from 'query-string';
import {
    //  InputLabel, FormGroup, 
    IconButton
} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";

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
            // fontWeight: 600 + "!important",
            fontWeight: "600 !important",
            // fontSize: '18px' + " !important",
            fontSize: "18px !important",
            color: theme.palette.text.link_sec,
            // margin: 0 + "!important",
            margin: "0 !important",
            // padding: 0 + " !important",
            padding: "0 !important",
            // marginLeft: "12px" + " !important",
            marginLeft: "12px !important",

        }
    }

}))
const Index = () => {
    const classes = useStyles()

    const stringifiedParams = queryString.stringify({
        client_id: "1260746177759271",
        // client_id: process.env.FACEBOOK_OAUTH_CLIENT_ID,
        redirect_uri: `${window.location.origin}/authenticate/facebook`,
        scope: ['email'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });

    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    return (
        <IconButton className={classes.root} href={facebookLoginUrl} variant='contained'  >
            <FacebookSvg />
            <span className="title">Facebook</span>
        </IconButton>

    )
}

export default Index
