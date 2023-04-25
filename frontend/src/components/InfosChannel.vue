<script setup>
import Borders from './Borders.vue'
</script>

<script>

export default {
    props: ['id'],
    data() {
        return {
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

            <h1>prive / public</h1>
        </div>

    </div>
  </template>
