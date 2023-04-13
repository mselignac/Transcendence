<template>
  <div>
	<!-- login() -->
    <button @click="login">Get Greetings</button>
    <!-- <h1 v-if="greetings"></h1>
		<p class="error" v-if="errorMessage"></p> -->
  </div>
</template>

<script setup>
import axios from 'axios';
import { accountService } from '@/_services'
</script>




<script>
export default {
// 	mounted() {
//       const headers = {
//             // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZWxpc2FAZ21haWwuY29tIiwiaWF0IjoxNjgwNzgxOTE5LCJleHAiOjE2ODA3ODI4MTl9.SyjNGx3OhuU9Q6EeufdmFXEFkpmoPG2LjeAPzP8xmq4',
//             'Access-Control-Allow-Origin': "*",
//             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
//       };
//       axios
//         // .get('https://jsonplaceholder.typicode.com/users/1')
//         .get('http://localhost:3000/auth/42/login', { headers })
//         .then((response) => {
//         //   this.users = response.data
//           console.log(response.data);
//         })
//         .catch(error => console.log(error))
//     },
// }
	// mounted() {
	//   const headers = {
	// 		'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZWxpc2FAZ21haWwuY29tIiwiaWF0IjoxNjgwNzgxOTE5LCJleHAiOjE2ODA3ODI4MTl9.SyjNGx3OhuU9Q6EeufdmFXEFkpmoPG2LjeAPzP8xmq4',
	// 		'Access-Control-Allow-Origin': "*",
	// 		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
	//   };
	// },
	// methods: {
	//   async login(id, accessToken) {
	// 	try {
	// 	const response = await axios.get('http://localhost:3000/auth/42/login');
	// 	// Do something with the response data, such as storing a token in local storage
	// 	console.log(response.data);
	// 	} catch (error) {
	// 	// Handle errors here
	// 	console.error(error);
	// 	}
	// }
	// }
	// }

	methods: {
      login(){
          accountService.login()
              .then(res => {
                console.log(res)
                // this.$router.push('/main-page')
              })
              .catch(err => console.log(err))
      }
	}
	}
</script>
