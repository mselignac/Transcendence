import axios from 'axios';

export default {
	methods: {
	  async login(id, accessToken) {
		try {
		  const response = await axios.post('/auth/login', {
			id: id,
			accessToken: accessToken,
		  });
		  // Do something with the response data, such as storing a token in local storage
		  console.log(response.data);
		} catch (error) {
		  // Handle errors here
		  console.error(error);
		}
	  }
	}
  }