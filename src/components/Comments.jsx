import React from 'react';

import CommentForm from './CommentForm'

function Comments({selectedVideo, video, setFeedbacks, feedbacks, allComments, setAllComments}) {

	// add comments with videoId to localStorage
	const [comment, setComment] = React.useState("");

	// copy allComments
	const [copyAllComments, setCopyAllComments] = React.useState(() => localStorage.getItem("feedbacks") ? JSON.parse(localStorage.getItem("feedbacks")).filter(el => el.id === selectedVideo)[0]?.comments?.reverse() : []);

	const handleChange = (e) => {
		setComment(e.target.value);
	}

	const handleSubmit = (e) => {

		// check if the video is already in the storage
		let newFeedbacks = [];
		if(allComments.length || feedbacks.length) {

			const commentCount = feedbacks.find(el => el.id === selectedVideo);

			// add comment to the state and localStorage
			newFeedbacks = feedbacks.map(el => {
				if(el.id === selectedVideo) {
					el.comments.push({id: parseInt(commentCount.comments.length), comment, like: 0, dislike: 0 });
				}
				return el;
			});
		}
		else {
			// if video doesn't exists in the storage, set the comments and reactions as default
			feedbacks.push({id: (video.id.videoId || video.id), comments: [{id: 0, comment, like: 0, dislike: 0}], reacts: {like: 0, dislike: 0}, whatReaction: ""});
			newFeedbacks = feedbacks;
		}

		setFeedbacks(newFeedbacks);
		localStorage.setItem("feedbacks", JSON.stringify(newFeedbacks));

		// setAllComments(filteredComments);
		setAllComments(() => localStorage.getItem("feedbacks") ? JSON.parse(localStorage.getItem("feedbacks")).filter(video => video.id === selectedVideo) : []);


		// clear the comment box
		setComment("");
		setCopyAllComments(() => JSON.parse(localStorage.getItem("feedbacks")).filter(el => el.id === selectedVideo)[0]?.comments?.reverse());
		e.preventDefault();
	}

	const handleCommentReaction = (e, key) => {
		const commentsFromStorage = JSON.parse(localStorage.getItem("feedbacks"));
		const newFeedbacks = commentsFromStorage.map(el => {
			if(el.id === selectedVideo) {
				el.comments = el.comments.map((comment) => {
					if(comment.id === key && comment.reacted === "dislike" && e.target.id === "like") {
						comment.dislike--;
						comment.reacted = "like";
						comment.like++;
					}
					else if(comment.id === key && comment.reacted === "like" && e.target.id === "dislike") {
						comment.like--;
						comment.reacted = "dislike";
						comment.dislike++;
					}
					else if(comment.id === key && comment.reacted) {
						comment[e.target.id]--;
						comment.reacted = "";
					}
					else if(comment.id === key && !comment.reacted) {
						comment[e.target.id]++;	
						comment.reacted = e.target.id;
					}
					return comment;
				});
			}
			return el;
		});

		setFeedbacks(newFeedbacks);
		localStorage.setItem("feedbacks", JSON.stringify(newFeedbacks));
		setAllComments(() => localStorage.getItem("feedbacks") ? JSON.parse(localStorage.getItem("feedbacks")).filter(video => video.id === selectedVideo) : []);
		setCopyAllComments(() => JSON.parse(localStorage.getItem("feedbacks")).filter(el => el.id === selectedVideo)[0]?.comments?.reverse());
	}

	React.useEffect(() => {
	}, []);

	return (
		<div className="mt-2 mb-5">
			<CommentForm setComment={setComment} handleChange={handleChange} comment={comment} handleSubmit={handleSubmit} />

			<div>
				<h5 className="fw-bold text-uppercase" style={{fontSize: "0.8em"}}>comments</h5>

				{(allComments && allComments.length) ? copyAllComments.map((comment) => {
					return (
						<div key={comment.id} className="border-bottom border-top py-2">
							<p className="text-justify" style={{fontSize: "0.8em"}}>{comment.comment}</p>
							<div className="d-flex align-items-center">
								<span>
									<i onClick={(e) => handleCommentReaction(e, comment.id)} id="like" className={`fa-solid fa-thumbs-up me-2 reaction ${comment.reacted === "like" ? "text-primary" : ""}`} style={{fontSize: "0.8em", cursor: "pointer"}}></i>
									{comment.like}
								</span>
								<span className="ms-3">
									<i onClick={(e) => handleCommentReaction(e, comment.id)} id="dislike" className={`fa-solid fa-thumbs-down me-2 reaction ${comment.reacted === "dislike" ? "text-primary" : ""}`} style={{fontSize: "0.8em", cursor: "pointer"}}></i>
									{comment.dislike}
								</span>
							</div>
						</div>
					);
				}) : <p className="text-muted" style={{fontSize: "0.8em"}}>no comments</p>}

			</div>
		</div>
	);
}

export default Comments;