<script setup>
import Borders from './Borders.vue'
import axios from 'axios';
</script>

<script>
export default {
    data() {
        return {
            msg: 'test log',
            count: 0,
            titleClass: 'title',
            users: [],
            text: '',
        }
    },
    mounted() {
      axios
        // .post('https://jsonplaceholder.typicode.com/posts', {
        //   userId: '5',
        //   title:  'Article title',
        //   body:   'Article body content'
        // })
        // .then((response) => console.log(response))
        .get('https://jsonplaceholder.typicode.com/users/1')
        .then((response) => {
          this.users = response.data
          console.log(this.users)
          // console.log(response.data)
        })
    }
}
</script>

<template>
  <Borders/>
  <div className="main_div">
    <div className="profile_div">
      <div className="profile_picture">
        <button className="profile_picture_button"><font-awesome-icon icon="fa-solid fa-user" /></button>
      </div>
      <div className="profile_username">
        <!-- <h1 className="profile_user">Username</h1> -->
        <h1 className="profile_user">{{ users.username }}</h1>
        <input className="profile_change_username" v-model="text" placeholder='change username'>
        <!-- <h1 className="profile_user">test email: </h1> -->
        <h1 className="profile_user">{{ users.email }}</h1>
        <!-- <h1 className="profile_user">test name: </h1> -->
        <h1 className="profile_user">{{ users.name }}</h1>
        <!-- <h1 className="profile_user">test phone: </h1> -->
        <h1 className="profile_user">{{ users.phone }}</h1>
      </div>
      <div className="profile_bottom">
      </div>

    </div>
  </div>
</template>
