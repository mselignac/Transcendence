<script setup lang="ts">
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
        },
        async removePassword() {
            let dto = { channel: this.idchannel }
            await accountService.removePassword(dto)
            .catch((res) => console.log(res))
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

        // isMute(user) {
        //     let time = new Date();
        //     console.log('time = ', time.getTime())
        //     let dto = { channel: this.idchannel, user: user, date: time.getTime() }
        //     accountService.isMute(dto)
        //     .then(res => {
        //         console.log(res)
        //         if (res.data.length) {
        //             let test = res.data[0].date
        //             let sec = time - test
        //             console.log('result = ', sec/1000)
        //         }
        //         else
        //             console.log('PAS MUTE')
        //     })
        //     .catch((res) => console.log(res))
        // },

        admin(user) {
            let dto = { channel: this.idchannel, user: user }
            accountService.admin(dto)
            .catch((res) => console.log(res))
        }
    },
    async created() {
      let dto: RoomChannelDto = { name: this.idchannel }
      await accountService.findRoomChannel(dto)
      .then((response) => {
        this.infos = response.data
        if (this.infos.private == true)
            this.visibility = 'private'
        else
            this.visibility = 'public'
      })
      accountService.usersMe()
      .then((res) => {
        this.me = res.data
        if (this.infos.admin.find(t => t === this.me.login))
            this.isAdmin = true
        if (this.infos.owner == this.me.login)
            this.owner = true
      })
    }
}
</script>

<template>
      <Borders/>
      <div className="main_div">
        <div className="infos">
            <h1 className="channel_name_infos">{{ idchannel }}</h1>

            <div className="user_list_infos">
                <li v-for="user in infos.users" :key="user.id">
                    <div className="admin_access">
                        <RouterLink :to="'/profile-user/' + user" v-if="infos.admin.find(t => t === user)" className="admin">{{ user }}</RouterLink>
                        <RouterLink :to="'/profile-user/' + user" v-else className="not_admin">{{ user }}</RouterLink>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="ban(user)"><font-awesome-icon icon="fa-solid fa-user-xmark" /></button>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="remove(user)"><font-awesome-icon icon="fa-solid fa-user-minus" /></button>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="mute(user)"><font-awesome-icon icon="fa-solid fa-comment-slash" /></button>
                        <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="admin(user)"><font-awesome-icon icon="fa-solid fa-user-tie" /></button>



                        <!-- <button v-if="isAdmin && !infos.admin.find(t => t === user)" className="button_admin" @click="isMute(user)"><font-awesome-icon icon="fa-solid fa-user-xmark" /></button> -->
                    </div>
                </li>
            </div>

            <div className="private_public">
                <button v-if="owner" @click="change_visibility">{{ visibility }}</button>
                <button v-if="owner && infos.is_password" @click="removePassword()">Remove password</button>
                <form v-if="owner" @submit.prevent="change_password">
                    <input v-model="password" placeholder='set password' :maxlength="9">
                </form>

                <h1 v-else>{{ visibility }}</h1>
            </div>
        </div>

    </div>
  </template>
