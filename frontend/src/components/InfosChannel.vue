<script setup lang="ts">
import router from '@/router';
import Borders from './Borders.vue'
import { accountService } from '@/_services';
</script>

<script lang="ts">


export default {
    props: ['idchannel'],
    data() {
        return {
            visibility: '',
            password: '',
            infos: '',
            owner: false,
            isAdmin: false,
            me: '',
            pw: false
        }
    },
    methods: {
        change_visibility() {
            if (this.visibility == 'public')
                this.visibility = 'private'
            else
                this.visibility = 'public'

            let dto = { channel: this.idchannel }
            accountService.visibility(dto)
            .catch((res) => console.log(res))
        },
        change_password() {
            let dto = { channel: this.idchannel, user: this.password }
            accountService.password(dto)
            .catch((res) => console.log(res))
            this.password = ''
            this.pw = true
        },
        async removePassword() {
            let dto = { channel: this.idchannel }
            await accountService.removePassword(dto)
            .catch((res) => console.log(res))
            this.pw = false
        },
        async ban(user) {
            let dto = { channel: this.idchannel, user: user }
            await accountService.ban(dto)
            .catch((res) => console.log(res))

            dto = { name: this.idchannel, user_one: user }
            await accountService.removeUser(dto)
            .catch((res) => console.log(res))

            dto = { name: user, user_one: this.idchannel }
            await accountService.removeChannel(dto)
            .catch((res) => console.log(res))
        },
        async remove(user) {
            let dto = { name: this.idchannel, user_one: user }
            await accountService.removeUser(dto)
            .catch((res) => console.log(res))

            dto = { name: user, user_one: this.idchannel }
            await accountService.removeChannel(dto)
            .catch((res) => console.log(res))
        },
        mute(user) {
            let start = new Date();
            console.log(start.getTime())
            let time = start.getTime()
            let dto = { channel: this.idchannel, user: user, date: time.toString() }
            accountService.mute(dto)
            .catch((res) => console.log(res))
        },

        admin(user) {
            let dto = { channel: this.idchannel, user: user }
            accountService.admin(dto)
            .catch((res) => console.log(res))
        }
    },
    async created() {
      await accountService.usersMe()
      .then((res) => { this.me = res.data })

      let dto: RoomChannelDto = { name: this.idchannel }
      await accountService.findRoomChannel(dto)
      .then((response) => {
        this.infos = response.data,
        this.pw = response.data.is_password
      })

      if (this.infos && this.infos.users.find(t => t === this.me.login)) {
        if (this.infos.private == true)
            this.visibility = 'private'
        else
            this.visibility = 'public'
        if (this.infos.admin.find(t => t === this.me.login))
            this.isAdmin = true
        if (this.infos.owner == this.me.login)
            this.owner = true
      }
      else
        router.push('/main-page')
    }
}
</script>

<template>
      <Borders/>
      <div className="main_div">
        <div className="infos">
            <div className="channel_name_infos">
                <h1 className="make_bold">{{ idchannel }}</h1>
                <h1 className="members">{{ infos.users.length }} members</h1>
            </div>

            <div className="user_list_infos">
                <li v-for="user in infos.users" :key="user.id">
                    <div className="admin_access">
                        <RouterLink :to="'/profile-user/' + user" v-if="infos.admin.find(t => t === user)" className="admin">{{ user }}</RouterLink>
                        <h1 v-if="infos.admin.find(t => t === user)" className="admin_info">admin</h1>
                        <RouterLink :to="'/profile-user/' + user" v-else className="not_admin">{{ user }}</RouterLink>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="ban(user)"><font-awesome-icon icon="fa-solid fa-user-xmark" /></button>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="remove(user)"><font-awesome-icon icon="fa-solid fa-user-minus" /></button>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="mute(user)"><font-awesome-icon icon="fa-solid fa-comment-slash" /></button>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="admin(user)"><font-awesome-icon icon="fa-solid fa-user-tie" /></button>
                    </div>
                </li>
            </div>

            <div className="private_public">
                <button v-if="owner" @click="change_visibility" className="public_button">{{ visibility }}</button>
                <div className="div_pw">
                    <form v-if="owner" @submit.prevent="change_password">
                        <input className="set_password" v-model="password" placeholder='set password' :maxlength="9">
                    </form>
                    <button v-if="owner && pw" @click="removePassword()" className="remove_pw_button">Remove password</button>
                </div>

                <h1 v-if="!owner">{{ visibility }}</h1>
            </div>
        </div>

    </div>
  </template>
