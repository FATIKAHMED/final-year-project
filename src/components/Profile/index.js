// // * Libraries
// import React, { useEffect, useState, useRef } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import Tippy from '@tippyjs/react';

// // * Components
// import { IconButton, Button, Container, Card, CardHeader, CardContent, Popover } from "@material-ui/core";

// // * Icons
// import { BiChevronDown } from 'react-icons/bi'
// import { BsCaretDownFill } from "react-icons/bs";

// const useStyles = makeStyles((theme) => ({
//     wrapper: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         transition: 'all 0.2s ease',
//         padding: '7px 15px',
//         borderRadius: "10px",
//         "&:hover": {
//             backgroundColor: theme.palette.background.hover,
//             cursor: "pointer",
//         },
//         "& .name": {
//             color: theme.palette.text.primary,
//             fontSize: "12px",
//             fontWeight: "500",
//             marginRight: "5px",
//         },
//         "& svg": {
//             color: theme.palette.text.primary,

//         },
//         "& .image": {
//             width: '40px',
//             borderRadius: '50%',
//             placeItems: "center",
//             objectPosition: "center",
//             marginRight: "10px"
//         },
//     }
// }));

// const Profile = () => {

//     const user = useSelector((state) => state.auth.user)
//     const { firstName, picture } = user
//     const classes = useStyles();

//     return (

//         <div aria-expanded="false" className={classes.wrapper}>
//             <img className="image" src={picture} alt='user profile pic' />
//             <p className="name">{firstName}</p>
//             <BsCaretDownFill />
//         </div>

//     )
// }

// export default Profile
