//* Libraries
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//     SwipeableDrawer,
//     Divider,
//     IconButton,
//     List,
//     ListItem,
//     ListItemText,
//     Collapse,
//     TextField,
//     Button,
//     Badge,
//     Container
// } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';

import {
    //  useTheme,
    makeStyles
} from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import DaPrepSVG from 'assets/DAPrep.js'
import {
    useDispatch,
    //  useSelector 
} from "react-redux";
// import { useHistory } from "react-router-dom"
import { removeCartItemAction } from 'redux/actions'
// import { ROLE } from "utils/constants";
// import EmptyCartSvg from 'assets/EmptyCart.svg'
// import EmptyCartPNG from 'assets/emptyCart.png'

// * Components
// import DropdownPopover from 'components/DropdownPopover'
// import ProfileDopdownPopover from 'components/ProfileDopdownPopover'
// import Profile from 'components/Profile'

// * Icons
// import { IoCartOutline, IoNotificationsOutline } from 'react-icons/io5'
// import { VscUnlock } from 'react-icons/vsc'


const useStyles = makeStyles((theme) => ({


    cartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px',
        padding: "10px",
        margin: '20px 0',
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        // background: theme.palette.background.hover,

        "& .col1, & .col2, & .col3": {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: "10px"
        },
        "& .col1": {
            // border: "1px solid",
            padding: "10px",
            borderRadius: '0 20px 20px 0',
            // background: theme.palette.background.paper,

        },
        "& .image": {
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
            marginRight: '10px'
        },
        "& .info": {
            // display: 'flex',
            // justifyContent: 'flex-start',
            // alignItems: 'flex-start',
            // flexDirection: 'column',
        }
    },

}));

const CartItem = ({ id, title, details }) => {
    const dispatch = useDispatch();
    const classes = useStyles()
    // const cartCount = useSelector((state) => state.cart.unseenCounts.cart)
    // const { coverPhoto, slug, description, price } = details
    const { coverPhoto, description, price } = details


    const handleClickRemoveItem = () => {

        dispatch(removeCartItemAction(id, price))
    }

    return (
        <div className={classes.cartItem}>
            <div className="col1">
                <img className="image" src={coverPhoto} alt="course Img" />
                <div className="info">
                    <h4 className="title">{title}</h4>
                    <p className="desc">{ReactHtmlParser(description.contentHtml)}</p>
                </div>
            </div>
            <div className="col2">${price}</div>
            <div className="col3">
                <button onClick={handleClickRemoveItem}>Remove</button>
            </div>
        </div>
    )
}

export default CartItem
