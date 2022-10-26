import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

function Description({video, feedback, handleReaction}) {
	const reaction = feedback && feedback.filter(el => el.id === (video.id.videoId || video.id));

	return (
		<div>
			<div className="d-flex justify-content-start align-items-center" style={{fontSize: "0.5em"}}>
				<Nav.Link href="#">#test1</Nav.Link>
				<Nav.Link href="#">#test2</Nav.Link>
				<Nav.Link href="#">#test3</Nav.Link>
			</div>

			<div className="ps-3">
				<h2 className="fs-5 fw-bold text-capitalize">{video.snippet.title}</h2>
				<p className="text-muted">
					{video.snippet.description}
				</p>
				<div className="d-flex align-items-center justify-content-between border-top border-bottom py-2">
					<div className="d-flex">
						<Image rounded={true} style={{width: "20px"}} src={require("../assets/images/test.jpg")} />
						<div className="ms-3 d-flex flex-column align-items-start">
							<span className="fw-bold" style={{fontSize: "0.8em"}}>{video.snippet.channelTitle}</span>
							<span className="text-muted" style={{fontSize: "0.5em"}}>{video.snippet.publishedAt}</span>
						</div>

					</div>
					<div className="d-flex align-items-center">
						<span>
							<i onClick={(e) => handleReaction(e, video)} id="like" className={`fa-solid fa-thumbs-up fs-5 me-2 reaction ${reaction.length && reaction[0].whatReaction === "like" ? "text-primary" : ""}`} style={{cursor: "pointer"}}></i>
							{reaction.length ? reaction[0].reacts.like : 0}
						</span>
						<span className="ms-3">
							<i onClick={(e) => handleReaction(e, video)}  id="dislike" className={`fa-solid fa-thumbs-down fs-5 me-2 reaction ${reaction.length && reaction[0].whatReaction === "dislike" ? "text-primary" : ""}`} style={{cursor: "pointer"}}></i>
							{reaction.length ? reaction[0].reacts.dislike : 0}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Description;