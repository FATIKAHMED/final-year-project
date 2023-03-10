import React, {
    // useEffect,
    useState
} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import { Link } from "react-router-dom"

// * Components
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
import CoursePreviewModal from 'components/CoursePreviewModal'

// * Utilities
import { convertSecsToDuration } from 'utils/convertTime'

// * Icons
import { BiChevronDown } from 'react-icons/bi'
import { GoPlay } from 'react-icons/go'
import { FiFile } from 'react-icons/fi'

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    accordionTitle: {
        "& .accordion-title-content": {
            marginLeft: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            "& .title": {
                width: '80%',
                fontWeight: '600'
            },
            "& .lesson-duration": {
                fontSize: '11px',
                fontWeight: '300'
            },
        },
        "& .MuiAccordionSummary-expandIcon ": {
            position: 'absolute',
            left: 0
        }
    },
    accordionSummary: {
        "& .accordion-summary-content": {
            width: '100%',
            "& .previewable": {
                color: theme.palette.text.link,
                cursor: 'pointer',
            },
            "& li": {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: '300',
                marginBottom: '10px',
                "& .info": {
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '70%',
                    "& .title": {
                        marginLeft: '15px'
                    }
                },
                "& .duration": {
                    color: theme.palette.text.muted
                },
            }
        }
    }
}))
export default function CustomizedAccordions({ lessons }) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(0);
    const [open, setOpen] = useState(false);
    const [topicVideo, setTopicVideo] = useState(null)

    const handleClickOpen = (video) => () => {
        // dispatch(setTopicPreviewDetails)
        setTopicVideo(video)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {lessons.map((lesson, i) =>
                <Accordion key={i} expanded={expanded === i} onChange={handleChange(i)}>
                    <AccordionSummary classes={{ root: classes.accordionTitle }} expandIcon={<BiChevronDown />} aria-controls="panel1d-content" id="panel1d-header">
                        <div className="accordion-title-content">
                            <p className="title">{lesson.title}</p>
                            <p className="lesson-duration GLOBAL_TIME">Duration: {convertSecsToDuration(lesson.duration)}</p>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionSummary }}>
                        <div className="accordion-summary-content">
                            <CoursePreviewModal video={topicVideo} open={open} onClose={handleClose} />
                            <ul>
                                {/* // TODO: Rendering too many Modals */}
                                {lesson.topics.map(topic => {
                                    return topic.isPreviewable ?
                                        // <CoursePreviewModal key={topic._id} id={topic._id} video={topic.video} open={open} onClose={handleClose} >
                                        <li onClick={handleClickOpen(topic.video)} className="previewable" >
                                            <div className="info">
                                                <GoPlay />
                                                <p className="title">{topic.title}</p>
                                            </div>
                                            <p className="duration GLOBAL_TIME">{convertSecsToDuration(topic.duration)}</p>
                                        </li>
                                        // {/* </CoursePreviewModal> */ }
                                        :
                                        <li key={topic._id}>
                                            <div className="info">
                                                <GoPlay />
                                                <p className="title">{topic.title}</p>
                                            </div>
                                            <p className="duration GLOBAL_TIME">{convertSecsToDuration(topic.duration)}</p>
                                        </li>
                                })}
                            </ul>
                            <ul>
                                {lesson.attachments?.map(attachment =>
                                    <li key={`${attachment.title} ${Math.randow() * 10000}`}>
                                        <div className="info">
                                            <FiFile />
                                            <p className="title">{attachment.title}</p>
                                        </div>
                                        {/* <p className="duration GLOBAL_TIME">{convertSecsToDuration(attachment.duration)}</p> */}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </AccordionDetails>
                </Accordion>
            )
            }
        </div >
    );
}