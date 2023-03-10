// * Libraries
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'

// * Components
// import { Container } from '@material-ui/core'

// * Assets
import Logo from 'assets/logo.svg'
import FacebookSocial from 'assets/Facebook Social.svg'
import TwitterSocial from 'assets/Twitter Social.svg'
import InstagramSocial from 'assets/Instagram Social.svg'

const useStyles = makeStyles((theme) => ({

    cont: {
        background: theme.palette.background.footer,
    },
    footer: {
        // padding: "80px 5rem",
        // marginTop: "45px",
        // background: theme.palette.background.footer,
        padding: "60px 2rem",
        margin: "0 auto",
        color: theme.palette.text.iconGray,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: "1280px",
        [theme.breakpoints.down("900")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2rem",
        },

        "& .hero-logo-container": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            "& p": {
                marginTop: '10px',
                // fontWeight: 700,
                fontSize: '18px',
                marginBottom: '11px',
                // color: theme.palette.text.link_sec
            }
        },
        "& .sitemap": {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            [theme.breakpoints.down("850")]: {
                flexDirection: "column",
                // flexWrap: "wrap",
                gap: "2rem",
            },
            "& ul": {
                margin: 0,
                padding: 0,
                marginRight: "59px",


                "& li": {
                    listStyleType: 'none',
                    marginBottom: "8px"
                },
                "& .social-container": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "& img": {
                        marginRight: '14px'
                    }
                },


                "& a": {
                    fontWeight: 400,
                    fontSize: '15px',
                    color: theme.palette.text.iconGray,
                    "&:hover": {
                        color: theme.palette.text.link_sec,

                    }
                },
                "& .heading": {
                    fontWeight: 700,
                    fontSize: '18px',
                    marginBottom: '11px',
                    color: theme.palette.background.paper
                }
            },
            "& ul:last-child": {
                marginRight: "0px",
            },
        },
    },


}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.cont}>
            <div className={classes.footer}>
                <div className="hero-logo-container">
                    <img src={Logo} alt="logo" width={106} height={53} />
                    <p>&copy; {new Date().getFullYear()} Dentist Assistant Preperation, Inc.</p>
                </div>
                <div className="sitemap">
                    <ul>
                        <li className="heading">Company</li>
                        <li><Link>About us</Link></li>
                        <li><Link>Careers</Link></li>
                        <li><Link>Contact us</Link></li>
                        <li><Link>Help center</Link></li>
                    </ul>
                    <ul>
                        <li className="heading">Account</li>
                        <li><Link to="/signup">Create account</Link></li>
                        <li><Link to="/business-signup">Business account</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                    <ul>
                        <li className="heading">Further information</li>
                        <li><Link>Terms of service</Link></li>
                        <li><Link>Privacy policy</Link></li>
                        <li><Link>Copyright policy</Link></li>
                    </ul>
                    <ul>
                        <li className="heading">Follow us</li>
                        <li className='social-container'>
                            <a href="https://facebook.com/"><img src={FacebookSocial} alt="fb-social" width={"auto"} height={"auto"} /></a>
                            <a href="https://twitter.com/"><img src={TwitterSocial} alt="twitter-social" width={"auto"} height={"auto"} /></a>
                            <a href="https://instagram.com/"><img src={InstagramSocial} alt="instagram-social" width={"auto"} height={"auto"} /></a>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Footer;
