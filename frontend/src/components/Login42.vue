<template>
  <div>
    <button @click="login">Get Greetings</button>
    <!-- <h1 v-if="greetings"></h1>
		<p class="error" v-if="errorMessage"></p> -->
  </div>
</template>

<script setup>
import axios from 'axios';
</script>

<script>
export default {
	// mounted() {
	//   const headers = {
	// 		'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZWxpc2FAZ21haWwuY29tIiwiaWF0IjoxNjgwNzgxOTE5LCJleHAiOjE2ODA3ODI4MTl9.SyjNGx3OhuU9Q6EeufdmFXEFkpmoPG2LjeAPzP8xmq4',
	// 		'Access-Control-Allow-Origin': "*",
	// 		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
	//   };
	// },
	methods: {
	  async login(id, accessToken) {
		try {
		const response = await axios.get('http://localhost:3000/auth/42/login', {
			id: id,
			accessToken: accessToken,
			'Access-Control-Allow-Origin': "*",
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
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
</script>
