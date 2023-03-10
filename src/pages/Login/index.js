import React, {
  useState,
  //  useEffect
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useStore, useSelector } from "react-redux";
import {
  // mockLoginStudent,
  // logout,
  loginUser,
  emptyCartAction,
  getSubscriptionOfUserAction,
  getCoursesList,
  getStripeConfigAction,
} from "redux/actions";
// import * as queryString from "query-string";

// * Components
import {
  // InputLabel,
  FormGroup,
  Button,
  // FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import TextField from "components/TextField";
import FacebookLogin from "components/OAuthLoginButton/Facebook";
// import GoogleLogin from "components/OAuthLoginButton/Google";
import isEmpty from "utils/is-empty";
import GoogleLoginButton from "components/GoogleLoginButton";
import FacebookLoginButton from "components/FacebookLoginButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: "45px 0",
    gap: "80px",
    [theme.breakpoints.down(500)]: {
      display: "block",
    },
  },
  formGroup: {
    width: "100%",
  },

  bannerInfo: {
    color: theme.palette.text.primary,
    marginTop: "20px",
    textAlign: "center",

    "& .title": {
      marginBottom: "40px",
      fontWeight: 600,
      fontSize: "40px",
    },
    "& .para": {
      marginBottom: "25px",
      fontWeight: 300,
      fontSize: "18px",
    },
    "& .sub-para": {
      fontWeight: 300,
      fontSize: "15px",
      marginTop: "15px",
      "& a": {
        color: theme.palette.text.link_sec,
      },
    },
  },
  socialAccountsContainer: {
    textAlign: "center",
    [theme.breakpoints.down(500)]: {
      "width": "82%",
      "margin": "0 auto",
      "marginBottom": "28px"
    },

    "& .success-message": {
      fontSize: "12px",
      color: "white",
      // bgSharpLightBlue
      background: theme.palette.background.sharpLightBlue,
      padding: "20px",
      margin: "20px auto",
      width: "50%",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    "& .error-message": {
      fontSize: "12px",
      color: "white",
      // softPink
      background: theme.palette.background.softPink,
      padding: "20px",
      margin: "20px auto",
      width: "50%",
      borderRadius: "5px",
    },

    "& .title": {
      marginBottom: "40px",
      marginTop: "27px",
      fontWeight: 300,
      fontSize: "15px",
    },

    "& .social-container": {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
      [theme.breakpoints.down(500)]: {
        flexDirection: "column",
        gap: "1rem"

      },

    },
  },
  credentialsFormContainer: {
    textAlign: "center",

    "& .title": {
      marginBottom: "40px",
      marginTop: "40px",
      fontWeight: 300,
      fontSize: "15px",
    },

    "& .form-container": {
      textAlign: "left",
      width: "450px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down(500)]: {
        width: "90%",
      },

      "& .button": {
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
        borderRadius: "6px",
        background: theme.palette.background.gradient,
        width: "154px",
        height: "67px",
        margin: "0 auto",
        marginBottom: "30px",
        marginTop: "15px",

        "& span": {
          fontWeight: 600,
          fontSize: "18px",
          color: theme.palette.background.paper,
          textTransform: "capitalize",
        },
      },
      "& .redirect-para": {
        fontWeight: 300,
        fontSize: "15px",
        "& a": {
          color: theme.palette.text.link_sec,
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
}));
const Login = () => {
  const classes = useStyles();
  const store = useStore();

  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessageAlert, setErrorMessageAlert] = useState(null);
  const [successMessageAlert, setSuccessMessageAlert] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessageAlert(null);
    setSuccessMessageAlert(null);
    setLoading(true);

    let thisErrors = {};

    if (isEmpty(email)) {
      thisErrors.email = "email is required";
    }
    if (isEmpty(password)) {
      thisErrors.password = "password is required";
    }
    if (!isEmpty(thisErrors)) {
      setErrors(thisErrors);
      dispatch({
        type: "TOAST",
        payload: {
          message: "Error In Fields!",
          type: "error"
        },
      });
    } else {
      const payload = {
        email,
        password,
      };

      const { res, error } = await dispatch(loginUser(payload));
      setLoading(false);

      if (error || res === null) {
        // console.log(error, "ERROR");
        setPassword("");
        setLoading(false);
        dispatch({
          type: "TOAST",
          payload: {
            message: "Invalid Credentials!",
            type: "error"
          },
        });
        return false;
      } else {
        setErrors({
          email: "",
          password: "",
        });
        dispatch(emptyCartAction());
        dispatch(getSubscriptionOfUserAction(res.user._id));
        dispatch(getCoursesList(res.user._id));
        dispatch(getStripeConfigAction());
        // TODO: Get all courses from api

        history.push("/dashboard");
      }
    }
    setLoading(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={classes.container}>
      <div style={{ maxWidth: "550px" }}>
        <div className={classes.bannerInfo}>
          <h1 className="title">Login</h1>
          {/* <p className="para">It’s time to start learning and moving toward where you want to be,
                        at your own pace, time and effort. </p> */}
        </div>

        <div className={classes.socialAccountsContainer}>
          {/* <h3 className="title">Continue with</h3> */}
          {errorMessageAlert && (
            <p className="error-message">{errorMessageAlert}</p>
          )}
          {successMessageAlert && (
            <p className="success-message">
              {" "}
              <CircularProgress size={15} color="white" /> {successMessageAlert}
            </p>
          )}
          <FormGroup className="social-container">
            {/* <GoogleLogin /> */}
            {/* <br /> */}
            {/* <FacebookLogin /> */}
            <FacebookLoginButton setSuccessMessageAlert={setSuccessMessageAlert} setErrorMessageAlert={setErrorMessageAlert} />
            <GoogleLoginButton
              setSuccessMessageAlert={setSuccessMessageAlert}
              setErrorMessageAlert={setErrorMessageAlert}
            />
          </FormGroup>
        </div>

        <div className={classes.credentialsFormContainer}>
          <h3 className="title">Or login with credentials</h3>
          <div className="form-container">
            <FormGroup className={classes.formGroup}>
              <TextField
                label="Email"
                name="e-mail"
                type="email"
                placeholder="johndoe@email.com"
                required
                autoFocus
                value={email}
                onChange={(text) => setEmail(text)}
                style={{ background: "transparent" }}
                error={errors.email.length > 0 && true}
                errorText={errors.email}
                disabled={loading}
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
                error={errors.password.length > 0 && true}
                errorText={errors.password}
                handlePasswordToggle={handleClickShowPassword}
                onChange={(text) => setPassword(text)}
                forgotPasswordHelper={true}
                forgotPasswordCallback={() => history.push("/forgot-password")}
              />
            </FormGroup>

            <Button
              className="button"
              variant="contained"
              onClick={handleLoginSubmit}
            >
              Login
            </Button>

            <p className="redirect-para">
              Don't have an account? <Link to="/signup">Sign up now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
