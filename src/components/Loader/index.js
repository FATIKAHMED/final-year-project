import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    "@keyframes lds-ripple": {
        "0%": {
            top: "36px",
            left: "36px",
            width: 0,
            height: 0,
            opacity: 1,
        },
        "100%": {
            top: "0px",
            left: "0px",
            width: "72px",
            height: "72px",
            opacity: 0,
        }
    },
    container: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        "& .lds-ripple": {
            display: " inline-block",
            position: "relative",
            width: "80px",
            height: "80px",
            "& div": {
                position: "absolute",
                border: "4px solid #68AED0",
                opacity: 1,
                borderRadius: "50%",
                animation: "$lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
            },
            "& div:nth-child(2)": {
                animationDelay: "-0.5s",
            }
        },


    }
}));
const Loader = () => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
