// * Libraries
import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy'
import { useSelector } from 'react-redux'

// * Components
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// * Icons
import { FiPlayCircle } from 'react-icons/fi'

export default function ScrollDialog({ children, open, onClose, video, id }) {

    const videoPlayerRef = useRef(null)
    const previewableTopics = useSelector((state) => state.courses.courseDetailsTrailers)


    //? Video to play on mount
    const [videoUrl, setVideoUrl] = useState(video)


    //? When the player is ready to play video
    const [isReady, setIsReady] = useState(false);


    //? When the player has started playing video
    const [isStarted, setIsStarted] = useState(false)


    //? Set the current topic playing in list
    const [currentTopic, setCurrentTopic] = useState(null)



    useEffect(() => {
        setVideoUrl(video)
        setCurrentTopic(id)

        return () => {
            setVideoUrl(null)
            setCurrentTopic(null)
        }

    }, [open])

    const handleClickVideoChange = (vid, id) => {
        setVideoUrl(vid)
        setCurrentTopic(id)
    }

    //// useEffect(() => {
    ////     if (open) {
    ////         const { current: descriptionElement } = videoPlayerRef;
    ////         if (descriptionElement !== null) {
    ////             descriptionElement.focus();
    ////         }
    ////     }
    //// }, [open]);

    useEffect(() => {
        // TODO: Get the duration to be synced api

        // console.log("videoPlayerRef", videoPlayerRef)
        // isStarted && videoPlayerRef.current && videoPlayerRef.current.seekTo(parseFloat(120), 'seconds')
    }, [isStarted])

    // useEffect(() => {

    //     console.log("videoPlayerRef", videoPlayerRef)
    //     isReady && videoPlayerRef.current && videoPlayerRef.current.seekTo(parseFloat(120), 'seconds')
    // }, [])

    const handleDuration = (duration) => {
        // console.log('onDuration', duration)
    }
    const handleEnded = () => {
        // TODO: Handle isCompleted & progress api
        // console.log('onEnded')
    }
    const handlePause = () => {
        // TODO: Handle progress api
        // console.log('onPause')
    }
    const handleError = () => {
        // TODO: Handle progress api
        // console.log('handleError')
    }



    const handleProgress = progress => {
        // TODO: Handle progress api 
        // console.log("Video Player Progress", "Played::", progress.playedSeconds)
    }

    return (
        <div>
            {children}
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={open}
                onClose={onClose}
                scroll='body'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <div><h5>Course preview</h5>
                        <h3>Untitled Video 1</h3>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <ReactPlayer
                        ref={videoPlayerRef}
                        url={videoUrl}
                        className='react-player'
                        style={{}}
                        // config={ }
                        // url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        // light={true}
                        width="100%"
                        height="300px"
                        playing={true}
                        controls={true}
                        progressInterval={5000}
                        volume={.4}
                        fallback={<p>Loading...</p>}
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                        onSeek={e => console.log('onSeek', e)}
                        onReady={() => setIsReady(true)}
                        onStart={() => setIsStarted(true)}
                        onEnded={handleEnded}
                        onPause={handlePause}
                        onError={handleError}
                    />

                    {/* Todo: Handle Other previewables tutorials */}
                    <div style={{ height: "400px" }}>
                        <h4>Free sample videos</h4>
                        <ul>
                            {previewableTopics.map((topic, i) =>
                                <li style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    padding: '10px 20px',
                                }} key={i} onClick={() => handleClickVideoChange(topic.video, topic._id)}>
                                    {topic._id === currentTopic || topic.video === videoUrl ? <FiPlayCircle style={{ marginRight: '10px' }} /> : null}
                                    <p>{topic.title}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    );
}
