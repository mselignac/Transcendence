<script setup lang="ts">
import { accountService } from '@/_services';
import Borders from './Borders.vue'
import axios from 'axios';
import router from '@/router';
</script>

<script lang="ts">
export default {
    props: ['id'],
    data() {
        return {
            users: [],
            text: '',
            username: this.id,
            me: '',
            is_friend: false,
            is_blocked: false,
            request: false
        }
    },
    methods: {
      change_username() {
        this.username = this.text,
        this.text = ''
      },

      async add() {
        await accountService.sendFriendRequest({ name: this.username, user_one: this.me.login })
          .catch(res => console.log(res))
        this.request = true
      },

      async remove() {
        await accountService.removeFriend({ name: this.me.login, user_one: this.username })
          .catch(res => console.log(res))

        await accountService.removeFriend({ name: this.username, user_one: this.me.login })
          .catch(res => console.log(res))

        this.is_friend = false
      },

      async block() {
        await accountService.block({ name: this.me.login, user_one: this.username })
        .catch((res) => console.log(res))

        await accountService.removeFriend({ name: this.me.login, user_one: this.username })
          .catch(res => console.log(res))

        await accountService.removeFriend({ name: this.username, user_one: this.me.login })
          .catch(res => console.log(res))

        this.is_friend = false
        this.is_blocked = true
        this.request = false
      },

      async unblock() {
        await accountService.unblock({ name: this.me.login, user_one: this.username })
        .catch((res) => console.log(res))

        this.is_blocked = false
      }
    },
    async created() {
      await accountService.usersMe()
      .then((response) => {
        this.me = response.data
        if (this.me.login == this.username)
          router.push('/profile')
        if (response.data.friends.find(t => t === this.id))
          this.is_friend = true
        if (response.data.blocked.find(t => t === this.id))
          this.is_blocked = true

      })

      await accountService.isRequest({ name: this.username, user_one: this.me.login })
      .then(res => {
        if (res.data == true)
          this.request = true
      })
    }
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
        <button v-if="!is_friend && !is_blocked && !request" @click="add()" className="button_add_friend">add friend</button>
        <button v-else-if="!is_blocked && !request" @click="remove()" className="button_add_friend">remove friend</button>
        <button v-if="!is_blocked" @click="block()" className="button_block_friend">block</button>
        <button v-else @click="unblock()" className="button_block_friend">unblock</button>
      </div>
      <div className="profile_bottom">
          <RouterLink to="/stats" className="button_access_profile">stats</RouterLink>
          <RouterLink :to="'/chat/' + id" v-if="is_friend" className="button_access_profile">chat</RouterLink> <!-- si on est amis -> chat accessible -->
      </div>

    </div>
  </div>
</template>
