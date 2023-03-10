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
    //  IoCartOutline, 
    IoNotificationsOutline
} from 'react-icons/io5'
// import { VscUnlock } from 'react-icons/vsc'

const useStyles = makeStyles((theme) => ({

    svg: {
        color: theme.palette.text.primary,
    },
}));

const IconButtonNotification = ({ notifications }) => {
    const classes = useStyles()
    return (
        <IconButton>
            <Badge badgeContent={notifications} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} color="error">
                <IoNotificationsOutline className={classes.svg} />
            </Badge>
        </IconButton>
    )
}

export default IconButtonNotification
