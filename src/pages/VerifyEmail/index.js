// * Libraries
import React, { useState, useEffect } from "react";
import { IconButton, Button, Container, Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { forgotPasswordAction, resetPasswordAction } from 'redux/actions'
import * as queryString from 'query-string';

// * Components
import TextField from "components/TextField"
import isEmpty from "utils/is-empty";
import { CircularProgress } from "@mui/material";
import { axiosDEF } from "utils/axios";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem 0"
    },
    card: {
        marginTop: '40px',
        "& .message": {
            textAlign: 'center',
            fontSize: '13px',
            // veryLightGray
            background: theme.palette.background.searchBg,
            padding: '20px',
            width: "70%",
            margin: "10px auto 20px",
            borderRadius: '6px',
        },
        "& .MuiCardHeader-root": {
            // veryLightGray6
            borderBottom: `1px solid ${theme.palette.border.gray9}`,
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
}));

const VerifyEmailPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false)
    const [emailToken, setEmailToken] = useState(null)

    useEffect(() => {
        const urlParams = queryString.parse(window.location.search);
        const { token } = urlParams
        if (token)
            setEmailToken(token)

    }, [])

    useEffect(() => {
        const verifyEmail = async () => {
            const res = await axiosDEF.get(`/api/account/register/verifyEmail/${emailToken}`)
            setLoading(false)

            if (res.status === 200) setSuccess(true)
            else setError(true)
        }
        if (!isEmpty(emailToken)) verifyEmail()
    }, [emailToken]);


    return (
        <Container>
            {loading &&
                <CircularProgress />
            }
            {success &&
                <div>
                    <h1>Your registration has been verified successfully. </h1>
                    <Link to='/'>Go to Home page</Link>
                </div>
            }
            {error && <h1>Your verification resulted in an error. Please contact the support for further info</h1>}
        </Container>
    )
}

export default VerifyEmailPage
