<script setup>
import Login from './components/Login.vue'
import Log from './components/Log.vue'
import GameMode from './components/GameMode.vue'
import Page from './components/MainPage.vue'
import Chat from './components/Chat.vue'
import Profile from './components/Profile.vue'
import Borders from './components/Borders.vue'
</script>

<script>
export default {
    data() {
        return {
            log: true
        }
    },
    methods: {
      toggle() {
        this.log = !this.log
      }
    }
}
</script>

<template>
  <div className="app">
    <div className="test_div">
      <RouterLink to="/login" className="button_test" @click="toggle" v-if="log">Login</RouterLink>
      <RouterView/>
    </div>
  </div>

</template>
