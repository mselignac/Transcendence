<script setup>
import Borders from './Borders.vue'
</script>

<script>

let id = 0;

export default {
    props: ['id'],
    data() {
        return {
            users: [{id: id++, name: 'user'},
            {id: id++, name: 'elisa'},
            {id: id++, name: 'walter'},
            {id: id++, name: 'liena'},
            {id: id++, name: 'vluong'}]
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
            <h1>Channel name: {{ this.id }}</h1>

            <h1>Users:</h1>
            <h1>(liste users avec admin en une autre couleur)</h1>
            <li v-for="user in users" :key="user.id">
                <h1>{{ user.name }}</h1>
            </li>

            <h1>prive / public</h1>
        </div>

    </div>
  </template>
