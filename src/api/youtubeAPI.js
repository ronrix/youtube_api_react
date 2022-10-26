import Axios from 'axios';

export default Axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3/",
});

// search?part=snippet&channelType=any