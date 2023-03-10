import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BiChevronDown } from "react-icons/bi";
import PlayCircle from "assets/playCircle.svg";
import { makeStyles } from "@material-ui/core/styles";
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@material-ui/core";
import { FiPlayCircle } from "react-icons/fi";
import { convertSecsToDuration } from "utils/convertTime";

const useStyles = makeStyles((theme) => ({
  accordion: {
    // veryLightGray3
    border: `1px solid ${theme.palette.border.gray6}`,
    margin: "10px 0",
    borderRadius: "8px !important",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.04) !important",
    "& .MuiAccordionSummary-root": {
      flexDirection: "row-reverse",
      // borderBottom: `1px solid ${theme.palette.border.gray6}`,
      padding: "0 1.5rem",
      [theme.breakpoints.down(1220)]: {
        padding: "0 0.5rem",
      },
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      paddingLeft: "0.6rem",
      paddingRight: "0.3rem",
    },

    "&.MuiAccordion-root:before": {
      display: "none",
    },
    "& .makeStyles-details": {
      borderBottom: "none",
    },
    "& .accordionSummarySpan": {
      display: "flex",
      padding: ".5rem",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
    "& .lessonTitle": {
      fontSize: "20px",
      fontWeight: "500",
      [theme.breakpoints.down(1220)]: {
        "display": "-webkit-box",
        "overflow": "hidden",
        "fontSize": "15px",
        "fontWeight": "500",
        "textOverflow": "ellipsis",
        "whiteSpace": "pre-wrap",
        "WebkitBoxOrient": "vertical",
        "WebkitLineClamp": "2",
        "maxWidth": "350px"
      },
    },
    "& .time": {
      // gradientBlue
      color: theme.palette.text.link_sec,
      fontWeight: "normal",
      fontSize: "13px",
      margin: "0 .5rem",
      minWidth: "max-content",
    },
    "& .icon": {
      height: "25px", width: "25px", color: theme.palette.text.header
    },
    "& .accDetails": {
      padding: "1.2rem 2rem",

      "& .accDetailsRow": {
        display: "flex",
        alignItems: "center",
        gap: "1.4rem",
        [theme.breakpoints.down(600)]: {
          gap: ".5rem"
        },
      },
      "&:not(:last-child)": {
        borderBottom: "1px solid rgba(0, 0, 0, .07)",
      },
    },
  },
  details: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    backgroundColor: theme.palette.background.veryLightGray2,
    borderRadius: " 0 0 8px 8px !important",
    borderTop: '1px solid rgba(0, 0, 0, .125)',

    "&$expanded": {
      minHeight: 56,
    },
    "&.MuiAccordionDetails-root ": {
      padding: 0
    },
    "& .topicTitle ": {
      fontSize: "15px",
      fontWeight: "500",
      "display": "-webkit-box",
      "overflow": "hidden",
      "fontSize": "15px",
      "fontWeight": "500",
      "textOverflow": "ellipsis",
      "whiteSpace": "pre-wrap",
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": "2",
      "maxWidth": "220px",
      [theme.breakpoints.down(500)]: {
        fontSize: "12px",
      },

    },
  },
  previewVideo: {
    textDecoration: "underline",
    color: theme.palette.text.link_sec,
    cursor: "pointer"
  }
}));
// var lessons = [
//   {
//     attachments: [],
//     createdAt: "2021-10-28T06:41:48.469Z",
//     duration: 721.834195,
//     exercises: ["6197585177a6860bd82bedd5", "6197589a77a6860bd82beddd", "619758d977a6860bd82bede5"],
//     status: 1,
//     title: "Lesson 1",
//     topics: [
//       {
//         createdAt: "2021-10-28T06:39:25.871Z",
//         duration: 60.04,
//         isPreviewable: true,
//         problems: [],
//         questions: ['618caf815e0896318c42297e', '618cb00f5e0896318c422990', '618cbb28d980cb05ac912e00'],
//         status: 1,
//         subTitle: "Topic subtitle",
//         thumbnail: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/thumbnail_test.jpg",
//         title: "Topic 1",
//         updatedAt: "2021-11-16T10:18:12.937Z",
//         video: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/test.mp4",
//         _id: "617a459d05e4fb462ce26115",
//       },
//       {
//         createdAt: "2021-10-28T06:39:25.871Z",
//         duration: 60.04,
//         isPreviewable: true,
//         problems: [],
//         questions: ['618caf815e0896318c42297e', '618cb00f5e0896318c422990', '618cbb28d980cb05ac912e00'],
//         status: 1,
//         subTitle: "Topic subtitle",
//         thumbnail: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/thumbnail_test.jpg",
//         title: "Topic 1",
//         updatedAt: "2021-11-16T10:18:12.937Z",
//         video: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/test.mp4",
//         _id: "617a459d05e4fb462ce26116",
//       }
//     ],
//     updatedAt: "2021-11-19T07:57:33.298Z",
//     _id: "617a462c05e4fb462ce26123",
//   },
//   {
//     attachments: [],
//     createdAt: "2021-10-28T06:41:48.469Z",
//     duration: 721.834195,
//     exercises: ["6197585177a6860bd82bedd5", "6197589a77a6860bd82beddd", "619758d977a6860bd82bede5"],
//     status: 1,
//     title: "Lesson 1",
//     topics: [
//       {
//         createdAt: "2021-10-28T06:39:25.871Z",
//         duration: 60.04,
//         isPreviewable: true,
//         problems: [],
//         questions: ['618caf815e0896318c42297e', '618cb00f5e0896318c422990', '618cbb28d980cb05ac912e00'],
//         status: 1,
//         subTitle: "Topic subtitle",
//         thumbnail: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/thumbnail_test.jpg",
//         title: "Topic 1",
//         updatedAt: "2021-11-16T10:18:12.937Z",
//         video: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/test.mp4",
//         _id: "617a459d05e4fb462ce26115",
//       },
//       {
//         createdAt: "2021-10-28T06:39:25.871Z",
//         duration: 60.04,
//         isPreviewable: true,
//         problems: [],
//         questions: ['618caf815e0896318c42297e', '618cb00f5e0896318c422990', '618cbb28d980cb05ac912e00'],
//         status: 1,
//         subTitle: "Topic subtitle",
//         thumbnail: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/thumbnail_test.jpg",
//         title: "Topic 1",
//         updatedAt: "2021-11-16T10:18:12.937Z",
//         video: "https://da-prep.s3.ap-south-1.amazonaws.com/videos/test.mp4",
//         _id: "617a459d05e4fb462ce26116",
//       }
//     ],
//     updatedAt: "2021-11-19T07:57:33.298Z",
//     _id: "617a462c05e4fb462ce26123",
//   }

// ]

export default function CourseLessonAccordion({ lessons, onVideoPreview, expandAll }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel_0')
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <>
      {lessons.map((lesson) => {
        return (
          <Accordion elevation={0} key={`panel_${lesson._id}`} className={classes.accordion} expanded={expanded === `panel_${lesson._id}` || expandAll} onChange={handleChange(`panel_${lesson._id}`)}>
            <AccordionSummary
              expandIcon={<BiChevronDown className="icon" />}
              // aria-controls="panel1a-content"
              // id="panel1a-header"
              aria-controls={`panel_${lesson._id}d-content`}
              id={`panel_${lesson._id}d-header`}
            >
              <span className="accordionSummarySpan">
                <Typography className="lessonTitle">{lesson.title}</Typography>
                <Typography className="time">
                  {convertSecsToDuration(lesson.duration)}
                </Typography>
              </span>
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.details }}>
              <ul>
                {lesson.topics.map((topic) => {
                  return (
                    <li key={topic?._id} onClick={e => topic.isPreviewable ? onVideoPreview({ video: topic.video, image: topic.thumbnail, id: topic._id }) : ""} className="accDetails accordionSummarySpan">
                      <span
                        // style={{
                        //   display: "flex",
                        //   alignItems: "center",
                        //   gap: "1.4rem",

                        // }}
                        className={"accDetailsRow"}
                      // onClick={() => setShowModal(true)}                        
                      >
                        {/* <FiPlayCircle /> */}
                        <img src={PlayCircle} height="18px" width="18px" />
                        <span className={`${topic.isPreviewable ? classes.previewVideo : ""} topicTitle`}>{topic.title}</span>
                      </span>
                      <span className="time">
                        {convertSecsToDuration(topic.duration)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
