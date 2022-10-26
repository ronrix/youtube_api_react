import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchForm from './SearchForm';

function Header({setVideos}) {
	return (
		<Row className="justify-content-center align-items-center p-4 text-light" style={{backgroundColor: "#202020"}}>
			<Col sm={3}>
				<h1 className="me-2 fs-5 fw-bold">
					<a href="/" className="text-decoration-none text-light d-flex align-items-center justify-content-center">
						<i className="fa-brands fa-youtube me-2 text-danger"></i>
						YouTube <span className="text-danger">API</span>
					</a>
				</h1>
			</Col>
			<Col sm={5}>
				<SearchForm setVideos={setVideos} />
			</Col>
		</Row>
	);
}

export default Header;