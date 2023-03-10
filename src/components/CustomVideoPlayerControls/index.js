import React, { forwardRef } from 'react'
import { makeStyles, withStyles, styled, useTheme } from '@material-ui/core/styles';
import { BsFillPlayFill, BsPauseFill, BsFullscreen, BsFillVolumeUpFill, BsFillVolumeMuteFill, BsFillVolumeDownFill, } from "react-icons/bs";
import { toggleFullScreen } from 'utils/misc';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
//// import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import { getTimeStringFromSeconds } from "utils/convertTime";

const useStyles = makeStyles((theme) => ({
    controls: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        background: theme.palette.text.header,
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
    },

    controlsWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
    },
    controlIcons: {
        color: "#777",
        fontSize: 50,
        transform: "scale(0.9)",
        "&:hover": {
            color: "#fff",
            transform: "scale(1)",
        },
    },

    bottomIcons: {
        color: "#999",
        // minWidth: "40px",
        minWidth: "36px",
        padding: "0 .5rem",
        "&:hover": {
            color: "#fff",
        },
        [theme.breakpoints.down("600")]: {
            minWidth: "30px",
            padding: "0 0.2rem !important",
            fontSize: "1.2rem",
            "& p": {
                fontSize: ".6rem",
            },
        },
    },
    volumeSlider: {
        width: "3rem",
        minWidth: "2rem",
        color: "#4d9bd5",
        [theme.breakpoints.down("600")]: {
            width: "2rem",
        },
    },
    sliderCont: {
        flex: 1,
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "flexStart",
    },
    loaded: {
        // "left": "42px",
        // "maxWidth": "86%",
        "maxWidth": "100%",
        "height": "8px",
        "zIndex": "0",
        "position": "absolute",
        "background": "lightgrey",
        // "borderRadius": "0 6px 6px 0",
        "borderRadius": "6px ",

    },
    duration: {
        [theme.breakpoints.down("600")]: {
            fontSize: ".6rem !important",
            paddingTop: "3px !important",
        },
    }
}))

const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    minWidth: "max-content",
    color: "#fff",
});


//// function ValueLabelComponent(props) {
////     const { children, open, value } = props;

////     return (
////         <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
////             {children}
////         </Tooltip>
////     );
//// }

const PrettoSlider = withStyles({
    root: {
        height: 8,
        // flex: 1,
        // minWidth: "420px",
        //// width: "39rem",
        //// width: "42rem",
        zIndex: 2,
        "& .MuiSlider-root": {
            color: "#4D9BD5 !important",
        },
        "& .MuiSlider-rail": {
            opacity: 0.28
        },


        "& .MuiSlider-thumb": {
            width: 0,
            height: 0,
            borderRadius: 100,
            backgroundColor: "#4D9BD5",
            "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)"
            },
            "&:hover, &.Mui-focusVisible": {
                width: 20,
                height: 20,
            },
            "&.Mui-active": {
                width: 20,
                height: 20
            }
        },
        "& .MuiSlider-rail": {
            opacity: 0.28
        }

    },
    // thumb: {
    //     height: 0,
    //     width: 0,
    //     backgroundColor: "#fff",
    //     border: "2px solid currentColor",
    //     marginTop: -8,
    //     marginLeft: -12,
    //     transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    //     "&:focus, &:hover, &$active": {
    //         boxShadow: "inherit",
    //     },
    // },
    active: {},

    track: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "#4D9BD5",
    },
    rail: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "#7DA499",

    },
})(Slider);



const CustomVideoPlayerControls = forwardRef(({ isPlaying, mute, volume, playBackRate, played, duration, loaded, onMute, onPlayPause, onVolumeChange, onVolumeSeekUp, onPlayBackRateChange, onSeek, onSeekMouseUp, onSeekMouseDown }, ref) => {
    const theme = useTheme();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingBar, setLoadingBar] = React.useState(0);
    //// function formatDuration(value) {

    ////     const minute = Math.floor(value / 60);
    ////     let secondLeft = (value - minute * 60) * 100;
    ////     secondLeft = secondLeft.toFixed(0)
    ////     return `${minute}: ${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    //// }

    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;

    React.useEffect(() => {
        setLoadingBar(`${loaded}%`)

    }, [loaded])
    // useRef--> total width of slider - played/loaded

    //// const getDurationFormat = (played) => {
    ////     return (played).toFixed(2).replace(".", ":")
    //// }

    return (
        <div className={classes.controls} ref={ref}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            // gap="1rem"
            // style={{ padding: 16 }}
            >

                <IconButton
                    className={classes.bottomIcons}
                    aria-label={isPlaying ? "pause" : "play"}
                    onClick={onPlayPause}
                >
                    {isPlaying ? (
                        <BsPauseFill
                            sx={{ fontSize: "2rem" }}
                        />
                    ) : (
                        <BsFillPlayFill
                            sx={{ fontSize: "2rem" }}
                        />
                    )}
                </IconButton>

                {/* <Grid item style={{ flex: "0 170px" }}>
                    <Grid container alignItems="center" direction="row">
                        
                        <IconButton
                            className={classes.bottomIcons}
                            aria-label={isPlaying ? "pause" : "play"}
                            onClick={onPlayPause}
                        >
                            {isPlaying ? (
                                <BsPauseFill
                                    sx={{ fontSize: "2rem" }}
                                />
                            ) : (
                                <BsFillPlayFill
                                    sx={{ fontSize: "2rem" }}
                                />
                            )}
                        </IconButton>



                        <IconButton
                            className={classes.bottomIcons}
                            aria-label={mute ? "unmute" : "mute"}
                            onClick={onMute}
                        >
                            {mute ? (
                                <BsFillVolumeMuteFill
                                    sx={{ fontSize: "2rem" }}
                                />
                            ) : (
                                <BsFillVolumeUpFill
                                    sx={{ fontSize: "2rem" }}
                                />
                            )}
                        </IconButton>

                        <Slider
                            min={0}
                            max={100}
                            defaultValue={100}
                            className={classes.volumeSlider}
                        />

                       

                    </Grid>
                </Grid> */}
                <Grid item style={{ display: "flex", gap: ".5rem", flex: "2 1 0%", position: "relative" }} alignItems="center">

                    <TinyText className={classes.duration}>{getTimeStringFromSeconds(played)}</TinyText>
                    <div className={classes.sliderCont}>
                        <PrettoSlider
                            size="small"
                            value={played}
                            min={0}
                            step={1}
                            max={duration}
                            onChange={onSeek}
                            onMouseDown={onSeekMouseDown}
                            onChangeCommitted={onSeekMouseUp}
                        />
                        {loaded > 0 && <div className={classes.loaded} style={{ width: loadingBar }}></div>}
                        {/* (played + loaded).toFixed(2) + "%"  */}
                    </div>
                    <TinyText className={classes.duration}>{getTimeStringFromSeconds(duration)}</TinyText>

                </Grid>
                <Grid item style={{ display: "flex", gap: "0rem", flex: 0 }} alignItems="center" >
                    <IconButton
                        className={classes.bottomIcons}
                        aria-label={mute ? "unmute" : "mute"}
                        onClick={onMute}
                    >
                        {mute ? (
                            <BsFillVolumeMuteFill
                                sx={{ fontSize: "2rem" }}
                            />
                        ) : (
                            <>
                                {(volume * 100) < 50 ?
                                    <BsFillVolumeDownFill
                                        sx={{ fontSize: "2rem" }}
                                    /> :
                                    <BsFillVolumeUpFill
                                        sx={{ fontSize: "2rem" }}
                                    />}
                            </>
                        )}
                    </IconButton>

                    <Slider
                        min={0}
                        max={100}
                        value={mute ? 0 : volume * 100}
                        className={classes.volumeSlider}
                        onChange={onVolumeChange}
                        onChangeCommitted={onVolumeSeekUp}
                    />
                </Grid>
                <Grid item style={{ display: "flex" }}>
                    <Button
                        onClick={handlePopover}
                        variant="text"
                        className={classes.bottomIcons}
                        style={{ padding: "12px 4px" }}
                    >
                        <Typography>{playBackRate}X</Typography>
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                    >
                        <Grid container direction="column-reverse">
                            {[0.5, 1, 1.5, 2].map((rate) => (
                                <Button onClick={() => onPlayBackRateChange(rate)} variant="text">
                                    <Typography color={rate === playBackRate ? "secondary" : "default"}>{rate}x</Typography>
                                </Button>
                            ))}
                        </Grid>
                    </Popover>
                    <IconButton onClick={toggleFullScreen} className={classes.bottomIcons} style={{ padding: "12px 4px" }}>
                        <BsFullscreen fontSize="large" />
                    </IconButton>
                </Grid>

            </Grid>
        </div>
    )
})

export default CustomVideoPlayerControls
