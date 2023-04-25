<script setup>
import Borders from './Borders.vue'
import axios from 'axios';
import Cookies from 'js-cookie';
</script>

<script>
export default {
    data() {
        return {
            users: [],
            text: '',
            username: 'username'
        }
    },
    methods: {
      change_username() {
        this.username = this.text,
        this.text = ''
      },
      logout() {
      const cookieValue = Cookies.get('jwt');
      console.log("cookieValue: ", cookieValue);
      const headers = {
            'Authorization': 'Bearer ' + cookieValue,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      };
      axios
        .delete('http://localhost:3000/auth/42/logout', { headers })
        .then((response) => {
          this.users = response.data
          console.log(cookieValue);
        })
        .catch(error => console.log(error))
      }
    },
    // mounted() {
    //   const headers = {
    //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZWxpc2FAZ21haWwuY29tIiwiaWF0IjoxNjgwNzgxOTE5LCJleHAiOjE2ODA3ODI4MTl9.SyjNGx3OhuU9Q6EeufdmFXEFkpmoPG2LjeAPzP8xmq4',
    //         'Access-Control-Allow-Origin': "*",
    //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //   };
    //   axios
    //     .get('http://localhost:3001/users/me', { headers })
    //     .then((response) => {
    //       this.users = response.data
    //       console.log(this.users.email);
    //     })
    //     .catch(error => console.log(error))
    // },
    mounted() {
      const cookieValue = Cookies.get('jwt');
      const headers = {
            'Authorization': 'Bearer ' + cookieValue,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      };
      axios
        // .get('https://jsonplaceholder.typicode.com/users/1')
        .get('http://localhost:3000/users/me', { headers })
        .then((response) => {
          this.users = response.data
          console.log(this.users.email);
        })
        .catch(error => console.log(error))
    },
}
</script>

<template>
  <Borders/>
  <div className="main_div">
    <div className="profile_div">
      <div className="profile_picture">
        <button className="profile_picture_button"><img className="img_profile" src="../assets/icon.webp" /></button>
        <h1 className="profile_user">{{ this.username }}</h1>
      </div>
      <div className="profile_username">
        <form @submit.prevent="change_username" className="border_right_bottom_two">
          <input className="profile_change_username" v-model="text" placeholder='change username'>
        </form>
        <!-- <h1>{{ this.username }}</h1> -->
        <!-- <input className="profile_change_username" v-model="text" placeholder='change username'> -->
      </div>
      <div className="profile_bottom">
          <h1 className="profile_user">{{ users.email }}</h1>
          <button @click="logout">logout</button>
          <!-- <h1 className="profile_user">{{ users.name }}</h1>
          <h1 className="profile_user">{{ users.phone }}</h1> -->
          <RouterLink to="/stats" className="button_access_profile">stats</RouterLink>
          <RouterLink to="/game-mode" className="button_access_profile">play</RouterLink>
      </div>

    </div>
  </div>
</template>
