<script setup lang="ts">
import Borders from './Borders.vue'
import Cookies from 'js-cookie';
import { accountService } from '@/_services'

import router from '../router';
</script>

<script lang="ts">
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
		accountService.updateUsername(this.text)
		.then((response) => {
		  this.username = response.data.login
		})
		this.text = ''
	  },

	  logout() {
		Cookies.remove('jwt');
		accountService.logout();
		router.push('/');
	  },
	},
	mounted() {
	  accountService.usersMe()
	  .then((response) => {
		this.users = response.data,
		this.username = response.data.login
	  })
	},
}
</script>

<template>
  <Borders/>
  <div className="main_div">
	<div className="profile_div">
	  <div className="profile_picture">
		<button className="profile_picture_button"><img className="" src=""/></button>
		<h1 className="profile_user">{{ this.username }}</h1>
	  </div>
	  <div className="profile_username">
		<form @submit.prevent="change_username" className="border_right_bottom_two">
		  
		  <input className="profile_change_username" v-model="text" placeholder='change username' :maxlength="9" pattern="[a-zA-Z]+" title="only letters accepted">
		  <!-- <input className="profile_change_username" v-on:keypress="isLetter($event)" v-model="text" placeholder='change username' :maxlength="9"> -->
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
