<script setup>
import Borders from './Borders.vue'
</script>

<script>

let id = 0;

export default {
    props: ['id'],
    data() {
        return {
            users: [{id: id++, name: 'user', admin: true },
            {id: id++, name: 'elisa', admin: false },
            {id: id++, name: 'walter', admin: false },
            {id: id++, name: 'liena', admin: true },
            {id: id++, name: 'vluong', admin: false }]
        }
    },
    methods: {
    }
}
</script>

<template>
      <Borders/>
      <div className="main_div">
        <div className="infos">
            <h1 className="channel_name_infos">{{ this.id }}</h1>

            <div className="user_list_infos">
                <!-- <h1>Users:</h1> -->
                <li v-for="user in users" :key="user.id">
                    <RouterLink :to="'/profile-user/' + user.name" v-if="user.admin" className="admin">{{ user.name }}</RouterLink>
                    <RouterLink :to="'/profile-user/' + user.name" v-else className="not_admin">{{ user.name }}</RouterLink>
                </li>
            </div>

            <div className="private_public">
                <h1>prive / public</h1>
            </div>
        </div>

    </div>
  </template>
