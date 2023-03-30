<script>
import axios from 'axios'
// import User from '../assets/user.webp'

export default {
    data() {
        return {
          text: '',
          search_user: '',
          friend: false,
          channel: false,
          channels_friends: true,
          users: [],
        }
    },
    methods: {
      friend_menu() {
        this.friend = !this.friend
      },
      channel_menu() {
        this.channel = !this.channel
      },
      show_channels() {
        this.friend = false
        this.channels_friends = false
      },
      show_friends() {
        this.channel = false
        this.channels_friends = true
      },
    },
    mounted() {
    //   const headers = {
    //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZWxpc2FAZ21haWwuY29tIiwiaWF0IjoxNjgwMTk1MDkxLCJleHAiOjE2ODAxOTU5OTF9.szBy5hq5NDDX7a4nPJgJK_DmeatwEKX0nJni1EBgu6M',
    //   };
      axios
        // .get('http://localhost:3000/users/me', { headers })
        .get('https://jsonplaceholder.typicode.com/users/1')
        .then((response) => {
          this.users = response.data
          console.log(this.users.username)
        })
    },
}
</script>

<template>
  <div className="friend_menu" v-if="friend">
    <RouterLink to="profile" className="elements_menu" v-if="friend">Profile</RouterLink>
    <button ref="button" className="elements_menu" v-if="friend">Remove to friend</button>
    <RouterLink to="chat" className="elements_menu" v-if="friend">Send a message</RouterLink>
    <button className="elements_menu" v-if="friend">Watch the game</button>
    <button className="elements_menu" v-if="friend">Invite to channel ></button>
    <button className="elements_menu" v-if="friend">Block</button>
    <button className="close_menu" v-if="friend" @click="friend_menu">close</button>
  </div>

  <div className="channel_menu" v-if="channel">
    <RouterLink to="chat" className="elements_menu" v-if="channel">Chat</RouterLink>
    <button className="elements_menu" v-if="channel">Quit</button>
    <button className="elements_menu" v-if="channel">Infos</button>
    <button className="close_menu" v-if="channel" @click="channel_menu">close</button>
  </div>





  <div className="borders_div">

    <div className="borders_right">

      <div className="border_right_top">
        <div className="border_right_top_left">
          <!-- <RouterLink to="profile" className="routers_profile">Username</RouterLink> -->
          <RouterLink to="profile" className="routers_profile">{{ users.username }}</RouterLink>
        </div>
        <div className="border_right_top_right">
          <RouterLink to="profile" className="routers_profile"><font-awesome-icon icon="fa-solid fa-user" /></RouterLink>
        </div>

      </div>


      <div className="border_right_bottom">
        <div className="border_right_bottom_one">
          <div className="border_right_bottom_one_left">
            <button @click="show_friends" className="button_channel_friends">friends</button>
          </div>
          <div className="border_right_bottom_one_right">
            <button @click="show_channels" className="button_channel_friends">Channels</button>
          </div>
        </div>
        <div className="border_right_bottom_two">
          <input v-if="channels_friends" className="placeholder_search_friends" v-model="text" placeholder='add friends'>
          <input v-else className="placeholder_search_friends" v-model="text" placeholder='search channel'>
        </div>
        <div v-if="channels_friends" className="border_right_bottom_three">
            <button @click="friend_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-user" /> friend</button>
            <button @click="friend_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-user" /> friend</button>
            <button @click="friend_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-user" /> friend</button>
            <button @click="friend_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-user" /> friend</button>
        </div>
        <div v-else className="border_right_bottom_three">
            <button @click="channel_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-users" /> channels</button>
            <button @click="channel_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-users" /> channels</button>
            <button @click="channel_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-users" /> channels</button>
            <button @click="channel_menu" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-users" /> channels</button>
        </div>
      </div>


    </div>

    <div className="borders_middle">

      <div className="border_middle_top">

        <div className="border_middle_top_left">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>

        <div className="border_middle_top_right">
          <input className="placeholder_search" v-model="search_user" placeholder='search'>
        </div>

      </div>

    </div>

    <div className="borders_left">
      <RouterLink to="main-page" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-house" /></RouterLink>
      <RouterLink to="game-mode" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-gamepad" /></RouterLink>
      <RouterLink to="stats" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-chart-simple" /></RouterLink>
      <RouterLink to="chat" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-comment" /></RouterLink>
      <RouterLink to="profile" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-gear" /></RouterLink>
    </div>

  </div>

</template>
