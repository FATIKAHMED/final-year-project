// * Libraries
import React, { useState } from "react";
import {
  // IconButton,
  Button,
  Container,
  Card,
  // CardActions,
  CardContent,
  Typography,
  Grid,
  Avatar,
  // LinearProgress,
  Box,
  Badge,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uploadUserProfilePictureAction, updateUserProfileAction, updatePasswordAction } from 'redux/actions'
import { styled } from "@mui/material/styles";
import PasswordStrengthBar from "react-password-strength-bar";

// * Components
import TextField from "components/TextField";
import isEmpty from "utils/is-empty";
import Image from "assets/profileCardBg.png"; // Import using relative path

//* icons
import { FiEdit2 } from "react-icons/fi";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  border: "1px solid #0000001A",
  boxShadow: "0px 4px 8px 0px #0000003B",
  cursor: "pointer",
  color: "black",
  backgroundColor: "white",
  padding: ".3rem",
}));

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "3rem 1rem",
    "& .containerWrapper": {
      [theme.breakpoints.down("960")]: {
        flexDirection: "column-reverse"
      },
    },
    "& .updateProfileCont": {
      [theme.breakpoints.down("480")]: {
        flexDirection: "column"

      },
    },
    "& .passwordWrapper,& .nameWrapper": {
      [theme.breakpoints.down("480")]: {
        width: "100%",
        flex: 1,
        maxWidth: "100%"

      },
    },
    "& .nameWrapper > div": {
      [theme.breakpoints.down("480")]: {
        marginBottom: "1rem"
      },
    },
    "& .nameWrapper:last-child > div": {
      [theme.breakpoints.down("480")]: {
        marginBottom: "1.5rem"
      },
    },
    "& h1": {
      fontWeight: "500",
      fontSize: "25px",
      marginBottom: "1rem",
    },
    "& .header": {
      fontWeight: "normal",
      fontSize: "15px",
      marginBottom: "1rem",
    },
    "& .avatar": {
      width: "60px",
      height: "60px",
    },
    "& .avatarTwo": {
      width: "100px",
      height: "100px",
      margin: "2rem 0",
    },
    "& .card": {
      borderRadius: "6px",
      margin: "1rem 0",
    },
    "& .padding": {
      padding: "3rem 1rem",
    },
    "& .justifyCenter": {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1rem",
    },
    "& .gap": {
      display: "flex",
      gap: "1rem",
      [theme.breakpoints.down("360")]: {
        flexDirection: "column",
        gap: ".5rem",
      },

    },
    "& .textCenter": { textAlign: "center" },
    "& .passwordCont": {
      display: "flex",
      alignItems: "flex-end",
      height: "50%",
      "& .font": {
        fontWeight: "300",
        fontSize: "12px",
        // seaGreen
        color: theme.palette.background.seaGreen,
      },
      "& .fontTwo": {
        fontWeight: "500",
        fontSize: "12px",
        // lightGray3
        color: theme.palette.border.gray3,
      },
    },
    "& .color": {
      // verydarkPurple
      background: theme.palette.background.verydarkPurple,
    },
    "& .profileCard": {
      backgroundImage: `url(${Image})`,
      backgroundSize: "cover",
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      flexDirection: "column",
      gap: "1rem",
    },
    "& .profileCardName": {
      fontWeight: "600",
      textTransform: "capitalize",
      fontSize: "25px",
      fontFamily: "Poppins",
      [theme.breakpoints.down("480")]: {
        fontSize: "18px",
      },
    },
    "& .profileCardEmail": {
      fontWeight: "normal",
      fontSize: "20px",
      fontFamily: "Poppins",
      [theme.breakpoints.down("480")]: {
        fontSize: "14px",
      },
    },
    "& .profileCardRole": {
      fontWeight: "normal",
      fontSize: "25px",
      fontFamily: "Poppins",
      [theme.breakpoints.down("480")]: {
        fontSize: "22px",
      },
    },
    "& .unlocksLink": {
      // gradientBlue
      color: theme.palette.text.link_sec,
      cursor: "pointer",
    },
  },
  button: {
    height: "min-content",
    textTransform: "capitalize",
    "&:hover": {
      // darkPurple
      background: theme.palette.background.purple,
      color: "white",
    },
  },
  cardRoot: {
    "& .MuiCardContent-root": {
      margin: 0,
      padding: 0,
    },
  },
}));

const Account = () => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const mobile = useMediaQuery(theme.breakpoints.down("480"));

  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadPicture, setUploadPicture] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    oldPasswordError: "",
    newPasswordError: "",
    confirmNewPasswordError: "",
  });
  const [userDetails, setUserDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture,
    uploadFile: null,
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const resetPasswordFields = () => {
    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    })
  }

  const handleClickUpdatePassword = async () => {
    setLoading(true);

    const payload = {
      prevPassword: password.oldPassword,
      newPassword: password.newPassword,
      userId: user._id,
    };
    const { res, error } = await dispatch(updatePasswordAction(payload));

    setLoading(false);

    if (!isEmpty(res)) {
      dispatch({
        type: "TOAST",
        payload: {
          message: "Password updated",
          type: "success"
        },
      })
      resetPasswordFields()
      return
    }

    if (!isEmpty(error)) {

      if (error?.status === 400) {

        let badrequestErrors = {};

        const { prevPassword, newPassword } = error.formErrors;

        if (!isEmpty(prevPassword)) badrequestErrors.oldPasswordError = prevPassword;

        if (!isEmpty(newPassword)) badrequestErrors.newPasswordError = newPassword;

        if (!isEmpty(badrequestErrors)) setError({ ...error, ...badrequestErrors });

        dispatch({
          type: "TOAST",
          payload: {
            message: "Error in fields",
            type: "error"
          },
        })

      }
      else {
        dispatch({
          type: "TOAST",
          payload: {
            message: "Error updating password",
            type: "error"
          },
        })
      }
      return;

    }


  };

  const validateDetails = () => {
    let firstNameError = "";
    let lastNameError = "";
    if (isEmpty(userDetails.firstName)) {
      firstNameError = "First name is required!";
    }
    if (isEmpty(userDetails.lastName)) {
      lastNameError = "Last name is required!";
    }
    if (firstNameError || lastNameError) {
      setError({
        ...error,
        firstNameError,
        lastNameError,
      });
      return false;
    }
    return true;
  };

  const validatePasswords = () => {
    let oldPasswordError = "";
    let newPasswordError = "";
    let confirmNewPasswordError = "";

    if (isEmpty(password.oldPassword)) {
      oldPasswordError = "Old password is required!";
    }
    if (isEmpty(password.newPassword)) {
      newPasswordError = "New password is required!";
    }
    if (isEmpty(password.confirmNewPassword)) {
      confirmNewPasswordError = "New password is required!";
    }
    if (
      !isEmpty(password.oldPassword) &&
      !isEmpty(password.newPassword) &&
      password.oldPassword === password.newPassword
    ) {
      newPasswordError = "Please input a new password";
    }
    if (password.newPassword.length <= 5)
      newPasswordError = "Must be atleast 5 characters long";

    if (
      !isEmpty(password.newPassword) &&
      !isEmpty(password.confirmNewPassword) &&
      password.newPassword !== password.confirmNewPassword
    ) {
      confirmNewPasswordError = "Password does not match";
    }
    if (oldPasswordError || newPasswordError || confirmNewPasswordError) {
      setError({
        ...error,
        oldPasswordError,
        newPasswordError,
        confirmNewPasswordError,
      });
      return false;
    }
    return true;
  };

  const passwordChangeHandler = () => {
    let isValid = validatePasswords();
    if (isValid) {
      handleClickUpdatePassword()
    }
  };

  const uploadProfilePicture = async (image) => {
    let data = new FormData();
    data.append("file", image);
    const response = await dispatch(uploadUserProfilePictureAction(data))
    return response.res
  }

  const updateUserDetails = async () => {
    let isValid = validateDetails();
    let profilePic = user.picture; // default

    if (isValid) {

      if (uploadPicture)
        profilePic = await uploadProfilePicture(userDetails.uploadFile)

      const data = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        picture: profilePic
      }
      await dispatch(updateUserProfileAction(user._id, data))
    }

  };

  const resetUserDetails = () => {
    setUserDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picture: user.picture,
      uploadFile: null,
    });
    setUploadPicture(false)
  };

  const upload = () => {
    document.getElementById("selectImage").click();
  };

  const newPictureHandler = async (e) => {
    e.preventDefault();
    let image = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(image);
    reader.onloadend = function (e) {
      setUserDetails({ ...userDetails, picture: reader.result, uploadFile: image });
      setUploadPicture(true)
    };
  };

  return (
    <Container>
      <div className={classes.container}>
        <h1>My Profile</h1>
        <Grid container spacing={6} className="containerWrapper">
          <Grid item xs={12} md={7}>
            <Card className="card" variant="outlined">
              <CardContent>
                <Typography className="header">Update Profile</Typography>
                <div className="justifyCenter">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={
                      <SmallAvatar alt="Edit Icon">
                        <FiEdit2 onClick={upload} />
                      </SmallAvatar>
                    }
                  >
                    <Avatar
                      className="avatar"
                      alt="User picture"
                      src={userDetails.picture}
                    />
                    <input
                      id="selectImage"
                      accept="image/*"
                      hidden
                      type="file"
                      onChange={newPictureHandler}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                    />
                  </Badge>
                </div>
                <Grid container spacing={2} className="updateProfileCont">
                  <Grid item xs={6} className="nameWrapper">
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={userDetails.firstName}
                      type="text"
                      disabled={loading}
                      placeholder=""
                      required
                      fullWidth
                      error={error.firstNameError}
                      errorText={error.firstNameError}
                      onChange={(text) => {
                        setError({
                          ...error,
                          firstNameError: text ? false : true,
                        });
                        setUserDetails({ ...userDetails, firstName: text });
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} className="nameWrapper">
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={userDetails.lastName}
                      type="text"
                      disabled={loading}
                      placeholder=""
                      required
                      fullWidth
                      onChange={(text) => {
                        setUserDetails({ ...userDetails, lastName: text });
                        setError({
                          ...error,
                          lastNameError: text ? false : true,
                        });
                      }}
                      error={error.lastNameError}
                      errorText={error.lastNameError}
                    />
                  </Grid>
                </Grid>

                <TextField
                  name="email"
                  label="Email"
                  value={user.email}
                  disabled={true}
                  fullWidth
                />
                <div className="gap">
                  <Button
                    onClick={resetUserDetails}
                    className={classes.button}
                    variant="outlined"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={updateUserDetails}
                    className={classes.button}
                    variant="outlined"
                  >
                    Update Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="card" variant="outlined">
              <CardContent>
                <Typography className="header">Update Password</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={8} className="passwordWrapper">
                    <TextField
                      label="Old Password"
                      name="oldPassword"
                      type={showPassword ? "text" : "password"}
                      disabled={loading}
                      placeholder=""
                      required
                      fullWidth
                      value={password.oldPassword}
                      passwordToggle={showPassword}
                      error={error.oldPasswordError}
                      errorText={error.oldPasswordError}
                      handlePasswordToggle={handleClickShowPassword}
                      onChange={(text) => {
                        setError({
                          ...error,
                          oldPasswordError: text ? false : true,
                        });
                        setPassword({ ...password, oldPassword: text });
                      }}
                    />
                    <TextField
                      label="New Password"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      disabled={loading}
                      placeholder=""
                      required
                      fullWidth
                      value={password.newPassword}
                      passwordToggle={showPassword}
                      error={error.newPasswordError}
                      errorText={error.newPasswordError}
                      handlePasswordToggle={handleClickShowPassword}
                      onChange={(text) => {
                        setError({
                          ...error,
                          newPasswordError: text ? false : true,
                        });
                        setPassword({ ...password, newPassword: text });
                      }}
                    />
                    {mobile && <Grid item sx={{ marginTop: "-25px", marginBottom: "10px" }}>
                      <Box className="passwordCont">
                        <Typography className="font">
                          Password Strength
                        </Typography>
                      </Box>
                      <PasswordStrengthBar
                        minLength={5}
                        password={password.newPassword} />
                    </Grid>}
                    <TextField
                      label="Confirm New Password"
                      name="confirmNewPassword"
                      type={showPassword ? "text" : "password"}
                      disabled={loading}
                      placeholder=""
                      required
                      fullWidth
                      value={password.confirmNewPassword}
                      passwordToggle={showPassword}
                      error={error.confirmNewPasswordError}
                      errorText={error.confirmNewPasswordError}
                      handlePasswordToggle={handleClickShowPassword}
                      onChange={(text) => {
                        setError({
                          ...error,
                          confirmNewPasswordError: text ? false : true,
                        });
                        setPassword({ ...password, confirmNewPassword: text });
                      }}
                    />
                  </Grid>
                  {!mobile && <Grid item xs={4}>
                    <Box className="passwordCont">
                      <Typography className="font">
                        Password Strength
                      </Typography>
                    </Box>
                    <PasswordStrengthBar
                      minLength={5}
                      password={password.newPassword} />
                  </Grid>}
                </Grid>
                <div className='gap'>
                  <Button
                    onClick={resetPasswordFields}
                    className={classes.button}
                    variant="outlined"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={passwordChangeHandler}
                    className={classes.button}
                    variant="outlined"
                  >
                    Update Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card
              classes={{ root: classes.cardRoot }}
              className="card color"
              elevation={0}
            >
              <CardContent>
                <div className="profileCard">
                  <Avatar
                    className="avatarTwo"
                    alt="User Picture"
                    src={user.picture}
                  />
                  <Box className="textCenter">
                    <Typography className="profileCardName">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography className="profileCardEmail">
                      {user.email}
                    </Typography>
                  </Box>
                  <Typography className="profileCardRole">
                    {user.role}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Card
              elevation={0}
              className="card padding textCenter"
              variant="outlined"
            >
              <CardContent>
                <Typography className="profileCardRole">
                  Unlock More Videos
                </Typography>
                <Link to="/referral">
                  <Typography className="unlocksLink profileCardEmail">
                    Get More Unlocks
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Account;

//  <Card className={classes.card}>
//   <CardHeader title="My Profile" />
//   <CardContent>
//     <ul>
//       <li>First name: {user.firstName}</li>
//       <li>Last name: {user.lastName}</li>
//       <li>Email: {user.email}</li>
//       <li>
//         Profile picture: <br />{" "}
//         <img width="100" src={user.picture} alt="profile picture" />
//       </li>
//     </ul>
//   </CardContent>
// </Card>

// <Card className={classes.card}>
//   <CardHeader title="Change Password" />
//   <CardContent>
//     <TextField
//       label="Old password"
//       name="oldpassword"
//       type={showPassword ? "text" : "password"}
//       disabled={loading}
//       placeholder=""
//       required
//       value={oldPassword}
//       passwordToggle={showPassword}
//       error={errors.oldPassword?.length > 0 && true}
//       errorText={errors.oldPassword}
//       handlePasswordToggle={handleClickShowPassword}
//       onChange={(text) => setOldPassword(text)}
//     />
//     <TextField
//       label="New password"
//       name="newpassword"
//       type={showPassword ? "text" : "password"}
//       disabled={loading}
//       placeholder=""
//       required
//       value={newPassword}
//       passwordToggle={showPassword}
//       error={errors.newPassword?.length > 0 && true}
//       errorText={errors.newPassword}
//       handlePasswordToggle={handleClickShowPassword}
//       onChange={(text) => setNewPassword(text)}
//     />
//     <TextField
//       label="Confirm new password"
//       name="confirmNewpassword"
//       type={showPassword ? "text" : "password"}
//       disabled={loading}
//       placeholder=""
//       required
//       value={confirmNewPassword}
//       passwordToggle={showPassword}
//       error={errors.confirmNewPassword?.length > 0 && true}
//       errorText={errors.confirmNewPassword}
//       handlePasswordToggle={handleClickShowPassword}
//       onChange={(text) => setConfirmNewPassword(text)}
//     />
//     <Button onClick={handleClickUpdatePassword}>Save changes</Button>
//   </CardContent>
// </Card>

// <Card className={classes.card}>
//   <CardHeader title="Invite your friends" />
//   <CardContent>
//     <Link to="/referral">
//       <Button>Unlock more videos</Button>
//     </Link>
//   </CardContent>
// </Card>
