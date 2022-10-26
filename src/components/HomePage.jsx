import React from 'react';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Link} from 'react-router-dom';

function HomePage({videos, handleSelectedVideo}) {
	return (
		<Row className="d-flex flex-wrap">
			{videos.map(video => {
				// video.id
				const id = video.id.videoId || video.id;
			    return (
			    	<Col onClick={(e) => handleSelectedVideo(e, id)} key={video.etag} className="align-items-start m-2 hover p-2" style={{maxWidth: "400px", cursor: "normal"}}>
			    		<Link to={`/video/${video.snippet.title}`} className="d-flex text-decoration-none">
					    	<Image src={video.snippet.thumbnails.default.url} alt={video.snippet.title} width={video.snippet.thumbnails.default.width} height={video.snippet.thumbnails.default.height}/>
							<div className="ms-2 justify-content-between">
								<p className="fw-bold m-0 text-dark overflow-hidden" style={{maxHeight: "100px"}}>{video.snippet.title}</p>
								<p className="m-0 text-muted" style={{fontSize: "0.5em", maxHeight: "100px", overflow: "hidden"}}>{video.snippet.description}</p>
								<p className="m-0 text-muted mt-2" style={{fontSize: "0.8em"}}>{video.snippet.publishedAt}</p>
							</div>
						</Link>
					</Col>
				);
			})}
	    </Row>
	);
}

export default HomePage;