<script setup>
import Login from './components/Login.vue'
import Log from './components/Log.vue'
import GameMode from './components/GameMode.vue'
import Page from './components/MainPage.vue'
import Chat from './components/Chat.vue'
import Profile from './components/Profile.vue'
import Borders from './components/Borders.vue'
import axios from 'axios'
</script>

<script>
export default {
  data() {
    return {}
  },
}
</script>


<template>
  <div className="app">
      <RouterView/>
  </div>

</template>
