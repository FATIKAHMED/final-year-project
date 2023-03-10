// * Libraries
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, emptyCartAction, loginUser } from 'redux/actions'
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
// import MuiPhoneNumber from 'material-ui-phone-number';
// import axios from 'axios'

// * Validations
import validateRegisterInput from "validation/register"

// * Utilities
import isEmpty from "utils/is-empty"
import { ROLE } from "utils/constants"

// * Components
import {
    //  InputLabel,
    FormGroup,
    //   Button
} from '@material-ui/core'
import TextFieldPhoneNumber from "components/TextFieldPhoneNumber"
import TextField from "components/TextField"
// import FacebookLogin from "components/OAuthLoginButton/Facebook"
// import GoogleLogin from "components/OAuthLoginButton/Google"
import _Button from 'components/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '45px',
        gap: '80px'

    },
    formGroup: {
        width: '100%',
    },

    bannerInfo: {
        color: theme.palette.text.primary,
        marginTop: '20px',
        textAlign: 'center',

        "& .title": {
            marginBottom: "40px",
            fontWeight: 600,
            fontSize: '40px'

        },
        "& .para": {
            marginBottom: "25px",
            fontWeight: 300,
            fontSize: '18px'
        },
        "& .sub-para": {
            fontWeight: 300,
            fontSize: "15px",
            marginTop: "15px",
            "& a": {
                color: theme.palette.text.link_sec
            }

        }
    },
    socialAccountsContainer: {
        textAlign: "center",

        "& .title": {
            marginBottom: "40px",
            marginTop: "27px",
            fontWeight: 300,
            fontSize: '15px'
        },

        "& .social-container": {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",

        },
    },

    credentialsFormContainer: {
        textAlign: "center",

        "& .title": {
            marginBottom: "40px",
            marginTop: "40px",
            fontWeight: 300,
            fontSize: '15px'
        },

        "& .form-container": {
            textAlign: "left",
            width: '450px',
            margin: '0 auto',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            "& .button": {
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                borderRadius: "6px",
                background: theme.palette.background.gradient,
                width: "154px",
                height: "67px",
                margin: '0 auto',
                marginBottom: "30px",
                marginTop: "15px",


                "& span": {
                    fontWeight: 600,
                    fontSize: '18px',
                    color: theme.palette.background.paper,
                    textTransform: "capitalize"
                }
            },
            "& .redirect-para": {
                fontWeight: 300,
                fontSize: '15px',
                "& a": {
                    color: theme.palette.text.link_sec,
                    "&:hover": {
                        textDecoration: "underline"
                    }
                }
            }
        }
    }

}))

const Signup = () => {
    const { referralCode } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const history = useHistory();
    const classes = useStyles()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')
    const [company, setCompany] = useState('')
    const [job, setJob] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        // console.log("REFERREAL CODE GOT", referralCode)

        if (referralCode)
            localStorage.setItem('referralCode', referralCode)

    }, [referralCode])

    const handleClickRegisterSubmit = async () => {
        const fieldsInput = { firstName, lastName, email, businessName: company, businessJob: job, businessPhone: phoneNumber, password, confirmPassword, role: ROLE.BusinessAdmin }
        const { errors, isValid } = validateRegisterInput(fieldsInput);
        let formErrors = {}
        setLoading(true);

        // Check validation
        if (!isValid) {
            formErrors = errors
            setLoading(false);
            setErrors(formErrors);
            dispatch({
                type: "TOAST",
                payload: {
                    message: "Error in fields",
                    type: "error"
                },
            });
            return
        }

        try {
            const response = await dispatch(registerUser(fieldsInput))

            const { res, error } = response


            if (!isEmpty(error)) {
                if (error.status === 400) {
                    const { firstName, lastName, email, password, password2 } = error.data
                    formErrors = {
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword: password2
                    }
                    setErrors(formErrors);
                    dispatch({
                        type: "TOAST",
                        payload: {
                            message: "Error in fields",
                            type: "error"
                        },
                    });
                    setLoading(false);
                    return

                }
            }

            const payload = {
                email,
                password,
            };
            const { loginRes, loginErr } = await dispatch(loginUser(payload));
            if (loginErr || loginRes === null) {
                // console.log(loginErr, "ERROR");
                history.push("/login");
            }
            else {
                dispatch(emptyCartAction())
                // TODO: Get all courses from api 
                // TODO: Get all categories from api
                // TODO: Get subscription plans from api

                history.push("/");
            }


        } catch (error) {
            console.error("Unexpected behavior in registering user Conponent", error);
            setLoading(false);

            return
        }


        setErrors(formErrors);
        setLoading(false);

    }



    return (
        <div className={classes.container}>
            <div style={{ width: '550px' }}>

                <div className={classes.bannerInfo}>
                    <h1 className="title">Signup business</h1>
                </div>


                <div className={classes.credentialsFormContainer}>
                    <div className="form-container">
                        <FormGroup className={classes.formGroup}>

                            <TextField
                                label="First Name"
                                name="firstName"
                                type="text"
                                placeholder="John"
                                required
                                autoFocus
                                value={firstName}
                                onChange={(text) => setFirstName(text)}
                                style={{ background: "transparent" }}
                                error={!isEmpty(errors.firstName)}
                                errorText={errors.firstName}
                                disabled={loading}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                type="text"
                                placeholder="Doe"
                                required
                                value={lastName}
                                onChange={(text) => setLastName(text)}
                                style={{ background: "transparent" }}
                                error={!isEmpty(errors.lastName)}
                                errorText={errors.lastName}
                                disabled={loading}
                            />
                            <TextField
                                label="Email"
                                name="e-mail"
                                type="email"
                                placeholder="johndoe@email.com"
                                required
                                value={email}
                                onChange={(text) => setEmail(text)}
                                style={{ background: "transparent" }}
                                error={!isEmpty(errors.email)}
                                errorText={errors.email}
                                disabled={loading}
                            />
                            <TextField
                                label="Company"
                                name="company"
                                type="text"
                                placeholder=""
                                required
                                value={company}
                                onChange={(text) => setCompany(text)}
                                style={{ background: "transparent" }}
                                error={!isEmpty(errors.company)}
                                errorText={errors.company}
                                disabled={loading}
                            />
                            <TextField
                                label="Job Title"
                                name="job"
                                type="text"
                                placeholder=""
                                required
                                value={job}
                                onChange={(text) => setJob(text)}
                                style={{ background: "transparent" }}
                                error={!isEmpty(errors.job)}
                                errorText={errors.job}
                                disabled={loading}
                            />
                            <TextFieldPhoneNumber
                                onChange={(text) => setPhoneNumber(text)}
                                value={phoneNumber}
                                error={!isEmpty(errors.phoneNumber)}
                                errorText={errors.phoneNumber}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                disabled={loading}
                                placeholder=""
                                required
                                value={password}
                                passwordToggle={showPassword}
                                error={!isEmpty(errors.password)}
                                errorText={errors.password}
                                handlePasswordToggle={handleClickShowPassword}
                                onChange={(text) => setPassword(text)}
                            />
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                disabled={loading}
                                placeholder=""
                                required
                                value={confirmPassword}
                                passwordToggle={showPassword}
                                error={!isEmpty(errors.confirmPassword)}
                                errorText={errors.confirmPassword}
                                handlePasswordToggle={handleClickShowPassword}
                                onChange={(text) => setConfirmPassword(text)}
                            />
                        </FormGroup>
                        <_Button className="button" disabled={loading} onClick={handleClickRegisterSubmit}>Signup</_Button>
                        {/* <Button className="button" onClick={handleClickRegisterSubmit}>Signup</Button> */}
                        <p className="redirect-para">Already have an account? <Link to='/login'>Login now</Link></p>

                    </div>
                </div>

            </div>
        </div>)
}

export default Signup
