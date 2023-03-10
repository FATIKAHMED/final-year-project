import React from 'react'
import {
    //  useTheme,
    makeStyles
} from "@material-ui/core/styles";

// * Components
import {
    // SwipeableDrawer,
    // Divider,
    IconButton,
    // List,
    // ListItem,
    // ListItemText,
    // Collapse,
    // TextField,
    // Button,
    Badge
} from "@material-ui/core";
// * Icons
import {
    IoCartOutline,
    // IoNotificationsOutline
} from 'react-icons/io5'
// import { VscUnlock } from 'react-icons/vsc'
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 8px',
        "&:hover": {
            background: 'none'
        },
        "&:hover svg": {
            color: theme.palette.text.active
        },
        "&:focus-within": {
            background: 'none'
        },
        [theme.breakpoints.between("960", "1024")]: {
            padding: "0 4px",
        },
    },
    badgeRoot: {
        "& .MuiBadge-badge": {
            background: theme.palette.text.active,
            color: theme.palette.background.paper,
            fontSize: '10px'
        }

    },

    svg: {
        color: theme.palette.text.primary,
    },
}));

const IconButtonCart = ({ cartCount }) => {
    const classes = useStyles()
    return (
        <IconButton className={classes.root}>
            <Badge className={classes.badgeRoot} badgeContent={cartCount} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} >
                <IoCartOutline className={classes.svg} />
            </Badge>
        </IconButton>
    )
}

export default IconButtonCart
