import React from 'react';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import {Link} from 'react-router-dom';

function SideVideo({videos, handleSelectedVideo}) {

	return (
		<div>
			<h3 className="fs-6 fw-bold">Related Video</h3>
			{videos.length ? videos.map(video => {
				const id = video.id.videoId || video.id;
				// video.id
				return (
					<div onClick={(e) => handleSelectedVideo(e, id)} key={id} className="d-flex align-items-top mt-2 hover py-2 " style={{cursor: "pointer"}}>
			    		<Link to={`/video/${video.snippet.title}`} className="d-flex text-decoration-none text-dark">
							<Image alt={video.snippet.title} src={video.snippet.thumbnails.default.url} width={video.snippet.thumbnails.default.width} height={video.snippet.thumbnails.default.height} />
							<div className="ms-2 justify-content-between wrap" style={{maxWidth: "200px"}}>
								<p className="fw-bold m-0" style={{fontSize: "0.8em"}}>{video.snippet.title}</p>
								<p className="m-0 overflow-hidden wrap" style={{fontSize: "0.5em", maxHeight: "200px", overflow: "hidden"}}>{video.snippet.description}</p>
								<p className="m-0 text-muted" style={{fontSize: "0.8em"}}>{video.publishTime}</p>
							</div>
						</Link>
					</div>
				);
			}) : <p className="text-muted">no related videos</p>
			}
		</div>
	);
}

export default SideVideo;