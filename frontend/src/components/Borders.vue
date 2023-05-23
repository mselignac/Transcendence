<script lang="ts">
import { accountService } from '@/_services'
import { RoomDto} from '@/_services/room.dto'
import { RoomChannelDto }  from '@/_services/room.channel.dto'

let id = 0
let idRoom = 0

// export type friend_type = {
//     id: number,
//     text: string
// }

export type users_type = {
  username: string
}

export default {
    data() {

        // let test_friend: friend_type = {id: id++, text: ''}
        // let test_channel: friend_type = {id: id++, text: ''}
        let users: users_type = {username: ''}

        return {
          users: users,
          // test_friend: test_friend,
          // test_channel: test_channel,
          test_friend: '',
          test_channel: '',
          search_user: '',
          user_exist: false,
          user_not_exist: false,
          friend: false,
          channel: false,
          channels_friends: true,
          newFriend: '',
          // friends: [] as friend_type[],
          friends: '',
          newChannel: '',
          // channels: [] as friend_type[],
          channels: '',
          token: '',
          connected: false,
          create_channel: false,
          user_test: '',
          my_username: ''
        }
    },
    methods: {
      change_friend() {
        this.friend = !this.friend
      },
      change_channel() {
        this.channel = !this.channel
      },
      friend_menu(name: string) {
        this.friend = !this.friend,
        this.test_friend = name
        console.log(this.test_friend)
      },
      channel_menu(name: string) {
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
        if (this.validateInput(this.newFriend)) {
          // this.friends.push({ id: id++, text: this.newFriend })
          let dto: RoomDto = { name: idRoom.toString(), user_one: this.my_username, user_two: this.newFriend }
          idRoom++
          this.friends.push( this.newFriend )
          accountService.createRoom(dto)
            .then(res => {
            })
            let dtoo: RoomChannelDto = { name: 'ejahan', users: [ this.newFriend ] }
            accountService.addFriend(dtoo)
          this.newFriend = ''
        }
      },
      removeFriend(friends: friend_type) {
        this.friend = false
        this.friends = this.friends.filter((t) => t !== friends)
      },
      addChannel() {
        if (this.validateInput(this.newChannel)) {
          // this.channels.push({ id: id++, text: this.newChannel })
          let dto: RoomChannelDto = { name: this.newChannel, users: [ this.my_username ] }
          this.channels.push( this.newChannel )
          accountService.createRoomChannel(dto)
            .then (res => {
              let dtoo: RoomChannelDto = { name: 'ejahan', users: [ this.newChannel ] }
              accountService.addChannel(dtoo)
            })
          this.newChannel = ''
          this.create_channel = false
        }
      },
      removeChannel(channels: friend_type) {
          this.channel = false
          this.channels = this.channels.filter((t) => t !== channels)
      },
      search_users() {
        if (this.validateInput(this.search_user)) {
          if (this.search_user === this.users.username) {
            this.user_exist = true,
          this.user_not_exist = false }
          else {
              this.user_exist = false,
              this.user_not_exist = true }
          this.search_user = ''
        }
      },
      create_channel_close() {
        this.create_channel = false,
        this.newChannel = ''
      },
      createChannel() {
        this.create_channel = true
      },
      validateInput(text: string) {
        return text.length > 0
      }
    },
    // created() {
    //   console.log('salut')
    //   const headers = {
    //     'Authorization': `bearer ${Cookies.get('jwt')}`,
    //     'Access-Control-Allow-Origin': "*",
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //   };
    //     axios
    //       .get('http://localhost:3000/users/me', { headers })
    //       .then((response) => {
    //         console.log(response.data.friends)
    //         console.log(this.friends)
    //         console.log(this.user_test);
    //       })
    //       .catch(error => console.log('error => ', error))
    //   },
      // updated() {

      //   console.log('salut')
        // const headers = {
        //   'Authorization': `bearer ${Cookies.get('jwt')}`,
        //   'Access-Control-Allow-Origin': "*",
        //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // };
        //   axios
        //     .get('http://localhost:3000/users/me', { headers })
        //     .then((response) => {
        //       this.user_test = response.data
        //       this.friends = response.data.friends
        //       this.channels = response.data.channels
        //       console.log(response.data.friends)
        //       console.log(this.friends)
        //       console.log(this.user_test);
        //     })
        //     .catch(error => console.log('error => ', error))
        // }
    mounted() {
      accountService.usersMe()
      .then((response) => {
        this.user_test = response.data
        this.friends = response.data.friends
        this.channels = response.data.channels
        this.users = response.data
        this.my_username = this.users.login
      })
    },
}
</script>

<template>
  <!-- <div className="friend_menu" v-if="friend">
    <RouterLink :to="'/profile-user/' + test_friend.text" className="elements_menu" v-if="friend">Profile</RouterLink>
    <button ref="button" className="elements_menu" v-if="friend" @click="removeFriend(test_friend)">Remove to friend</button>
    <RouterLink :to="'/chat/' + test_friend.text" className="elements_menu" v-if="friend">Chat</RouterLink>
    <button className="elements_menu" v-if="friend">Watch the game</button>
    <button className="elements_menu" v-if="friend">Invite to channel ></button>
    <button className="elements_menu" v-if="friend">Block</button>
    <button className="close_menu" v-if="friend" @click="change_friend">close</button>
  </div> -->
  <div className="friend_menu" v-if="friend">
    <RouterLink :to="'/profile-user/' + test_friend" className="elements_menu" v-if="friend">Profile</RouterLink>
    <button ref="button" className="elements_menu" v-if="friend" @click="removeFriend(test_friend)">Remove to friend</button>
    <RouterLink :to="'/chat/' + test_friend" className="elements_menu" v-if="friend">Chat</RouterLink>
    <button className="elements_menu" v-if="friend">Watch the game</button>
    <button className="elements_menu" v-if="friend">Invite to channel ></button>
    <button className="elements_menu" v-if="friend">Block</button>
    <button className="close_menu" v-if="friend" @click="change_friend">close</button>
  </div>

  <!-- <div className="channel_menu" v-if="channel">
    <RouterLink :to="'/channel/' + test_channel.text" className="elements_menu" v-if="channel">Chat</RouterLink>
    <button className="elements_menu" v-if="channel" @click=removeChannel(test_channel)>Quit</button>
    <RouterLink :to="'/infos/' + test_channel.text" className="elements_menu" v-if="channel">Infos</RouterLink>
    <button className="close_menu" v-if="channel" @click="change_channel">close</button>
  </div> -->
  <div className="channel_menu" v-if="channel">
    <RouterLink :to="'/channel/' + test_channel" className="elements_menu" v-if="channel">Chat</RouterLink>
    <button className="elements_menu" v-if="channel" @click=removeChannel(test_channel)>Quit</button>
    <RouterLink :to="'/infos/' + test_channel" className="elements_menu" v-if="channel">Infos</RouterLink>
    <button className="close_menu" v-if="channel" @click="change_channel">close</button>
  </div>

  <div className="borders_div">

    <div className="borders_right">
      <div className="border_right_top">
        <div className="border_right_top_left">
          <!-- <h1 className="routers_profile">{{ users.email }}</h1> -->
          <!-- <h1 className="routers_profile">{{ users.username }}</h1> -->
          <h1 className="routers_profile">{{ this.my_username }}</h1>
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
            <input className="placeholder_search_friends" pattern="[a-zA-Z]+" title="only letters accepted" v-model="newFriend" placeholder='add friends' :maxlength="9">
          </form>
          <form v-else @submit.prevent="createChannel" className="border_right_bottom_two">
            <input className="placeholder_search_friends" pattern="[a-zA-Z]+" title="only letters accepted" v-model="newChannel" placeholder='search channel' :maxlength="9">
          </form>

        <div v-if="create_channel" className="create_channel">
          <h1>This channel doesn't exist</h1>
          <h1>Do you want to create it?</h1>
          <div className="yes_no">
            <button @click="create_channel_close" className="button_no">no</button>
            <button @click="addChannel" className="button_yes">yes</button>
          </div>
        </div>

        </div>
        <div v-if="channels_friends" className="border_right_bottom_three">
          <ul>
            <h1 v-if="!friends.length" className="no_friends">you don't have any friends</h1>
            <h1 v-if="!friends.length" className="no_friends"><font-awesome-icon icon="fa-regular fa-face-sad-tear" /></h1>
            <!-- <li v-for="friend in friends" :key="friend.id" className="friends_usernames">
              <button @click="friend_menu(friend)" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-user" />{{ friend.text }}</button>
              <h1 className="connected" v-if="connected"><font-awesome-icon icon="fa-solid fa-circle" /></h1>
              <h1 className="not_connected" v-else><font-awesome-icon icon="fa-solid fa-circle" /></h1>
            </li> -->
            <li v-for="friend in friends" className="friends_usernames">
              <button @click="friend_menu(friend)" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-user" />{{ friend }}</button>
              <h1 className="connected" v-if="connected"><font-awesome-icon icon="fa-solid fa-circle" /></h1>
              <h1 className="not_connected" v-else><font-awesome-icon icon="fa-solid fa-circle" /></h1>
            </li>
          </ul>
        </div>
        <div v-else className="border_right_bottom_three">
          <ul>
            <h1 v-if="!channels.length" className="no_friends">you haven't joined channels</h1>
            <h1 v-if="!channels.length" className="no_friends"><font-awesome-icon icon="fa-regular fa-face-grimace" /></h1>
            <!-- <li v-for="channel in channels" :key="channel.id" className="friends_usernames">
              <button @click="channel_menu(channel)" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-users" />{{ channel.text }}</button>
            </li> -->
            <li v-for="channel in channels" className="friends_usernames">
              <button @click="channel_menu(channel)" className="friends_usernames"><font-awesome-icon icon="fa-solid fa-users" />{{ channel }}</button>
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
            <input className="placeholder_search" v-model="search_user" pattern="[a-zA-Z]+" title="only letters accepted" placeholder='search' :maxlength="9">
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
      <RouterLink to="/list-channels" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-comment" /></RouterLink>
      <RouterLink to="/profile" className="icons_border_left"><font-awesome-icon icon="fa-solid fa-gear" /></RouterLink>
    </div>

  </div>

</template>
