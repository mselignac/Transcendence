<script setup>
import Borders from './Borders.vue'
</script>

<script>
export default {
    data() {
        return {
            msg: 'test log',
            count: 0,
            titleClass: 'title',
        }
    }
}
</script>

<template>
   <!--  <div className="left">
      <h1 className="make_bold">channels</h1>
    </div>
    <div className="channels_names">
      <h1>_</h1>
      <h1 className="friend">channel</h1>
      <h1 className="friend">channel2</h1>
      <h1 className="friend">channel3</h1>
      <h1 className="friend">channel4</h1>
    </div>
    <div className="right">
      <RouterLink to="profile" className="make_bold">User</RouterLink>
    </div>
    <div className="friendlist">
      <div className="friendlist_title">
        <h1 >friends list</h1>
        <button className="friendlist_button">+</button>
      </div>
      <div className="list">
        <RouterLink to="chat" className="friend">friend</RouterLink>
        <RouterLink to="chat" className="friend">friend 2</RouterLink>
        <RouterLink to="chat" className="friend">friend 3</RouterLink>
        <RouterLink to="chat" className="friend">friend 4</RouterLink>
        <RouterLink to="chat" className="friend">friend 5</RouterLink>
      </div>
    </div>
    <div className="top">
      <RouterLink to="main-page" className="top_button">Home</RouterLink>
      <button className="top_button">Game Mode</button>
    </div> -->
  <div className="game_div">
    <Borders/>
    <div className="game_mode_div">
      <div className="game_mode_one">
        <h1 className="bold_only">Game mode</h1>
      </div>
      <div className="game_mode_two">
        <button className="button_mode">Mode 1</button>
        <button className="button_mode">Mode 2</button>
        <button className="button_mode">Mode 3</button>
      </div>
    </div>
  </div>

</template>

    <!-- <h1 :class="titleClass" @click="count++">{{count}}</h1> -->
    <!-- <button className="button_test" @click="count++">{{msg}} {{ count }}</button> -->
      <!-- <button className="button_game_log" >Login</button> -->
      <!-- <input className="button_user_log" v-model="text" placeholder='Username'>
      <p class>{{ text }}</p>
      <input className="button_user_log" v-model="text" placeholder="Password">
      <p class>{{ text }}</p> -->
      <!-- <button className="button_game_log" >Login</button> -->
    <!-- <div className="btn-div">
      <button className="buttonClass" @click="count++">{{ count }}</button>
    </div> -->