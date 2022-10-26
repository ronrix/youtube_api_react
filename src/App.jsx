import React from "react";

import Container from 'react-bootstrap/Container';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage';
import Video from './components/Video';

// api
import Youtube from './api/youtubeAPI';
// import {testData} from './config'; // for testing


function App() {

    const [videos, setVideos] = React.useState([]);  // [] by default
    const [selectedVideo, setSelectedVideo] = React.useState(localStorage.getItem("playingVideo") || ""); // get video id

    // calling youtube api for homepage, just getting videos
    const getSomeVideos = async () => {
        const {data} = await Youtube.get("/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key="+process.env.API_KEY);

        localStorage.setItem("videos", JSON.stringify(data.items));
        setVideos(data.items);
    }

    const handleSelectedVideo = (e, videoId) => {
        setSelectedVideo(videoId);

        // set the playing video id in localStorage
        localStorage.setItem("playingVideo", videoId);
    }

    React.useEffect(() => {
        if(!videos.length && !localStorage.getItem("videos")) {
            console.log("calling youtube API");
            getSomeVideos(); 
        }
        else if(localStorage.getItem("videos")) {
            setVideos(JSON.parse(localStorage.getItem("videos")));
        }

    }, []);

    return (
        <Container fluid>
            <Router>
                <Header setVideos={setVideos} />

                <Container>
                        <Routes>
                            <Route exact path="/" element={<div className="mt-3">
                                <p style={{fontSize: "0.8em"}} className="fw-bold text-uppercase">Videos</p>
                                <HomePage videos={videos} handleSelectedVideo={handleSelectedVideo} />
                            </div>} 
                            />
                            <Route exact path={`/video/*`} element={<Video setVideos={setVideos} videos={videos} selectedVideo={selectedVideo} handleSelectedVideo={handleSelectedVideo} setSelectedVideo={setSelectedVideo} />} />
                            <Route path="/*" element={<h1 className="text-center mt-2">404 not found</h1>} />
                        </Routes>
                </Container>
            </Router>
        </Container>
    )
}

export default App;


// 3 hours 
