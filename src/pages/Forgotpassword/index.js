// * Libraries
import React, { useState, useEffect } from "react";
import {
    //  IconButton,
    Button, Container, Card, CardHeader, CardContent, Grid, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { forgotPasswordAction } from 'redux/actions'
import * as queryString from 'query-string';

// * Components
import TextField from "components/TextField"
import isEmpty from "utils/is-empty";
import forgotPassword from "assets/forgotPassword.svg";
import successPassword from "assets/successPassword.png";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "4rem 0"
    },
    imgWrapper: {
        marginTop: '4rem',

        "& img": {
            // maxHeight: "360px"
            maxHeight: "320px"
        },
    },
    wrapper: {
        maxWidth: "560px",
        marginTop: '4rem',
        "& .title": {
            fontSize: "2.5rem",
            color: theme.palette.text.header,
            fontWeight: "600",
            marginBottom: ".5rem"
        },
        "& .para": {
            fontSize: "1rem",
            color: theme.palette.border.darkShadeGray,
            marginBottom: "2rem"

        },
        "& .message": {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: ".5rem",
            textAlign: 'left',
            fontSize: '10px',
            // veryLightGray
            background: theme.palette.background.gray4,
        },
        "& .formWrapper": {
            maxWidth: "500px",
            "& .MuiInputLabel-root": {
            },
            "& .emailField": {

            },
            "& .btn": {
                background: theme.palette.text.link_sec,
                border: `1px solid ${theme.palette.text.link_sec}`,
                borderRadius: "6px",
                color: "#fff",
                padding: "1rem 2rem",
                marginBottom: "1rem",
            },
            "& .disabledBtn": {
                background: "lightgrey",
                border: `1px solid lightgrey`,
                pointerEvents: "none"
            },
        },
        // "& .MuiCardHeader-root": {
        //     // veryLightGray6
        //     borderBottom: `1px solid ${theme.palette.border.gray9}`
        // },
        // "& .courses": {
        //     display: "flex",
        //     flexDirection: "column",

        //     "& .course": {
        //         display: "inline-block",
        //         margin: "10px 12px 10px",
        //         "& p": {
        //             fontSize: '12px'
        //         }
        //     }

        // }
    },
}));

const ForgotpasswordPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user)
    useEffect(() => {
        const urlParams = queryString.parse(window.location.search);
        // console.log("URL PARAMS", urlParams)
    }, [])
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)

    const handleClickConfirmEmail = async () => {

        let errors = {}
        if (isEmpty(email)) {
            errors.email = 'Field is required'
        }

        if (!isEmpty(errors)) {
            setErrors(errors)
            return
        }
        setLoading(true)

        const { res, error } = await dispatch(forgotPasswordAction({ email }))

        setLoading(false)
        setErrors({})
        console.log("success", res)
        if (!isEmpty(res)) {
            // TODO: Global toast success
            setSuccess(true)
            return
        }

        if (error?.status === 400) {
            // TODO: Global toast error
            let badrequestErrors = {}
            const { email } = error.formErrors

            if (!isEmpty(email))
                badrequestErrors.email = email

            if (!isEmpty(badrequestErrors))
                setErrors(badrequestErrors)

            return
        } else {
            // TODO: Global toast error
            if (!isEmpty(error.formErrors)) {
                const { email } = error.formErrors
                dispatch({
                    type: "TOAST",
                    payload: {
                        message: email,
                        type: "error"
                    },
                });
            }
        }

    }
    return (
        <Container>
            <Grid container spacing={5} style={{ padding: "3.5rem 0" }}>
                <Grid item sm={5} style={{
                    // margin: "3rem 0",
                    display: "flex", alignItems: "center", justifyContent: "flex-end"
                }}>
                    <div className={classes.imgWrapper}>
                        <img src={forgotPassword} alt="reset password image" width={"100%"} />
                    </div>
                </Grid>
                <Grid item sm={7} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div className={classes.wrapper}>
                        <Typography className="title">Forgot Password?</Typography>
                        <Typography className="para">No worries, just put in your email address below and will send you a password reset email in a minute</Typography>
                        <div className="formWrapper">
                            <TextField
                                label="Email"
                                name="email"
                                type='email'
                                disabled={loading}
                                placeholder="john@doe.com"
                                required
                                value={email}
                                error={errors.email?.length > 0 && true}
                                errorText={errors.email}
                                onChange={(text) => setEmail(text)}
                                className="emailField"
                            />
                            <Button className={`btn ${loading ? "disabledBtn" : ""}`} disabled={loading} onClick={() => handleClickConfirmEmail()}>Submit</Button>
                        </div>
                        {success &&
                            <div className='message'>
                                <img src={successPassword} alt="success" />
                                <span>
                                    You will be recieving a password reset email shortly at <b>{email}</b>
                                </span>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>
        </Container >



    )
}

export default ForgotpasswordPage
