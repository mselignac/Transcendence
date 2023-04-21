<script>
import { accountService } from '@/_services'

let id = 0

export default {
    data() {
        return {
          test_friend: '',
          test_channel: '',
          search_user: '',
          user_exist: false,
          user_not_exist: false,
          friend: false,
          channel: false,
          channels_friends: true,
          users: [],
          newFriend: '',
          friends: [],
          newChannel: '',
          channels: [],
          token: ''
        }
    },
    methods: {
      friend_menu(name) {
        this.friend = !this.friend,
        this.test_friend = name
        console.log(this.test_friend)
      },
      channel_menu(name) {
        this.test_channel = name
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
      addFriend() {
          this.friends.push({ id: id++, text: this.newFriend }),
          this.newFriend = ''
      },
      removeFriend(friends) {
        this.friend = false
        this.friends = this.friends.filter((t) => t !== friends)
      },
      addChannel() {
          this.channels.push({ id: id++, text: this.newChannel }),
          this.newChannel = ''
      },
      removeChannel(channels) {
          this.channel = false
          this.channels = this.channels.filter((t) => t !== channels)
      },
      search_users() {
        if (this.search_user === this.users.username) {
          this.user_exist = true,
        this.user_not_exist = false }
        else {
            this.user_exist = false,
            this.user_not_exist = true }
        this.search_user = ''
      },
    mounted() {
      console.log("salut");
      accountService.usersMe()
          .then(res => {
            console.log(res)
            // this.$router.push('/main-page')
          })
          .catch(err => console.log(err))
        }
    }
}
</script>

<template>
  <div className="friend_menu" v-if="friend">
    <RouterLink :to="'/profile-user/' + this.test_friend.text" className="elements_menu" v-if="friend">Profile</RouterLink>
    <!-- <RouterLink :to="{ path: '/profile-user/', props: { id: this.test } }" className="elements_menu" v-if="friend">Profile</RouterLink> -->
    <button ref="button" className="elements_menu" v-if="friend" @click="removeFriend(this.test_friend)">Remove to friend</button>
    <!-- <RouterLink to="/chat" className="elements_menu" v-if="friend">Send a message</RouterLink> -->
    <RouterLink :to="'/chat/' + this.test_friend.text" className="elements_menu" v-if="friend">Send a message</RouterLink>
    <button className="elements_menu" v-if="friend">Watch the game</button>
    <button className="elements_menu" v-if="friend">Invite to channel ></button>
    <button className="elements_menu" v-if="friend">Block</button>
    <button className="close_menu" v-if="friend" @click="friend_menu">close</button>
  </div>

  <div className="channel_menu" v-if="channel">
    <!-- <RouterLink to="/chat" className="elements_menu" v-if="channel">Chat</RouterLink> -->
    <RouterLink :to="'/chat/' + this.test_channel.text" className="elements_menu" v-if="channel">Chat</RouterLink>
    <button className="elements_menu" v-if="channel" @click=removeChannel(this.test_channel)>Quit</button>
    <button className="elements_menu" v-if="channel">Infos</button>
    <button className="close_menu" v-if="channel" @click="channel_menu">close</button>
  </div>

  <div className="borders_div">

    <div className="borders_right">
      <div className="border_right_top">
        <div className="border_right_top_left">
          <h1 className="routers_profile">{{ users.email }}</h1>
        </div>
        <div className="border_right_top_right">
          <RouterLink to="/profile" className="routers_profile"><img className="img_border" src="../assets/icon.webp" /></RouterLink>
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
          <form v-if="channels_friends" @submit.prevent="addFriend"  className="border_right_bottom_two">
            <input className="placeholder_search_friends" v-model="newFriend" placeholder='add friends'>
          </form>
          <form v-else @submit.prevent="addChannel" className="border_right_bottom_two">
            <input className="placeholder_search_friends" v-model="newChannel" placeholder='search channel'>
          </form>
        </div>
        <div v-if="channels_friends" className="border_right_bottom_three">
          <ul>
            <h1 v-if="!friends.length" className="no_friends">you don't have any friends</h1>
            <h1 v-if="!friends.length" className="no_friends"><font-awesome-icon icon="fa-regular fa-face-sad-tear" /></h1>
            <li v-for="friend in friends" :key="friend.id" className="friends_usernames">
              <button @click="friend_menu(friend)" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-user" />{{ friend.text }}</button>
            </li>
          </ul>
        </div>
        <div v-else className="border_right_bottom_three">
          <ul>
            <h1 v-if="!channels.length" className="no_friends">you haven't joined channels</h1>
            <h1 v-if="!channels.length" className="no_friends"><font-awesome-icon icon="fa-regular fa-face-grimace" /></h1>
            <li v-for="channel in channels" :key="channel.id" className="friends_usernames">
              <button @click="channel_menu(channel)" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-users" />{{ channel.text }}</button>
              <!-- <button @click="removeChannel(channel)">X</button> -->
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="borders_middle">

      <div className="border_middle_top">

        <div className="border_middle_top_left">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>

        <div className="border_middle_top_right">
          <form @submit.prevent="search_users" className="placeholder_search">
            <input className="placeholder_search" v-model="search_user" placeholder='search'>
          </form>
        </div>
      </div>
      <div className="border_middle_two">
          <RouterLink to="/profile-user" v-if="user_exist" className="msg_user_exist">user</RouterLink>
          <h1 v-if="user_not_exist" className="msg_error_search_user">user doesn't exist</h1>
      </div>

    </div>

    <div className="borders_left">
      <RouterLink to="/main-page" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-house" /></RouterLink>
      <RouterLink to="/game-mode" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-gamepad" /></RouterLink>
      <RouterLink to="/stats" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-chart-simple" /></RouterLink>
      <RouterLink :to="'/chat/' + 'jesaispasfautquejechange'" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-comment" /></RouterLink>
      <RouterLink to="/profile" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-gear" /></RouterLink>
    </div>

  </div>

</template>
