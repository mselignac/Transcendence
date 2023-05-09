<script setup>
import Borders from './Borders.vue'
import Cookies from 'js-cookie';
import { accountService } from '@/_services'
import axios from 'axios';

import router from '../router';
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
    mounted: {
      change_username() {
        this.username = this.text,
        this.text = ''
      },

    logout() {
      Cookies.remove('jwt');
      accountService.logout();
      router.push('/');
    },
  },
  // mounted() {
  //   console.log(`${Cookies.get('jwt')}`)
  //   const headers = {
  //     Cookie: `jwt=${Cookies.get('jwt')}`,
  //     'Access-Control-Allow-Origin': "*",
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  //   };
  //     axios
  //       .get('http://10.11.13.1:3000/users/me', { headers })
  //       .then((response) => {
  //         this.users = response.data
  //         console.log(this.users.email);
  //       })
  //       .catch(error => console.log(error))
  //   },
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
          <button @click="logout">log out</button>
          <!-- <h1 className="profile_user">{{ users.name }}</h1>
          <h1 className="profile_user">{{ users.phone }}</h1> -->
          <RouterLink to="/stats" className="button_access_profile">stats</RouterLink>
          <RouterLink to="/game-mode" className="button_access_profile">play</RouterLink>
      </div>

    </div>
  </div>
</template>
