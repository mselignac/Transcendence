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
            username: '',
            me: '',
            is_friend: false,
            is_blocked: false,
            request: false,
            exist: ''
        }
    },
    methods: {
      change_username() {
        this.username = this.text,
        this.text = ''
      },

      async add() {
        await accountService.sendFriendRequest({ name: this.username, user_one: this.me.id })
          .catch(res => console.log(res))
        this.request = true
      },

      async remove() {
        await accountService.removeFriend({ name: this.me.id, user_one: this.id })
          .catch(res => console.log(res))

        await accountService.removeFriend({ name: this.id, user_one: this.me.id })
          .catch(res => console.log(res))

        this.is_friend = false
      },

      async block() {
        await accountService.block({ name: this.me.id, user_one: this.id })
        .catch((res) => console.log(res))

        await accountService.removeFriend({ name: this.me.id, user_one: this.id })
          .catch(res => console.log(res))

        await accountService.removeFriend({ name: this.id, user_one: this.me.id })
          .catch(res => console.log(res))

        this.is_friend = false
        this.is_blocked = true
        this.request = false
      },

      async unblock() {
        await accountService.unblock({ name: this.me.id, user_one: this.id })
        .catch((res) => console.log(res))

        this.is_blocked = false
      }
    },

    async created() {
      // await accountService.findUser({ login: this.id })
      // .then(res => { this.exist = res.data })
      // .catch (res => console.log(res))


      

      await accountService.getLogin( { login: this.id })
      .then(res => { this.exist = res.data})
      .catch (res => console.log(res))
      // console.log('exist ', this.exist)


      // console.log(this.exist)
      if (!this.exist) {
        router.push('/main-page')
      }
      else {
        await accountService.usersMe()
        .then((response) => {
          this.me = response.data
          if (this.me.id == this.id)
            router.push('/profile')
          if (response.data.friends.find(t => t === this.id))
            this.is_friend = true
          if (response.data.blocked.find(t => t === this.id))
            this.is_blocked = true

        })
        .catch (res => console.log(res))

        this.username = this.exist.login

        await accountService.isRequest({ name: this.username, user_one: this.me.login })
        .then(res => {
          if (res.data == true)
            this.request = true
        })
        .catch (res => console.log(res))
      }
    }
}
</script>

<template>
  <Borders/>
  <div className="main_div">
    <div className="profile_div">
      <div className="profile_picture">
        <img className="profile_picture_img" :src="exist.avatarUrl" class="profile_picture_img"/>
        <h1 className="profile_user">{{ username }}</h1>
      </div>
      <div className="profile_username">
        <button v-if="!is_friend && !is_blocked && !request" @click="add()" className="button_add_friend">add friend</button>
        <button v-else-if="!is_blocked && !request" @click="remove()" className="button_add_friend">Unfriend</button>
        <button v-if="!is_blocked" @click="block()" className="button_block_friend">block</button>
        <button v-else @click="unblock()" className="button_block_friend">unblock</button>
      </div>
      <div className="profile_three">
          <RouterLink :to="'/game-history/' + id" className="button_access_profile">history</RouterLink>
          <RouterLink :to="'/ladder/' + id" className="button_access_profile">ladder</RouterLink>
          <RouterLink :to="'/chat/' + id" v-if="is_friend" className="button_access_profile">chat</RouterLink>
      </div>
      <!-- <div className="profile_bottom">
          <button v-if="is_friend" className="button-85">play</button>
      </div> -->

    </div>
  </div>
</template>
