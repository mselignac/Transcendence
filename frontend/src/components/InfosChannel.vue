<script setup lang="ts">
import Borders from './Borders.vue'
import { accountService } from '@/_services';
</script>

<script lang="ts">

let id = 0;


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//                  A CHANGER                   //
//////////////////////////////////////////////////
//////////////////////////////////////////////////


export default {
    props: ['idchannel'],
    data() {
        return {
            visibility: 'public',
            password: '',
            // admin: true,
            infos: '',
            owner: false,
            admin: false,
            me: ''
        }
    },
    methods: {
        change_visibility() {
            if (this.visibility == 'public')
                this.visibility = 'private'
            else
                this.visibility = 'public'
        },
        change_password() {
            this.password = ''
        }
    },
    async created() {
      let dto: RoomChannelDto = { name: this.idchannel }
      await accountService.findRoomChannel(dto)
      .then((response) => {
        console.log(response.data.name)
        this.infos = response.data
      })
      accountService.usersMe()
      .then((res) => {
        this.me = res.data
        if (this.infos.admin.find(t => t === this.me.login))
            this.admin = true
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
<!-- 
            <div className="user_list_infos">
                <li v-for="user in infos.users" :key="user.id">
                    <RouterLink :to="'/profile-user/' + user" v-if="infos.admin.find(t => t === user)" className="admin">{{ user }}</RouterLink>
                    <RouterLink :to="'/profile-user/' + user" v-else className="not_admin">{{ user }}</RouterLink>
                </li>
            </div> -->


            <div className="user_list_infos">
                <li v-for="user in infos.users" :key="user.id">
                    <div className="admin_access">
                        <button v-if="infos.admin.find(t => t === user)" className="admin">{{ user }}</button>
                        <button v-else className="not_admin">{{ user }}</button>
                        <button v-if="admin">ban</button>
                        <button v-if="admin">remove</button>
                        <button v-if="admin">sourdine</button>
                        <button v-if="admin">admin</button>
                    </div>
                </li>
            </div>

            <div className="private_public">
                <button v-if="owner" @click="change_visibility">{{ visibility }}</button>
                <form v-if="owner" @submit.prevent="change_password">
                    <input v-model="password" placeholder='set password' :maxlength="9">
                </form>
                <h1 v-else>prive</h1>
            </div>
        </div>

    </div>
  </template>





<!-- this.jsp =  this.channels.find(t => t === this.newChannel) -->




<!-- si t'es owner
sinon si t'es admin
sinon -->
