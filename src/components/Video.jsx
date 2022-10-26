import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import SideVideo from './SideVideo';
import Description from './Description';
import Comments from './Comments';

import {useLocation} from 'react-router-dom';

// api
import Youtube from '../api/youtubeAPI';

import {baseUrlEmbed} from '../config';

function Video({setVideos, videos, selectedVideo, handleSelectedVideo, setSelectedVideo}) {

	// const [videos, setVideos] = React.useState(data); // [] by default
	const [loading, setLoading] = React.useState(true);
	const [playingVideo, setPlayingVideo] = React.useState(() => videos.find(video => (video.id.videoId || video.id) === selectedVideo)); // [] by default

	// handle reactions and comments of playing video, and set it to the localStorage
	const [feedbacks, setFeedbacks] = React.useState(() => localStorage.getItem("feedbacks") ? JSON.parse(localStorage.getItem("feedbacks")) : []);

	const location = useLocation(); // get the params of the url

	// get all comments
	const [allComments, setAllComments] = React.useState(() => localStorage.getItem("feedbacks") ? JSON.parse(localStorage.getItem("feedbacks")).find(video => video.id === selectedVideo) : []);

	const handleReaction = (e, video) => {

		let reactions = JSON.parse(localStorage.getItem("feedbacks")) || [];

		const exists = reactions.length && reactions.filter(el => el.id === (video.id.videoId || video.id));
		if(exists.length) { // if already reacted, and want to change the reaction

			reactions = reactions.map(el => {
				if(el.id === (video.id.videoId || video.id) && el.whatReaction === e.target.id) {
					// remove reaction by decrementing
					el.reacts[e.target.id]--;
					el.whatReaction = "";
				}
				else { // when reaction is not matched to the reacted one, change it
					el.reacts[e.target.id]++;
					el.whatReaction = e.target.id;
				}

				return el;
			});
		}
		else { // if no data yet, push
			const reacts = e.target.id === "like" ? {like: 1, dislike: 0} : {like: 0, dislike: 1};

			reactions.push({
				id: (video.id.videoId || video.id),
				comments: [],
				reacts,
				whatReaction: e.target.id,
			});
		}

		setFeedbacks(reactions); // state
		localStorage.setItem("feedbacks", JSON.stringify(reactions)); // storage
	}

	React.useEffect(() => {
		setLoading(false);
		setSelectedVideo(() => localStorage.getItem("playingVideo"));
		setAllComments(() => localStorage.getItem("feedbacks") ? JSON.parse(localStorage.getItem("feedbacks")).filter(video => video.id === selectedVideo) : []);

		// if video state is empty check for localStorage
		if(videos.length) {
			setPlayingVideo(() => videos.find(video => (video.id.videoId || video.id) === selectedVideo));
		}
		else {
			setVideos(() => JSON.parse(localStorage.getItem("videos")));
			setPlayingVideo(() => JSON.parse(localStorage.getItem("videos")).find(video => (video.id.videoId || video.id) === selectedVideo));
		}

		// console.log(videos);
		// console.log(feedbacks);
		// console.log(playingVideo);
		// console.log(allComments);
		// console.log(selectedVideo);

	}, [selectedVideo]);

	return (
		<Row className="mt-2">
			{loading ? <Spinner className="m-auto text-center" animation="border" /> : videos.length && (
				<>
					<Col>
						<iframe title={playingVideo.snippet.title} src={baseUrlEmbed + (playingVideo.id.videoId || playingVideo.id)} height="500" className="w-100" frameBorder="0"></iframe>
						<Description video={playingVideo} handleReaction={handleReaction} feedback={feedbacks} />
						<Comments selectedVideo={selectedVideo} video={playingVideo} handleReaction={handleReaction} setFeedbacks={setFeedbacks} feedbacks={feedbacks} allComments={allComments || []} setAllComments={setAllComments} />
					</Col>
					<Col sm={4}>
						<SideVideo videos={videos} handleSelectedVideo={handleSelectedVideo} />
					</Col>
				</>
			)}
		</Row>
	);
}

export default Video;