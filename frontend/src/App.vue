<script setup>
import Login from './components/Login.vue'
import Log from './components/Log.vue'
import GameMode from './components/GameMode.vue'
import Page from './components/MainPage.vue'
import Chat from './components/Chat.vue'
import Profile from './components/Profile.vue'
import Borders from './components/Borders.vue'

</script>

<template>
  <div id="app">
    <Pong />
  </div>
</template>

<script>
import Pong from './components/Pong.vue'

export default {
  name: 'app',
  components: {
    Pong
  }
}
</script>


<style>
    body {
        background-color: #ddd;
    }
</style>
