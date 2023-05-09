<script setup lang="ts">
import Borders from './Borders.vue'
import axios from 'axios';
</script>

<script lang="ts">
export default {
    props: ['id'],
    data() {
        return {
            users: [],
            text: '',
            username: this.id
        }
    },
    methods: {
      change_username() {
        this.username = this.text,
        this.text = ''
      },
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
}
</script>

<template>
  <Borders/>
  <div className="main_div">
    <div className="profile_div">
      <div className="profile_picture">
        <button className="profile_picture_button"><img className="img_profile" src="../assets/icon.webp" /></button>
        <h1 className="profile_user">{{ username }}</h1>
      </div>
      <div className="profile_username">
        <button className="button_add_friend">add friend</button>
        <button className="button_add_friend">remove friend</button>
        <button className="button_block_friend">block</button>
      </div>
      <div className="profile_bottom">
          <RouterLink to="/stats" className="button_access_profile">stats</RouterLink>
          <RouterLink :to="'/chat/' + id" className="button_access_profile">chat</RouterLink>
      </div>

    </div>
  </div>
</template>
