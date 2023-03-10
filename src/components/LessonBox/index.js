import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import chevronDown from "assets/chevronDown.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LinearProgress } from "@material-ui/core";
import { FiClock } from "react-icons/fi";
import { convertSecsToDuration } from "utils/convertTime";


const useStyles = makeStyles((theme) => ({
    drawerRoot: {
        "& .MuiPaper-root": {
            fontFamily: theme.typography.fontFamily,
            // transform: "translateX(-250px) !important",
            transform: "translateX(-340px) !important",
            visibility: "visible !important",
        },

    },
    font: {
        fontFamily: theme.typography.fontFamily,
    },
    nextPrevBox: {
        border: "1px solid #0000001A",
        padding: "0 0 0.3rem 0rem",
        borderRadius: "8px",
        borderTop: 0,
        backgroundColor: "#0000000d",
    },
    drawerHeader: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",

        "& .drawerTitleContainer": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            "& .drawerHeaderBtn": {
                padding: ".5rem",
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRight: "0",
                display: "flex",
                borderRadius: "8px 0px 0px 8px",
                alignItems: "center",
            },
            "& .headingCont": {
                display: "flex",
                flexDirection: "column",
                // padding: "1rem",
                // padding: "1.5rem 2rem",
                padding: "1rem 2rem",
                "& .courseHeading": {
                    width: "210px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "500",
                    fontSize: "25px",
                    fontFamily: theme.typography.fontFamily,
                },
                "& .courseSubHeading": {
                    fontWeight: "500",
                    fontSize: "15px",
                    fontFamily: theme.typography.fontFamily,
                },
            },
        }
    },
    chapterContainer: {
        padding: ".2rem 2rem",
        width: "100%",
        paddingBottom: "1.5rem",


        "& .MuiTypography-root": {
            fontFamily: `${theme.typography.fontFamily} !important`
        },

        "& .chapInner": {
            backgroundColor: "#fff",
            border: "1px solid #0000001A",
            padding: "1rem .5rem",
            borderRadius: "8px",
            transition: "all .3s ease",
            fontFamily: theme.typography.fontFamily,
            "&:hover": {
                cursor: 'pointer',
                boxShadow: "0px 2px 8px rgb(49 54 62 / 15%)",
            },
            "& .flexContainer": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 .5rem",
                "& .MuiLinearProgress-root": {
                    width: "130px",
                    height: "5px !important",
                    borderRadius: "100px",
                },
                "& .MuiLinearProgress-colorPrimary": {
                    backgroundColor: `${theme.palette.border.gray7} !important`,
                },
                "& .MuiLinearProgress-barColorPrimary": {
                    backgroundColor: `${theme.palette.text.link_sec} !important`,
                    borderRadius: "100px",
                },
                "& .duration": {
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: theme.typography.fontFamily,
                },
            },
        },

        "& .downloadBtn": {
            // gradientBlue
            color: theme.palette.text.link_sec,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".3rem",
            // margin: ".5rem 0",
            fontSize: ".8rem",
            marginTop: "1.5rem",
            marginBottom: ".8rem",
            cursor: "pointer",

        },

        "& .none": {
            display: "none",
        },
    },
    listCont: {
        "& .MuiTypography-root": {
            fontFamily: `${theme.typography.fontFamily} !important`,
            fontSize: "14px",
        },
        padding: ".5rem 1rem !important",
        paddingLeft: "2rem !important",
        paddingRight: "1rem !important",
        maxHeight: "280px",
        overflowY: "auto",
        "& .item": {
            border: `1px solid ${theme.palette.background.selected}`,
            background: 'transparent',
            borderRadius: "6px",
            padding: "1rem",
            "& .MuiLinearProgress-root": {
                width: "130px",
                height: "5px !important",
                borderRadius: "100px",
            },
            "& .MuiLinearProgress-colorPrimary": {
                backgroundColor: `${theme.palette.border.gray7} !important`,
            },
            "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: `${theme.palette.text.link_sec} !important`,
            },
            "&:not(:last-child)": {
                marginBottom: ".5rem",
            },
            "&.active": {
                background: theme.palette.background.lightBlue,
            },
            "&:hover": {
                cursor: 'pointer',
                background: theme.palette.background.hoverTopic
            },
            "& .duration": {
                fontSize: '10px',
                color: theme.palette.text.primary
            }
        },
    },
    nextChapterContainer: {

        "& .chapInner": {
            "&:hover": {
                cursor: 'pointer',
                boxShadow: "0px 2px 8px rgb(49 54 62 / 15%)",
            },
            border: "1px solid #0000001A",
            padding: "1rem",
            borderRadius: "8px",
            transition: "all .3s ease",

            "& .flexContainer": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& .MuiLinearProgress-root": {
                    width: "120px",
                    height: "6px !important",
                    borderRadius: "6px",
                },
                "& .MuiLinearProgress-colorPrimary": {
                    backgroundColor: `${theme.palette.border.gray7}!important`,
                },
                "& .MuiLinearProgress-barColorPrimary": {
                    backgroundColor: `${theme.palette.text.link_sec} !important`,
                },
                "& .duration": {
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                    fontSize: "12px",
                    fontWeight: "500",
                },
            },
        },
        "& .downloadBtn": {
            // gradientBlue
            color: theme.palette.text.link_sec,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".1rem",
            margin: "1rem 0",
            cursor: "pointer",
        },
        "& .none": {
            display: "none",
        },
    },

}));

const LessonBox = ({ isCurrentLesson, percentage, duration, title, open, openMenu, anchorEl, handleClose, handleClick, handleClickChangeLesson, currentLessonsAll, currentLessonSelected }) => {
    const classes = useStyles();
    const theme = useTheme();

    const ITEM_HEIGHT = 45;

    return (
        <div className={classes.nextPrevBox}>
            <div className={open ? `chapInner ` : "none"} style={{ cursor: "pointer" }} onClick={isCurrentLesson ? e => handleClick(e) : null}>
                <div className="flexContainer" >
                    {!isCurrentLesson && <Typography
                        style={{
                            // gradientBlue
                            // color: theme.palette.text.link_sec,
                            color: "#4D9BD5",
                            fontSize: "10px",
                            fontWeight: "500",
                        }}
                    >
                        Next lesson
                    </Typography>}
                    <Typography
                        style={{ fontSize: "14px", fontWeight: "500", }}>
                        {title || "lesson"}
                    </Typography>
                    {/* <BsChevronDown /> */}
                    {
                        isCurrentLesson && (
                            <>
                                <img src={chevronDown} />
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{ "aria-labelledby": "long-button" }}
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: "200px",
                                        },
                                    }}
                                >
                                    {currentLessonsAll && currentLessonsAll.map((option) => (
                                        <MenuItem
                                            key={option._id}
                                            selected={option.title === currentLessonSelected.details.title}
                                            onClick={() => handleClickChangeLesson(option)}
                                            style={{ fontFamily: `${theme.typography.fontFamily} !important` }}
                                        >
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>)
                    }
                </div>
                <div onClick={isCurrentLesson ? handleClickChangeLesson : null}>
                    <div className="flexContainer">
                        <LinearProgress
                            value={percentage}
                            style={{ width: "130px" }}
                            variant="determinate"
                        />
                        <Typography className="duration">
                            <FiClock style={{ height: "14px", width: "14px" }} />
                            {convertSecsToDuration(duration)}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonBox
