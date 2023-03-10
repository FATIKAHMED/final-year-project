import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    "@keyframes skeletonLoading": {
        "0%": {
            backgroundColor: "hsl(200, 20%, 70%)"
        },
        "100%": {
            backgroundColor: "hsl(200, 20%, 95%)"
        }
    },
    skeletonHeader: {
        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },
        width: "15rem",
        padding: ".3rem .2rem",
        "& .coursesContainer": {
            maxHeight: "20rem",
            overflowY: "auto",
            "& .course": {
                display: "flex",
                padding: "1rem 0",
                gap: "1rem",
                alignItems: "center",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                "& .avatar": {
                    // height: "5rem",
                    // width: "7rem",
                    height: "60px",
                    width: "60px",
                },
                "& .titlePriceCont": {
                    // width: "100%",
                    width: "75%",
                    // height: "4rem",
                    height: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    "& .title": {
                        // height: "1rem",
                        height: ".8rem",
                        maxWidth: "100%",
                    },
                    "& .price": {
                        // height: "1rem",
                        height: ".8rem",
                    },
                },
            },
        },
        "& .bottomContainer": {
            marginTop: "1rem",
            "& .price": {
                fontFamily: `${theme.typography.fontFamily} !important`,
                fontWeight: "700",
                fontSize: "18px",
                marginBottom: ".3rem",
            },
            "& .button": {
                fontFamily: `${theme.typography.fontFamily} !important`,
                borderRadius: 0,
                color: "white",
                padding: ".7rem 0",
                background: "rgb(47, 48, 97)",
                textTransform: "capitalize",
            },
        },
    },

}))
const CartDropDownPopoverSkeleton = () => {
    const classes = useStyles();
    return (
        <div className={classes.skeletonHeader}>
            <div className="coursesContainer">
                <div className="course">
                    <div className="avatar skeleton">
                    </div>
                    <div className="titlePriceCont">
                        <div className="title skeleton"></div>
                        <div className="price skeleton"></div>
                    </div>
                </div>

            </div>
            <div className="bottomContainer">
                <div className="price"></div>
                {/* <div className="button"></div> */}
            </div>
        </div>
    )
}

export default CartDropDownPopoverSkeleton
