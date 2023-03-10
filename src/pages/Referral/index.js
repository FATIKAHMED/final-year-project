// * Libraries
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton
} from "react-share";

// * Components
import {
  Tooltip,
  IconButton,
  Button,
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

// * Icons
import { AiOutlineMail } from "react-icons/ai";

import { GrFacebook, GrTwitter } from "react-icons/gr";

// * Assests
import bgWave from "assets/bgWave.png";
// import Image from "assets/Social_friends.png";
import Image from "assets/referralBg.svg";
import DashIcon from "assets/dashIcon.png";
import refIcon from "assets/icon.png";
import CopyToClipboardInput from "components/CopyToClipboardInput";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundImage: `url(${bgWave})`,
    backgroundRepeat: "no-repeat",
    marginTop: "-4px",
    backgroundPosition: "top",
    position: "absolute",
    // top: "1%",
    // left: "24%",
    backgroundSize: "contain",
    width: "100%",
    height: "100%",
  },
  container: {
    padding: "5rem 2rem",
    paddingTop: "9rem",
    [theme.breakpoints.down(740)]: {
      padding: "5rem 1.5rem",
    },
    [theme.breakpoints.down(400)]: {
      padding: "2rem 1rem",
    },
    "& .heroContainer": {
      [theme.breakpoints.down(740)]: {
        flexDirection: "column",
        "& .MuiGrid-root.MuiGrid-grid-xs-6": {
          margin: "0 auto",
          maxWidth: "90%"
        }
      },
      "& .imgCont": {
        width: "92%"
      },
      "& .img": {
        width: "100%",
        height: "auto",
      },
      "& .heading": {
        fontWeight: "600",
        fontSize: "35px",
        fontFamily: theme.typography.fontFamily,
        // darkestGray
        color: theme.palette.text.header,
        lineHeight: "2.5rem",
        marginBottom: "0.5rem",
      },
      "& .subHeading": {
        fontWeight: "300",
        fontSize: "18px",
        fontFamily: theme.typography.fontFamily,
        // darkestGray
        color: theme.palette.text.header,
      },
    },
    "& .referralContainer": {
      margin: "5rem auto",
      // padding: "0 10rem",
      maxWidth: "980px",
      [theme.breakpoints.down(400)]: {
        padding: "0",
      },
      "& .refHeading": {
        fontWeight: "500",
        fontSize: "20px",
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.header,
        marginBottom: "0.75rem",
      },
      "& .paper": {
        padding: "2rem 2.5rem",
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 8px 0px #0000000A",
        borderRadius: "6px",
        textAlign: "center",
        "& .title": {
          fontWeight: "600",
          fontSize: "16px",
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.text.statsTitle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: ".5rem",

        },
        "& .figure": {
          fontWeight: "500",
          fontSize: "35px",
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.text.stats,

        },
      },
    },
    "& .inviteContainer": {
      margin: "5rem auto",
      // padding: "0 12rem",
      maxWidth: "820px",
      [theme.breakpoints.down(400)]: {
        padding: "0",
      },
      "& .paper": {
        padding: "1rem",
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 8px 0px #0000000A",
        borderRadius: "6px",
        "& .heading": {
          fontWeight: "500",
          fontSize: "15px",
          fontFamily: theme.typography.fontFamily,
          marginTop: ".2rem",
          marginLeft: ".5rem",
        },
        "& .div": {
          margin: "2rem 2.5rem",
          textAlign: "center",
          [theme.breakpoints.down(520)]: {
            margin: "2rem .5rem",
          },
          "& .innerHeading": {
            fontWeight: "600",
            fontSize: "20px",
            fontFamily: theme.typography.fontFamily,
            marginBottom: "3rem",
          },
          "& .para": {
            fontSize: ".9rem",
          },
          "& .btnGrid": {
            // margin: "2rem 0",
            marginTop: "1.2rem",
            marginBottom: "2rem",
            gap: "1rem",
            "& .btn": {
              // darkPurple
              border: `1px solid ${theme.palette.background.purple} !important`,
              padding: "0 1rem !important",
              // darkPurple
              color: `${theme.palette.background.purple} !important`,
              textTransform: "capitalize",
              fontWeight: "400 !important",
              fontSize: "15px !important",
              height: "3rem",
              borderRadius: "6px",
              fontFamily: `${theme.typography.fontFamily} !important`,
              display: "inline-flex",
              alignItems: "center",
              gap: ".5rem",
              [theme.breakpoints.down(1160)]: {
                fontSize: "13px !important"
              },
              "&:hover": {
                // gradientBlue
                border: `1px solid ${theme.palette.text.link_sec}`,
                color: theme.palette.text.link_sec,
              },
              "& .span": {
                marginRight: ".3rem",
                display: "flex",
                alignSelf: "center",
                fontSize: "25px",
              },
            },
          },
          "& .orContainer": {
            // margin: "4rem 0",
            marginTop: "4rem",
            marginBottom: "4.5rem",
            "& h2": {
              // width: "100%",
              // margin: "10px 0 20px",
              textAlign: "center",
              // darkPurple
              borderBottom: `1px solid ${theme.palette.background.purple}`,
              lineHeight: "0.1em",
              // darkPurple
              color: theme.palette.background.purple,
              fontWeight: "400",
              fontSize: "1rem",
              width: "80%",
              margin: "0 auto"
            },
            "& h2 span": {
              // white
              background: theme.palette.common.white,
              // darkPurple
              color: theme.palette.background.purple,
              padding: "10px",
              // darkPurple
              border: `1px solid ${theme.palette.background.purple}`,
              borderRadius: "50%",
              fontSize: ".8rem",
            },
          },
        },
      },
    },
    "& .copyToClipboardContainer": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center",

      "& form": {
        [theme.breakpoints.down(520)]: {
          width: "100%",
        },
      },
      "& .MuiInputBase-root": {
        padding: "0.5rem 1rem !important",
        fontSize: ".9rem !important",
        fontFamily: theme.typography.fontFamily,
        [theme.breakpoints.down(600)]: {
          padding: "0.5rem .5rem !important",
        },
      }
    },
    "& .bonusActivityContainer": {
      margin: "5rem auto",
      // padding: "0 12rem",
      maxWidth: "820px",
      [theme.breakpoints.down(500)]: {
        padding: "0",
        "&:last-child td, &:last-child th": {
          paddingLeft: 0,
        },
      },
      "& .MuiTableCell-root": {
        border: 0
      },
      "& .MuiTableCell-head": {
        paddingRight: "4rem",
        paddingLeft: "4rem",
        borderBottom: "1px solid black",
        textAlign: "left",
        fontWeight: 600,
        [theme.breakpoints.down(700)]: {
          paddingLeft: "1.5rem",
          paddingRight: "0",
        },
      },
      "& .MuiTableCell-body": {
        paddingRight: "4rem",
        paddingLeft: "4rem",
        textAlign: "left",
        [theme.breakpoints.down(700)]: {
          paddingLeft: "1.5rem",
          paddingRight: "0",
        },
      },
      "& .paper": {
        padding: "1rem",
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 8px 0px #0000000A",
        borderRadius: "6px",
        "& .heading": {
          fontWeight: "500",
          fontSize: "15px",
          fontFamily: theme.typography.fontFamily,
          marginTop: ".2rem",
          marginLeft: ".5rem",
        },
        "& .div": {
          margin: "2.5rem 2.5rem",
          textAlign: "center",
          [theme.breakpoints.down(520)]: {
            margin: "2rem .5rem",
          },
          "& .innerHeading": {
            fontWeight: 600,
            fontSize: "20px",
            fontFamily: theme.typography.fontFamily,
            marginBottom: "2rem",
          },
        },
      },
    },
  },

  MuiTable: {
    // "&:first-child": {
    //   textDecoration: "line-through",
    // },
    "& .taskCompleted": {
      textDecoration: "line-through",
      color: theme.palette.border.gray3,
    },
  },
}));

const Referral = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const [copiedText, setCopiedText] = useState();
  const [referralLink, setReferralLink] = useState("");
  const [unlocksSummary, setUnlocksSummary] = useState([
    { title: "Unlocks Earned", figure: 0 },
    { title: "Unlocks Left", figure: 0 },
    { title: "Credits Earned", figure: 0 },
    { title: "Credits Left", figure: 0 }
  ])

  useEffect(() => {
    setReferralLink(`${window.location.origin}/r/${user.referralCode}`);
  }, []);

  useEffect(() => {
    setUnlocksSummary([
      { title: "Unlocks Earned", figure: user.unlocksEarned },
      { title: "Unlocks Left", figure: user.unlocksLeft },
      { title: "Credits Earned", figure: user.creditsEarned },
      { title: "Credits Left", figure: user.creditsLeft }
    ])
  }, [user])


  function createData(name, calories, type) {
    let complete = false

    if (type === 'verify' && user.isUserVerified) complete = true

    return { name, calories, complete };
  }

  const rows = [
    createData("Verify Your Registration", 10, 'verify'),
  ];

  return (
    <>
      <div className={classes.bg}></div>
      <Container className={classes.container}>
        <Grid
          justifyContent="center"
          alignItems="center"
          container
          spacing={2}
          className="heroContainer"
        >
          <Grid item xs={6}>
            <div className="imgCont">
              <img src={Image} className="img" alt="img here" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <img src={DashIcon} alt="dash icon here" />
            <Typography className="heading">
              Refer us and start earning points
            </Typography>
            <Typography className="subHeading">
              You can refer us to your friends and family members to collect
              unlocks points and watch more free videos
            </Typography>
          </Grid>
        </Grid>
        <Container className="referralContainer">
          <Typography gutterBottom className="refHeading">
            Track of referrals
          </Typography>
          <Paper elevation={0} className="paper">
            <Grid
              justifyContent="space-around"
              alignItems="center"
              container
              spacing={2}

            >
              {unlocksSummary.map((record) => {
                return (
                  <Grid item key={record?.title}>
                    <Typography className="title">
                      {record.title}
                      <img src={refIcon} />
                    </Typography>
                    <Typography className="figure">
                      {record.figure}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Container>
        <Container className="inviteContainer">
          <Paper elevation={0} className="paper">
            <Typography className="heading mtl">Invite Your Friends</Typography>
            <div className="div">
              <Typography className="innerHeading">
                Earn 10 unlock points per verified referral registration
              </Typography>
              <Typography className="para">Share your referral link</Typography>
              <Grid
                justifyContent="center"
                alignItems="center"
                container
                // spacing={2}
                className="btnGrid"
              >
                {/* <Grid xs={4}>*/}
                <EmailShareButton
                  url={referralLink}
                  subject={"Referral Link"}
                  separator=" "
                  className="btn"
                // body={"Referral Link for Course"}
                >
                  <span className="span">
                    <AiOutlineMail />
                  </span>
                  Share Via Email
                </EmailShareButton>
                {/* </Grid> */}
                {/* <Grid xs={4}> */}
                <FacebookShareButton
                  url={"https://da-prep-frontend.vercel.app/r/sweet-emu-45/"}
                  // url={referralLink}
                  quote={"Unlock Course Referral Link"}
                  hashtags={["daprep", "referral"]}
                  description={"Get Free 10 Unlocks to watch course "}
                  className="btn"
                >
                  <span className="span">
                    <GrFacebook />
                  </span>
                  Share Via Facebook
                </FacebookShareButton>
                {/* </Grid> */}
                {/* <Grid xs={4}> */}

                <TwitterShareButton
                  title={"Referal Code"}
                  url={referralLink}
                  hashtags={["learning", "course"]}
                  className="btn"
                >
                  <span className="span">
                    <GrTwitter />
                  </span>
                  Share Via Twitter
                </TwitterShareButton>

                {/* </Grid> */}
              </Grid>
              <div className="orContainer">
                <h2>
                  <span>OR</span>
                </h2>
              </div>
              <div className="copyToClipboardContainer">
                <Typography className="para">
                  Send your referral link by copying it below
                </Typography>
                <CopyToClipboardInput
                  link={user.referralCode}
                  refLink={referralLink}
                />
              </div>
            </div>
          </Paper>
        </Container>
        <Container className="bonusActivityContainer">
          <Paper className="paper" elevation={0}>
            <Typography className="heading">Bonus activites</Typography>
            <div className="div">
              <Typography className="innerHeading">
                Earn unlock points for every task completed
              </Typography>
              <TableContainer elevation={0} component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                  <TableHead >
                    <TableRow>
                      <TableCell colSpan={2}>Task</TableCell>
                      <TableCell align="right">Unlocks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        classes={{ root: classes.MuiTable }}
                      >
                        <TableCell colSpan={2} component="th" scope="row" className={row.complete ? `taskCompleted` : ''}>
                          {row.name}
                        </TableCell>
                        <TableCell align="right" className={row.complete ? `taskCompleted` : ''}>{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </Container>
      </Container>

    </>
  );
};

export default Referral;

// <>
//     <div className={classes.bannerContainer}>
//         <div className={classes.bannerInfo}>
//             <h1 className="title">Invite your friends to unlock more videos</h1>
//             <p className="para">For every friend that signs up and verifies their account, we'll give you 10 video unlocks.
//             </p>
//             <p className="para">If you'd like unlimited access, you can <Link to='/subscription'>subscribe</Link>.</p>
//         </div>
//     </div>

//     <Card className={classes.card}>
//         <CardHeader title="Invite your friends" />
//         <CardContent>
//             {/* <p>Share your referral link.</p>
//             <hr />
//             <p>OR</p>
//             <hr /> */}
//             <h3>Referral link</h3>
//             <p>Send your referral link directly to your friends by copying it below</p>
//             <CopyToClipboard
//                 text={referralLink}
//                 onCopy={() => setCopiedText(referralLink)}
//             >
//                 <Tooltip
//                     title={
//                         copiedText === referralLink
//                             ? "This was Copied!"
//                             : "Copy To Clipboard"
//                     }
//                     placement="top"
//                 >
//                 </Tooltip>
//             </CopyToClipboard>

//                     <Button>
//                         <FiLink size={20} style={{ marginRight: '8px' }} />
//                         <strong>{user.referralCode}</strong>
//                     </Button>
//         </CardContent>
//     </Card>
// </>
