import * as React from "react";
import { styled, useTheme } from "@material-ui/material/styles";
import Box from "@material-ui/material/Box";
import Button from "@material-ui/material/Button";
import Typography from "@material-ui/material/Typography";
import Slider from "@material-ui/material/Slider";
import IconButton from "@material-ui/material/IconButton";
import Stack from "@material-ui/material/Stack";
import Popover from "@material-ui/material/Popover";
import Grid from "@material-ui/material/Grid";
// import Popover from "@material-ui/core/Popover";

import PauseRounded from "@material-ui/icons-material/PauseRounded";
import PlayArrowRounded from "@material-ui/icons-material/PlayArrowRounded";
import VolumeUpRounded from "@material-ui/icons-material/VolumeUpRounded";
import FullscreenIcon from "@material-ui/icons-material/Fullscreen";

const WallPaper = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
    background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
    transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
    "&:before": {
        content: '""',
        width: "140%",
        height: "140%",
        position: "absolute",
        top: "-40%",
        right: "-50%",
        background:
            "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)"
    },
    "&:after": {
        content: '""',
        width: "140%",
        height: "140%",
        position: "absolute",
        bottom: "-50%",
        left: "-30%",
        background:
            "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
        transform: "rotate(30deg)"
    }
});

const Widget = styled("div")(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 600,
    maxWidth: "100%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
    backdropFilter: "blur(40px)"
}));

const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2
});

export default function MusicPlayerSlider() {
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);
    const [paused, setPaused] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    }
    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;
    const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
    const lightIconColor =
        theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
    return (
        <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Widget>
                <Stack direction="row" alignItems="center">
                    <IconButton
                        aria-label={paused ? "play" : "pause"}
                        onClick={() => setPaused(!paused)}
                    >
                        {paused ? (
                            <PlayArrowRounded
                                sx={{ fontSize: "2rem" }}
                                htmlColor={mainIconColor}
                            />
                        ) : (
                            <PauseRounded
                                sx={{ fontSize: "2rem" }}
                                htmlColor={mainIconColor}
                            />
                        )}
                    </IconButton>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: ".5rem",
                            marginRight: ".5rem"
                        }}
                    >
                        <TinyText>{formatDuration(position)}</TinyText>
                        <Slider
                            aria-label="time-indicator"
                            size="small"
                            value={position}
                            min={0}
                            step={1}
                            max={duration}
                            onChange={(_, value) => setPosition(value)}
                            sx={{
                                color:
                                    theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                                height: 10,
                                width: 320,
                                "& .MuiSlider-thumb": {
                                    width: 0,
                                    height: 0,
                                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                                    "&:before": {
                                        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)"
                                    },
                                    "&:hover, &.Mui-focusVisible": {
                                        boxShadow: `0px 0px 0px 8px ${theme.palette.mode === "dark"
                                                ? "rgb(255 255 255 / 16%)"
                                                : "rgb(0 0 0 / 16%)"
                                            }`
                                    },
                                    "&.Mui-active": {
                                        width: 20,
                                        height: 20
                                    }
                                },
                                "& .MuiSlider-rail": {
                                    opacity: 0.28
                                }
                            }}
                        />
                        <TinyText>-{formatDuration(duration - position)}</TinyText>
                    </Box>
                    {/* <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            alignItems="center"
            width="150px"
          > */}
                    {/* <VolumeDownRounded htmlColor={lightIconColor} /> */}
                    {/* <VolumeUpRounded htmlColor={lightIconColor} /> */}
                    <Slider
                        aria-label="Volume"
                        defaultValue={30}
                        sx={{
                            width: 60,
                            color:
                                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                            "& .MuiSlider-track": {
                                border: "none"
                            },
                            "& .MuiSlider-thumb": {
                                width: 18,
                                height: 18,
                                backgroundColor: "#fff",
                                "&:before": {
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)"
                                },
                                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                                    boxShadow: "none"
                                }
                            }
                        }}
                    />
                    {/* </Stack> */}
                    {/* <Box> */}
                    <Button
                        onClick={handlePopover}
                        variant="text"
                        // className={classes.bottomIcons}
                        size="small"
                    >
                        <Typography>1X</Typography>
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                    // sx={{ top: 50 }}
                    >
                        <Grid container direction="column-reverse">
                            {[0.5, 1, 1.5, 2].map((rate) => (
                                <Button variant="text">
                                    <Typography color="secondary">{rate}</Typography>
                                </Button>
                            ))}
                        </Grid>
                    </Popover>
                    {/* </Box> */}
                    <FullscreenIcon htmlColor={lightIconColor} />
                </Stack>
            </Widget>
            <WallPaper />
        </Box>
    );
}
