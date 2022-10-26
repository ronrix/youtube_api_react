import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {useNavigate} from 'react-router-dom';

import Youtube from '../api/youtubeAPI';
import {PUBLIC_KEY} from '../config';

function SearchForm({setVideos}) {

	const [query, setQuery] = React.useState("");
	const navigate = useNavigate();

	const handleSearch = async () => {

		const {data} = await Youtube.get(`/search?part=snippet&channelType=any&q=${query}&key=${PUBLIC_KEY}`);
		setVideos(data.items);

		localStorage.setItem("videos", JSON.stringify(data.items));
		setQuery("");

		navigate("/");
	}

	const handleSubmit = (e) => {
		handleSearch();

		e.preventDefault();
	}

	const handleChange = (e) => {
		setQuery(e.target.value);
	}

	return (
		<Form className="d-flex" onSubmit={handleSubmit}>
			<Form.Control type="text" placeholder="Search" size="sm" value={query} onChange={handleChange} />
			<Button size="sm" variant="secondary" className="ms-2" onClick={handleSearch} >
				<i className="fa-solid fa-magnifying-glass"></i>
			</Button>
		</Form>
	);
}

export default SearchForm;