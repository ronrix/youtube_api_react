import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CommentForm({handleSubmit, handleChange, comment, setComment}) {

	return (
		<Form className="align-items-center">
			<Form.Group controlId="commentInput">
				<Form.Label className="text-muted fw-bold" style={{fontSize: "0.8em"}}>Post a comment</Form.Label>
				<Form.Control as={"textarea"} style={{fontSize: "0.7em"}} value={comment} onChange={handleChange} />
			</Form.Group>
			<Button onClick={handleSubmit} variant="dark" size="sm" className="w-auto ms-auto me-0 d-block mt-2">Post</Button>
		</Form>
	);
}

export default CommentForm;