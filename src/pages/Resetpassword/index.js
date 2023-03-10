// * Libraries
import React, { useState, useEffect } from "react";
import { IconButton, Button, Typography, Container, Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { forgotPasswordAction, resetPasswordAction } from 'redux/actions'
import * as queryString from 'query-string';

// * Components
import TextField from "components/TextField"
import isEmpty from "utils/is-empty";
import resetPassword from "assets/resetPassword.svg";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem 0"
    },
    // card: {
    //     marginTop: '40px',
    //     "& .message": {
    //         textAlign: 'center',
    //         fontSize: '13px',
    //         // veryLightGray
    //         background: theme.palette.background.searchBg,
    //         padding: '20px',
    //         width: "70%",
    //         margin: "10px auto 20px",
    //         borderRadius: '6px',
    //     },
    //     "& .MuiCardHeader-root": {
    //         // veryLightGray6
    //         borderBottom: `1px solid ${theme.palette.border.gray9}`,
    //     },
    //     "& .courses": {
    //         display: "flex",
    //         flexDirection: "column",

    //         "& .course": {
    //             display: "inline-block",
    //             margin: "10px 12px 10px",
    //             "& p": {
    //                 fontSize: '12px'
    //             }
    //         }

    //     }
    // },
    imgWrapper: {
        marginTop: '4rem',

        "& img": {
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
            fontSize: '13px',
            // veryLightGray
            background: theme.palette.background.gray4,
        },
        "& .formWrapper": {
            maxWidth: "500px",
            "& .MuiInputLabel-root": {
            },
            "& .textField": {

            },
            "& .btn": {
                background: theme.palette.text.link_sec,
                border: `1px solid ${theme.palette.text.link_sec}`,
                borderRadius: "6px",
                color: "#fff",
                padding: "1rem 2rem",
                marginBottom: "1rem",
            },
        },

    },
}));

const ForgotpasswordPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector((state) => state.auth.user)

    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [resetToken, setResetToken] = useState(null)

    useEffect(() => {
        const urlParams = queryString.parse(window.location.search);
        const { token } = urlParams
        if (token)
            setResetToken(token)

    }, [])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickUpdatePassword = async () => {
        let errors = {}

        if (isEmpty(newPassword)) {
            errors.newPassword = 'Field is required'
        }
        if (isEmpty(confirmNewPassword)) {
            errors.confirmNewPassword = 'Field is required'
        }
        if (!isEmpty(newPassword) && !isEmpty(confirmNewPassword) && newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = 'Password does not match'
        }
        if (!isEmpty(errors)) {
            setErrors(errors)
            return
        }
        if (isEmpty(resetToken)) {
            // TODO: Global error dispatch token missing
            console.error("No token found", resetToken)
            dispatch({
                type: "TOAST",
                payload: {
                    message: "No token found",
                    type: "error"
                },
            });
            return
        }
        setLoading(true)

        const payload = { password: newPassword }
        const { res, error } = await dispatch(resetPasswordAction(resetToken, payload))

        setErrors({})
        setLoading(false)

        if (!isEmpty(res)) {
            // TODO: Global toast success
            dispatch({
                type: "TOAST",
                payload: {
                    message: "Password Updated Successfuly!",
                    type: "success"
                },
            });
            setNewPassword('')
            setConfirmNewPassword('')
            history.push('/login')
            return
        }

        if (error?.status === 400) {
            // TODO: Global toast error
            // console.log("RESET PASSWORD ERROR", error)
            let badrequestErrors = {}
            const { newPassword } = error.formErrors

            if (!isEmpty(newPassword))
                badrequestErrors.newPassword = newPassword

            if (!isEmpty(badrequestErrors)) {
                setErrors(badrequestErrors)
                dispatch({
                    type: "TOAST",
                    payload: {
                        message: "Bad Request Error!",
                        type: "error"
                    },
                });
            }

            return
        } else {
            // TODO: Global toast error
        }

    }

    return (
        <Container>
            <Grid container spacing={5} style={{ padding: "1rem 0" }}>
                <Grid item sm={5} style={{
                    // margin: "3rem 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}>
                    <div className={classes.imgWrapper}>
                        <img src={resetPassword} alt="reset password image" width={"100%"} />
                    </div>
                </Grid>
                <Grid item sm={7} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div className={classes.wrapper}>
                        <Typography className="title">Reset Password</Typography>
                        <Typography className="para">Choose a new and strong password and we will set it up as your password for future signin</Typography>
                        <div className="formWrapper">
                            {/* {success &&
                        <p className='message'>You will be recieving a password reset email shortly at <b>{email}</b></p>
                    } */}

                            <TextField
                                label="New password"
                                name="newpassword"
                                type={showPassword ? "text" : "password"}
                                disabled={loading}
                                placeholder=""
                                required
                                value={newPassword}
                                passwordToggle={showPassword}
                                error={errors.newPassword?.length > 0 && true}
                                errorText={errors.newPassword}
                                handlePasswordToggle={handleClickShowPassword}
                                onChange={(text) => setNewPassword(text)}
                                className="textField"
                            />
                            <TextField
                                label="Confirm new password"
                                name="confirmNewpassword"
                                type={showPassword ? "text" : "password"}
                                disabled={loading}
                                placeholder=""
                                required
                                value={confirmNewPassword}
                                passwordToggle={showPassword}
                                error={errors.confirmNewPassword?.length > 0 && true}
                                errorText={errors.confirmNewPassword}
                                handlePasswordToggle={handleClickShowPassword}
                                onChange={(text) => setConfirmNewPassword(text)}
                                className="textField"
                            />
                            <Button className="btn" onClick={handleClickUpdatePassword}>Submit</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>



        </Container>
    )
}

export default ForgotpasswordPage
