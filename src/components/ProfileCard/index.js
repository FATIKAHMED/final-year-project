import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";
// import Image from "assets/profileCardBg.png";
import Image from "assets/bgDashboard.svg";
// Import using relative path
import {
  useSelector,
  // useDispatch
} from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 525,
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    // verydarkPurple
    backgroundColor: theme.palette.background.verydarkPurple,
    color: theme.palette.common.white,
    padding: ".5rem 1.5rem",
    borderRadius: "6px",
    backgroundPositionY: "20px",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "2rem"
    },
    "& .MuiCardHeader-root": {
      padding: 0,
      paddingTop: "24px",
      paddingRight: "16px"
    },
    "& .MuiCardContent-root": {
      paddingTop: 0
    },
    "& .button": {
      textTransform: "capitalize",
      fontSize: "12px",
      textDecoration: "none",
      color: "#ffffffc4",
      padding: ".5rem 1.2rem",
      fontWeight: 300,
      borderRadius: "6px"
      // color: theme.palette.common.white

    },
    "& .divStyle": {
      display: "flex",
      gap: "1.5rem",
      alignItems: "center",
      [theme.breakpoints.down("400")]: {
        flexDirection: "column"
      },
      "& .large": {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    },
  },
}));

export default function ProfileCard() {
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Link to="/account" >
            <Button
              className="button"
              color="inherit"
              variant="outlined"
            >
              Edit Profile
            </Button>
          </Link>
        }
      />
      <CardContent>
        <div className="divStyle">
          <Avatar
            alt="avatar here"
            src={user.picture}
            aria-label="recipe"
            className="large"
          />
          <Typography variant="h6" color="inherit" component="h6">
            {`Welcome, ${user ? user.firstName : "User"}`}
            <Typography variant="body2" color="inherit" component="p">
              {user ? user.email : "No Email Available"}
            </Typography>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
